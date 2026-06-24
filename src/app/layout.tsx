import type { Metadata } from "next";
import Link from "next/link";
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
          <PreloadedFont href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Libre+Baskerville:ital@1&display=block" />
          <PreloadedFont href="https://fonts.googleapis.com/css2?family=Baskervville:ital,wght@0,400..700;1,400..700&display=block" />
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
            <div {...stylex.props(styles.footerMeta)}>
              <span>All Rights Reserved.</span>
              <Link
                href="/links"
                prefetch={false}
                {...stylex.props(styles.footerLink)}
              >
                Links
              </Link>
            </div>
          </footer>
        </ThemeControl>
      </html>
    </ViewTransitions>
  );
}

function PreloadedFont({ href }: { href: string }) {
  return (
    <>
      <link rel="preload" as="style" href={href} />
      <link rel="stylesheet" href={href} />
    </>
  );
}

const styles = stylex.create({
  html: {
    margin: {
      default: 0,
      ":where(#\\#), *": 0,
    },
    boxSizing: {
      default: "border-box",
      ":where(#\\#), *": "border-box",
    },
    colorScheme: "light dark",
  },
  body: {
    MozOsxFontSmoothing: "grayscale",
    WebkitFontSmoothing: "antialiased",
    backgroundColor: colors.bg,
    color: colors.fg,
    fontFamily: fonts.sans,
  },
  footer: {
    gap: spacing.lg,
    paddingBlock: 32,
    alignItems: "center",
    color: colors.surface1,
    display: "flex",
    flexWrap: "wrap",
    fontFamily: fonts.sans,
    justifyContent: "center",
    textAlign: "center",
    marginTop: spacing.xl,
  },
  footerMeta: {
    gap: spacing.xxs,
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footerLink: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    color: "inherit",
    textUnderlineOffset: "4px",
  },
  footerLogos: {
    gap: spacing.xxs,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  logoLink: {
    transition: "opacity 0.2s ease-in-out",
    color: colors.fg,
    opacity: {
      default: 0.3,
      ":hover": 1,
      "@media not (hover: hover)": 1,
    },
  },
  footerLogo: {
    fill: "currentColor",
    height: "1.2em",
    width: "1.2em",
  },
});
