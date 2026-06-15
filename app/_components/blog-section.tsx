import { cn } from "@/lib/utils";
import { LazyImage } from "@/components/lazy-image";
import { getAllPosts } from "@/lib/actions/get-posts";
import { Link } from "lucide-react";

type BlogType = {
  slug: string;
  metadata: any;
};



export async function BlogsSection() {
  const posts = await getAllPosts();
  return (
    <div className="z-10 grid p-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((blog) => (
        <BlogCard {...blog} key={blog.metadata.title} />
      ))}
    </div>
  );
}

function BlogCard({
  slug,
  metadata,
  className,
  ...props
}: React.ComponentProps<"a"> & BlogType) {
  return (
    <a
      className={cn(
        "group cn-rounded flex flex-col gap-2 p-3 hover:bg-muted/50 active:bg-muted",
        className,
      )}
      key={metadata.title}
      href={slug}
      {...props}
      >
      <LazyImage
        alt={metadata.title}
        className="transition-all duration-500 group-hover:scale-105"
        containerClassName="cn-rounded shadow-md outline outline-offset-3 outline-border/50"
        fallback="https://placehold.co/640x360?text=fallback-image"
        inView={true}
        ratio={16 / 9}
        src={metadata.image}
        />
      <div className="space-y-2 px-2 pb-2">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground group-hover:text-foreground sm:text-xs">
          <p>by {metadata.author}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{metadata.createdAt}</p>
          <div className="size-1 rounded-full bg-muted-foreground" />
          <p>{metadata.readTime}</p>
        </div>
        <h2 className="line-clamp-2 font-semibold text-lg">{metadata.title}</h2>
        <p className="line-clamp-3 text-muted-foreground text-sm group-active:text-foreground">
          {metadata.description}
        </p>
      </div>
    </a>
  );
}
