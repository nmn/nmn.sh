import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["bsky-react-post"],
  // transpilePackages: ['@stylexjs/open-props'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
