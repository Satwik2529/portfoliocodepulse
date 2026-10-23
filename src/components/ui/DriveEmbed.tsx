import { toDriveEmbedUrl } from '../../lib/driveEmbed';

interface DriveEmbedProps {
  url: string;
  title: string;
  className?: string;
}

// Renders a Google Drive file (image, PDF, or video) inline via an
// iframe, instead of just linking out to Drive in a new tab.
export function DriveEmbed({ url, title, className }: DriveEmbedProps) {
  const embedUrl = toDriveEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="autoplay; fullscreen"
      allowFullScreen
      loading="lazy"
      className={className ?? 'h-full w-full'}
    />
  );
}
