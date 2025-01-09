import { bskyPost } from "../../theme.stylex";
import { Container } from "../Container";

import * as stylex from "@stylexjs/stylex";

export function PostSkeleton() {
  return (
    <Container>
      <div {...stylex.props(styles.wrapper)}>
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.skeleton, styles.avatar)} />
          <div {...stylex.props(styles.nameAndHandle)}>
            <div {...stylex.props(styles.skeleton, styles.headerName)} />
            <div {...stylex.props(styles.skeleton, styles.headerHandle)} />
          </div>
        </div>
        <div {...stylex.props(styles.body)}>
          <div
            {...stylex.props(
              styles.skeleton,
              styles.bodyItem,
              styles.bodyItem1
            )}
          />
          <div
            {...stylex.props(
              styles.skeleton,
              styles.bodyItem,
              styles.bodyItem2
            )}
          />
          <div
            {...stylex.props(
              styles.skeleton,
              styles.bodyItem,
              styles.bodyItem3
            )}
          />
        </div>
      </div>
    </Container>
  );
}

const pulse = stylex.keyframes({
  "50%": {
    opacity: "0.5",
  },
});

const styles = stylex.create({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    width: "100%",
  },
  skeleton: {
    animationDuration: "2s",
    animationIterationCount: "infinite",
    animationName: pulse,
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    backgroundColor: bskyPost.skeletonBg,
  },
  header: {
    alignItems: "center",
    display: "flex",
    gap: "0.625rem",
  },
  nameAndHandle: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },
  headerName: {
    borderRadius: "0.3rem",
    height: 20,
    width: "40%",
  },
  headerHandle: {
    borderRadius: "0.3rem",
    height: 20,
    width: "80%",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },
  bodyItem: {
    borderRadius: "0.3rem",
    height: 20,
  },
  bodyItem1: {
    width: "100%",
  },
  bodyItem2: {
    width: "85%",
  },
  bodyItem3: {
    width: "65%",
  },
  avatar: {
    borderRadius: 9999,
    height: 40,
    minHeight: 40,
    minWidth: 40,
    width: 40,
  },
});
