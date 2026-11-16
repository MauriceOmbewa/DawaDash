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


