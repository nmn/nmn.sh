"use client";

import * as stylex from "@stylexjs/stylex";
import { colors, fonts } from "./vars.stylex";
import { useState } from "react";

export default function ThemeControl({
  children,
  style,
}: Readonly<{
  children: React.ReactNode;
  style?: stylex.StyleXStyles;
}>) {
  const [theme, setTheme] = useState<"light" | "system" | "dark">("system");

  return (
    <body {...stylex.props(themes[theme], style)}>
      <div {...stylex.props(styles.tabs)}>
        <button
          {...stylex.props(styles.btn, theme === "dark" && styles.btnActive)}
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </button>
        <button
          {...stylex.props(styles.btn, theme === "system" && styles.btnActive)}
          onClick={() => setTheme("system")}
        >
          <SystemIcon />
        </button>
        <button
          {...stylex.props(styles.btn, theme === "light" && styles.btnActive)}
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </button>
      </div>
      {children}
    </body>
  );
}

const styles = stylex.create({
  tabs: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 16,
    width: "auto",
  },
  btn: {
    appearance: "none",
    borderStyle: "none",
    backgroundColor: "transparent",
    color: colors.fg,
    cursor: "pointer",
    padding: 8,
    width: 32,
    height: 32,
    opacity: 0.33,
    borderRadius: 4,
  },
  btnActive: {
    opacity: 1,
    backgroundColor: "rgba(14, 125, 243, 0.5)",
  },
});

const themes = stylex.create({
  dark: { colorScheme: "dark" },
  light: { colorScheme: "light" },
  system: { colorScheme: "light dark" },
});

type Props = {
  style?: stylex.StyleXStyles;
};

function SystemIcon({ style }: Props) {
  return (
    <svg
      {...stylex.props(style)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
    </svg>
  );
}

function SunIcon({ style }: Props) {
  return (
    <svg
      {...stylex.props(style)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ style }: Props) {
  return (
    <svg
      {...stylex.props(style)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
    </svg>
  );
}
