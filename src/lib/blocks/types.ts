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
