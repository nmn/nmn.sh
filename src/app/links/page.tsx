import * as stylex from "@stylexjs/stylex";
import { H1, P, Ul } from "../../mdx-components";
import { colors, fonts, spacing, text } from "../vars.stylex";
import { getLinkKeys } from "./linksKv";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const keys = await getLinkKeys();

  return (
    <div>
      <H1 xstyle={styles.h1}>Links</H1>
      {keys.length === 0 ? (
        <P xstyle={styles.empty}>No links yet.</P>
      ) : (
        <Ul xstyle={styles.ul}>
          {keys.map((key) => (
            <li {...stylex.props(styles.li)} key={key}>
              <a
                {...stylex.props(styles.link)}
                href={`/${encodeURIComponent(key)}`}
              >
                {key}
              </a>
            </li>
          ))}
        </Ul>
      )}
    </div>
  );
}

const styles = stylex.create({
  h1: {
    textAlign: "center",
    textWrap: "balance",
  },
  empty: {
    opacity: 0.6,
    textAlign: "center",
    marginTop: spacing.xxl,
  },
  ul: {
    padding: 0,
    borderBottomColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderBottomStyle: "solid",
    borderBottomWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
    marginTop: spacing.xxl,
    width: "100%",
  },
  li: {
    margin: 0,
    listStyle: "none",
    paddingBlock: spacing.md,
    borderTopColor: `color-mix(in oklch, ${colors.fg}, transparent 75%)`,
    borderTopStyle: "solid",
    borderTopWidth: {
      default: 1,
      "@media (min-resolution: 2dppx)": 0.5,
      "@media (min-resolution: 3dppx)": 0.33,
    },
  },
  link: {
    textDecoration: "none",
    color: {
      default: colors.fg,
      ":hover": colors.accent,
    },
    display: "block",
    fontFamily: fonts.mono,
    fontSize: text.h5,
    fontWeight: 700,
    overflowWrap: "anywhere",
  },
});
