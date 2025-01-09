"use client";

import type { AnchorHTMLAttributes } from "react";
import * as stylex from "@stylexjs/stylex";
import { bskyPost } from "../../theme.stylex";

export type Link = {
  href: string;
  disableTracking?: boolean;
  xstyle?: stylex.StyleXStyles;
  className?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export function Link({
  href,
  xstyle,
  disableTracking,
  onClick,
  onKeyDown,
  ...props
}: Link) {
  let ref_url: string | null = null;

  if (typeof window !== "undefined") {
    const searchParam = new URLSearchParams(window.location.search);
    ref_url = searchParam.get("ref_url");
  }

  const newSearchParam = new URLSearchParams();
  newSearchParam.set("ref_src", "embed");
  if (ref_url) {
    newSearchParam.set("ref_url", ref_url);
  }

  return (
    <a
      {...props}
      href={`${href.startsWith("http") ? href : `https://bsky.app${href}`}${
        disableTracking ? "" : `?${newSearchParam.toString()}`
      }`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        onKeyDown?.(event);
      }}
      {...stylex.props(styles.link, xstyle)}
    />
  );
}

const styles = stylex.create({
  link: {
    color: bskyPost.linkFontColor,
    cursor: "pointer",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },
});
