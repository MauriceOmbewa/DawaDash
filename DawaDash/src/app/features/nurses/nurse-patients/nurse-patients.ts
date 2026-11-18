import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NurseVisitType } from '../models/nurse-models';

export type NursePatientFilter =
  | 'All'
  | 'Wound care'
  | 'Injections'
  | 'IV drip'
  | 'Catheter care';

export interface NursePatientRecord {
  id: string;
  initials: string;
  name: string;
  location: string;
  addressDetails: string;
  lastVisit: string;
  service: NurseVisitType;
  visitsCount: number;
  age: number;
  gender: 'Female' | 'Male';
  phone: string;
  bloodGroup: string;
  allergies: string[];
  careFocus: string;
  notes: string;
}

@Component({
  selector: 'app-nurse-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-patients.html',
  styleUrl: './nurse-patients.css',
})
export class NursePatients {
  searchQuery = signal<string>('');
  activeFilter = signal<NursePatientFilter>('All');
  selectedPatient = signal<NursePatientRecord | null>(null);

  patients = signal<NursePatientRecord[]>([
    {
      id: 'np-1',
      initials: 'MH',
      name: 'Mariam Hassan',
      location: 'Kisauni, Mombasa',
      addressDetails: 'House 14, Near Kisauni Health Centre',
      lastVisit: 'Oct 29, 2026',
      service: 'Wound care',
      visitsCount: 4,
      age: 58,
      gender: 'Female',
      phone: '+254 712 998 877',
      bloodGroup: 'O+',
      allergies: ['Penicillin'],
      careFocus: 'Post-operative abdominal dressing & sterile cleansing',
      notes: 'Surgical incision clean with minimal exudate. Next dressing change in 48 hours.',
    },
    {
      id: 'np-2',
      initials: 'PM',
      name: 'Peter Mwangi',
      location: 'Bamburi, Mombasa',
      addressDetails: 'Bamburi Fisheries Area, Gate 7',
      lastVisit: 'Oct 28, 2026',
      service: 'Injections',
      visitsCount: 3,
      age: 41,
      gender: 'Male',
      phone: '+254 733 112 233',
      bloodGroup: 'A+',
      allergies: [],
      careFocus: 'Daily prescribed IM antibiotic & vitals monitoring',
      notes: 'Tolerated IM injection well. BP 124/78 mmHg, temp 36.7 °C. 2 doses remaining.',
    },
    {
      id: 'np-3',
      initials: 'AB',
      name: 'Amina Bakari',
      location: 'Tudor, Mombasa',
      addressDetails: 'Tudor Estate, Block C3',
      lastVisit: 'Oct 27, 2026',
      service: 'IV drip / Infusion',
      visitsCount: 2,
      age: 33,
      gender: 'Female',
      phone: '+254 718 556 789',
      bloodGroup: 'B+',
      allergies: ['Sulfa drugs'],
      careFocus: 'Home rehydration IV infusion & electrolyte support',
      notes: 'Infusion completed smoothly over 2 hours. Cannula site clear without phlebitis.',
    },
    {
      id: 'np-4',
      initials: 'JO',
      name: 'Joseph Odhiambo',
      location: 'Nyali, Mombasa',
      addressDetails: 'Links Road, Nyali Court Apt 2A',
      lastVisit: 'Oct 25, 2026',
      service: 'Catheter care',
      visitsCount: 6,
      age: 72,
      gender: 'Male',
      phone: '+254 722 441 098',
      bloodGroup: 'O-',
      allergies: [],
      careFocus: 'Foley catheter replacement & hygiene check',
      notes: 'Catheter changed using sterile technique. Clear output, family briefed on bag care.',
    },
  ]);

  filteredPatients = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.patients().filter((p) => {
      const serviceMap: Record<NursePatientFilter, NurseVisitType | 'All'> = {
        All: 'All',
        'Wound care': 'Wound care',
        Injections: 'Injections',
        'IV drip': 'IV drip / Infusion',
        'Catheter care': 'Catheter care',
      };
      const targetService = serviceMap[filter];
      const matchesService = targetService === 'All' || p.service === targetService;

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q) ||
        p.careFocus.toLowerCase().includes(q);

      return matchesService && matchesSearch;
    });
  });

  setFilter(filter: NursePatientFilter): void {
    this.activeFilter.set(filter);
  }

  onSearch(): void {
    // Computed updates automatically via searchQuery signal
  }

  openPatientDetails(patient: NursePatientRecord): void {
    this.selectedPatient.set(patient);
  }

  closePatientDetails(): void {
    this.selectedPatient.set(null);
  }
}
