import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Loader2, Mail, AlertCircle } from 'lucide-react';
import { personal, sectionVisibility } from '../../data/data';
import { hasValue } from '../../lib/utils';
import { MagneticButton } from '../ui/MagneticButton';
import { SocialIcon } from '../ui/SocialIcon';
import { Reveal } from '../ui/Reveal';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

// FormSubmit.co relays the submission straight to this inbox — no account,
// API key, or backend of our own needed. (The very first message ever
// sent triggers a one-time confirmation email to this address; after
// that one click, every submission delivers automatically.)
const FORM_TARGET = `https://formsubmit.co/ajax/${personal.email}`;

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  if (!sectionVisibility.contact) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the mailto link below still works.
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    try {
      const res = await fetch(FORM_TARGET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-base py-32 sm:py-44">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/15 blur-[160px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="noise-overlay" />
      </div>

      <div className="relative mx-auto max-w-shell px-6 text-center sm:px-10 lg:px-16">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">
            Let&apos;s build something
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Got an idea?
            <br />
            <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-lg text-lg text-ink-dim">
            Open to full-stack roles, collaborations, and interesting problems worth solving.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 flex max-w-xl flex-col gap-4 rounded-3xl border border-base-line bg-base-raised/50 p-6 text-left sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl border border-base-line bg-base px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl border border-base-line bg-base px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="What are you building / hiring for / thinking about?"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="resize-none rounded-xl border border-base-line bg-base px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-accent-cyan/60 focus:outline-none"
            />
            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-body text-sm font-medium text-base transition-colors hover:bg-accent-cyan disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Mail size={15} />
                  </>
                )}
              </button>
              {status === 'sent' && (
                <span className="flex items-center gap-1.5 text-sm text-accent-lime">
                  <Check size={15} /> Sent — I&apos;ll reply soon.
                </span>
              )}
              {status === 'error' && (
                <span className="flex items-center gap-1.5 text-sm text-accent-coral">
                  <AlertCircle size={15} /> Couldn&apos;t send — email me directly below.
                </span>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-7">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">Or reach me directly</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={`mailto:${personal.email}`} variant="outline">
                Say Hello <ArrowUpRight size={16} />
              </MagneticButton>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-base-line px-7 py-3.5 font-body text-sm text-ink transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : personal.email}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-14 flex items-center justify-center gap-6">
            {personal.socials
              .filter((s) => hasValue(s.url) && s.icon !== 'mail')
              .map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-base-line text-ink-dim transition-colors hover:border-accent-cyan/60 hover:text-accent-cyan"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
