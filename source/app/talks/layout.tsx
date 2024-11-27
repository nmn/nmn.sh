import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { spacing } from "../vars.stylex";
import Logo from "../Logo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Talks | Naman Goel",
  description: "Conference and other technical talks I've given.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header {...stylex.props(styles.header)}>
        <Link href="/">
          <Logo style={styles.logo} />
        </Link>
      </header>
      <main {...stylex.props(styles.main)}>{children}</main>
    </>
  );
}

const styles = stylex.create({
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: spacing.xl,
    padding: spacing.xs,
  },
  logo: {
    width: 160,
  },
  main: {
    flexGrow: 1,
    paddingInline: spacing.sm,
  },
});
