import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";
import {
  metadataSchema,
  type Metadata as PostMetadata,
} from "@/lib/zodschemas";

type LoadedPost = {
  Content: MDXContent;
  metadata: PostMetadata;
};

async function loadPost(slug: string): Promise<LoadedPost | null> {
  try {
    const post = await import(`@/content/posts/${slug}.mdx`);
    const parsed = metadataSchema.safeParse(post.metadata);
    if (!parsed.success) {
      console.error(
        `Invalid metadata in post "${slug}":`,
        parsed.error.issues,
      );
      return null;
    }
    return { Content: post.default, metadata: parsed.data };
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return {};
  const { metadata } = post;
  return {
    title: `${metadata.title} | codepedia`,
    description: metadata.description,
    authors: [
      {
        name: metadata.author,
      },
    ],

    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://www.codepedia.top/blog/${slug}`,
      siteName: "codepedia",
      locale: "fa_IR",
      type: "article",

      publishedTime: new Date(metadata.publishedAt).toISOString(),
      modifiedTime: new Date(metadata.updatedAt).toISOString(),
      images: [metadata.image],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.image],
    },

    keywords: metadata.tags,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await loadPost(slug);
  if (!post) return notFound();
  const { Content, metadata } = post;
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
                  <time
                    dateTime={metadata.publishedAt.toISOString()}
                  >
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
