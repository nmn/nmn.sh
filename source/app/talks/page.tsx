import * as stylex from "@stylexjs/stylex";
import Link from "next/link";
import Image from "next/image";
import { H1 } from "../../mdx-components";
import { colors, globalTokens, spacing, text } from "@/app/vars.stylex";
import TalkCard from "./TalkCard";
import { talks } from "./Talk";


export default async function Talks() {
  return (
    <div>
      <H1 xstyle={styles.h1}>Talks</H1>
      <div {...stylex.props(styles.grid)}>
        {talks.toSorted((a, b) => b.date.localeCompare(a.date)).map((talk) => (
          <TalkCard key={talk.link} talk={talk} />
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  h1: {
    textAlign: "center",
    textWrap: "balance",
    marginBottom: spacing.xl,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: spacing.xl,
    width: "100%",
    maxWidth: globalTokens.maxWidth,
    marginInline: "auto",
  },
});
