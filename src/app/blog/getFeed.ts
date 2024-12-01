import { Feed } from "feed";
import { getBlogPosts } from "./getPosts";
import { unstable_cache } from "next/cache";

export const getFeed = unstable_cache(async function getFeed() {
  const siteURL = "https://nmn.sh";
  const feedOptions = {
    title: "nmn.sh",
    language: "en",
    id: siteURL,
    link: siteURL,
    description: "Naman Goel's blog",
    // image: `${siteURL}/og.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Naman Goel`,
    author: {
      name: "Naman Goel",
      link: `${siteURL}/blog`,
    },
  };

  const feed = new Feed(feedOptions);
  const posts = await getBlogPosts();

  posts.forEach((post) => {
    const { title, path, description = "", date = "" } = post;

    if (title == null || path == null) {
      return;
    }

    feed.addItem({
      title,
      id: path,
      link: `${siteURL}${path}`,
      description,
      content: description,
      date: new Date(date),
      author: [feedOptions.author],
    });
  });

  return feed;
});
