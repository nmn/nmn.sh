import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing } from "./vars.stylex";
import ThemeControl from "./ThemeControl";
import "./app.css";
import { ViewTransitions } from "next-view-transitions";

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
    <ViewTransitions>
      <html {...stylex.props(styles.html)} lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Libre+Baskerville:ital@1&display=block"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.svg" type="image/svg" />
        </head>
        <ThemeControl style={styles.body}>
          {children}
          <footer {...stylex.props(styles.footer)}>All Rights Reserved.</footer>
        </ThemeControl>
      </html>
    </ViewTransitions>
  );
}

const styles = stylex.create({
  html: {
    boxSizing: {
      default: "border-box",
      ":where(#\\#), *": "border-box",
    },
    colorScheme: "light dark",
    margin: {
      default: 0,
      ":where(#\\#), *": 0,
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
    color: colors.surface1,
    fontFamily: fonts.sans,
    marginTop: spacing.xl,
    paddingBlock: 32,
    textAlign: "center",
  },
});
