import { unstable_cache } from "next/cache";
import { getFeed } from "../getFeed";

export const GET = unstable_cache(async function get() {
  let feed;
  try {
    feed = await getFeed();
  } catch (error) {
    console.error(error);
    return new Response("Error generating feed", {
      status: 500,
    });
  }

  return new Response(feed.json1(), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
});

export const dynamic = "force-static";
