export type ProviderType = 'doctor' | 'nurse';

export interface CareProvider {
  id: number;
  type: ProviderType;
  name: string;
  specialty: string; // shown on the card, e.g. "General doctor"
  category: string; // shown on the filter chip, e.g. "General"
  county: string;
  price: number; // in KES, platform fee already included
}