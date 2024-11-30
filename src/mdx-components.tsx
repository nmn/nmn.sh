import type { MDXComponents } from "mdx/types";
import * as stylex from "@stylexjs/stylex";
import { colors, text, fonts, spacing } from "./app/vars.stylex";

import { Code } from "bright";
import React from "react";

// any props that an `h1` dom element might take
type WithStyles<E extends Element> = React.HTMLAttributes<E> & {
  xstyle?: stylex.StyleXStyles;
};

function transformChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string") {
      // replace every `"` with `“` and `”`
      return child
        .replaceAll(/^"/g, " “")
        .replaceAll(/ "/g, " “")
        .replaceAll(/"/g, "”")
        .replaceAll(/ '/g, "‘")
        .replaceAll(/'/g, "’");
    }
    return child;
  });
}

export function H1({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLHeadingElement>) {
  return <h1 {...stylex.props(styles.text, styles.h1, xstyle)} {...props} />;
}

export function H2({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLHeadingElement>) {
  return <h2 {...stylex.props(styles.text, styles.h2, xstyle)} {...props} />;
}

export function H3({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLHeadingElement>) {
  return <h3 {...stylex.props(styles.text, styles.h3, xstyle)} {...props} />;
}

export function H4({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLHeadingElement>) {
  return <h4 {...stylex.props(styles.text, styles.h4, xstyle)} {...props} />;
}

export function H5({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLHeadingElement>) {
  return <h5 {...stylex.props(styles.text, styles.h5, xstyle)} {...props} />;
}

export function H6({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLHeadingElement>) {
  return <h6 {...stylex.props(styles.text, styles.h6, xstyle)} {...props} />;
}

export function P({
  xstyle,
  className: _cn,
  style: _style,
  children,
  ...props
}: WithStyles<HTMLParagraphElement>) {
  return (
    <p {...stylex.props(styles.text, styles.p, xstyle)} {...props}>
      {transformChildren(children)}
    </p>
  );
}

function Pre({
  xstyle,
  className,
  style: _style,
  ...props
}: WithStyles<HTMLPreElement>) {
  const lang = className?.split("language-")[1] ?? "ts";
  return (
    <div {...stylex.props(styles.text, styles.pre, xstyle)}>
      <Code lang={lang} {...stylex.props(styles.code)} {...props} />
    </div>
  );
}

export function Ul({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLUListElement>) {
  return <ul {...stylex.props(styles.text, styles.p, xstyle)} {...props} />;
}

export function Ol({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLUListElement>) {
  return <ol {...stylex.props(styles.text, styles.p, xstyle)} {...props} />;
}

export function Li({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLLIElement>) {
  return <li {...stylex.props(styles.li, xstyle)} {...props} />;
}

export function A({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLAnchorElement>) {
  return <a {...stylex.props(styles.text, styles.a, xstyle)} {...props} />;
}

export function Strong({
  xstyle,
  className: _cn,
  style: _style,
  children,
  ...props
}: WithStyles<HTMLElement>) {
  return (
    <strong {...stylex.props(styles.strong, xstyle)} {...props}>
      {transformChildren(children)}
    </strong>
  );
}

export function Em({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLElement>) {
  return <em {...stylex.props(styles.em, xstyle)} {...props} />;
}

export function InlineCode({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLElement>) {
  return <code {...stylex.props(styles.inlineCode, xstyle)} {...props} />;
}

export function Img({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLImageElement>) {
  return <img {...stylex.props(styles.img, xstyle)} {...props} />;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: P,
    pre: Pre,
    code: InlineCode,
    ul: Ul,
    ol: Ol,
    li: Li,
    a: A,
    strong: Strong,
    em: Em,
    img: Img,
  };
}

// lineHeightBreakpoints
// font-size around 20

const styles = stylex.create({
  text: {
    marginBlock: 0,
    marginInline: "auto",
    maxWidth: "54rem",
  },
  h1: {
    fontSize: text.h1,
    fontWeight: 100,
    lineHeight: 0.9,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  h2: {
    color: colors.mauve,
    fontSize: text.h2,
    fontWeight: 700,
    lineHeight: 1,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  h3: {
    color: colors.red,
    fontSize: text.h3,
    fontWeight: 500,
    lineHeight: 1.2,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  h4: {
    fontSize: text.h4,
    fontWeight: 600,
    lineHeight: 1.4,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  h5: {
    fontSize: text.h5,
    fontWeight: 700,
    lineHeight: 1.5,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  h6: {
    fontSize: text.p,
    fontWeight: 800,
    lineHeight: 1.6,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  p: {
    color: colors.fg,
    fontSize: text.p,
    fontWeight: 400,
    lineHeight: 1.4,
    marginTop: "1em",
  },
  li: {
    "::marker": {
      color: colors.maroon,
    },
  },
  pre: {
    borderRadius: spacing.xxs,
    maxWidth: "calc(54rem + 36px)",
    overflow: "hidden",
  },
  code: {
    borderColor: `color-mix(in oklch, ${colors.green}, transparent 75%)`,
    borderStyle: "solid",
    borderWidth: {
      default: 1,
      // retina displays
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    fontFamily: fonts.sans,
    fontSize: text.p,
  },
  inlineCode: {
    backgroundColor: `color-mix(in oklch, ${colors.green}, rgba(0,0,0,0) 95%)`,
    borderColor: `color-mix(in oklch, ${colors.green}, rgba(0,0,0,0) 85%)`,
    borderRadius: spacing.xxxs,
    borderStyle: "solid",
    borderWidth: 1,
    color: colors.green,
    fontFamily: fonts.mono,
    paddingBlock: `calc(${spacing.xxxs} / 2)`,
    paddingInline: spacing.xxxs,
  },
  a: {
    color: colors.blue,
    textDecorationColor: {
      default: colors.overlay0,
      ":focus": colors.blue,
      ":hover": colors.blue,
    },
    textDecorationSkipInk: "all",
    textDecorationThickness: "2px",
    textUnderlineOffset: "3px",
  },
  strong: { color: colors.teal },
  em: { color: colors.peach },
  img: {
    display: "block",
    marginInline: "auto",
    maxWidth: "100%",
  },
});
