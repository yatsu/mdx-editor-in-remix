import React, { useEffect, useRef, useState } from "react";

import { ClientOnly } from "remix-utils";

import type { MDXEditorMethods } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

const LazyMDXEditor = React.lazy(() =>
  import("@mdxeditor/editor").then((mod) => ({ default: mod.MDXEditor }))
);

export default function Editor() {
  const [listsPlugin, setListsPlugin] = useState<any>(null);
  const [quotePlugin, setQuotePlugin] = useState<any>(null);
  const [headingsPlugin, setHeadingPlugin] = useState<any>(null);
  const [linkPlugin, setLinkPlugin] = useState<any>(null);
  const [codeBlockPlugin, setCodeBlockPlugin] = useState<any>(null);
  const [thematicBreakPlugin, setThematicBreakPlugin] = useState<any>(null);
  const [markdownShortcutPlugin, setMarkdownShortcutPlugin] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/lists");
      setListsPlugin(mod.listsPlugin());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/quote");
      setQuotePlugin(mod.quotePlugin());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/headings");
      setHeadingPlugin(mod.headingsPlugin());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/link");
      setLinkPlugin(mod.linkPlugin());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/codeblock");
      setCodeBlockPlugin(
        mod.codeBlockPlugin({
          defaultCodeBlockLanguage: "txt",
        })
      );
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/thematic-break");
      setThematicBreakPlugin(mod.thematicBreakPlugin());
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const mod = await import("@mdxeditor/editor/plugins/markdown-shortcut");
      setMarkdownShortcutPlugin(mod.markdownShortcutPlugin);
    })();
  }, []);

  const ref = useRef<MDXEditorMethods>(null);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ClientOnly>
        {() => (
          <>
            <LazyMDXEditor
              ref={ref}
              markdown="# Hello world"
              contentEditableClassName="prose"
              plugins={[
                listsPlugin,
                quotePlugin,
                headingsPlugin,
                linkPlugin,
                codeBlockPlugin,
                thematicBreakPlugin,
                markdownShortcutPlugin, // e.g. `# heading` => <h1><span>heading</span></h1>
              ].filter((p) => p)}
            />
            <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
          </>
        )}
      </ClientOnly>
    </React.Suspense>
  );
}
