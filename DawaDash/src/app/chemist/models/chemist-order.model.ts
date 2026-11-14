export type ChemistOrderStatus =
  | 'New'
  | 'Check Rx'
  | 'Confirmed'
  | 'Processing'
  | 'Preparing'
  | 'Ready'
  | 'Delivered'
  | 'Completed'
  | 'Cancelled';

export interface ChemistOrderItem {
  name: string;
  code: string;
  shortLabel: string;
  quantity: number;
  unitPrice: number;
}

export interface ChemistOrder {
  id: number;
  status: ChemistOrderStatus;
  customerName: string;
  phone: string;
  dropoff: string;
  placedAt: string;
  items: ChemistOrderItem[];
  deliveryFee: number;
  total: number;
  paymentStatus: 'Paid' | 'Pending';
  paymentMethod: string;
  paymentChannel: string;
  requiresPrescription: boolean;
}
