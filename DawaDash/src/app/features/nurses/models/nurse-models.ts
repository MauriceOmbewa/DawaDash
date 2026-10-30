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

