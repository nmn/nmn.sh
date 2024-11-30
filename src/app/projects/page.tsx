import * as stylex from "@stylexjs/stylex";
import { H1, P } from "../../mdx-components";

import { colors } from "../vars.stylex";

export default function Home() {
  return (
    <div>
      <H1 xstyle={styles.h1}>Projects</H1>
      <P xstyle={[styles.h1, styles.p]}>Coming soon...</P>
      {/* <div {...stylex.props(styles.rows)}>
        <div>rosewater</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.rosewater)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.rosewater)} />
        <div>flamingo</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.flamingo)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.flamingo)} />
        <div>pink</div> <div {...stylex.props(styles.lightMode, styles.pink)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.pink)} />
        <div>mauve</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.mauve)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.mauve)} />
        <div>red</div> <div {...stylex.props(styles.lightMode, styles.red)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.red)} />
        <div>maroon</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.maroon)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.maroon)} />
        <div>peach</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.peach)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.peach)} />
        <div>yellow</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.yellow)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.yellow)} />
        <div>green</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.green)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.green)} />
        <div>teal</div> <div {...stylex.props(styles.lightMode, styles.teal)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.teal)} />
        <div>sky</div> <div {...stylex.props(styles.lightMode, styles.sky)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.sky)} />
        <div>sapphire</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.sapphire)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.sapphire)} />
        <div>blue</div> <div {...stylex.props(styles.lightMode, styles.blue)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.blue)} />
        <div>lavender</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.lavender)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.lavender)} />
        <div>text</div> <div {...stylex.props(styles.lightMode, styles.text)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.text)} />
        <div>subtext1</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.subtext1)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.subtext1)} />
        <div>subtext0</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.subtext0)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.subtext0)} />
        <div>overlay2</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.overlay2)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.overlay2)} />
        <div>overlay1</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.overlay1)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.overlay1)} />
        <div>overlay0</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.overlay0)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.overlay0)} />
        <div>surface2</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.surface2)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.surface2)} />
        <div>surface1</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.surface1)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.surface1)} />
        <div>surface0</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.surface0)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.surface0)} />
        <div>base</div> <div {...stylex.props(styles.lightMode, styles.base)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.base)} />
        <div>mantle</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.mantle)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.mantle)} />
        <div>crust</div>{" "}
        <div {...stylex.props(styles.lightMode, styles.crust)} />{" "}
        <div {...stylex.props(styles.darkMode, styles.crust)} />
      </div> */}
    </div>
  );
}

const styles = stylex.create({
  h1: {
    textAlign: "center",
    textWrap: "balance",
  },
  p: {
    color: colors.surface0,
  },
  // rows: {
  //   display: "grid",
  //   gap: spacing.md,
  //   gridTemplateColumns: "max-content max-content max-content",
  //   marginInline: "auto",
  //   width: "fit-content",
  //   alignItems: "center",
  // },
  // lightMode: {
  //   colorScheme: "light",
  //   borderWidth: 8,
  //   borderStyle: "solid",
  //   borderColor: "white",
  //   width: 60,
  //   height: 60,
  // },
  // darkMode: {
  //   colorScheme: "dark",
  //   borderWidth: 8,
  //   borderStyle: "solid",
  //   borderColor: "black",
  //   width: 60,
  //   height: 60,
  // },
  // rosewater: { backgroundColor: colors.rosewater },
  // flamingo: { backgroundColor: colors.flamingo },
  // pink: { backgroundColor: colors.pink },
  // mauve: { backgroundColor: colors.mauve },
  // red: { backgroundColor: colors.red },
  // maroon: { backgroundColor: colors.maroon },
  // peach: { backgroundColor: colors.peach },
  // yellow: { backgroundColor: colors.yellow },
  // green: { backgroundColor: colors.green },
  // teal: { backgroundColor: colors.teal },
  // sky: { backgroundColor: colors.sky },
  // sapphire: { backgroundColor: colors.sapphire },
  // blue: { backgroundColor: colors.blue },
  // lavender: { backgroundColor: colors.lavender },
  // text: { backgroundColor: colors.text },
  // subtext1: { backgroundColor: colors.subtext1 },
  // subtext0: { backgroundColor: colors.subtext0 },
  // overlay2: { backgroundColor: colors.overlay2 },
  // overlay1: { backgroundColor: colors.overlay1 },
  // overlay0: { backgroundColor: colors.overlay0 },
  // surface2: { backgroundColor: colors.surface2 },
  // surface1: { backgroundColor: colors.surface1 },
  // surface0: { backgroundColor: colors.surface0 },
  // base: { backgroundColor: colors.base },
  // mantle: { backgroundColor: colors.mantle },
  // crust: { backgroundColor: colors.crust },
});
