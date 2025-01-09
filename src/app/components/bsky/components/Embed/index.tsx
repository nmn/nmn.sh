import type {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  AppBskyFeedDefs,
  AppBskyGraphDefs,
} from "@atproto/api";
import { type PropsWithChildren, useMemo } from "react";
import { CONTENT_LABELS, labelsToInfo } from "../../utils";
import { getRkey } from "../../utils";
import { Link } from "../Link";
import { isRecord } from "../Post/utils";
import {
  isEmbedExternalView,
  isEmbedRecordView,
  isEmbedRecordWithMediaView,
  isEmbedViewBlocked,
  isEmbedViewDetached,
  isEmbedViewNotFound,
  isEmbedViewRecord,
  isFeedGeneratorView,
  isGraphListView,
  isImageView,
  isLabelerView,
  isStarterPackViewBasic,
  isStarterpackRecord,
  isVideoView,
} from "./utils";

import * as stylex from "@stylexjs/stylex";
import { bskyPost } from "../../theme.stylex";

export type Embed = {
  content: AppBskyFeedDefs.PostView["embed"];
  labels: AppBskyFeedDefs.PostView["labels"];
  hideRecord?: boolean;
};

export function Embed({ content, labels, hideRecord }: Embed) {
  const labelInfo = useMemo(() => labelsToInfo(labels), [labels]);

  if (!content) return null;

  try {
    // Case 1: Image
    if (isImageView(content)) {
      return <ImageEmbed content={content} labelInfo={labelInfo} />;
    }

    // Case 2: External link
    if (isEmbedExternalView(content)) {
      return <ExternalEmbed content={content} labelInfo={labelInfo} />;
    }

    // Case 3: Record (quote or linked post)
    if (isEmbedRecordView(content)) {
      if (hideRecord) {
        return null;
      }

      const record = content.record;

      // Case 3.1: Post
      if (isEmbedViewRecord(record)) {
        const pwiOptOut = !!record.author.labels?.find(
          (label) => label.val === "!no-unauthenticated"
        );
        if (pwiOptOut) {
          return (
            <Info>
              The author of the quoted post has requested their posts not be
              displayed on external sites.
            </Info>
          );
        }

        let text: string | undefined;
        if (isRecord(record.value)) {
          text = record.value.text;
        }

        const isAuthorLabeled = record.author.labels?.some((label) =>
          CONTENT_LABELS.includes(label.val)
        );

        return (
          <Link
            href={`/profile/${record.author.did}/post/${getRkey(record)}`}
            xstyle={styles.record}
          >
            <div {...stylex.props(styles.recordHeader)}>
              <div {...stylex.props(styles.recordAvatar)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  {...stylex.props(
                    styles.recordAvatarImg,
                    isAuthorLabeled && styles.recordAvatarImgBlur
                  )}
                  alt={record.author.displayName}
                  src={record.author.avatar}
                />
              </div>
              <p {...stylex.props(styles.recordAuthor)}>
                <span {...stylex.props(styles.recordAuthorDisplayName)}>
                  {record.author.displayName}
                </span>
                <span {...stylex.props(styles.recordAuthorHandle)}>
                  @{record.author.handle}
                </span>
              </p>
            </div>
            {text && <p {...stylex.props(styles.recordText)}>{text}</p>}
            {record.embeds?.map((embed) => (
              <Embed
                key={String(embed.$type)}
                content={embed}
                labels={record.labels}
                hideRecord
              />
            ))}
          </Link>
        );
      }

      // Case 3.2: List
      if (isGraphListView(record)) {
        return (
          <GenericWithImageEmbed
            image={record.avatar}
            title={record.name}
            href={`/profile/${record.creator.did}/lists/${getRkey(record)}`}
            subtitle={
              record.purpose === "app.bsky.graph.defs#modlist"
                ? `Moderation list by @${record.creator.handle}`
                : `User list by @${record.creator.handle}`
            }
            description={record.description}
          />
        );
      }

      // Case 3.3: Feed
      if (isFeedGeneratorView(record)) {
        return (
          <GenericWithImageEmbed
            image={record.avatar}
            title={record.displayName}
            href={`/profile/${record.creator.did}/feed/${getRkey(record)}`}
            subtitle={`Feed by @${record.creator.handle}`}
            description={`Liked by ${record.likeCount ?? 0} users`}
          />
        );
      }

      // Case 3.4: Labeler
      if (isLabelerView(record)) {
        // Embed type does not exist in the app, so show nothing
        return null;
      }

      // Case 3.5: Starter pack
      if (isStarterPackViewBasic(record)) {
        return <StarterPackEmbed content={record} />;
      }

      // Case 3.6: Post not found
      if (isEmbedViewNotFound(record)) {
        return <Info>Quoted post not found, it may have been deleted.</Info>;
      }

      // Case 3.7: Post blocked
      if (isEmbedViewBlocked(record)) {
        return <Info>The quoted post is blocked.</Info>;
      }

      // Case 3.8: Detached quote post
      if (isEmbedViewDetached(record)) {
        // Just don't show anything
        return null;
      }

      // Unknown embed type
      return null;
    }

    // Case 4: Video
    if (isVideoView(content)) {
      return <VideoEmbed content={content} />;
    }

    // Case 5: Record with media
    if (
      isEmbedRecordWithMediaView(content) &&
      isEmbedViewRecord(content.record.record)
    ) {
      return (
        <div {...stylex.props(styles.recordMedia)}>
          <Embed
            content={content.media}
            labels={labels}
            hideRecord={hideRecord}
          />
          <Embed
            content={{
              $type: "app.bsky.embed.record#view",
              record: content.record.record,
            }}
            labels={content.record.record.labels}
            hideRecord={hideRecord}
          />
        </div>
      );
    }

    // Unknown embed type
    return null;
  } catch (err) {
    return (
      <Info>{err instanceof Error ? err.message : "An error occurred"}</Info>
    );
  }
}

function Info({ children }: PropsWithChildren) {
  return (
    <div {...stylex.props(styles.info)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...stylex.props(styles.infoIcon)}
      >
        <title>Information Icon</title>
        <g>
          <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z" />
        </g>
      </svg>
      <p {...stylex.props(styles.infoText)}>{children}</p>
    </div>
  );
}

type ImageEmbed = {
  content: AppBskyEmbedImages.View;
  labelInfo?: string;
};

function ImageEmbed({ content, labelInfo }: ImageEmbed) {
  if (labelInfo) {
    return <Info>{labelInfo}</Info>;
  }

  switch (content.images.length) {
    case 1:
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={content.images[0].thumb}
          alt={content.images[0].alt}
          {...stylex.props(styles.singleImage)}
        />
      );
    case 2:
      return (
        <div {...stylex.props(styles.imagesContainer)}>
          {content.images.map((image, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${i}-${image.alt}`}
              src={image.thumb}
              alt={image.alt}
              {...stylex.props(styles.doubleImagesImg)}
            />
          ))}
        </div>
      );
    case 3:
      return (
        <div {...stylex.props(styles.imagesContainer)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.images[0].thumb}
            alt={content.images[0].alt}
            {...stylex.props(styles.threeImagesLargeImg)}
          />
          <div {...stylex.props(styles.threeImagesRemainingImagesContainer)}>
            {content.images.slice(1).map((image, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${i}-${image.alt}`}
                src={image.thumb}
                alt={image.alt}
                {...stylex.props(styles.threeImagesRemainingImages)}
              />
            ))}
          </div>
        </div>
      );
    case 4:
      return (
        <div {...stylex.props(styles.fourImagesContainer)}>
          {content.images.map((image, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${i}-${image.alt}`}
              src={image.thumb}
              alt={image.alt}
              {...stylex.props(styles.fourImagesImg)}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
}

type ExternalEmbed = {
  content: AppBskyEmbedExternal.View;
  labelInfo?: string;
};

function ExternalEmbed({ content, labelInfo }: ExternalEmbed) {
  function toNiceDomain(url: string): string {
    try {
      const urlp = new URL(url);
      return urlp.host ? urlp.host : url;
    } catch {
      return url;
    }
  }

  if (labelInfo) {
    return <Info>{labelInfo}</Info>;
  }

  return (
    <Link href={content.external.uri} xstyle={styles.external} disableTracking>
      {content.external.thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={content.external.title}
          src={content.external.thumb}
          {...stylex.props(styles.externalThumbnail)}
        />
      )}
      <div {...stylex.props(styles.externalContent)}>
        <p {...stylex.props(styles.externalDomain)}>
          {toNiceDomain(content.external.uri)}
        </p>
        <p {...stylex.props(styles.externalTitle)}>{content.external.title}</p>
        <p {...stylex.props(styles.externalDescription)}>
          {content.external.description}
        </p>
      </div>
    </Link>
  );
}

type GenericWithImageEmbed = {
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  description?: string;
};

function GenericWithImageEmbed({
  title,
  subtitle,
  href,
  image,
  description,
}: GenericWithImageEmbed) {
  return (
    <Link href={href} xstyle={styles.generic}>
      <div {...stylex.props(styles.genericHeader)}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            {...stylex.props(styles.genericImage)}
            {...stylex.props(styles.genericImageImg)}
          />
        ) : (
          <div
            {...stylex.props(styles.genericImage)}
            {...stylex.props(styles.genericImagePlaceholder)}
          />
        )}
        <div {...stylex.props(styles.genericTitleAndDescription)}>
          <p {...stylex.props(styles.genericTitle)}>{title}</p>
          <p {...stylex.props(styles.genericDescription)}>{subtitle}</p>
        </div>
      </div>
      {description && (
        <p {...stylex.props(styles.genericText)}>{description}</p>
      )}
    </Link>
  );
}

type VideoEmbed = { content: AppBskyEmbedVideo.View };

function VideoEmbed({ content }: VideoEmbed) {
  let aspectRatio = 1;

  if (content.aspectRatio) {
    const { width, height } = content.aspectRatio;
    aspectRatio = clamp(width / height, 1 / 1, 3 / 1);
  }

  return (
    <div
      {...stylex.props(styles.videoEmbed)}
      style={{ aspectRatio: `${aspectRatio} / 1` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={content.thumbnail}
        alt={content.alt}
        {...stylex.props(styles.videoEmbedThumbnail)}
      />
      <div {...stylex.props(styles.videoEmbedIconBg)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          {...stylex.props(styles.videoEmbedIcon)}
        >
          <title>Play Icon</title>
          <path
            fill="#fff"
            d="M9.576 2.534C7.578 1.299 5 2.737 5 5.086v13.828c0 2.35 2.578 3.787 4.576 2.552l11.194-6.914c1.899-1.172 1.899-3.932 0-5.104L9.576 2.534Z"
          />
        </svg>
      </div>
    </div>
  );
}

type StarterPackEmbed = {
  content: AppBskyGraphDefs.StarterPackViewBasic;
};

function StarterPackEmbed({ content }: StarterPackEmbed) {
  if (!isStarterpackRecord(content.record)) {
    return null;
  }

  const starterPackHref = getStarterPackHref(content);
  const imageUri = getStarterPackImage(content);

  return (
    <Link href={starterPackHref} xstyle={styles.starterPack}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUri}
        alt={content.record.name}
        {...stylex.props(styles.starterPackImage)}
      />
      <div {...stylex.props(styles.starterPackContent)}>
        <div {...stylex.props(styles.starterPackContentHeader)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...stylex.props(styles.starterPackIcon)}
          >
            <title>Starter pack icon</title>
            <defs>
              <linearGradient
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                gradientTransform="rotate(45)"
                id="sky_V5w1FF_xb91wVQ_1euhBX"
              >
                <stop offset="0" stop-color="#0A7AFF" />
                <stop offset="1" stop-color="#59B9FF" />
              </linearGradient>
            </defs>
            <path
              fill="url(#sky_V5w1FF_xb91wVQ_1euhBX)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.26 5.227 5.02 6.899c-.734.197-1.17.95-.973 1.685l1.672 6.24c.197.734.951 1.17 1.685.973l6.24-1.672c.734-.197 1.17-.951.973-1.685L12.945 6.2a1.375 1.375 0 0 0-1.685-.973Zm-6.566.459a2.632 2.632 0 0 0-1.86 3.223l1.672 6.24a2.632 2.632 0 0 0 3.223 1.861l6.24-1.672a2.631 2.631 0 0 0 1.861-3.223l-1.672-6.24a2.632 2.632 0 0 0-3.223-1.861l-6.24 1.672Z"
            />
            <path
              fill="url(#sky_V5w1FF_xb91wVQ_1euhBX)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.138 18.411a4.606 4.606 0 1 0 0-9.211 4.606 4.606 0 0 0 0 9.211Zm0 1.257a5.862 5.862 0 1 0 0-11.724 5.862 5.862 0 0 0 0 11.724Z"
            />
          </svg>
          <div>
            <p {...stylex.props(styles.starterPackName)}>
              {content.record.name}
            </p>
            <p {...stylex.props(styles.starterPackAuthor)}>
              Starter pack by{" "}
              {content.creator.displayName || `@${content.creator.handle}`}
            </p>
          </div>
        </div>
        {content.record.description && (
          <p {...stylex.props(styles.starterPackDescription)}>
            {content.record.description}
          </p>
        )}
        {!!content.joinedAllTimeCount && content.joinedAllTimeCount > 50 && (
          <p {...stylex.props(styles.starterPackJoined)}>
            {content.joinedAllTimeCount} users have joined!
          </p>
        )}
      </div>
    </Link>
  );
}

function getStarterPackImage(starterPack: AppBskyGraphDefs.StarterPackView) {
  const rkey = getRkey(starterPack);
  return `https://ogcard.cdn.bsky.app/start/${starterPack.creator.did}/${rkey}`;
}

function getStarterPackHref(
  starterPack: AppBskyGraphDefs.StarterPackViewBasic
) {
  const rkey = getRkey(starterPack);
  const handleOrDid = starterPack.creator.handle || starterPack.creator.did;
  return `/starter-pack/${handleOrDid}/${rkey}`;
}

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}

const styles = stylex.create({
  record: {
    backgroundColor: {
      default: bskyPost.bgColor,
      ":hover": bskyPost.bgColorHover,
    },
    borderColor: bskyPost.borderColor,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
    padding: "0.5rem",
    textDecoration: "none",
    transitionDuration: "150ms",
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    width: "100%",
  },
  recordHeader: {
    alignItems: "center",
    display: "flex",
    gap: "0.375rem",
    width: "100%",
  },
  recordAvatar: {
    backgroundColor: bskyPost.bgColorHover,
    borderRadius: "9999px",
    flexShrink: 0,
    height: "1rem",
    minHeight: "1rem",
    minWidth: "1rem",
    overflow: "hidden",
    width: "1rem",
  },
  recordAvatarImg: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  recordAvatarImgBlur: {
    filter: "blur(0.094rem)",
  },
  recordAuthor: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    display: "-webkit-box",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    overflow: "hidden",
  },
  recordAuthorDisplayName: {
    fontWeight: 700,
  },
  recordAuthorHandle: {
    color: bskyPost.fontColorSecondary,
    marginLeft: "0.25rem",
  },
  recordText: {
    color: bskyPost.fontColor,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    whiteSpace: "pre-wrap",
  },
  recordMedia: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  info: {
    backgroundColor: bskyPost.bgColorHover,
    borderColor: bskyPost.borderColor,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    gap: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "0.625rem",
    paddingRight: "0.625rem",
    paddingTop: "0.5rem",
    width: "100%",
  },
  infoIcon: {
    fill: bskyPost.fontColor,
    flexShrink: 0,
    height: "1rem",
    marginTop: "0.125rem",
    minHeight: "1rem",
    minWidth: "1rem",
    width: "1rem",
  },
  infoText: {
    color: bskyPost.fontColorSecondary,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  singleImage: {
    borderRadius: "0.5rem",
    height: "auto",
    maxHeight: "1000px",
    objectFit: "cover",
    overflow: "hidden",
    width: "100%",
  },
  imagesContainer: {
    aspectRatio: "2/1",
    borderRadius: "0.5rem",
    display: "flex",
    gap: "0.25rem",
    overflow: "hidden",
    width: "100%",
  },
  doubleImagesImg: {
    borderRadius: "0.125rem",
    height: "100%",
    objectFit: "cover",
    width: "50%",
  },
  threeImagesLargeImg: {
    borderRadius: "0.125rem",
    flexGrow: 3,
    objectFit: "cover",
  },
  threeImagesRemainingImagesContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 2,
    gap: "0.25rem",
  },
  threeImagesRemainingImages: {
    borderRadius: "0.125rem",
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  fourImagesContainer: {
    borderRadius: "0.5rem",
    display: "grid",
    gap: "0.25rem",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    overflow: "hidden",
    width: "100%",
  },
  fourImagesImg: {
    aspectRatio: "1/1",
    borderRadius: "0.125rem",
    objectFit: "cover",
    width: "100%",
  },
  external: {
    alignItems: "stretch",
    borderColor: bskyPost.borderColor,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%",
  },
  externalThumbnail: {
    aspectRatio: "1.91/1",
    objectFit: "cover",
  },
  externalContent: {
    paddingBottom: "0.75rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
  },
  externalDomain: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    color: bskyPost.fontColorSecondary,
    display: "-webkit-box",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    overflow: "hidden",
  },
  externalTitle: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    display: "-webkit-box",
    fontWeight: "bold",
    overflow: "hidden",
  },
  externalDescription: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    color: bskyPost.fontColorSecondary,
    display: "-webkit-box",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginTop: "0.125rem",
    overflow: "hidden",
  },
  generic: {
    borderColor: bskyPost.borderColor,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    paddingBottom: "0.5rem",
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem",
    paddingTop: "0.5rem",
    width: "100%",
  },
  genericHeader: {
    alignItems: "center",
    display: "flex",
    gap: "0.625rem",
  },
  genericImage: {
    borderRadius: "0.375rem",
    flexShrink: 0,
    height: "2rem",
    minHeight: "2rem",
    minWidth: "2rem",
    width: "2rem",
  },
  genericImageImg: {
    backgroundColor: bskyPost.bgColorHover,
  },
  genericImagePlaceholder: {
    backgroundColor: bskyPost.colorBluePrimary,
  },
  genericTitleAndDescription: {
    flex: "1 1 0%",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  genericTitle: {
    fontWeight: 700,
  },
  genericDescription: {
    color: bskyPost.fontColorSecondary,
  },
  genericText: {
    color: bskyPost.fontColorSecondary,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  videoEmbed: {
    aspectRatio: "1/1",
    borderRadius: "0.5rem",
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  videoEmbedThumbnail: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },
  videoEmbedIconBg: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "9999px",
    display: "flex",
    height: "6rem",
    justifyContent: "center",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "6rem",
  },
  videoEmbedIcon: {
    height: "60%",
    objectFit: "cover",
    width: "60%",
  },
  starterPack: {
    alignItems: "stretch",
    borderColor: bskyPost.borderColor,
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%",
  },
  starterPackImage: {
    aspectRatio: "1.91/1",
    objectFit: "cover",
  },
  starterPackContent: {
    paddingBottom: "0.75rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "0.75rem",
  },
  starterPackContentHeader: {
    alignItems: "center",
    display: "flex",
    gap: "0.5rem",
  },
  starterPackIcon: {
    height: "2.5rem",
    minHeight: "2.5rem",
    minWidth: "2.5rem",
    width: "2.5rem",
  },
  starterPackName: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: "1.313rem",
  },
  starterPackAuthor: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    color: bskyPost.fontColorSecondary,
    display: "-webkit-box",
    fontSize: "0.875rem",
    lineHeight: "1.125rem",
    overflow: "hidden",
  },
  starterPackDescription: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginTop: "0.25rem",
  },
  starterPackJoined: {
    color: bskyPost.fontColorSecondary,
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: "1.25rem",
    marginTop: "0.25rem",
  },
});
