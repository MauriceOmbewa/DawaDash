import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorPatientMode, DoctorPatientRecord } from '../models/doctor-models';

export type PatientModeFilter = 'All' | 'Virtual' | 'Hospital visit' | 'Home visit';

@Component({
  selector: 'app-doctor-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-patients.html',
  styleUrl: './doctor-patients.css',
})
export class DoctorPatients {
  searchQuery = signal<string>('');
  activeFilter = signal<PatientModeFilter>('All');
  selectedPatient = signal<DoctorPatientRecord | null>(null);

  patients = signal<DoctorPatientRecord[]>([
    {
      id: 'pat-rec-1',
      initials: '[P]',
      name: '[Patient name]',
      location: 'Mombasa',
      lastVisit: '[date]',
      mode: 'Virtual',
      visitsCount: 3,
      age: 29,
      gender: 'Female',
      phone: '+254 712 345 678',
      bloodGroup: 'O+',
      allergies: ['Penicillin'],
      recentDiagnosis: 'Upper respiratory tract infection',
      notes: 'Responded well to prescribed course; advised follow-up if fever persists.',
    },
    {
      id: 'pat-rec-2',
      initials: '[P]',
      name: '[Patient name]',
      location: 'Nyali',
      lastVisit: '[date]',
      mode: 'Hospital',
      visitsCount: 1,
      age: 44,
      gender: 'Male',
      phone: '+254 722 987 654',
      bloodGroup: 'A+',
      allergies: [],
      recentDiagnosis: 'Hypertension routine review',
      notes: 'BP 132/84 mmHg. Continue current antihypertensive regimen.',
    },
    {
      id: 'pat-rec-3',
      initials: '[P]',
      name: '[Patient name]',
      location: 'Kisauni',
      lastVisit: '[date]',
      mode: 'Home',
      visitsCount: 2,
      age: 67,
      gender: 'Female',
      phone: '+254 733 555 210',
      bloodGroup: 'B+',
      allergies: ['Sulfa drugs'],
      recentDiagnosis: 'Post-operative wound dressing & mobility check',
      notes: 'Healing well; scheduled home nurse dressing follow-up in 3 days.',
    },
    {
      id: 'pat-rec-4',
      initials: '[P]',
      name: '[Patient name]',
      location: 'Mombasa',
      lastVisit: '[date]',
      mode: 'Virtual',
      visitsCount: 5,
      age: 35,
      gender: 'Male',
      phone: '+254 745 111 888',
      bloodGroup: 'O-',
      allergies: [],
      recentDiagnosis: 'Allergic rhinitis & sinusitis',
      notes: 'Prescribed antihistamine nasal spray and cetirizine.',
    },
  ]);

  filteredPatients = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.patients().filter((p) => {
      const modeMap: Record<PatientModeFilter, DoctorPatientMode | 'All'> = {
        All: 'All',
        Virtual: 'Virtual',
        'Hospital visit': 'Hospital',
        'Home visit': 'Home',
      };
      const targetMode = modeMap[filter];
      const matchesMode = targetMode === 'All' || p.mode === targetMode;

      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.mode.toLowerCase().includes(q) ||
        p.recentDiagnosis.toLowerCase().includes(q);

      return matchesMode && matchesSearch;
    });
  });

  setFilter(filter: PatientModeFilter): void {
    this.activeFilter.set(filter);
  }

  onSearch(): void {
    // Computed updates automatically via searchQuery signal
  }

  openPatientDetails(patient: DoctorPatientRecord): void {
    this.selectedPatient.set(patient);
  }

  closePatientDetails(): void {
    this.selectedPatient.set(null);
  }
}
