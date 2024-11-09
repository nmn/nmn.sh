import * as stylex from "@stylexjs/stylex";

export const colors = stylex.defineVars({
  bg: "light-dark(#fff, #0a0a0a)",
  fg: "light-dark(#171717, #ededed)",
});

export const fonts = stylex.defineVars({
  sans: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "'Segoe UI'",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "'Open Sans'",
    "'Helvetica Neue'",
    "sans-serif",
  ].join(", "),
});
