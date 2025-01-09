import { type PropsWithChildren } from "react";
import * as stylex from "@stylexjs/stylex";
import { bskyPost } from "../../theme.stylex";
import { spacing } from "@/app/vars.stylex";

export type Container = PropsWithChildren<{
  href?: string;
}>;

export function Container({ children, href: _href }: Container) {
  // const ref = useRef<HTMLDivElement>(null);
  // const prevHeight = useRef(0);

  // useEffect(() => {
  //   if (ref.current) {
  //     const observer = new ResizeObserver((entries) => {
  //       const entry = entries[0];
  //       if (!entry) return;

  //       let { height } = entry.contentRect;
  //       height += 2; // border top and bottom
  //       if (height !== prevHeight.current) {
  //         prevHeight.current = height;
  //         window.parent.postMessage(
  //           {
  //             height,
  //             id: new URLSearchParams(window.location.search).get("id"),
  //           },
  //           "*"
  //         );
  //       }
  //     });
  //     observer.observe(ref.current);
  //     return () => observer.disconnect();
  //   }
  // }, []);

  // const handleInteraction = eventHandler(() => {
  //   if (ref.current && href) {
  //     const anchor = ref.current.querySelector("a");
  //     if (anchor) {
  //       anchor.click();
  //     }
  //   }
  // });

  return (
    <div
      {...stylex.props(styles.container)}
      // ref={ref}
      // onClick={handleInteraction}
      // onKeyDown={handleInteraction}
    >
      {/* {href && <Link href={href} />} */}
      <div {...stylex.props(styles.article)}>{children}</div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    backgroundColor: {
      default: bskyPost.bgColor,
      ":hover": bskyPost.bgColorHover,
    },
    borderColor: bskyPost.borderColor,
    borderRadius: "0.75rem",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    marginBlock: spacing.md,
    marginInline: "auto",
    maxWidth: 600,
    minWidth: 300,
    position: "relative",
    transitionDuration: "150ms",
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
  },
  article: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
    paddingBottom: 10,
    paddingInline: 16,
    paddingTop: 12,
    width: "100%",
  },
});
