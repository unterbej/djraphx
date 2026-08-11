// Fixed enum of icons available to block content (e.g. QualityGridBlock).
// Deliberately NOT free-form SVG paste from the admin — keeps block config
// safely renderable without an injection/broken-markup surface.

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const QUALITY_ICONS = {
  clipboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
  ),
  pulse: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}><path d="M3 12h3l2-6 4 12 2-6 2 3h5"/></svg>
  ),
  music: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
  ),
  signal: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  ),
} as const;

export type QualityIconKey = keyof typeof QUALITY_ICONS;

export const SOCIAL_ICONS = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s} strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ),
  tiktok: (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s} strokeWidth="1.8"><path d="M14 4v9a4 4 0 1 1-4-4"/><path d="M14 4c.5 2.5 2.5 4.5 5 5"/></svg>
  ),
} as const;

export const SOCIAL_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
};
