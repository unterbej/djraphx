import type { ComponentType } from 'react';
import PricingCardsBlock from '@/components/blocks/PricingCardsBlock';
import HeroBlock from '@/components/blocks/HeroBlock';
import MarqueeBlock from '@/components/blocks/MarqueeBlock';
import FeatureGridBlock from '@/components/blocks/FeatureGridBlock';

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
  'pricing-cards': {
    type: 'pricing-cards',
    label: 'Pakete',
    Component: PricingCardsBlock,
  },
};
