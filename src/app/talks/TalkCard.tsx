import React, { useId } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";

import * as stylex from "@stylexjs/stylex";
import { colors, spacing, text } from "../vars.stylex";
import type { Talk } from "./Talk";
import { H4, P } from "../../mdx-components";

const TalkCard = ({ talk }: { talk: Talk }) => {
  const id = useId();
  return (
    <div>
      <a
        {...stylex.props(s.link)}
        href={talk.link}
        target="_blank"
        aria-describedby={id}
      >
        <div {...stylex.props(s.imageWrapper)}>
          <Image
            {...stylex.props(s.img)}
            src={talk.image.src}
            width={talk.image.width}
            height={talk.image.height}
            alt=""
          />
        </div>
        <H4 xstyle={s.h4} id={id}>
          {talk.title}
        </H4>
      </a>
      <div>
        <P xstyle={s.p}>
          <Link
            {...stylex.props(s.link)}
            href={talk.conferenceLink}
            target="_blank"
          >
            {talk.conference}
          </Link>
        </P>
      </div>
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
  h4: {
    color: colors.fg,
    fontSize: text.h5,
    lineHeight: 1.1,
    marginTop: spacing.xxs,
    // textDecoration: "none",
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

export default TalkCard;
