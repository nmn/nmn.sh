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

function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-_]/g, "") // remove special characters
    .trim()
    .replace(/\s+/g, "-"); // replace spaces with hyphens
}

function getSlug(children: React.ReactNode): string {
  return normalizeSlug(
    React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") {
          return child;
        }
        return "";
      })
      .join("")
  );
}

export function Heading({
  level,
  xstyle,
  className: _cn,
  style: _style,
  children,
  ...props
}: WithStyles<HTMLHeadingElement> & { level: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const Component = `h${level}`;
  const slug = getSlug(children);
  return (
    <a {...stylex.props(styles.headingLink)} id={slug} href={`#${slug}`}>
      <Component
        {...stylex.props(styles.text, styles.heading, xstyle)}
        {...props}
      >
        <span {...stylex.props(styles.headingHash)}>#</span>
        {transformChildren(children)}
      </Component>
    </a>
  );
}

export function H1({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return (
    <h1
      {...stylex.props([styles.text, styles.heading, styles.h1, xstyle])}
      {...props}
    />
  );
}

export function H2({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return (
    <h2
      {...stylex.props([styles.text, styles.heading, styles.h2, xstyle])}
      {...props}
    />
  );
}

export function H3({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return (
    <h3
      {...stylex.props([styles.text, styles.heading, styles.h3, xstyle])}
      {...props}
    />
  );
}

export function H4({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return (
    <h4
      {...stylex.props([styles.text, styles.heading, styles.h4, xstyle])}
      {...props}
    />
  );
}

export function H5({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return (
    <h5
      {...stylex.props([styles.text, styles.heading, styles.h5, xstyle])}
      {...props}
    />
  );
}

export function H6({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return (
    <h6
      {...stylex.props([styles.text, styles.heading, styles.h6, xstyle])}
      {...props}
    />
  );
}

function H1_Inner({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return <Heading level={1} xstyle={[styles.h1, xstyle]} {...props} />;
}

function H2_Inner({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return <Heading level={2} xstyle={[styles.h2, xstyle]} {...props} />;
}

function H3_Inner({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return <Heading level={3} xstyle={[styles.h3, xstyle]} {...props} />;
}

function H4_Inner({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return <Heading level={4} xstyle={[styles.h4, xstyle]} {...props} />;
}

function H5_Inner({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return <Heading level={5} xstyle={[styles.h5, xstyle]} {...props} />;
}

function H6_Inner({ xstyle, ...props }: WithStyles<HTMLHeadingElement>) {
  return <Heading level={6} xstyle={[styles.h6, xstyle]} {...props} />;
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

export function Blockquote({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLElement>) {
  return (
    <blockquote
      {...stylex.props(styles.text, styles.blockquote, xstyle)}
      {...props}
    />
  );
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
    h1: H1_Inner,
    h2: H2_Inner,
    h3: H3_Inner,
    h4: H4_Inner,
    h5: H5_Inner,
    h6: H6_Inner,
    p: P,
    pre: Pre,
    code: InlineCode,
    ul: Ul,
    ol: Ol,
    li: Li,
    blockquote: Blockquote,
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
    position: "relative",
  },
  headingLink: {
    textDecoration: "none",
  },
  headingHash: {
    position: "absolute",
    display: {
      default: null,
      "@media (max-width: 58rem)": "none",
    },
    left: "-0.25em",
    transform: "translateX(-100%)",
    color: colors.overlay1,
    textDecoration: "none",
    opacity: {
      default: 0,
      ":where(:hover > *)": 1,
    },
    transitionProperty: "opacity",
    transitionDuration: "0.2s",
  },
  heading: {
    marginTop: "1em",
  },
  h1: {
    fontSize: text.h1,
    fontWeight: 100,
    lineHeight: 0.9,
  },
  h2: {
    color: colors.mauve,
    fontSize: text.h2,
    fontWeight: 700,
    lineHeight: 1,
  },
  h3: {
    color: colors.red,
    fontSize: text.h3,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  h4: {
    color: colors.teal,
    fontSize: text.h4,
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: text.h5,
    fontWeight: 700,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: text.p,
    fontWeight: 800,
    lineHeight: 1.6,
  },
  p: {
    fontSize: text.p,
    fontWeight: 400,
    lineHeight: 1.4,
    marginTop: {
      default: "1em",
      ":first-child": 0,
    },
  },
  li: {
    "::marker": {
      color: colors.maroon,
    },
  },
  blockquote: {
    position: "relative",
    backgroundColor: `color-mix(in oklch, ${colors.crust}, transparent 50%)`,
    paddingInline: spacing.md,
    paddingBlock: spacing.xs,
    color: colors.overlay2,
    borderLeftWidth: 2,
    borderLeftStyle: "solid",
    borderLeftColor: `color-mix(in oklch, ${colors.peach}, transparent 75%)`,
    borderTopRightRadius: spacing.xxxs,
    borderBottomRightRadius: spacing.xxxs,
    marginTop: "1em",
    "::before": {
      content: '"“"',
      color: colors.overlay2,
      position: "absolute",
      fontSize: text.h1,
      top: "-0.2em",
      left: "0.1em",
      zIndex: -1,
      opacity: 0.25,
    },
  },
  pre: {
    borderRadius: spacing.xxs,
    maxWidth: "calc(54rem + 36px)",
    overflow: "hidden",
    fontSize: text.p,
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
