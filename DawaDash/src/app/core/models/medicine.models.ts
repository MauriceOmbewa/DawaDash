export const MEDICINE_CATEGORIES = [
  'Pain relief',
  'Antibiotics',
  'Vitamins',
  'Stomach',
  'Allergy',
] as const;

export type MedicineCategory = (typeof MEDICINE_CATEGORIES)[number];

export interface Medicine {
  id: number;
  name: string;
  price: number; // in KES
  requiresPrescription: boolean;
  category: MedicineCategory;
  keywords: string[]; // symptoms and uses (lowercase), so searching "headache" finds Paracetamol
  counties: string[]; // counties where it is available
}