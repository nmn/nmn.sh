import type { Metadata } from "next";
import * as stylex from "@stylexjs/stylex";
import { colors, fonts, spacing } from "./vars.stylex";
import ThemeControl from "./ThemeControl";
import "./app.css";
import { ViewTransitions } from "next-view-transitions";
import BlueskyLogo from "./components/icons/bluesky";
import TwitterLogo from "./components/icons/twitter";
import MastodonLogo from "./components/icons/mastodon";

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
          {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Baskervville:ital,wght@0,400..700;1,400..700&display=block"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="MyWebSite" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <ThemeControl style={styles.body}>
          {children}
          <footer {...stylex.props(styles.footer)}>
            <div {...stylex.props(styles.footerLogos)}>
              <a
                href="https://bsky.app/profile/nmn.bsky.social"
                target="_blank"
                {...stylex.props(styles.logoLink)}
              >
                <BlueskyLogo style={styles.footerLogo} />
              </a>
              <a
                href="https://x.com/naman34"
                target="_blank"
                {...stylex.props(styles.logoLink)}
              >
                <TwitterLogo style={styles.footerLogo} />
              </a>
              <a
                href="https://indieweb.social/@nmn"
                target="_blank"
                {...stylex.props(styles.logoLink)}
              >
                <MastodonLogo style={styles.footerLogo} />
              </a>
            </div>
            <div>All Rights Reserved.</div>
          </footer>
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
    alignItems: "center",
    color: colors.surface1,
    display: "flex",
    fontFamily: fonts.sans,
    gap: spacing.lg,
    justifyContent: "center",
    marginTop: spacing.xl,
    paddingBlock: 32,
    textAlign: "center",
  },
  footerLogos: {
    alignItems: "center",
    display: "flex",
    gap: spacing.xxs,
    justifyContent: "center",
  },
  logoLink: {
    color: colors.fg,
    opacity: {
      default: 0.3,
      ":hover": 1,
      "@media not (hover: hover)": 1,
    },
    transition: "opacity 0.2s ease-in-out",
  },
  footerLogo: {
    fill: "currentColor",
    height: "1.2em",
    width: "1.2em",
  },
});
