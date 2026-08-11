import type { ComponentType } from 'react';
import PricingCardsBlock from '@/components/blocks/PricingCardsBlock';
import type { PricingCardsConfig } from './types';

export interface BlockDefinition {
  type: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<{ config: any }>;
}

export const BLOCK_REGISTRY: Record<string, BlockDefinition> = {
  'pricing-cards': {
    type: 'pricing-cards',
    label: 'Pakete',
    Component: PricingCardsBlock as ComponentType<{ config: PricingCardsConfig }>,
  },
};
