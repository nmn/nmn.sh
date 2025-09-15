import * as stylex from "@stylexjs/stylex";
import { Link } from "next-view-transitions";
import { H1, P } from "../../mdx-components";
import { colors, fonts, spacing, text } from "../vars.stylex";

type Project = {
  name: string;
  repo: string;
  description: string;
  accent: string;
};

const projects: Project[] = [
  {
    name: "StyleX",
    repo: "https://github.com/facebook/stylex",
    description: `
    Compile-time atomic CSS-in-JS for React and other component-based frameworks. Powers web apps at Meta, Figma and Snowflake.
    `.trim(),
    accent: colors.blue,
  },
  {
    name: "stylextras",
    repo: "https://github.com/nmn/stylextras",
    description:
      "Practical utilities and patterns that extend StyleX. Provides open-tokens and support for tailwind syntax and a system for bun-like macros.",
    accent: colors.teal,
  },
  {
    name: "Solenoid",
    repo: "https://github.com/nmn/solenoid",
    description:
      `An experimental component framework that brings atomic compilation to Javascript. A server-first framwork with instant interactivity 
    that uses a small set of primitives custom elements and signals to build applications whose logical flow can be encoded into the HTML itself. 
    `.trim(),
    accent: colors.mauve,
  },
];

export default function Projects() {
  return (
    <div>
      <H1 xstyle={styles.h1}>Projects</H1>

      <ul {...stylex.props(styles.list)}>
        {projects.map((proj) => (
          <li key={proj.repo} {...stylex.props(styles.item)}>
            <div {...stylex.props(styles.itemInner)}>
              <div {...stylex.props(styles.accent(proj.accent))} />
              <div {...stylex.props(styles.content)}>
                <div {...stylex.props(styles.titleRow)}>
                  <Link
                    {...stylex.props(styles.title)}
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.name}
                  </Link>
                  <a
                    {...stylex.props(styles.repoLink)}
                    href={proj.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github ↗
                  </a>
                </div>
                <P xstyle={styles.desc}>{proj.description}</P>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = stylex.create({
  h1: {
    marginBottom: spacing.xl,
    textAlign: "center",
    textWrap: "balance",
  },
  list: {
    borderBottomColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderBottomStyle: "solid",
    borderBottomWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    listStyle: "none",
    margin: 0,
    marginInline: "auto",
    maxWidth: "min(56rem, 100%)",
    padding: 0,
    width: "100%",
  },
  item: {
    borderTopColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderTopStyle: "solid",
    borderTopWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    margin: 0,
    paddingBlock: spacing.md,
  },
  itemInner: {
    alignItems: "flex-start",
    display: "grid",
    gap: spacing.md,
    gridTemplateColumns: "8px 1fr",
  },
  accent: (bg: string) => ({
    backgroundColor: bg,
    borderRadius: 999,
    height: "calc(100% - 6px)",
    marginBlock: 3,
    width: 4,
  }),
  content: {
    minWidth: 0,
  },
  titleRow: {
    alignItems: "baseline",
    display: "flex",
    gap: spacing.sm,
    width: "100%",
  },
  title: {
    color: {
      default: colors.fg,
      ":hover": colors.accent,
      ":focus": colors.accent,
    },
    fontSize: text.h4,
    fontWeight: 800,
    lineHeight: 0.95,
    textDecoration: "none",
    textTransform: "uppercase",
  },
  repoLink: {
    color: colors.overlay1,
    fontFamily: fonts.mono,
    fontSize: text.xs,
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: "3px",
    whiteSpace: "nowrap",
  },
  desc: {
    lineHeight: 1.2,
    marginInline: 0,
    marginTop: spacing.xxs,
    maxWidth: "none",
    opacity: 0.7,
  },
});
