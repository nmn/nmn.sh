import { getCloudflareContext } from "@opennextjs/cloudflare";

async function getLinksKV() {
  const { env } = await getCloudflareContext({ async: true });
  return env.LINKS;
}

export async function getLinkKeys() {
  const links = await getLinksKV();
  const names: string[] = [];
  let cursor: string | undefined;

  do {
    const result = await links.list(cursor == null ? undefined : { cursor });
    names.push(...result.keys.map((key) => key.name));
    cursor = result.list_complete ? undefined : result.cursor;
  } while (cursor != null);

  return names.sort((a, b) => a.localeCompare(b));
}

export async function getLinkTarget(key: string) {
  const links = await getLinksKV();
  const value = await links.get(key);

  if (value == null) {
    return null;
  }

  return normalizeUrl(value);
}

function normalizeUrl(value: string) {
  try {
    const url = new URL(value.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}
