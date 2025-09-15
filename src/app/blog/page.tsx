import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import React from "react";
import { H1, P, Ul } from "../../mdx-components";
import { colors, fonts, spacing, text } from "../vars.stylex";
import { getBlogPosts } from "./getPosts";

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
                {post.title
                  ? wrapTitleWithViewTransitionNames(post.title, post.path)
                  : ""}
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

function wrapTitleWithViewTransitionNames(
  title: string,
  path: string = "unknwon"
) {
  const safePath = path.split("/").pop();

  const wordCounts: { [key: string]: number } = {};
  return title.split(" ").map((origWord) => {
    // remove special characters
    const word = origWord.toLocaleLowerCase().replace(/[^a-z0-9\s-_]/g, "");

    const count = wordCounts[word] ?? 0;
    wordCounts[word] = (wordCounts[word] ?? 0) + 1;

    const uniqueName =
      "_" + safePath + "________" + word + (count > 0 ? "___" + count : "");

    return (
      <React.Fragment key={uniqueName}>
        <span
          key={uniqueName}
          style={{
            viewTransitionName: uniqueName,
          }}
        >
          {origWord}
        </span>{" "}
      </React.Fragment>
    );
  });
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
    // viewTransitionName: {
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   default: null,
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(1))": "article-link-1",
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(2))": "article-link-2",
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(3))": "article-link-3",
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(4))": "article-link-4",
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(5))": "article-link-5",
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(6))": "article-link-6",
    //   // eslint-disable-next-line @stylexjs/valid-styles
    //   ":where(:nth-child(7))": "article-link-7",
    // },
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
