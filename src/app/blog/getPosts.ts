import fs from "fs/promises";
import path from "path";
import { unstable_cache } from "next/cache";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const blogDir = path.join(__dirname, "(posts)");

export type Config = {
  title?: string;
  description?: string;
  date?: string;
  published?: boolean;
  tags?: string[];
};

export const getBlogPosts = unstable_cache(async () => {
  const blogs = await fs.readdir(blogDir);

  // filter for only folders
  const blogsPathsAndTitles = blogs.map(async (blog) => {
    const blogPath = path.join(blogDir, blog);
    const stat = await fs.stat(blogPath);

    if (!stat.isDirectory()) {
      return null;
    }

    const filesWithinFolder = await fs.readdir(blogPath);
    if (!filesWithinFolder.includes("page.mdx")) {
      return null;
    }

    const filePath = path.join(blogPath, "page.mdx");
    const file = await fs.readFile(filePath, "utf-8");

    const lines = file.split("\n");
    const firstImport = lines.findIndex((line) => line.startsWith("import "));

    const relevantContent = lines.slice(0, firstImport).join("\n");

    const { metadata }: { metadata?: Config } = (await evaluate(
      relevantContent,
      { ...runtime }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as any;

    if (metadata == null) {
      return null;
    }

    return { ...metadata, path: "/blog/" + blog };
  });
  const maybePostsResolved = await Promise.all(blogsPathsAndTitles);

  return maybePostsResolved
    .filter((post) => post !== null)
    .sort((a, b) =>
      a.date != null && b.date != null ? b.date.localeCompare(a.date) : 0
    );
});
