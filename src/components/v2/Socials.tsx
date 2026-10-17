import { SOCIAL } from '@/lib/v2/site';

export default function Socials({ className = '' }: { className?: string }) {
  return (
    <ul className={`v2-socials ${className}`} aria-label="Social Media">
      {SOCIAL.map((s) => (
        <li key={s.url}><a href={s.url} target="_blank" rel="noopener me">{s.label}</a></li>
      ))}
    </ul>
  );
}
