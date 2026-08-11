import type { ComponentType } from 'react';
import PricingCardsBlock from '@/components/blocks/PricingCardsBlock';
import HeroBlock from '@/components/blocks/HeroBlock';
import MarqueeBlock from '@/components/blocks/MarqueeBlock';
import FeatureGridBlock from '@/components/blocks/FeatureGridBlock';
import ServiceCardsBlock from '@/components/blocks/ServiceCardsBlock';
import QualityGridBlock from '@/components/blocks/QualityGridBlock';
import AboutSectionBlock from '@/components/blocks/AboutSectionBlock';
import AdvantageGridBlock from '@/components/blocks/AdvantageGridBlock';

export interface BlockDefinition {
  type: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<{ config: any }>;
}

export const BLOCK_REGISTRY: Record<string, BlockDefinition> = {
  'hero': {
    type: 'hero',
    label: 'Hero',
    Component: HeroBlock,
  },
  'marquee': {
    type: 'marquee',
    label: 'Laufband',
    Component: MarqueeBlock,
  },
  'feature-grid': {
    type: 'feature-grid',
    label: 'Warum RAPHX',
    Component: FeatureGridBlock,
  },
  'service-cards': {
    type: 'service-cards',
    label: 'Services',
    Component: ServiceCardsBlock,
  },
  'quality-grid': {
    type: 'quality-grid',
    label: 'Qualitäten',
    Component: QualityGridBlock,
  },
  'about-section': {
    type: 'about-section',
    label: 'Über mich',
    Component: AboutSectionBlock,
  },
  'advantage-grid': {
    type: 'advantage-grid',
    label: 'Vorteile',
    Component: AdvantageGridBlock,
  },
  'pricing-cards': {
    type: 'pricing-cards',
    label: 'Pakete',
    Component: PricingCardsBlock,
  },
};
