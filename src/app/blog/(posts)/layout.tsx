import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import { P } from "../../../mdx-components";
import { spacing } from "../../vars.stylex";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <P xstyle={styles.p}>
        <Link {...stylex.props(styles.backLink)} href="/blog">
          {"← "}all posts
        </Link>
      </P>
      <div {...stylex.props(styles.container)}>{children}</div>
    </>
  );
}

const styles = stylex.create({
  backLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationThickness: {
      default: "1px",
      "@media (min-resolution: 2dppx)": "0.5px",
      "@media (min-resolution: 3dppx)": "0.33px",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "6px",
  },
  p: {
    marginBottom: spacing.xxs,
    marginTop: spacing.xxxl,
  },
  container: {
    viewTransitionName: {
      // eslint-disable-next-line @stylexjs/valid-styles
      default: null,
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(1))": "article-block-1",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(2))": "article-block-2",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(3))": "article-block-3",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(4))": "article-block-4",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(5))": "article-block-5",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(6))": "article-block-6",
      // eslint-disable-next-line @stylexjs/valid-styles
      ":where(:not(#_)) > :where(:nth-child(7))": "article-block-7",
    },
  },
});
