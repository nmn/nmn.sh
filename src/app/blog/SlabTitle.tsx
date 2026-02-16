import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../vars.stylex";
import React from "react";

const normalWordScales: Record<string, number> = {
  "2025": 70,
  "4": 19,
  a: 21,
  apple: 90,
  atomic: 110,
  avoiding: 135,
  awesome: 146,
  "calc()": 95,
  components: 202,
  creating: 142,
  css: 58,
  "css-in-js": 145,
  considered: 181,
  convenient: 186,
  detecting: 161,
  division: 123,
  "do?": 57,
  dom: 65,
  fixing: 94,
  for: 56,
  framework: 186,
  getters: 128,
  "gulp.js": 116,
  "handlebars.js": 233,
  harmful: 136,
  hello: 89,
  how: 69,
  imperfect: 159,
  is: 26,
  it: 25,
  magic: 94,
  more: 82,
  new: 67,
  no: 41,
  object: 112,
  "object.create()": 245,
  on: 41,
  react: 84,
  referential: 188,
  replacing: 158,
  revisiting: 156,
  rust: 75,
  safari: 99,
  "sails.js": 123,
  server: 99,
  serving: 124,
  setters: 126,
  shadow: 129,
  solution: 143,
  stylex: 110,
  support: 133,
  swift: 90,
  syntax: 116,
  tailwind: 135,
  the: 56,
  "the many gotchas": 292,
  there: 92,
  "there!": 99,
  thoughts: 157,
  to: 38,
  transparency: 231,
  typescript: 175,
  understand: 191,
  use: 55,
  using: 87,
  web: 64,
  "web worker": 193,
  what: 85,
  why: 69,
  wishlist: 136,
  with: 74.5,
  you: 60,
};

const italicWordScales: Record<string, number> = {
  "&": 26,
  and: 46,
  best: 43,
  do: 29,
  either: 70,
  enum: 60,
  eval: 54,
  for: 34,
  in: 21,
  is: 17,
  "isn’t": 46,
  "marketshare?": 154,
  need: 44,
  or: 26,
  rscs: 59,
  well: 50,
  with: 48,
};

export function Container({
  path,
  children,
  href,
  style,
}: Readonly<{
  path: string;
  children: React.ReactNode;
  href?: string;
  style?: stylex.StyleXStyles;
}>) {
  const safePath = path.split("/").pop();
  const wordCounts: { [key: string]: number } = {};

  const words: string[] = [];

  const childrenWithNames = React.Children.map(children, (child, i) => {
    const isLast = i === React.Children.count(children) - 1;
    if (
      child != null &&
      typeof child === "object" &&
      "type" in child &&
      child.type === Word
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let word = (child as any).props.children;
      const origWord = word;
      if (typeof word !== "string") {
        return child;
      }
      words.push(word);
      word = word.toLocaleLowerCase().replace(/[^a-z0-9\s-_]/g, "");
      const count = wordCounts[word] ?? 0;
      wordCounts[word] = (wordCounts[word] ?? 0) + 1;

      return React.cloneElement(child, {
        key: child.key ?? i,
        // @ts-expect-error: TypeScript does not recognize the xstyle property
        xstyle: styles.viewTransitionName(
          "_" + safePath + "________" + word + (count > 0 ? "___" + count : ""),
        ),
        "aria-hidden": true,
        children: isLast ? origWord : origWord + " ",
      });
    }
    if (
      child != null &&
      typeof child === "object" &&
      "type" in child &&
      child.type === "br"
    ) {
      return <div key={"br-" + i} {...stylex.props(styles.br)} />;
    }
    return child;
  });

  const el = (
    <h1
      {...stylex.props(
        styles.container,
        href != null && styles.containerInLink,
        style,
      )}
      aria-label={words.join(" ")}
    >
      <span aria-hidden={true} style={{ display: "contents" }}>
        {childrenWithNames}
      </span>
    </h1>
  );
  if (href != null) {
    return (
      <a {...stylex.props(styles.link)} href={href}>
        {el}
      </a>
    );
  }
  return el;
}
export function Word({
  children,
  scale,
  italic,
  offset = 0,
  xstyle,
}: Readonly<{
  children: string;
  scale?: number;
  italic?: boolean;
  offset?: number;
  xstyle?: stylex.StyleXStyles;
}>) {
  const normalizedWord = children.toLowerCase().trim();
  const resolvedScale =
    scale ??
    (italic
      ? italicWordScales[normalizedWord]
      : normalWordScales[normalizedWord]) ??
    100;
  const height = 22;
  return (
    <span
      {...stylex.props(styles.word(resolvedScale), xstyle)}
      data-italic={italic}
    >
      <span {...stylex.props(styles.wordInnerDiv)}>
        <svg
          {...stylex.props(styles.svg, italic && styles.italicSvg)}
          viewBox={`0 0 ${resolvedScale} ${height}`}
        >
          <text
            {...stylex.props(styles.text, italic && styles.italic)}
            x={offset}
            y={21}
          >
            {children}
          </text>
        </svg>
      </span>
    </span>
  );
}

const styles = stylex.create({
  link: {
    display: "block",
    marginBottom: spacing.xxxxl,
    marginInline: "auto",
    maxWidth: "54rem",
    outline: "none",
    width: "100%",
  },
  viewTransitionName: (name: string) => ({
    // eslint-disable-next-line @stylexjs/valid-styles
    viewTransitionName: name,
  }),
  container: {
    alignItems: "center",
    columnGap: spacing.xs,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: spacing.xxxxl,
    marginInline: "auto",
    maxWidth: "54rem",
    rowGap: 8,
    width: "100%",
  },
  containerInLink: {
    marginBottom: 0,
  },
  word: (scale: number) => ({
    color: {
      default: colors.fg,
      ":nth-child(3n + 2 of :not([data-italic]))": colors.surface2,
      ":nth-child(3n + 3 of :not([data-italic]))": colors.text,
      ":is([data-italic])": colors.maroon,
      ":nth-child(3n + 2 of [data-italic])": colors.lavender,
      ":nth-child(3n + 3 of [data-italic])": colors.green,
      ":nth-child(3n + 4 of [data-italic])": colors.pink,
    },
    flexBasis: 0,
    flexGrow: scale,
    margin: 0,
    minHeight: 32,
    minWidth: `calc(${scale + "px"} + ${scale} * 0.1vw)`,
    padding: 0,
  }),
  wordInnerDiv: {
    alignItems: "flex-start",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  svg: {
    aspectRatio: "inherit",
    width: "100%",
  },
  italicSvg: {
    // marginInline: -5,
    // marginTop: "-16%",
  },
  text: {
    fill: "currentColor",
    fontFamily: "var(--font-inter)",
    fontSize: 28,
    fontWeight: 800,
    lineHeight: 1,
    textTransform: "uppercase",
  },
  italic: {
    // color: {
    //   default: colors.maroon,
    //   ":nth-child(3n + 1 of [data-italic])": colors.blue,
    //   ":nth-child(3n + 2 of [data-italic])": colors.flamingo,
    //   ":nth-child(3n + 3 of [data-italic])": colors.yellow,
    // },
    color: "currentColor",
    fontFamily: "var(--font-baskerville)",
    letterSpacing: "-0.05em",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "lighter",
    textTransform: null,
  },
  br: {
    width: "100%",
    flexShrink: 0,
  },
});
