// Default OpenNext config for Cloudflare Workers.
import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default {
  ...defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
    enableCacheInterception: true,
  }),
  buildCommand: "bun run build",
} satisfies OpenNextConfig;
