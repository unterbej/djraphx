import { Big_Shoulders, Instrument_Sans } from 'next/font/google';

// Selbst gehostet über next/font (Download beim Build, kein Layout-Shift, display: swap).
export const display = Big_Shoulders({ subsets: ['latin'], weight: ['800', '900'], display: 'swap', variable: '--v2-font-display' });
export const text = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap', variable: '--v2-font-text' });
