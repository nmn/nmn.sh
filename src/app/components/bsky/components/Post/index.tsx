import type { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import { CONTENT_LABELS, getRkey, niceDate, prettyNumber } from "../../utils";
import { Container } from "../Container";
import { Embed } from "../Embed";
import { Link } from "../Link";
import { PostContent } from "../PostContent";
import { PostError } from "../PostError";
import * as stylex from "@stylexjs/stylex";
import { bskyPost } from "../../theme.stylex";
import { isRecord } from "./utils";

export type Post = {
  thread: AppBskyFeedDefs.ThreadViewPost;
};

export function Post({ thread: { post } }: Post) {
  let record: AppBskyFeedPost.Record | null = null;
  if (isRecord(post.record)) {
    record = post.record;
  }

  if (post.author.labels?.find((label) => label.val === "!no-unauthenticated"))
    return (
      <PostError error="The author of this post has requested their posts not be displayed on external sites." />
    );

  const href = `/profile/${post.author.did}/post/${getRkey(post)}`;

  return (
    <Container href={href}>
      <div {...stylex.props(styles.post)} lang={record?.langs?.[0]} dir="auto">
        <Header author={post.author} href={href} />
        <PostContent record={record} />
        <Embed content={post.embed} labels={post.labels} />
        <CreatedAt href={href} indexedAt={post.indexedAt} />
        <Actions
          href={href}
          likeCount={post.likeCount}
          replyCount={post.replyCount}
          repostCount={post.repostCount}
        />
      </div>
    </Container>
  );
}

type Header = {
  author: AppBskyFeedDefs.PostView["author"];
  href: string;
};

function Header({ author, href }: Header) {
  const isAuthorLabeled = author.labels?.some((label) =>
    CONTENT_LABELS.includes(label.val)
  );

  return (
    <div {...stylex.props(styles.header)}>
      <Link href={`/profile/${author.did}`} xstyle={styles.avatarLink}>
        <div {...stylex.props(styles.avatar)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...stylex.props(
              styles.avatarImg,
              isAuthorLabeled && styles.avatarImgBlur
            )}
            alt={author.displayName}
            src={author.avatar}
          />
        </div>
      </Link>
      <div>
        <Link href={`/profile/${author.did}`} xstyle={styles.displayName}>
          <p>{author.displayName}</p>
        </Link>
        <Link href={`/profile/${author.did}`} xstyle={styles.handle}>
          <p>@{author.handle}</p>
        </Link>
      </div>
      <div {...stylex.props(styles.spacer)} />
      <Link href={href} xstyle={styles.logoLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 320 286"
          {...stylex.props(styles.logo)}
        >
          <title>Bluesky Logo</title>
          <path
            fill="rgb(10,122,255)"
            d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
          />
        </svg>
      </Link>
    </div>
  );
}

type CreatedAt = {
  indexedAt: string;
  href: string;
};

function CreatedAt({ indexedAt, href }: CreatedAt) {
  return (
    <Link href={href} xstyle={styles.createdAtLink}>
      <time
        dateTime={new Date(indexedAt).toISOString()}
        {...stylex.props(styles.createdAt)}
      >
        {niceDate(indexedAt)}
      </time>
    </Link>
  );
}

type Actions = {
  href: string;
  likeCount: number | undefined;
  repostCount: number | undefined;
  replyCount: number | undefined;
};

function Actions({ href, likeCount, replyCount, repostCount }: Actions) {
  return (
    <div {...stylex.props(styles.actions)}>
      {!!likeCount && (
        <Link href={href} xstyle={styles.action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...stylex.props(styles.actionIcon)}
          >
            <title>Like icon</title>
            <path
              fill="#ec4899"
              d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"
            />
          </svg>
          <p {...stylex.props(styles.actionText)}>{prettyNumber(likeCount)}</p>
        </Link>
      )}
      {!!repostCount && (
        <Link href={href} xstyle={styles.action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            {...stylex.props(styles.actionIcon)}
          >
            <title>Repost icon</title>
            <path
              fill="#20bc07"
              d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"
            />
          </svg>
          <p {...stylex.props(styles.actionText)}>
            {prettyNumber(repostCount)}
          </p>
        </Link>
      )}
      {/* <div {...stylex.props(styles.action)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          {...stylex.props(styles.actionIcon)}
        >
          <title>Reply icon</title>
          <path
            fill="rgb(10,122,255)"
            d="M19.002 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12.28l-4.762 2.858A1 1 0 0 1 6.002 21v-2h-1a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14Z"
          />
        </svg>
        <p {...stylex.props(styles.actionText)}>Reply</p>
      </div> */}
      <div {...stylex.props(styles.spacer)} />
      <Link href={href} xstyle={styles.replies}>
        {replyCount
          ? `${prettyNumber(replyCount)} ${
              replyCount > 1 ? "replies" : "reply"
            }`
          : "View on Bluesky"}
      </Link>
      <p {...stylex.props(styles.viewOnBluesky)}>
        <span {...stylex.props(styles.viewOnBlueskyText)}>View on </span>Bluesky
      </p>
    </div>
  );
}

const styles = stylex.create({
  post: {
    display: "flex",
    flexBasis: 0,
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    gap: "0.75rem",
    width: "100%",
  },

  header: {
    alignItems: "center",
    display: "flex",
    gap: "0.625rem",
    width: "100%",
  },

  avatarLink: {
    borderRadius: 9999,
  },

  avatar: {
    backgroundColor: bskyPost.bgColorHover,
    borderRadius: "inherit",
    flexShrink: 0,
    height: "2.5rem",
    minHeight: "2.5rem",
    minWidth: "2.5rem",
    overflow: "hidden",
    width: "2.5rem",
  },

  avatarImg: {
    height: "100%",
    objectFit: "cover",
    width: "100%",
  },

  avatarImgBlur: {
    filter: "blur(0.156rem)",
  },

  displayName: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    display: "-webkit-box",
    fontSize: bskyPost.headerFontSize,
    fontWeight: 700,
    lineHeight: bskyPost.headerLineHeight,
    overflow: "hidden",
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationThickness: "2px",
    textUnderlineOffset: "2px",
  },

  handle: {
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    color: bskyPost.fontColorSecondary,
    display: "-webkit-box",
    fontSize: "0.938rem",
    overflow: "hidden",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },

  spacer: {
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 1,
  },

  logoLink: {
    alignSelf: "flex-start",
    flexShrink: 0,
    transform: {
      default: "scale(1)",
      ":hover": "scale(1.1)",
    },
    transitionDuration: "150ms",
    transitionProperty: "transform",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  logo: {
    height: "2rem",
  },

  createdAtLink: {
    maxWidth: "100%",
    width: "max-content",
  },

  createdAt: {
    color: bskyPost.fontColorSecondary,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginTop: "0.25rem",
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },

  actions: {
    alignItems: "center",
    borderTopColor: bskyPost.borderColor,
    borderTopStyle: "solid",
    borderTopWidth: 1,
    display: "flex",
    fontSize: "0.875rem",
    gap: "1.25rem",
    lineHeight: "1.25rem",
    paddingTop: "0.625rem",
    width: "100%",
  },

  action: {
    alignItems: "center",
    cursor: "pointer",
    display: "flex",
    gap: "0.5rem",
  },

  actionIcon: {
    height: "1.25rem",
    minHeight: "1.25rem",
    minWidth: "1.25rem",
    width: "1.25rem",
  },

  actionText: {
    color: bskyPost.fontColorSecondary,
    fontWeight: 700,
    marginBottom: "1px",
  },

  replies: {
    color: bskyPost.colorBluePrimary,
    cursor: "pointer",
    fontWeight: 700,
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
  },

  repliesCount: {
    display: {
      default: "none",
      "@media (min-width: 640px)": "block",
    },
  },

  viewOnBluesky: {
    display: {
      default: "inline",
      "@media (min-width: 640px)": "none",
    },
  },

  viewOnBlueskyText: {
    display: {
      default: "none",
      "@media (min-width: 400px)": "inline",
    },
  },
});
