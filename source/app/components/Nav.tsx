import React from "react";
import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import { spacing } from "@/app/vars.stylex";

export function Nav() {
  return (
    <nav {...stylex.props(styles.navContainer)}>
      <Link {...stylex.props(styles.navLink)} href="/blog">
        Blog
      </Link>
      <Link {...stylex.props(styles.navLink)} href="/talks">
        Talks
      </Link>
      <Link {...stylex.props(styles.navLink)} href="/projects">
        Projects
      </Link>
    </nav>
  );
}

const styles = stylex.create({
  navContainer: {
    display: "flex",
    gap: spacing.xxs,
    left: 0,
    padding: spacing.sm,
    position: "absolute",
    top: 8,
    width: "auto",
  },
  navLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "8px",
  },
});

export default Nav;
