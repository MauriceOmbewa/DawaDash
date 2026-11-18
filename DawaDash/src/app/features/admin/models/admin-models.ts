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

export type CustomerFilterStatus = 'all' | 'active' | 'suspended' | 'banned';

export interface AdminCustomer {
  id: string;
  name: string;
  city: string;
  ordersCount: number;
  joinedDate: string;
  status: 'active' | 'suspended' | 'banned';
  email: string;
  phone: string;
  suspendReason?: string;
  banReason?: string;
}

export type ProductFilterStatus = 'all' | 'live' | 'prescription' | 'hidden';

export interface AdminProduct {
  id: string;
  sku?: string;
  initials?: string;
  name: string;
  chemistName: string;
  location: string;
  price: number;
  status: 'live' | 'prescription' | 'hidden';
  requiresPrescription: boolean;
  category?: string;
  packSize?: string;
  stockCount?: number;
  updatedAt?: string;
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

export type UserCategoryTab = 'customers' | 'doctors' | 'nurses' | 'chemists' | 'hospitals';
export type UserStatusFilter = 'all' | 'active' | 'suspended' | 'banned';
export type UserAccountStatus = 'active' | 'pending' | 'suspended' | 'banned';

export interface UserOrderRecord {
  orderNumber: string;
  status: 'Delivered' | 'On the way' | 'Preparing';
  date: string;
  total: number;
}

export interface UserBookingRecord {
  providerName: string;
  status: 'Booked' | 'Done' | 'Cancelled';
  mode: 'Virtual' | 'Hospital' | 'Home';
  fee: number;
}

export interface UserCustomerItem {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  status: UserAccountStatus;
  county: string;
  joinedDate: string;
  signInMethod: string;
  ordersCount: number;
  bookingsCount: number;
  orders: UserOrderRecord[];
  bookings: UserBookingRecord[];
  reason?: string;
}

export interface ProviderBookingModeSummary {
  label: string;
  scheduleText: string;
  enabled: boolean;
}

export interface ProviderTreatedPatient {
  id: string;
  initials: string;
  name: string;
  county: string;
  date: string;
  mode: 'Virtual' | 'Hospital' | 'Home';
  notesSummary: string;
}

export interface ProviderReviewItem {
  rating: string;
  patientName: string;
  text: string;
}

export interface UserDoctorItem {
  id: string;
  initials: string;
  avatarBadge: string;
  name: string;
  city: string;
  status: UserAccountStatus;
  specialty: string;
  licenceExpires: string;
  licenceBadgeType: 'normal' | 'warning' | 'expired';
  rating: string;
  loginEmail: string;
  joinedDate: string;
  licenceNumber: string;
  licenceValid: boolean;
  workplace: string;
  experienceYears: string;
  earnedKes: number;
  platformFeeKes: number;
  bookingModes: ProviderBookingModeSummary[];
  patientsTreated: ProviderTreatedPatient[];
  reviews: ProviderReviewItem[];
  renewalRequested?: boolean;
  reason?: string;
}

export interface UserNurseItem {
  id: string;
  initials: string;
  avatarBadge: string;
  name: string;
  city: string;
  status: UserAccountStatus;
  service: string;
  licenceExpires: string;
  licenceBadgeType: 'normal' | 'warning' | 'expired';
  rating: string;
  loginEmail: string;
  joinedDate: string;
  licenceNumber: string;
  licenceValid: boolean;
  experienceYears: string;
  earnedKes: number;
  platformFeeKes: number;
  bookingModes: ProviderBookingModeSummary[];
  patientsTreated: ProviderTreatedPatient[];
  reviews: ProviderReviewItem[];
  renewalRequested?: boolean;
  reason?: string;
}

export interface UserChemistItem {
  id: string;
  initials: string;
  avatarBadge: string;
  name: string;
  city: string;
  status: UserAccountStatus;
  licenceNumber: string;
  licenceValid: boolean;
  licenceExpires: string;
  licenceBadgeType: 'normal' | 'warning' | 'expired';
  ordersCount: number;
  productsCount: number;
  subscriptionPlan: string;
  phone: string;
  email: string;
  joinedDate: string;
  earnedKes: number;
  platformFeeKes: number;
  subscriptionFeeKes: number;
  renewalRequested?: boolean;
  reason?: string;
}

export interface UserHospitalItem {
  id: string;
  initials: string;
  name: string;
  level: string;
  status: UserAccountStatus;
  type: 'Private' | 'Public' | 'Faith-based';
  county: string;
  phone: string;
  email: string;
  joinedDate: string;
  registrationNumber: string;
  doctorsCount: number;
  departments: string[];
  reason?: string;
}

export type AdminEarningsPeriod =
  | 'daily'
  | 'week'
  | 'biweekly'
  | 'month'
  | 'quarter'
  | 'sixMonths'
  | 'year'
  | 'allTime';

export type PaymentLogCategory =
  | 'all'
  | 'Doctors'
  | 'Products'
  | 'Chemists'
  | 'Nurses'
  | 'Hospitals';

export type AdminChartType = 'stackedBar' | 'line' | 'pie' | 'area' | 'rankings';

export interface AdminEarningsBar {
  month: string;
  doctorsKes: number;
  productsKes: number;
  chemistsKes: number;
  nursesKes: number;
  hospitalsKes: number;
  doctorsHeightPct: number;
  productsHeightPct: number;
  chemistsHeightPct: number;
  nursesHeightPct: number;
  hospitalsHeightPct: number;
}

export interface AdminEarningsSourceRow {
  source: 'Doctors' | 'Products' | 'Chemists' | 'Nurses' | 'Hospitals';
  customersPaid: number;
  platformKeeps: number;
  paidToProviders: number;
  rate: string;
}

export interface AdminEarningsDataset {
  label: string;
  chartTitle: string;
  totalEarned: number;
  fromDoctors: number;
  fromProducts: number;
  fromChemists: number;
  fromNurses: number;
  fromHospitals: number;
  monthlyBars: AdminEarningsBar[];
  breakdown: AdminEarningsSourceRow[];
}

export interface AdminPaymentLog {
  id: string;
  reference: string;
  category: 'Doctors' | 'Products' | 'Chemists' | 'Nurses' | 'Hospitals';
  providerName: string;
  itemDescription: string;
  customerName: string;
  county: string;
  dateTime: string;
  periodBuckets: AdminEarningsPeriod[];
  customerPaid: number;
  platformEarned: number;
  providerPayout: number;
  commissionRate: string;
  paymentMethod: 'M-Pesa' | 'Card' | 'Insurance';
  status: 'Settled' | 'Pending payout';
}
