import * as stylex from "@stylexjs/stylex";

export const bskyPost = stylex.defineVars({
  // Container
  containerMargin: "0",

  // Header
  headerFontSize: "0.9375rem",
  headerLineHeight: "1.25rem",

  // Text
  bodyFontSize: "1.25rem",
  bodyFontWeight: "400",
  bodyLineHeight: "1.5rem",
  bodyMargin: "0",

  // Quoted Post
  quotedContainerMargin: "0.75rem 0",
  quotedBodyFontSize: "0.938rem",
  quotedBodyFontWeight: "400",
  quotedBodyLineHeight: "1.25rem",
  quotedBodyMarginTop: "0.25rem",
  quotedBodyMarginBottom: "0.75rem",

  // Info
  infoFontSize: "0.9375rem",
  infoLineHeight: "1.25rem",

  // Actions
  actionsFontSize: "0.875rem",
  actionsLineHeight: "1rem",
  actionsFontWeight: "700",
  actionsIconSize: "1.25em",
  actionsIconWrapperSize: "2em",

  // Replies
  repliesFontSize: "0.875rem",
  repliesLineHeight: "1rem",
  repliesFontWeight: "700",

  // Theme colors and styles
  skeletonBg: "light-dark(rgb(212,212,216), rgb(63,63,70))",
  borderColor: "light-dark(rgb(212,219,226), rgb(46,64,82))",
  errorBorderColor: "light-dark(rgb(239,68,68), rgb(252,165,165))",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  fontColor: "light-dark(rgb(15,20,25), rgb(247,249,249))",
  errorFontColor: "light-dark(rgb(239,68,68), rgb(252,165,165))",
  fontColorSecondary: "light-dark(rgb(116,127,158), rgb(124,137,151))",
  bgColor: "light-dark(#fff, rgb(22,30,39))",
  bgColorHover: "light-dark(rgba(241,243,245,0.5), rgba(30,41,54,0.5))",
  errorBgColor: "light-dark(rgb(254,242,242), rgb(69,10,10))",
  colorBluePrimary: "rgb(10,122,255)",
  colorBluePrimaryHover: "rgb(26,140,216)",
  linkFontColor: "light-dark(rgb(59,130,246), rgb(147,197,253))",
});
