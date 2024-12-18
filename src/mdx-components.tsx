import type { MDXComponents } from "mdx/types";
import * as stylex from "@stylexjs/stylex";
import { colors, text, fonts, spacing, stateVars } from "./app/vars.stylex";
import NextImage from "next/image";

import { Code } from "bright";
import React from "react";
import { Link } from "next-view-transitions";

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
        .replaceAll(/ '/g, " ‘")
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
  children,
  ...props
}: WithStyles<HTMLLIElement>) {
  return (
    <li {...stylex.props(styles.li, xstyle)} {...props}>
      {transformChildren(children)}
    </li>
  );
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
}: WithStyles<HTMLAnchorElement> & { href: string }) {
  if (props.href?.startsWith("/")) {
    return <Link {...stylex.props(styles.a, xstyle)} {...props} />;
  }
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

export function IFrame({
  xstyle,
  height,
  width,
  aspectRatio = height != null && width != null ? width / height : 16 / 9,
  ...props
}: WithStyles<HTMLIFrameElement> & {
  aspectRatio?: number;
  height?: number;
  width?: number;
}) {
  return (
    <iframe
      {...stylex.props(styles.iframe(aspectRatio), xstyle)}
      height={height}
      width={width}
      {...props}
    />
  );
}

export function Image({
  src,
  alt,
  width,
  height,
  xstyle,
}: Readonly<{
  src: string;
  alt: string;
  width: number;
  height: number;
  xstyle?: stylex.StyleXStyles;
}>) {
  return (
    <NextImage
      {...stylex.props(styles.img, xstyle)}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

export function Img({
  xstyle,
  className: _cn,
  style: _style,
  ...props
}: WithStyles<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...stylex.props(styles.img, xstyle)} {...props} />;
}

export function Details({
  xstyle,
  className,
  style: _style,
  children,
  ...props
}: WithStyles<HTMLDetailsElement>) {
  const classList = className?.split(" ") ?? [];

  let type: keyof typeof detailsTypeStyles = "info";
  if (classList.includes("warning")) {
    type = "warning";
  }
  if (classList.includes("error")) {
    type = "error";
  }
  if (classList.includes("tip")) {
    type = "tip";
  }

  const [summary, ...rest] = React.Children.toArray(children);

  return (
    <details
      {...stylex.props(
        styles.text,
        styles.details,
        detailsTypeStyles[type],
        xstyle
      )}
      {...props}
    >
      {React.cloneElement(
        summary as React.ReactElement,
        stylex.props(styles.summary)
      )}
      <div>{rest}</div>
    </details>
  );
}

const detailsTypeStyles = stylex.create({
  info: {
    backgroundColor: colors.base,
    // color: colors.overlay0,
  },
  warning: {
    backgroundColor: colors.yellow,
    // color: colors.overlay0,
  },
  error: {
    backgroundColor: colors.red,
    // color: colors.overlay0,
  },
  tip: {
    backgroundColor: colors.green,
    // color: colors.overlay0,
  },
});

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    a: A as any,
    strong: Strong,
    em: Em,
    img: Img,
    details: Details,
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
  details: {
    borderRadius: spacing.xxxs,
    display: "grid",
    gap: {
      default: 0,
      ":is([open])": spacing.sm,
    },
    // gridTemplateRows: {
    //   default: "auto 0",
    //   ":is([open])": "auto 1fr",
    // },
    [stateVars.open]: {
      default: "0",
      ":is([open])": "1",
    },
    // Look up "Space Hack"
    [stateVars.isOpen]: {
      // NOTE: intentially setting the value as a " " space character.
      // This is not supported by styleX, but by using a ` ;` we can work around this.
      default: " ;",
      ":is([open])": "initial",
    },
    [stateVars.isClosed]: {
      default: "initial",
      // NOTE: intentially setting the value as a " " space character.
      // This is not supported by styleX, but by using a ` ;` we can work around this.
      ":is([open])": " ;",
    },
    marginTop: spacing.sm,
    maxWidth: "min(56rem, 100%)",
    padding: "1rem",
    // transitionDuration: "2s",
    // transitionProperty: "grid-template-rows",
  },
  summary: {
    fontSize: text.sm,
    fontVariant: "small-caps",
    lineHeight: "1cap",
    listStyle: "none",
    position: "relative",
    textIndent: "1em",
    // eslint-disable-next-line @stylexjs/valid-styles
    "::-webkit-details-marker": {
      display: "none",
    },
    "::marker": {
      display: "none",
    },
    "::before": {
      borderColor: "transparent",
      borderInlineStartColor: colors.teal,
      borderStyle: "solid",
      borderWidth: ".4rem",
      content: "",
      insetInlineStart: "1.25rem",
      left: 0,
      position: "absolute",
      top: 0,
      transform: `rotate(calc(${stateVars.open} * 90deg))`,
      transformOrigin: "0.2rem 50%",
      transitionDuration: "0.2s",
      transitionProperty: "transform",
      transitionTimingFunction: "ease-in-out",
    },
  },
  detailsContent: {
    minHeight: 0,
  },
  iframe: (aspectRatio: number) => ({
    aspectRatio,
    borderRadius: spacing.xs,
    display: "block",
    height: "auto",
    marginBlock: spacing.lg,
    marginInline: "auto",
    maxWidth: "min(56rem, 100%)",
    width: "100%",
  }),
  headingLink: {
    textDecoration: "none",
  },
  headingHash: {
    color: colors.overlay1,
    display: {
      default: null,
      "@media (max-width: 58rem)": "none",
    },
    left: "-0.25em",
    opacity: {
      default: 0,
      ":where(:hover > *)": 1,
    },
    position: "absolute",
    textDecoration: "none",
    transform: "translateX(-100%)",
    transitionDuration: "0.2s",
    transitionProperty: "opacity",
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
    backgroundColor: `color-mix(in oklch, ${colors.crust}, transparent 50%)`,
    borderBottomRightRadius: spacing.xxxs,
    borderLeftColor: `color-mix(in oklch, ${colors.peach}, transparent 75%)`,
    borderLeftStyle: "solid",
    borderLeftWidth: 2,
    borderTopRightRadius: spacing.xxxs,
    color: colors.overlay2,
    marginTop: "1em",
    paddingBlock: spacing.xs,
    paddingInline: spacing.md,
    position: "relative",
    "::before": {
      color: colors.overlay2,
      content: '"“"',
      fontSize: text.h1,
      left: "0.1em",
      opacity: 0.25,
      position: "absolute",
      top: "-0.2em",
      zIndex: -1,
    },
  },
  pre: {
    borderRadius: spacing.xxs,
    fontSize: text.p,
    marginBottom: "-1em",
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
      ":hover": colors.blue,
      ":focus": colors.blue,
    },
    textDecorationSkipInk: "all",
    textDecorationThickness: "2px",
    textUnderlineOffset: "3px",
  },
  strong: { color: colors.teal },
  em: { color: colors.peach },
  img: {
    display: "block",
    height: "auto",
    marginBlock: spacing.lg,
    marginInline: "auto",
    maxWidth: "min(calc(54rem + 8rem), 100%)",
  },
});
