import type { ComponentType } from 'react';
import PricingCardsBlock from '@/components/blocks/PricingCardsBlock';
import HeroBlock from '@/components/blocks/HeroBlock';
import MarqueeBlock from '@/components/blocks/MarqueeBlock';
import FeatureGridBlock from '@/components/blocks/FeatureGridBlock';
import ServiceCardsBlock from '@/components/blocks/ServiceCardsBlock';

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
  'pricing-cards': {
    type: 'pricing-cards',
    label: 'Pakete',
    Component: PricingCardsBlock,
  },
};
