import type { MDXComponents } from "mdx/types";
import { A, Img, H2, Article, Wrapper, Code } from "@/components/mdx";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // @ts-ignore
    a: A,
    wrapper: Wrapper,
    // @ts-ignore
    code: Code,
    h2: H2,
    img: Img,
    // @ts-ignore
    article: Article,
  };
}
