import * as stylex from "@stylexjs/stylex";
import Logo from "./Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header {...stylex.props(styles.header)}>
        <Logo style={styles.logo} />
        <nav {...stylex.props(styles.nav)}>
          <Link {...stylex.props(styles.navLink)} href="/blog">
            Blog
          </Link>
          <Link {...stylex.props(styles.navLink)} href="/blog">
            Talks
          </Link>
          <Link {...stylex.props(styles.navLink)} href="/blog">
            Projects
          </Link>
        </nav>
      </header>
      <main></main>
      <footer {...stylex.props(styles.footer)}>Coming Soon...</footer>
    </div>
  );
}

const styles = stylex.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBlock: 48,
    minHeight: {
      default: "90vh",
      "@supports (height: 100dvh)": "90dvh",
    },
    gap: 32,
  },
  h3: {
    fontSize: "2rem",
    fontWeight: 200,
    margin: 0,
  },
  logo: {
    width: "calc(100% - 32px)",
    maxWidth: 800,
    transform: "translateX(1.5%)",
  },
  nav: {
    display: "flex",
    gap: 48,
  },
  navLink: {
    textTransform: "uppercase",
    width: "3.8rem",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: 8,
    color: "light-dark(crimson, cornflowerblue)",
  },
  footer: {
    textAlign: "center",
    paddingBlock: 32,
  },
});
