import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NurseVisit, NurseVisitType } from '../models/nurse-models';

@Component({
  selector: 'app-nurse-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-schedule.html',
  styleUrl: './nurse-schedule.css',
})
export class NurseSchedule {
  selectedDay = signal('Wed');
  typeFilter = signal<'All' | NurseVisitType>('All');
  showAddVisitModal = signal(false);

  // New visit inputs
  patientName = signal('');
  scheduledTime = signal('2:30 pm');
  serviceType = signal<NurseVisitType>('Wound care');
  neighborhood = signal('Nyali');
  notes = signal('');

  weekDays = signal([
    { day: 'Mon', date: 'Oct 27', count: 3 },
    { day: 'Tue', date: 'Oct 28', count: 4 },
    { day: 'Wed', date: 'Oct 29', count: 3 },
    { day: 'Thu', date: 'Oct 30', count: 5 },
    { day: 'Fri', date: 'Oct 31', count: 4 },
    { day: 'Sat', date: 'Nov 01', count: 2 },
    { day: 'Sun', date: 'Nov 02', count: 0 },
  ]);

  visits = signal<NurseVisit[]>([
    {
      id: 'v-1',
      scheduledTime: '11:00 am',
      status: 'accepted',
      fee: 1320,
      patient: {
        id: 'p-1',
        name: 'Mariam Hassan',
        phone: '+254 712 998 877',
        neighborhood: 'Kisauni',
        county: 'Mombasa',
        serviceType: 'Wound care',
        preferredTime: '11:00 am',
        isPaid: true,
        addressDetails: 'House 14, Near Kisauni Health Centre',
      },
    },
    {
      id: 'v-2',
      scheduledTime: '4:00 pm',
      status: 'accepted',
      fee: 1320,
      patient: {
        id: 'p-2',
        name: 'Peter Mwangi',
        phone: '+254 733 112 233',
        neighborhood: 'Bamburi',
        county: 'Mombasa',
        serviceType: 'Injections',
        preferredTime: '4:00 pm',
        isPaid: true,
        addressDetails: 'Bamburi Fisheries Area',
      },
    },
  ]);

  filteredVisits = computed(() => {
    const filter = this.typeFilter();
    return this.visits().filter((v: NurseVisit) => {
      if (filter === 'All') return true;
      return v.patient.serviceType === filter;
    });
  });

  selectDay(day: string) {
    this.selectedDay.set(day);
  }

  setTypeFilter(type: 'All' | NurseVisitType) {
    this.typeFilter.set(type);
  }

  openAddVisit() {
    this.showAddVisitModal.set(true);
  }

  closeAddVisit() {
    this.showAddVisitModal.set(false);
  }

  saveVisit() {
    if (!this.patientName().trim()) return;

    const newVisit: NurseVisit = {
      id: `v-${Date.now()}`,
      scheduledTime: this.scheduledTime(),
      status: 'accepted',
      fee: 1320,
      patient: {
        id: `p-${Date.now()}`,
        name: this.patientName().trim(),
        phone: '+254 700 000 000',
        neighborhood: this.neighborhood(),
        county: 'Mombasa',
        serviceType: this.serviceType(),
        preferredTime: this.scheduledTime(),
        isPaid: true,
        notes: this.notes(),
      },
    };

    this.visits.update((list: NurseVisit[]) => [...list, newVisit]);
    this.patientName.set('');
    this.notes.set('');
    this.closeAddVisit();
  }
}
