// Converts a Google Drive "share" link (…/file/d/<ID>/view?usp=...) into
// Drive's embeddable preview URL, which renders images, PDFs, and videos
// inline via an iframe using Google's own viewer — no upload or
// re-hosting needed.
export function toDriveEmbedUrl(shareUrl: string): string | undefined {
  const match = shareUrl.match(/\/file\/d\/([^/]+)/);
  if (!match) return undefined;
  return `https://drive.google.com/file/d/${match[1]}/preview`;
}

// Only Drive file links can be embedded via DriveEmbed — anything else
// (e.g. a paper on OpenReview, a LeetCode profile) should open as a
// normal external link instead.
export function isDriveLink(url: string): boolean {
  return /drive\.google\.com\/file\/d\//.test(url);
}
