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
}: Readonly<{
  children: string;
  scale: number;
  italic?: boolean;
}>) {
  const height = 23.5;
  return (
    <div {...stylex.props(styles.word(scale))}>
      <div {...stylex.props(styles.wordInnerDiv)}>
        <svg {...stylex.props(styles.svg)} viewBox={`0 0 ${scale} ${height}`}>
          <text
            {...stylex.props(styles.text, italic && styles.italic)}
            x="-1"
            y="22.5"
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
    alignItems: "stretch",
    columnGap: spacing.sm,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginInline: "auto",
    maxWidth: "62rem",
    rowGap: spacing.xxs,
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
    position: "relative",
  },
  svg: {
    aspectRatio: "inherit",
    width: "100%",
  },
  text: {
    fill: "currentColor",
    fontFamily: "Impact",
    fontSize: 28,
  },
  italic: {
    color: colors.accent,
    fontFamily:
      "Baskerville, 'Baskerville Old Face', 'Palatino Linotype', serif",
    fontSize: 33,
    fontStyle: "italic",
    fontWeight: "lighter",
  },
});
