export type ApprovalType = 'Chemist' | 'Doctor' | 'Nurse';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type ChemistStatus = 'all' | 'active' | 'pending' | 'suspended' | 'banned';

export interface Chemist {
  id: string;
  name: string;
  location: string;
  licenceStatus: string;
  ordersCount?: number;
  status: 'active' | 'pending' | 'suspended' | 'banned';
  reason?: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
  joinedDate?: string;
}

export type CustomerFilterStatus = 'all' | 'active' | 'banned';

export interface AdminCustomer {
  id: string;
  name: string;
  city: string;
  ordersCount: number;
  joinedDate: string;
  status: 'active' | 'banned';
  email: string;
  phone: string;
  banReason?: string;
}

export type ProductFilterStatus = 'all' | 'live' | 'prescription' | 'hidden';

export interface AdminProduct {
  id: string;
  name: string;
  chemistName: string;
  location: string;
  price: number;
  status: 'live' | 'prescription' | 'hidden';
  requiresPrescription: boolean;
  category?: string;
  stockCount?: number;
}

export interface PendingProvider {
  id: string;
  type: ApprovalType;
  name: string;
  specialtyOrDetails: string;
  location: string;
  licenseNumber: string;
  submittedDate: string;
  status: ApprovalStatus;
}

export interface PlatformOverviewStats {
  ordersToday: number;
  chemistsCount: number;
  doctorsCount: number;
  nursesCount: number;
  platformFeePercent: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  itemsSummary: string;
  chemistName: string;
  county: string;
  totalAmount: number;
  status: 'Dispatched' | 'Preparing' | 'Delivered' | 'Pending Chemist';
  time: string;
}
