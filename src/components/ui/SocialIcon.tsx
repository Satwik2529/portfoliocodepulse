import { Mail, Link2, Code2 } from 'lucide-react';
import type { SocialLink } from '../../data/types';

// lucide-react dropped brand/logo marks, so GitHub/LinkedIn/X/Instagram
// are small inline SVGs here instead — everything else stays on lucide.
function GithubMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.96.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.71 5.42-5.28 5.7.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A11.52 11.52 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

function TwitterMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 1.5h3.68l-8.04 9.19L24 22.5h-7.4l-5.79-7.57-6.63 7.57H.49l8.6-9.83L0 1.5h7.59l5.24 6.92L18.9 1.5zm-1.29 19.07h2.04L6.48 3.32H4.29l13.32 17.25z" />
    </svg>
  );
}

function InstagramMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 5.4a4.44 4.44 0 1 0 0 8.88 4.44 4.44 0 0 0 0-8.88zm0 7.33a2.89 2.89 0 1 1 0-5.78 2.89 2.89 0 0 1 0 5.78zm5.66-7.51a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0z" />
    </svg>
  );
}

export function SocialIcon({ icon, size = 18 }: { icon: SocialLink['icon']; size?: number }) {
  switch (icon) {
    case 'github':
      return <GithubMark size={size} />;
    case 'linkedin':
      return <LinkedinMark size={size} />;
    case 'twitter':
      return <TwitterMark size={size} />;
    case 'instagram':
      return <InstagramMark size={size} />;
    case 'mail':
      return <Mail size={size} strokeWidth={1.75} />;
    case 'leetcode':
      return <Code2 size={size} strokeWidth={1.75} />;
    default:
      return <Link2 size={size} strokeWidth={1.75} />;
  }
}
