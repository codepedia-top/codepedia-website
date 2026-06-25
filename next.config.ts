import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "res.cloudinary.com"
      }
    ]
  },
};

const withMDX = createMDX({
  // extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ['rehype-highlight'],
  }
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
