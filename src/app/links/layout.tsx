import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links | Naman Goel",
  description: "Short links from Naman Goel.",
};

export default function LinksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
