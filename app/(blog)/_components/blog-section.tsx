import { cn } from "@/lib/utils";
// import { LazyImage } from "@/components/lazy-image";
import { getAllPosts } from "@/lib/get-posts";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BlogImage } from "./blog-image";

interface MetaDataType {
  title: string;
  description: string;
  author: string;
  publishDate: string;
  image: string;
  tag: string;
  readingTime: number;
  top: boolean;
}

type BlogType = {
  slug: string;
  metadata: MetaDataType;
};

export async function BlogsSection() {

  // fetch all posts data
  const posts = await getAllPosts();

  // for fetch all tags and store in array
  // const tags = Array.from(
  //   new Set(posts.map((blog) => blog.metadata.tag).filter(Boolean)),
  // ).sort();

  // for fetching top stories in my blog
  const topStories = posts.filter((blog) => blog.metadata.top).slice(0, 7);

  return (
    <section
      className="mx-auto w-full max-w-7xl px-5 pt-20 pb-20"
      id="topstories"
    >
      {/* Top Stories */}
      {topStories.length > 0 && (
        <div className="mb-12 border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col p-5 lg:border-r">

                <h2 className="w-fit mb-6 border border-border bg-primary px-3 py-1 text-sm font-semibold tracking-tight text-primary-foreground">
                  محبوب‌ترین‌ها
                </h2>

              <Link href={topStories[0].slug} className="group relative">
                {topStories[0].metadata.image && (
                  <div className="relative aspect-16/10 overflow-hidden border border-border">
                    <BlogImage
                      alt={topStories[0].metadata.title}
                      className="transition-all duration-500 group-hover:scale-105"
                      src={topStories[0].metadata.image}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="py-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={topStories[0].metadata.publishDate}>
                      {new Date(
                        topStories[0].metadata.publishDate,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>&middot;</span>
                    {topStories[0].metadata.readingTime} دقیقه برای خواندن
                    <Badge>{topStories[0].metadata.tag}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                    {topStories[0].metadata.title}
                  </h3>
                </div>
              </Link>
            </div>
            <div className="flex flex-col">
              {topStories.slice(1, 7).map((blog) => (
                <Link
                  key={blog.metadata.title}
                  href={blog.slug}
                  className="group flex gap-4 border-b border-border p-5 first:border-t last:border-b-0 lg:first:border-t-0"
                >
                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={blog.metadata.publishDate}>
                        {new Date(blog.metadata.publishDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </time>
                      <span>&middot;</span>
                      {blog.metadata.readingTime} برای خواندن
                      {blog.metadata.tag && <Badge>{blog.metadata.tag}</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                      {blog.metadata.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <ul className="grid grid-cols-1 divide-y divide-border overflow-hidden border border-b-0 border-border md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
        {posts.map((blog) => (
          <BlogCard {...blog} key={blog.metadata.title} />
        ))}
      </ul>
    </section>
  );
}

function BlogCard({
  slug,
  metadata,
  className,
  ...props
}: BlogType & React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn(
        "border-border p-4 md:border-b md:border-r md:nth-[2n]:border-r-0 lg:nth-[2n]:border-r lg:nth-[3n]:border-r-0",
        className,
      )}
      {...props}
    >
      <Link href={slug} className="group grid grid-rows-1">
        {metadata.image && (
          <div className="relative h-50 overflow-hidden border border-border">
            <BlogImage
              alt={metadata.title}
              className="transition-all duration-500 group-hover:scale-105"
              src={metadata.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill
            />
          </div>
        )}
        <div className="py-2">
          <h3 className="mb-2 text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
            {metadata.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {metadata.tag && <Badge>{metadata.tag}</Badge>}
            <time dateTime={metadata.publishDate}>
              {new Date(metadata.publishDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>{metadata.readingTime} دقیقه برای خواندن</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
