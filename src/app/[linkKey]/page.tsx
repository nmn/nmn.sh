import { notFound, redirect } from "next/navigation";
import { getLinkTarget } from "../links/linksKv";

export const dynamic = "force-dynamic";

export default async function LinkRedirectPage({
  params,
}: {
  params: Promise<{ linkKey: string }>;
}) {
  const { linkKey } = await params;
  const target = await getLinkTarget(linkKey);

  if (target == null) {
    notFound();
  }

  redirect(target);
}
