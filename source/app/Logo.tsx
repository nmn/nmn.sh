import * as stylex from "@stylexjs/stylex";
import { vars } from "./logoVars.stylex";
import { colors } from "./vars.stylex";

type Props = {
  style?: stylex.StyleXStyles;
};

export default function Logo({ style }: Props) {
  return (
    <svg {...stylex.props(styles.container, style)} viewBox="0 0 1872 419">
      <g {...stylex.props(styles.letter, styles.outerScale)}>
        <path
          {...stylex.props(styles.letter, styles.nLeft)}
          aria-label="N"
          d="M269.735 416.142L135 82.7372V83.0982L0.264679 416.503L0 416.396V334.421L135 0.361023V0L270 334.06V334.421L405 0.361023V83.0982L270.265 416.503L270 416.396V416.036L269.735 416.142Z"
        />
        <g {...stylex.props(styles.letter, styles.aLeft)}>
          <path d="M483 82.7372L617.735 416.142L618 416.036V334.06L483 0V0.361023L348 334.421V416.396L348.265 416.503L483 83.0982V82.7372Z" />
          <path d="M625.215 256.007L340 256.16L352.531 225.153L637.745 225L625.215 256.007Z" />
        </g>

        <g {...stylex.props(styles.letter, styles.aRight)}>
          <path d="M1320 82.7372L1454.74 416.142L1455 416.036V334.06L1320 0V0.361023L1185 334.421V416.396L1185.26 416.503L1320 83.0982V82.7372Z" />
          <path d="M1482.21 255.007L1197 255.16L1209.53 224.153L1494.74 224L1482.21 255.007Z" />
        </g>

        <path
          {...stylex.props(styles.letter, styles.nRight)}
          aria-label="N"
          d="M1736.74 416.142L1602 82.7372V83.0982L1467.26 416.503L1467 416.396V334.421L1602 0.361023V0L1737 334.06V334.421L1872 0.361023V83.0982L1737.26 416.503L1737 416.396V416.036L1736.74 416.142Z"
        />

        <path
          aria-label="M"
          d="M766 82.7372L900.735 416.142L901 416.036V416.396L901.265 416.503L1036 83.0982L1170.74 416.503L1171 416.396V334.421L1036 0.361023L901 334.421V334.06L766 0V0.361023L631 334.421V416.396L631.265 416.503L766 83.0982V82.7372Z"
        />
      </g>
    </svg>
  );
}

const styles = stylex.create({
  container: {
    [vars.collapsed]: {
      default: 1,
      ":hover": 0,
    },
    fill: colors.fg,
  },
  outerScale: {
    transformOrigin: "center",
    scale: `calc(0.75 + ${vars.collapsed} * 0.25)`,
    transitionProperty: "scale",
  },
  letter: {
    transitionProperty: "transform",
    transitionDuration: "0.15s",
    transitionTimingFunction: "ease-out",
  },
  nLeft: { transform: `translateX(calc(${vars.collapsed} * 33.7%))` },
  aLeft: { transform: `translateX(calc(${vars.collapsed} * 15.11%))` },
  aRight: { transform: `translateX(calc(${vars.collapsed} * -15.17%))` },
  nRight: { transform: `translateX(calc(${vars.collapsed} * -30.235%))` },
});
