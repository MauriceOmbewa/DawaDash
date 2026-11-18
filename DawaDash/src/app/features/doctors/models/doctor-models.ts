export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  location: string;
  county: string;
  allergies: string[];
  bloodGroup: string;
  symptoms: string;
}

export type ConsultType = 'Video consult' | 'Clinic visit';
export type AppointmentStatus = 'start' | 'next' | 'booked' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patient: Patient;
  time: string;
  date: string;
  type: ConsultType;
  isPaid: boolean;
  status: AppointmentStatus;
  notes?: string;
}

export interface DoctorStats {
  todayCount: number;
  weekCount: number;
  earnedToday: number;
  rating: number;
  reviewCount: number;
}

export interface EarningLedgerItem {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: ConsultType;
  grossAmount: number;
  platformFee: number;
  netEarned: number;
  status: 'settled' | 'pending';
}

export type WeekDayShort = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export interface ConsultationSetting {
  id: 'virtual' | 'hospital' | 'home';
  title: string;
  subtitle: string;
  enabled: boolean;
  days: WeekDayShort[];
  fromTime: string;
  toTime: string;
  fee: number;
  footerNote: string;
}

export type DoctorPatientMode = 'Virtual' | 'Hospital' | 'Home';

export interface DoctorPatientRecord {
  id: string;
  initials: string;
  name: string;
  location: string;
  lastVisit: string;
  mode: DoctorPatientMode;
  visitsCount: number;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  bloodGroup: string;
  allergies: string[];
  recentDiagnosis: string;
  notes: string;
}

export type DoctorEarningsPeriod =
  | 'daily'
  | 'week'
  | 'biweekly'
  | 'month'
  | 'quarter'
  | 'sixMonths'
  | 'year'
  | 'allTime';

export type DoctorChartType = 'stackedBar' | 'line' | 'pie' | 'area' | 'rankings';

export type DoctorEarningCategory =
  | 'Virtual consult'
  | 'Hospital visit'
  | 'Home visit'
  | 'Follow-up review'
  | 'Lab & Rx review';

export type DoctorLogCategoryFilter = 'all' | DoctorEarningCategory;

export interface DoctorEarningsBar {
  month: string;
  virtualKes: number;
  hospitalKes: number;
  homeKes: number;
  followUpKes: number;
  labRxKes: number;
  virtualHeightPct: number;
  hospitalHeightPct: number;
  homeHeightPct: number;
  followUpHeightPct: number;
  labRxHeightPct: number;
}

export interface DoctorServiceBreakdownRow {
  channel: DoctorEarningCategory;
  patientsPaid: number;
  youEarned: number;
  consults: number;
  avgPerConsult: number;
}

export interface DoctorEarningsDataset {
  label: string;
  chartTitle: string;
  totalEarned: number;
  fromVirtual: number;
  fromHospital: number;
  fromHome: number;
  fromFollowUp: number;
  fromLabRx: number;
  monthlyBars: DoctorEarningsBar[];
  breakdown: DoctorServiceBreakdownRow[];
}

export interface DoctorPaymentLog {
  id: string;
  reference: string;
  category: DoctorEarningCategory;
  patientName: string;
  itemDescription: string;
  location: string;
  dateTime: string;
  periodBuckets: DoctorEarningsPeriod[];
  patientPaid: number;
  platformFee: number;
  youEarned: number;
  paymentMethod: 'M-Pesa' | 'Card' | 'Insurance';
  status: 'Settled' | 'Pending payout';
}
