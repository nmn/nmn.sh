import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "./vars.stylex";
import ThemeControl from "./ThemeControl";

export const metadata: Metadata = {
  title: "Naman Goel",
  description: "Personal website and blog of Naman Goel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html {...stylex.props(styles.html)} lang="en">
      <ThemeControl style={styles.body}>
        {children}
        <footer {...stylex.props(styles.footer)}>Coming Soon...</footer>
      </ThemeControl>
    </html>
  );
}

const styles = stylex.create({
  html: {
    boxSizing: {
      default: "border-box",
      ":not(#_) *": "border-box",
    },
    colorScheme: "light dark",
    margin: {
      default: 0,
      ":not(#_) *": 0,
    },
  },
  body: {
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    backgroundColor: colors.bg,
    color: colors.fg,
    fontFamily: fonts.sans,
  },
  footer: {
    fontFamily: fonts.sans,
    paddingBlock: 32,
    textAlign: "center",
  },
});
