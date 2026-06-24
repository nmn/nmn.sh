import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["bsky-react-post"],
  turbopack: {
    resolveAlias: {
      // Bright's default Lighter build compiles Oniguruma Wasm at request time,
      // which workerd blocks. Use Lighter's Worker entry during server builds.
      "@code-hike/lighter": "@code-hike/lighter/dist/worker.esm.mjs",
    },
  },
  // transpilePackages: ['@stylexjs/open-props'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

import("@opennextjs/cloudflare").then((m) =>
  m.initOpenNextCloudflareForDev()
);
