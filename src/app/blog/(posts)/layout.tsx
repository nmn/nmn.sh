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
          <span aria-hidden={true}>{"← "}</span>
          all posts
        </Link>
      </P>
      <div>{children}</div>
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
});
