import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../vars.stylex";

export function Container({
  children,
  style,
}: Readonly<{
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}>) {
  return <h1 {...stylex.props(styles.container, style)}>{children}</h1>;
}
export function Word({
  children,
  scale,
  italic,
  offset = 0,
}: Readonly<{
  children: string;
  scale: number;
  italic?: boolean;
  offset: number;
}>) {
  const height = 22;
  const adjustedScale = scale;
  return (
    <div {...stylex.props(styles.word(adjustedScale))} data-italic={italic}>
      <div {...stylex.props(styles.wordInnerDiv)}>
        <svg
          {...stylex.props(styles.svg, italic && styles.italicSvg)}
          viewBox={`0 0 ${adjustedScale} ${height}`}
        >
          <text
            {...stylex.props(styles.text, italic && styles.italic)}
            x={offset}
            y={21}
          >
            {children}
          </text>
        </svg>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    alignItems: "center",
    columnGap: spacing.xs,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: spacing.lg,
    marginInline: "auto",
    maxWidth: "54rem",
    rowGap: 8,
    width: "100%",
  },
  word: (scale: number) => ({
    color: {
      default: colors.fg,
      ":nth-child(2n of :not([data-italic]))": colors.secondary,
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
    fontWeight: 800,
    fontSize: 28,
    letterSpacing: "-0.05em",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  italic: {
    color: colors.accent,
    fontFamily:
      "Baskerville, 'Baskerville Old Face', 'Palatino Linotype', serif",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "lighter",
    textTransform: null,
  },
});
