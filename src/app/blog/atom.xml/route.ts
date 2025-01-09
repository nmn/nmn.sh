import { unstable_cache } from "next/cache";
import { getFeed } from "../getFeed";

export const GET = unstable_cache(async function get() {
  const feed = await getFeed();

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
});
export const dynamic = "force-static";
