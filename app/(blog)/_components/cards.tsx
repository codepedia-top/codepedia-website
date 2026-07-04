import { cn } from "@/lib/utils";
import Link from "next/link";
import { BlogImage } from "./blog-image";
import { Badge } from "@/components/ui/badge";
import { BlogType, CategoryType } from "@/lib/zodschemas";

export function BlogCard({
  slug,
  metadata,
  className,
  ...props
}: BlogType & React.ComponentPropsWithoutRef<"li">) {
  return (
    <li
      className={cn("border border-border p-4 m-1 relative", className)}
      {...props}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "repeating-linear-gradient(45deg, #000 0px, #111 2px, #000 4px, #222 6px)",
        }}
      />
      <Link href={slug} className="group grid grid-rows-1 gap-2">
        {/* {metadata.image && (
          <div className="relative h-50 overflow-hidden border border-border">
            <BlogImage
              alt={metadata.title}
              className="object-cover object-left transition-transform duration-300 ease-in-out group-hover:scale-[1.01]"
              src={metadata.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              fill
            />
          </div>
        )} */}
        <div className="py-2">
          <h3 className="mb-2 text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
            {metadata.title}
          </h3>
          <div className="flex items-canter gap-3 text-sm text-muted-foreground">
            {metadata.tags[0] && <Badge>{metadata.tags[0]}</Badge>}
            <time dateTime={(metadata.publishedAt).toDateString()}>
              {new Date(metadata.publishedAt).toLocaleDateString("fa-IR", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>&middot;</span>
            <span>
              {metadata.readingTime.toLocaleString("fa-IR")} دقیقه برای خواندن
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export function CategiricalCard({ stories, title, ...props }: CategoryType) {
  return (
    <>
      {stories.length > 0 && (
        <div className="mb-12" {...props}>
          <h2 className="w-full mx-auto px-4 py-0.5 bg-primary font-semibold">
            {title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col p-5 border border-border m-2 relative">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, #000 0px, #111 2px, #000 4px, #222 6px)",
                }}
              />

              <Link href={stories[0].slug} className="group relative">
                {stories[0].metadata.image && (
                  <div className="relative aspect-16/10 overflow-hidden border border-border">
                    <BlogImage
                      alt={stories[0].metadata.title}
                      className="transition-all duration-500 group-hover:scale-105"
                      src={stories[0].metadata.image}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="py-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={(stories[0].metadata.publishedAt).toDateString()}>
                      {new Date(
                        stories[0].metadata.publishedAt,
                      ).toLocaleDateString("fa-IR", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>&middot;</span>
                    {stories[0].metadata.readingTime.toLocaleString(
                      "fa-IR",
                    )}{" "}
                    دقیقه برای خواندن
                    <Badge className="bg-secondary text-secondary-foreground">
                      {stories[0].metadata.tags[0]}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tighter underline-offset-4 group-hover:text-primary-foreground">
                    {stories[0].metadata.title}
                  </h3>
                </div>
              </Link>
            </div>
            <div className="flex flex-col">
              {stories.slice(1, 7).map((blog) => (
                <Link
                  key={blog.metadata.title}
                  href={blog.slug}
                  className="group flex gap-4 border border-border p-5 m-2 relative"
                >
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, #000 0px, #111 2px, #000 4px, #222 6px)",
                    }}
                  />

                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={(blog.metadata.publishedAt).toDateString()}>
                        {new Date(blog.metadata.publishedAt).toLocaleDateString(
                          "fa-IR",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </time>
                      <span>&middot;</span>
                      {blog.metadata.readingTime} برای خواندن
                      {blog.metadata.tags[0] && <Badge>{blog.metadata.tags[0]}</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold tracking-tighter underline-offset-4 group-hover:text-primary-foreground">
                      {blog.metadata.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
