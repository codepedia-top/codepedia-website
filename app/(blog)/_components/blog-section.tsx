import { getAllPosts } from "@/lib/get-posts";
import { BlogCard, CategiricalCard } from "./cards";

export async function BlogsSection() {
  // fetch all posts data
  const posts = await getAllPosts();

  // for fetch all tags and store in array
  // const tags = Array.from(
  //   new Set(posts.map((blog) => blog.metadata.tag).filter(Boolean)),
  // ).sort();

  // for fetching top stories in my blog
  const topStories = posts.filter((blog) => blog.metadata.featured).slice(0, 7);
  const learningStories = posts
    .filter((blog) => blog.metadata.tags[0] == "go")
    .slice(0, 7);

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
        {posts.map((blog) => (
          <BlogCard {...blog} key={blog.metadata.title} />
        ))}
      </ul>
    </section>
  );
}
