// Default OpenNext config for Cloudflare Workers.
import {
  defineCloudflareConfig,
  type OpenNextConfig,
} from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default {
  ...defineCloudflareConfig({
    // For best results, consider enabling R2 caching:
    // https://opennext.js.org/cloudflare/caching
    // incrementalCache: r2IncrementalCache,
  }),
  buildCommand: "bun run build",
} satisfies OpenNextConfig;
