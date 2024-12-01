import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { spacing } from "../vars.stylex";
import Logo from "../Logo";
import { Link } from "next-view-transitions";
import Nav from "../components/Nav";

export const metadata: Metadata = {
  title: "Projects | Naman Goel",
  description: "My various projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <Link {...stylex.props(styles.logoLink)} href="/">
          <Logo style={styles.logo} />
        </Link>
        <Nav />
      </header>
      <main {...stylex.props(styles.main)}>{children}</main>
    </>
  );
}

const styles = stylex.create({
  logoLink: {
    visibility: {
      default: null,
      "@media (max-width: 600px)": "hidden",
    },
  },
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: spacing.xl,
    padding: spacing.sm,
  },
  logo: {
    width: 160,
  },
  main: {
    flexGrow: 1,
    paddingInline: spacing.sm,
  },
});
