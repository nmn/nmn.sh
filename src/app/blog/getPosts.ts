export type Config = {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  published?: boolean;
  tags?: string[];
};

export type BlogPost = Config & {
  path: string;
};

type BlogPostModule = {
  metadata?: Config;
};

type BlogPostContext = {
  keys(): string[];
  <T = BlogPostModule>(id: string): T | Promise<T>;
};

type RequireWithContext = {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ): BlogPostContext;
};

const postContext = (require as unknown as RequireWithContext).context(
  "./(posts)",
  true,
  /\/page\.mdx$/
);

export async function getBlogPosts() {
  const posts = await Promise.all(
    postContext.keys().map(async (key) => {
      const { metadata } = await postContext<BlogPostModule>(key);

      if (metadata == null) {
        return null;
      }

      return {
        ...metadata,
        path: "/blog/" + key.replace(/^\.\//, "").replace(/\/page\.mdx$/, ""),
      };
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) =>
      a.date != null && b.date != null ? b.date.localeCompare(a.date) : 0
    );
}
