import { getAllPosts } from "@/lib/get-posts";
import { BlogCard, CategiricalCard } from "./cards";

export async function BlogsSection() {
  // fetch all posts data
  const posts = await getAllPosts();

  const topStories = posts
    .filter((blog) => blog.metadata.featured)
    .sort(
      (a, b) =>
        b.metadata.publishedAt.getTime() - a.metadata.publishedAt.getTime(),
    )
    .slice(0, 5);
  const learningStories = posts
    .filter((blog) => blog.metadata.tags[0] == "go")
    .sort(
      (a, b) =>
        b.metadata.publishedAt.getTime() - a.metadata.publishedAt.getTime(),
    )
    .slice(0, 5);

  return (
    <section
      className="mx-auto w-full max-w-7xl px-5 pt-20 pb-20"
      id="topstories"
    >
      {/* Top Stories */}
      <CategiricalCard stories={topStories} title="جدیدترین‌ها" />

      {/* learning Stories */}
      <CategiricalCard stories={learningStories} title="آموزش‌ها" />

      <ul className="grid grid-cols-1 divide-y divide-border overflow-hidden md:grid-cols-2">
        {posts
          .sort(
            (a, b) =>
              b.metadata.publishedAt.getTime() -
              a.metadata.publishedAt.getTime(),
          )
          .map((blog) => (
            <BlogCard {...blog} key={blog.metadata.title} />
          ))}
      </ul>
    </section>
  );
}
