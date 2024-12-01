import { unstable_cache } from "next/cache";
import { getFeed } from "../getFeed";

async function get() {
  const feed = await getFeed();

  return new Response(feed.json1(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export const GET = unstable_cache(get);
export const dynamic = "force-static";
