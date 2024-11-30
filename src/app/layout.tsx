import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing } from "./vars.stylex";
import ThemeControl from "./ThemeControl";
import "./app.css";
import Head from "next/head";
// import { Inter, Libre_Baskerville } from "next/font/google";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const _inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "block",
// });

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const _baskerville = Libre_Baskerville({
//   weight: ["400", "700"],
//   subsets: ["latin"],
//   variable: "--font-baskerville",
//   display: "block",
// });

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* eslint-disable-next-line @next/next/google-font-display */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Libre+Baskerville:ital@1&display=block"
          rel="stylesheet"
        />
      </head>
      <ThemeControl style={styles.body}>
        {children}
        <footer {...stylex.props(styles.footer)}>All Rights Reserved.</footer>
      </ThemeControl>
    </html>
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
