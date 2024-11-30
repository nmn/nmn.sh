import * as stylex from "@stylexjs/stylex";
import Logo from "./Logo";
import Link from "next/link";
import { spacing } from "@/app/vars.stylex";

export default function Home() {
  return (
    <div>
      <header {...stylex.props(styles.header)}>
        <Logo style={styles.logo} collapsible />
        <nav {...stylex.props(styles.nav)}>
          <Link {...stylex.props(styles.navLink)} href="/blog">
            Blog
          </Link>
          <Link {...stylex.props(styles.navLink)} href="/talks">
            Talks
          </Link>
          <Link {...stylex.props(styles.navLink)} href="/blog">
            Projects
          </Link>
        </nav>
      </header>
      <main></main>
    </div>
  );
}

const styles = stylex.create({
  header: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 32,
    justifyContent: "center",
    minHeight: {
      default: "90vh",
      "@supports (height: 100dvh)": "90dvh",
    },
    paddingBlock: spacing.sm,
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 200,
    margin: 0,
  },
  logo: {
    maxWidth: 800,
    transform: "translateX(1.5%)",
    width: "calc(100% - 32px)",
  },
  nav: {
    display: "flex",
    gap: 48,
  },
  navLink: {
    color: "light-dark(crimson, cornflowerblue)",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textTransform: "uppercase",
    textUnderlineOffset: "8px",
    width: "3.8rem",
  },
});
