import type { MDXComponents } from "mdx/types";
import * as stylex from "@stylexjs/stylex";
import { colors, text, fonts, spacing } from "./app/vars.stylex";

import { Code } from "bright";

// any props that an `h1` dom element might take
type WithStyles<E extends Element> = React.HTMLAttributes<E> & {
  xstyle?: stylex.StyleXStyles;
};

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
  ...props
}: WithStyles<HTMLParagraphElement>) {
  return <p {...stylex.props(styles.text, styles.p, xstyle)} {...props} />;
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
    ul: Ul,
  };
}

// lineHeightBreakpoints
// font-size around 20

const styles = stylex.create({
  text: {
    marginBlock: 0,
    marginInline: "auto",
    maxWidth: "62rem",
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
    fontSize: text.h2,
    fontWeight: 300,
    lineHeight: 1,
    marginTop: {
      default: "0.25em",
      ":first-child": 0,
    },
  },
  h3: {
    fontSize: text.h3,
    fontWeight: 400,
    lineHeight: 1.2,
    marginTop: {
      default: "0.25em",
      ":first-child": 0,
    },
  },
  h4: {
    fontSize: text.h4,
    fontWeight: 600,
    lineHeight: 1.4,
    marginTop: {
      default: "0.25em",
      ":first-child": 0,
    },
  },
  h5: {
    fontSize: text.h5,
    fontWeight: 700,
    lineHeight: 1.5,
    marginTop: {
      default: "0.25em",
      ":first-child": 0,
    },
  },
  h6: {
    fontSize: text.p,
    fontWeight: 800,
    lineHeight: 1.6,
    marginTop: {
      default: "0.5em",
      ":first-child": 0,
    },
  },
  p: {
    color: colors.fg,
    fontSize: text.p,
    fontWeight: 400,
    lineHeight: 1.6,
    marginTop: "1em",
  },
  pre: {
    // padding: 16,
    // marginBlock: spacing.sm,

    borderRadius: spacing.xxs,
    maxWidth: "calc(62rem + 36px)",
    overflow: "hidden",
    // color: "lime",
  },
  code: {
    borderColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
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
});
