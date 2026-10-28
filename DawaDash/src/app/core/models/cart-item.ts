import { Medicine } from './medicine.models';

export interface CartItem {
  medicine: Medicine;
  quantity: number;
  unitPrice: number;
  fromCounty: string | null; // null = from the customer's own county; otherwise ordered from another county
}