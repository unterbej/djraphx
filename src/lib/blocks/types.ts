export interface PackageItem {
  badge: string;
  name: string;
  subtitle: string;
  features: string[];
  note: string;
  popular: boolean;
  ctaLabel: string;
}

export interface PricingCardsConfig {
  eyebrow: string;
  title: string;
  lead: string;
  packages: PackageItem[];
}

export interface HeroConfig {
  eyebrow: string;
  title: string;
  subtitle: string;
  quote: string;
  statEvents: string;
  statSatisfaction: string;
  statResponse: string;
  image: string;
  imageAlt: string;
  imageBadge: string;
}

export interface MarqueeConfig {
  text: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

// Sections use a common "prefix + highlighted phrase + suffix" heading pattern
// (the grad-text gradient span). Modeled as three plain-text fields rather than
// allowing raw HTML in a title field, to keep block config safely renderable.
export interface HighlightedTitle {
  prefix: string;
  highlight: string;
  suffix: string;
}

export interface FeatureGridConfig {
  eyebrow: string;
  title: HighlightedTitle;
  lead: string;
  items: FeatureItem[];
  closingText: string;
}

export type ServiceArtVariant = 'wedding' | 'event' | 'bday' | 'public' | 'club';

export interface ServiceItem {
  categoryLabel: string;
  artVariant: ServiceArtVariant;
  title: string;
  body: string;
}

export interface ServiceCardsConfig {
  eyebrow: string;
  title: HighlightedTitle;
  lead: string;
  items: ServiceItem[];
}

export interface QualityItem {
  icon: string; // key into QUALITY_ICONS
  title: string;
  body: string;
}

export interface QualityGridConfig {
  eyebrow: string;
  title: HighlightedTitle;
  items: QualityItem[];
}
