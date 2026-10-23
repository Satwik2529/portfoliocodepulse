import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { DriveEmbed } from './DriveEmbed';

interface CertificateLightboxProps {
  cert: { url: string; title: string } | null;
  onClose: () => void;
}

export function CertificateLightbox({ cert, onClose }: CertificateLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = cert ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-base/92 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={cert.title}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-base-line bg-base-raised"
          >
            <div className="flex items-center justify-between border-b border-base-line px-6 py-4">
              <h3 className="font-display text-lg font-semibold text-ink">{cert.title}</h3>
              <button
                onClick={onClose}
                aria-label="Close certificate"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-base-line text-ink hover:text-accent-cyan"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 bg-white">
              <DriveEmbed url={cert.url} title={cert.title} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
