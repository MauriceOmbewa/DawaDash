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
