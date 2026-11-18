export type NurseVisitType = 'Wound care' | 'Injections' | 'Catheter care' | 'IV drip / Infusion' | 'Post-op dressing' | 'Vitals check';
export type VisitStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'declined';

export interface NursePatient {
  id: string;
  name: string;
  phone: string;
  neighborhood: string;
  county: string;
  serviceType: NurseVisitType;
  preferredTime: string;
  isPaid: boolean;
  notes?: string;
  addressDetails?: string;
}

export interface NurseVisit {
  id: string;
  patient: NursePatient;
  scheduledTime: string;
  status: VisitStatus;
  fee: number;
}

export interface NurseStats {
  visitsToday: number;
  newRequests: number;
  earnedToday: number;
  rating: number;
  completedVisitsCount: number;
}

export type NurseEarningsPeriod =
  | 'daily'
  | 'week'
  | 'biweekly'
  | 'month'
  | 'quarter'
  | 'sixMonths'
  | 'year'
  | 'allTime';

export type NurseChartType = 'stackedBar' | 'line' | 'pie' | 'area' | 'rankings';

export type NurseLogCategoryFilter = 'all' | NurseVisitType;

export interface NurseEarningsBar {
  month: string;
  woundCareKes: number;
  postOpKes: number;
  ivDripKes: number;
  injectionsKes: number;
  catheterKes: number;
  woundCareHeightPct: number;
  postOpHeightPct: number;
  ivDripHeightPct: number;
  injectionsHeightPct: number;
  catheterHeightPct: number;
}

export interface NurseServiceBreakdownRow {
  service: NurseVisitType;
  patientsPaid: number;
  youEarned: number;
  visits: number;
  avgPerVisit: number;
}

export interface NurseEarningsDataset {
  label: string;
  chartTitle: string;
  totalEarned: number;
  fromWoundCare: number;
  fromPostOp: number;
  fromIvDrip: number;
  fromInjections: number;
  fromCatheter: number;
  monthlyBars: NurseEarningsBar[];
  breakdown: NurseServiceBreakdownRow[];
}

export interface NursePaymentLog {
  id: string;
  reference: string;
  category: NurseVisitType;
  patientName: string;
  itemDescription: string;
  neighborhood: string;
  dateTime: string;
  periodBuckets: NurseEarningsPeriod[];
  patientPaid: number;
  youEarned: number;
  paymentMethod: 'M-Pesa' | 'Card' | 'Insurance';
  status: 'Settled' | 'Pending payout';
}
