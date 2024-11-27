import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "@/app/vars.stylex";
import ThemeControl from "./ThemeControl";
import { Inter, Libre_Baskerville } from "next/font/google";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "block",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-baskerville",
  display: "block",
});

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
    fontFamily: fonts.sans,
    paddingBlock: 32,
    textAlign: "center",
  },
});
