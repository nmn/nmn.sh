import React, { useId } from "react";
import Image from "next/image";

import * as stylex from "@stylexjs/stylex";
import { colors, globalTokens, spacing, text } from "../vars.stylex";
import type { MediaItem } from "./Media";
import { H4 } from "../../mdx-components";

const MediaCard = ({ item }: { item: MediaItem }) => {
  const id = useId();
  const hasImage = Boolean(item.image?.src);
  return (
    <div>
      <a
        {...stylex.props(s.link, !hasImage && s.placeholder)}
        href={item.link}
        target="_blank"
        aria-describedby={id}
      >
        {hasImage && (
          <div {...stylex.props(s.imageWrapper)}>
            <Image
              {...stylex.props(s.img)}
              src={item.image!.src}
              width={item.image!.width}
              height={item.image!.height}
              alt=""
            />
          </div>
        )}
        <H4 xstyle={[s.h4]} id={id}>
          {item.title}
        </H4>
      </a>
    </div>
  );
};

const s = stylex.create({
  imageWrapper: {
    aspectRatio: 16 / 9,
    height: "auto",
    width: "100%",
  },
  img: {
    borderRadius: spacing.xxs,
    color: "transparent",
    height: "100%",
    objectFit: "cover",
    userSelect: "none",
    width: "100%",
  },
  placeholder: {
    aspectRatio: 16 / 9,
    backgroundImage: globalTokens.secondaryGlow,
    borderRadius: spacing.xxs,
    boxShadow:
      "inset 0 0 0 1px color-mix(in oklab, currentColor 10%, transparent)",
    display: "block",
    paddingBlock: spacing.xxxs,
    paddingInline: spacing.sm,
    width: "100%",
  },
  h4: {
    color: colors.fg,
    fontSize: text.h5,
    lineHeight: 1.1,
    marginTop: spacing.xxs,
  },
  p: {
    color: colors.accent,
    marginTop: spacing.xxxs,
  },
  link: {
    color: "inherit",
    textDecoration: {
      default: "none",
      ":hover": "underline",
      ":focus": "underline",
    },
    textUnderlineOffset: "4px",
  },
});

export default MediaCard;
