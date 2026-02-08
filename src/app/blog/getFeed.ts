import { Feed } from "feed";
import { getBlogPosts } from "./getPosts";
export async function getFeed() {
  "use cache";
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
  try {
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
  } catch (error) {
    console.error(error);
    return feed;
  }
}
