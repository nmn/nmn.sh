import { bskyPost } from "../../theme.stylex";
import * as stylex from "@stylexjs/stylex";

export type PostError = {
  error: string;
};

export function PostError(props: PostError) {
  return (
    <div {...stylex.props(styles.container)}>
      <p {...stylex.props(styles.text)}>{props.error}</p>
    </div>
  );
}

const styles = stylex.create({
  container: {
    backgroundColor: bskyPost.errorBgColor,
    borderColor: bskyPost.borderColor,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    paddingBottom: "0.625rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
    userSelect: "none",
    width: "100%",
  },
  text: {
    color: bskyPost.errorFontColor,
    textAlign: "center",
  },
});
