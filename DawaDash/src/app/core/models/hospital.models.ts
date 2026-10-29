export type HospitalType = 'Public' | 'Private' | 'Faith-based';

export interface HospitalDirections {
  from: string;
  distanceKm: number;
  minutes: number;
  steps: string[];
}

export interface Hospital {
  id: number;
  name: string;
  type: HospitalType;
  level: number;
  open24h: boolean;
  address: string;
  distanceKm: number;
  services: string[];
  phone: string;
  directions: HospitalDirections;
}
