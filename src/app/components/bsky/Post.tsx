// import { Suspense } from "react";
import { fetchPost } from "./api";
import { EmbeddedPost, PostNotFound } from "./components";
import type { PostProps } from "./types";

export async function Post({
  components,
  fetchOptions,
  onError,
  ...config
}: PostProps) {
  let error: unknown;

  const data = !("apiUrl" in config)
    ? await fetchPost(config, fetchOptions).catch((err) => {
        if (onError) {
          error = onError(err);
        } else {
          console.error(err);
          error = err;
        }
      })
    : undefined;

  if (!data) {
    const NotFound = components?.PostNotFound || PostNotFound;
    return <NotFound error={error} />;
  }

  return <EmbeddedPost thread={data} />;
}

// export function Post({ fallback = <PostSkeleton />, ...props }: PostProps) {
//   return (
//     <Suspense fallback={fallback}>
//       <SuspensedPost {...props} />
//     </Suspense>
//   );
// }
