import type { PageContent } from '../types';
import { home } from './home';
import { hochzeit } from './hochzeit';
import { villach } from './villach';
import { klagenfurt } from './klagenfurt';
import { spittal } from './spittal';
import { club } from './club';
import { firmenfeier } from './firmenfeier';
import { geburtstag } from './geburtstag';
import { oeffentlich } from './oeffentlich';
import { preise } from './preise';
import { faq } from './faq';
import { ueberMich } from './ueber-mich';
import { kontakt } from './kontakt';

export const PAGES: PageContent[] = [
  home, hochzeit, villach, klagenfurt, spittal, club, firmenfeier,
  geburtstag, oeffentlich, preise, faq, ueberMich, kontakt,
];

export const getPage = (slug: string) => {
  const p = PAGES.find((x) => x.slug === slug);
  if (!p) throw new Error(`v2 page not found: ${slug}`);
  return p;
};
