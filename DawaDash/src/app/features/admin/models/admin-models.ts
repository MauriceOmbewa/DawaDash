export type ApprovalType = 'Chemist' | 'Doctor' | 'Nurse';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

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
