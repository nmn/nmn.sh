import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { H1, P, Ul } from "../../mdx-components";
import fs from "fs/promises";
import path from "path";

import * as runtime from "react/jsx-runtime";
// import * as provider from "@mdx-js/react";
import { evaluate } from "@mdx-js/mdx";
import { unstable_cache } from "next/cache";
import { colors, fonts, spacing, text } from "../vars.stylex";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const blogDir = path.join(__dirname, "(posts)");

type Config = {
  title?: string;
  description?: string;
  date?: string;
  published?: boolean;
  tags?: string[];
};

const getBlogPosts = unstable_cache(async () => {
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

export default async function Home() {
  const posts = await getBlogPosts();
  const publishedPosts = posts.filter((post) => post.published);

  return (
    <div>
      <H1 xstyle={styles.h1}>Latest Posts</H1>
      <Ul xstyle={styles.ul}>
        {publishedPosts.map((post) => (
          <li {...stylex.props(styles.li)} key={post.path}>
            <div {...stylex.props(styles.row)}>
              <Link {...stylex.props(styles.link)} href={post.path}>
                {post.title}
              </Link>
              <span {...stylex.props(styles.date)}>{post.date}</span>
            </div>
            <P xstyle={styles.p}>{post.description}</P>
          </li>
        ))}
      </Ul>
    </div>
  );
}

const styles = stylex.create({
  h1: {
    textAlign: "center",
    textWrap: "balance",
  },
  ul: {
    borderBottomColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderBottomStyle: "solid",
    borderBottomWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    marginTop: spacing.xxl,
    padding: 0,
    width: "100%",
  },
  li: {
    borderTopColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderTopStyle: "solid",
    borderTopWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxs,
    listStyle: "none",
    margin: 0,
    paddingBlock: spacing.md,
    // paddingInline: spacing.xs,
  },
  link: {
    color: {
      default: colors.fg,
      ":hover": colors.accent,
    },
    flexGrow: 1,
    fontSize: text.h4,
    fontWeight: 800,
    lineHeight: 0.9,
    textDecoration: "none",
    textTransform: "uppercase",
  },
  row: {
    display: "flex",
    gap: spacing.md,
    width: "100%",
  },
  date: {
    flexShrink: 0,
    fontFamily: fonts.mono,
    opacity: 0.5,
  },
  p: {
    lineHeight: 1.2,
    marginTop: null,
    opacity: 0.5,
    width: "100%",
  },
});