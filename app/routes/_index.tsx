import type { V2_MetaFunction } from "@remix-run/node";

import Editor from "~/components/editor";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "MDXEditor Example" },
    { name: "description", content: "MDXEditor Example" },
  ];
};

export default function Index() {
  return <Editor />
}
