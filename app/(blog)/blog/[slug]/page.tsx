import { Badge } from "@/components/ui/badge";
import Image from "next/image";
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
    <>
      <div className="mx-auto mt-20 mb-20 max-w-6xl px-5">
        <div className="xl:grid xl:grid-cols-[1fr_200px] xl:gap-10">
          <article className="max-w-4xl">
            <div className="space-y-4">
              <header>
                <h1 className="text-balance text-3xl font-semibold tracking-tighter md:text-5xl">
                  {metadata.title}
                </h1>
                {metadata.description && (
                  <p className="mt-3 text-balance text-lg text-muted-foreground">
                    {metadata.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                  <time dateTime={metadata.publishedAt}>
                    {new Date(metadata.publishedAt).toLocaleDateString(
                      "fa-IR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </time>
                  <span>&middot;</span>
                  <span>
                    {metadata.readingTime.toLocaleString("fa-IR")} دقیقه برای
                    خواندن
                  </span>
                  {metadata.tag && (
                    <>
                      <span>&middot;</span>
                      <Badge>{metadata.tag}</Badge>
                    </>
                  )}
                </div>
              </header>

              {metadata.image && (
                <div className="relative mb-8 aspect-1200/630 overflow-hidden border border-border">
                  <Image
                    src={metadata.image}
                    alt={metadata.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    unoptimized={!metadata.image.startsWith("http")}
                  />
                </div>
              )}
            </div>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <Content />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
