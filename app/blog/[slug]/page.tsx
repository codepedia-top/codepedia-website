import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let Content, metadata;
  try {
    const post = await import(`@/content/posts/${slug}.mdx`);
    Content = post.default;
    metadata = post.metadata;
  } catch {
    return notFound();
  }
  return (
    <article className="prose dark:prose-invert w-full max-w-3xl mx-auto">
      <div className="space-y-4">
        <h1>{metadata.title}</h1>
        <div>{metadata.publishDate}</div>
      </div>
      <Content />
    </article>
  );
}
