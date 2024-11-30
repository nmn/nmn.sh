import * as stylex from "@stylexjs/stylex";
import { H1 } from "../../mdx-components";
import { globalTokens, spacing } from "../vars.stylex";
import TalkCard from "./TalkCard";
import { talks } from "./Talk";

export default async function Talks() {
  return (
    <div>
      <H1 xstyle={styles.h1}>Talks</H1>
      <div {...stylex.props(styles.grid)}>
        {[...talks]
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((talk) => (
            <TalkCard key={talk.link} talk={talk} />
          ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  h1: {
    marginBottom: spacing.xl,
    textAlign: "center",
    textWrap: "balance",
  },
  grid: {
    display: "grid",
    gap: spacing.xl,
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    marginInline: "auto",
    maxWidth: globalTokens.maxWidth,
    width: "100%",
  },
});
