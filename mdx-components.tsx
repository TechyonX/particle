import type { MDXComponents } from "mdx/types";
import { a, img, h2, article, wrapper, code } from "@/components/mdx";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  // @ts-ignore
  return { ...components, a, wrapper, code, h2, img, article };
}
