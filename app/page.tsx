import { BlogsSection } from "./_components/blog-section";
import { HeroSection } from "./_components/hero";

export default async function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-5xl grow">
        <div className="space-y-1 px-4 py-8 md:px-6">
          <HeroSection />
        </div>
        <div>
          <BlogsSection />
        </div>
      </div>
    </>
  );
}
