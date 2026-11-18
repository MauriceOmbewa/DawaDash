import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NurseVisit, NurseVisitType } from '../models/nurse-models';

type WeekDayShort = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

interface DayOption {
  day: string;
  date: string;
  count: number;
}

interface NurseServiceSetting {
  id: 'wound_care' | 'injections' | 'infusion_catheter';
  title: string;
  subtitle: string;
  enabled: boolean;
  days: WeekDayShort[];
  fromTime: string;
  toTime: string;
  fee: number;
  footerNote: string;
}

@Component({
  selector: 'app-nurse-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-schedule.html',
  styleUrl: './nurse-schedule.css',
})
export class NurseSchedule {
  // Transitions between 'schedule' (table view) and 'settings' (Home visit settings UI)
  activeView = signal<'schedule' | 'settings'>('schedule');

  selectedDay = signal('Wed');
  typeFilter = signal<'All' | NurseVisitType>('All');
  showAddVisitModal = signal(false);
  settingsSavedNotice = signal(false);

  // New visit inputs
  patientName = signal('');
  scheduledTime = signal('2:30 pm');
  serviceType = signal<NurseVisitType>('Wound care');
  neighborhood = signal('Nyali');
  notes = signal('');

  readonly allDays: WeekDayShort[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  weekDays = signal<DayOption[]>([
    { day: 'Mon', date: 'Oct 27', count: 3 },
    { day: 'Tue', date: 'Oct 28', count: 4 },
    { day: 'Wed', date: 'Oct 29', count: 3 },
    { day: 'Thu', date: 'Oct 30', count: 5 },
    { day: 'Fri', date: 'Oct 31', count: 4 },
    { day: 'Sat', date: 'Nov 01', count: 2 },
    { day: 'Sun', date: 'Nov 02', count: 0 },
  ]);

  serviceSettings = signal<NurseServiceSetting[]>([
    {
      id: 'wound_care',
      title: 'Wound care',
      subtitle: 'Sterile dressing & post-op checks',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      fromTime: '8:00 am',
      toTime: '5:00 pm',
      fee: 1500,
      footerNote: 'Includes sterile dressing kit & vitals check.',
    },
    {
      id: 'injections',
      title: 'Injections',
      subtitle: 'Prescribed IM / IV home doses',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      fromTime: '7:30 am',
      toTime: '6:30 pm',
      fee: 1200,
      footerNote: 'Patient must present valid clinician prescription.',
    },
    {
      id: 'infusion_catheter',
      title: 'IV drip & Catheter',
      subtitle: 'Home infusions & catheter care',
      enabled: true,
      days: ['Tue', 'Thu', 'Sat'],
      fromTime: '9:00 am',
      toTime: '4:00 pm',
      fee: 2200,
      footerNote: 'Travel radius: 10 km across Mombasa.',
    },
  ]);

  visits = signal<NurseVisit[]>([
    {
      id: 'v-1',
      scheduledTime: '11:00 am',
      status: 'in_progress',
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
      scheduledTime: '2:00 pm',
      status: 'requested',
      fee: 1500,
      patient: {
        id: 'p-2',
        name: 'Halima Abdi',
        phone: '+254 722 441 098',
        neighborhood: 'Nyali',
        county: 'Mombasa',
        serviceType: 'Wound care',
        preferredTime: '2:00 pm',
        isPaid: true,
        addressDetails: 'Links Road, Nyali Court Apt 4B',
      },
    },
    {
      id: 'v-3',
      scheduledTime: '4:00 pm',
      status: 'accepted',
      fee: 1320,
      patient: {
        id: 'p-3',
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
    {
      id: 'v-4',
      scheduledTime: '5:30 pm',
      status: 'accepted',
      fee: 2200,
      patient: {
        id: 'p-4',
        name: 'Amina Bakari',
        phone: '+254 718 556 789',
        neighborhood: 'Tudor',
        county: 'Mombasa',
        serviceType: 'IV drip / Infusion',
        preferredTime: '5:30 pm',
        isPaid: true,
        addressDetails: 'Tudor Estate, Block C3',
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

  // View Navigation
  openSettings(): void {
    this.activeView.set('settings');
  }

  backToSchedule(): void {
    this.activeView.set('schedule');
  }

  // Schedule Table Actions
  selectDay(day: string): void {
    this.selectedDay.set(day);
  }

  setTypeFilter(type: 'All' | NurseVisitType): void {
    this.typeFilter.set(type);
  }

  toggleVisitActive(visitId: string): void {
    this.visits.update((list: NurseVisit[]) =>
      list.map((v) =>
        v.id === visitId
          ? {
              ...v,
              status: v.status === 'declined' ? 'accepted' : 'declined',
            }
          : v
      )
    );
  }

  openAddVisit(): void {
    this.showAddVisitModal.set(true);
  }

  closeAddVisit(): void {
    this.showAddVisitModal.set(false);
  }

  saveVisit(): void {
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
        addressDetails: this.notes() || `${this.neighborhood()}, Mombasa`,
        notes: this.notes(),
      },
    };

    this.visits.update((list: NurseVisit[]) => [...list, newVisit]);
    this.patientName.set('');
    this.notes.set('');
    this.closeAddVisit();
  }

  // Home Visit Settings Actions
  toggleService(serviceId: 'wound_care' | 'injections' | 'infusion_catheter'): void {
    this.serviceSettings.update((list) =>
      list.map((item) =>
        item.id === serviceId ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  isDaySelected(setting: NurseServiceSetting, day: WeekDayShort): boolean {
    return setting.days.includes(day);
  }

  toggleDay(
    serviceId: 'wound_care' | 'injections' | 'infusion_catheter',
    day: WeekDayShort
  ): void {
    this.serviceSettings.update((list) =>
      list.map((item) => {
        if (item.id !== serviceId) return item;
        const exists = item.days.includes(day);
        return {
          ...item,
          days: exists ? item.days.filter((d) => d !== day) : [...item.days, day],
        };
      })
    );
  }

  updateServiceField(
    serviceId: 'wound_care' | 'injections' | 'infusion_catheter',
    field: 'fromTime' | 'toTime' | 'fee',
    value: string | number
  ): void {
    this.serviceSettings.update((list) =>
      list.map((item) => {
        if (item.id !== serviceId) return item;
        if (field === 'fee') {
          const parsed = Number(String(value).replace(/[^0-9]/g, '')) || 0;
          return { ...item, fee: parsed };
        }
        return { ...item, [field]: String(value) };
      })
    );
  }

  getPatientPays(fee: number): number {
    return Math.round(fee * 1.1);
  }

  saveServiceSettings(): void {
    this.settingsSavedNotice.set(true);
    setTimeout(() => {
      this.settingsSavedNotice.set(false);
    }, 2800);
  }
}
