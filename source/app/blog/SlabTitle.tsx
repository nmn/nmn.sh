import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../vars.stylex";

export function Container({
  children,
  style,
}: Readonly<{
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}>) {
  return <h1 {...stylex.props(styles.constainer, style)}>{children}</h1>;
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
  const height = italic ? 21 + 10 : 21;
  return (
    <div {...stylex.props(styles.word(scale))}>
      <div {...stylex.props(styles.wordInnerDiv)}>
        <svg
          {...stylex.props(styles.svg, italic && styles.italicSvg)}
          viewBox={`0 0 ${scale} ${height}`}
        >
          <text
            {...stylex.props(styles.text, italic && styles.italic)}
            x={offset}
            y={italic ? 30 : 20}
          >
            {children}
          </text>
        </svg>
      </div>
    </div>
  );
}

const styles = stylex.create({
  constainer: {
    alignItems: "center",
    columnGap: spacing.xs,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginInline: "auto",
    maxWidth: "62rem",
    rowGap: 8,
    width: "100%",
  },
  word: (scale: number) => ({
    flexBasis: 0,
    flexGrow: scale,
    margin: 0,
    minHeight: 32,
    minWidth: `calc(${scale + "px"} + ${scale} * 0.1vw)`,
    padding: 0,
    textTransform: "uppercase",
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
    marginTop: "-16%",
  },
  text: {
    fill: "currentColor",
    fontFamily: "var(--font-inter)",
    fontSize: 28,
    letterSpacing: "-0.05em",
    lineHeight: 1,
  },
  italic: {
    color: colors.accent,
    fontFamily:
      "Baskerville, 'Baskerville Old Face', 'Palatino Linotype', serif",
    fontSize: 33,
    fontStyle: "italic",
    fontWeight: "lighter",
    textTransform: "initial",
  },
});
