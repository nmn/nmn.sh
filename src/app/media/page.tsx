import * as stylex from "@stylexjs/stylex";
import { H1 } from "../../mdx-components";
import { globalTokens, spacing } from "../vars.stylex";
import MediaCard from "./MediaCard";
import { mediaItems } from "./Media";

export default async function Media() {
  return (
    <div>
      <H1 xstyle={styles.h1}>Media</H1>
      <div {...stylex.props(styles.grid)}>
        {mediaItems
          .toSorted((a, b) => b.date.localeCompare(a.date))
          .map((item) => (
            <MediaCard key={`${item.link}-${item.date}`} item={item} />
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
