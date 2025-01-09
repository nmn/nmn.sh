import type { AppBskyFeedPost } from "@atproto/api";
import { Link } from "../Link";
import { rtSegments } from "./utils";

import * as stylex from "@stylexjs/stylex";
import { bskyPost } from "../../theme.stylex";

export type PostContent = {
  record: AppBskyFeedPost.Record | null;
};

export function PostContent({ record }: PostContent) {
  if (!record) return null;

  const richText = [];

  let counter = 0;
  for (const segment of rtSegments({
    text: record.text,
    facets: record.facets,
  })) {
    if (segment.link) {
      richText.push(
        <Link
          key={counter}
          href={segment.link.uri}
          xstyle={styles.richText}
          disableTracking={
            !segment.link.uri.startsWith("https://bsky.app") &&
            !segment.link.uri.startsWith("https://go.bsky.app")
          }
        >
          {segment.text}
        </Link>
      );
    } else if (segment.mention) {
      richText.push(
        <Link
          key={counter}
          href={`/profile/${segment.mention.did}`}
          xstyle={styles.richText}
        >
          {segment.text}
        </Link>
      );
    } else if (segment.tag) {
      richText.push(
        <Link
          key={counter}
          href={`/tag/${segment.tag.tag}`}
          xstyle={styles.richText}
        >
          {segment.text}
        </Link>
      );
    } else {
      richText.push(segment.text);
    }

    counter++;
  }

  return <p {...stylex.props(styles.content)}>{richText}</p>;
}

const styles = stylex.create({
  content: {
    fontSize: {
      default: "1rem",
      "@media (min-width: 300px)": "1.125rem",
    },
    lineHeight: {
      default: "1.5rem",
      "@media (min-width: 300px)": "1.75rem",
    },
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    width: "100%",
  },
  richText: {
    color: bskyPost.fontColor,
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
  },
});
