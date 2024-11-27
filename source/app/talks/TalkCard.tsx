import React from "react";
import Image from "next/image";
import Link from "next/link";

import * as stylex from "@stylexjs/stylex";

import tw from "tailwind-to-stylex/tw";
import { colors } from "@/app/vars.stylex";
import type { Talk } from "./Talk";

const TalkCard = ({ talk }: { talk: Talk }) => {

  const imgWrapperBase = tw("relative mb-2 overflow-hidden rounded-[40px]");

  return (
    <div className="test flex flex-col">
      <a href={talk.link} target="_blank">
        <div {...stylex.props( imgWrapperBase, s.imageWrapper )}>
          <img
            {...stylex.props(tw("select-none object-cover text-transparent"), s.img)}
            src={talk.image.src}
            width={talk.image.width}
            height={talk.image.height}
          />
        </div>
      </a>
      <div>
        <p className="font-freight text-[20px] font-semibold leading-tight md:text-[25px] text-dark">
          {talk.title}
        </p>
        <p className="font-freight font-normal md:text-[20px] text-[13px] text-dark">
          <Link {...stylex.props(s.link)} href={talk.conferenceLink} target="_blank">{talk.conference}</Link>
        </p>
      </div>
    </div>
  );
};

const s = stylex.create({
  imageWrapper: {
    width: '100%',
    aspectRatio: 16 / 9,
    height: 'auto',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  link: {
    color: colors.accent,
    textDecoration: {
      default: 'none',
      ':hover': 'underline',
      ':focus': 'underline',
    },
    textUnderlineOffset: 4,
  }
})

export default TalkCard;

{
  /* <div className="test flex flex-col">
      <a href={talk.link}>
        <div className="image-wrapper relative mb-2 w-[320px] overflow-hidden rounded-[40px] md:w-[320px] h-[180px]">
          <Image
            {...stylex.props(tw("h-[180px] w-[320px] select-none object-cover color-transparent"))}
            alt={talk.title}
            src={talk.image.src}
            width={talk.image.width}
            height={talk.image.height}
          />
        </div>
      </a>
      <div className="w-[320px] md:w-[320px]">
        <p className="font-freight text-[20px] font-semibold leading-tight md:text-[25px] text-dark">
          {talk.title}
        </p>
        <p className="font-freight font-normal md:text-[20px] text-[13px] text-dark">
          <Link {...stylex.props(tw("text-dark text-lime-500"))} href={talk.conferenceLink}>{talk.conference}</Link>
        </p>
      </div>
    </div> */
}
