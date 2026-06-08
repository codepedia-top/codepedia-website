import type { MDXComponents } from "mdx/types";
// import Image from "next/image";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    // h1: (props) => <h1 className="mt-10 text-6xl font-bold" {...props} />,
    // h2: (props) => <h2 className="mt-8 text-4xl font-bold" {...props} />,
    // p: (props) => <p className="mt-4 text-base leading-relaxed" {...props} />,
    // code: (props) => (
    //   <code
    //   className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800"
    //   {...props}
    //   />
    // ),
    // Button: (props) => <Button {...props} />,
    // img: (props) => (<Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...props}/>),
    ...components,
  };
}
