import type { MDXComponents } from "mdx/types";
// import Image from "next/image";

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="my-7 mb-5 scroll-m-20 text-3xl font-semibold tracking-tighter first:mt-0 "
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="my-5 mb-3 scroll-m-20 text-2xl font-semibold tracking-tighter"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="my-5 mb-3 scroll-m-20 text-2xl font-semibold tracking-tighter"
        {...props}
      />
    ),
    p: (props) => <p className="my-3 leading-7" {...props} />,
    code: (props) => (
      <code
        className="wrap-break-word px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-sm font-mono"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        dir="ltr"
        style={props.style}
        className={`my-6 overflow-x-auto whitespace-pre-wrap rounded sm:rounded-md bg-zinc-100 dark:bg-zinc-900 p-4 text-sm leading-relaxed max-h-128 font-mono no-scrollbar ${props.className}`}
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="text-primary underline underline-offset-4"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    ),
    table: (props) => (
      <table className="my-0 w-full overflow-hidden" {...props} />
    ),
    th: (props) => (
      <th
        className="border-r border-border bg-muted px-6 py-3 text-left text-sm font-semibold last:border-r-0"
        {...props}
      />
    ),
    tr: (props) => <tr className="border-b last:border-b-0" {...props} />,
    td: (props) => (
      <td
        className="border-r border-border px-6 py-4 text-sm last:border-r-0"
        {...props}
      />
    ),
    // Button: (props) => <Button {...props} />,
    // img: (props) => (<Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...props}/>),
    ...components,
  };
}
