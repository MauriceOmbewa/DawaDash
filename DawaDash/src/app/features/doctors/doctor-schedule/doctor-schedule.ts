import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Appointment,
  ConsultType,
  ConsultationSetting,
  WeekDayShort,
} from '../models/doctor-models';

interface DayOption {
  day: string;
  date: string;
  count: number;
}

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-schedule.html',
  styleUrl: './doctor-schedule.css',
})
export class DoctorSchedule {
  // Transitions between 'schedule' (table view) and 'settings' (Consultation settings UI)
  activeView = signal<'schedule' | 'settings'>('schedule');

  selectedDay = signal('Wed');
  typeFilter = signal<'All' | ConsultType>('All');
  showAddSlotModal = signal(false);
  settingsSavedNotice = signal(false);

  // Form states for Add Slot modal
  newPatientName = signal('');
  newTime = signal('11:00 am');
  newType = signal<ConsultType>('Video consult');
  newSymptoms = signal('');

  readonly allDays: WeekDayShort[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  weekDays = signal<DayOption[]>([
    { day: 'Mon', date: 'Oct 27', count: 5 },
    { day: 'Tue', date: 'Oct 28', count: 7 },
    { day: 'Wed', date: 'Oct 29', count: 6 },
    { day: 'Thu', date: 'Oct 30', count: 4 },
    { day: 'Fri', date: 'Oct 31', count: 8 },
    { day: 'Sat', date: 'Nov 01', count: 3 },
    { day: 'Sun', date: 'Nov 02', count: 0 },
  ]);

  // Consultation settings state (Virtual, Hospital visit, Home visit)
  consultationSettings = signal<ConsultationSetting[]>([
    {
      id: 'virtual',
      title: 'Virtual',
      subtitle: 'Video call online in the app',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      fromTime: '6:00 pm',
      toTime: '9:00 pm',
      fee: 2000,
      footerNote: 'Patients join a secure video call from the app.',
    },
    {
      id: 'hospital',
      title: 'Hospital visit',
      subtitle: 'Patients come to you',
      enabled: true,
      days: ['Tue', 'Thu'],
      fromTime: '9:00 am',
      toTime: '1:00 pm',
      fee: 2500,
      footerNote: 'Location: [Hospital name], Mombasa',
    },
    {
      id: 'home',
      title: 'Home visit',
      subtitle: 'You visit the patient',
      enabled: true,
      days: ['Sat'],
      fromTime: '10:00 am',
      toTime: '4:00 pm',
      fee: 3000,
      footerNote: 'Travel radius: 10 km',
    },
  ]);

  appointments = signal<Appointment[]>([
    {
      id: 'apt-1',
      patient: {
        id: 'pat-1',
        name: 'Faith Muthoni',
        age: 28,
        gender: 'Female',
        phone: '+254 722 112 334',
        location: 'Kilimani, Nairobi',
        county: 'Nairobi',
        allergies: ['Penicillin'],
        bloodGroup: 'O+',
        symptoms: 'Persistent dry cough and fever.',
      },
      time: '9:00 am',
      date: 'Today',
      type: 'Video consult',
      isPaid: true,
      status: 'start',
    },
    {
      id: 'apt-2',
      patient: {
        id: 'pat-2',
        name: 'John Ochieng',
        age: 42,
        gender: 'Male',
        phone: '+254 733 445 566',
        location: 'Westlands, Nairobi',
        county: 'Nairobi',
        allergies: [],
        bloodGroup: 'A+',
        symptoms: 'Hypertension routine monitoring.',
      },
      time: '10:30 am',
      date: 'Today',
      type: 'Clinic visit',
      isPaid: true,
      status: 'next',
    },
    {
      id: 'apt-3',
      patient: {
        id: 'pat-3',
        name: 'Wanjiku Mwangi',
        age: 34,
        gender: 'Female',
        phone: '+254 721 889 900',
        location: 'Parklands, Nairobi',
        county: 'Nairobi',
        allergies: [],
        bloodGroup: 'B+',
        symptoms: 'Gastric pain & heartburn.',
      },
      time: '2:00 pm',
      date: 'Today',
      type: 'Video consult',
      isPaid: true,
      status: 'booked',
    },
    {
      id: 'apt-4',
      patient: {
        id: 'pat-4',
        name: 'Brian Kiprop',
        age: 23,
        gender: 'Male',
        phone: '+254 718 223 344',
        location: 'Ruaraka, Nairobi',
        county: 'Nairobi',
        allergies: [],
        bloodGroup: 'O+',
        symptoms: 'Allergic rhinitis.',
      },
      time: '3:30 pm',
      date: 'Today',
      type: 'Video consult',
      isPaid: true,
      status: 'booked',
    },
  ]);

  filteredAppointments = computed(() => {
    const filter = this.typeFilter();
    return this.appointments().filter((apt: Appointment) => {
      if (filter === 'All') return true;
      return apt.type === filter;
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

  setTypeFilter(type: 'All' | ConsultType): void {
    this.typeFilter.set(type);
  }

  toggleSlotActive(aptId: string): void {
    this.appointments.update((list: Appointment[]) =>
      list.map((apt) =>
        apt.id === aptId
          ? {
              ...apt,
              status: apt.status === 'cancelled' ? 'booked' : 'cancelled',
            }
          : apt
      )
    );
  }

  openAddSlot(): void {
    this.showAddSlotModal.set(true);
  }

  closeAddSlot(): void {
    this.showAddSlotModal.set(false);
  }

  saveSlot(): void {
    if (!this.newPatientName().trim()) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      time: this.newTime(),
      date: 'Today',
      type: this.newType(),
      isPaid: true,
      status: 'booked',
      patient: {
        id: `pat-${Date.now()}`,
        name: this.newPatientName().trim(),
        age: 30,
        gender: 'Female',
        phone: '+254 700 000 000',
        location: 'Nairobi',
        county: 'Nairobi',
        allergies: [],
        bloodGroup: 'O+',
        symptoms: this.newSymptoms() || 'Consultation slot booking',
      },
    };

    this.appointments.update((list: Appointment[]) => [...list, newApt]);
    this.newPatientName.set('');
    this.newSymptoms.set('');
    this.closeAddSlot();
  }

  // Consultation Settings Actions
  toggleChannel(channelId: 'virtual' | 'hospital' | 'home'): void {
    this.consultationSettings.update((list) =>
      list.map((item) =>
        item.id === channelId ? { ...item, enabled: !item.enabled } : item
      )
    );
  }

  isDaySelected(setting: ConsultationSetting, day: WeekDayShort): boolean {
    return setting.days.includes(day);
  }

  toggleDay(channelId: 'virtual' | 'hospital' | 'home', day: WeekDayShort): void {
    this.consultationSettings.update((list) =>
      list.map((item) => {
        if (item.id !== channelId) return item;
        const exists = item.days.includes(day);
        return {
          ...item,
          days: exists
            ? item.days.filter((d) => d !== day)
            : [...item.days, day],
        };
      })
    );
  }

  updateChannelField(
    channelId: 'virtual' | 'hospital' | 'home',
    field: 'fromTime' | 'toTime' | 'fee',
    value: string | number
  ): void {
    this.consultationSettings.update((list) =>
      list.map((item) => {
        if (item.id !== channelId) return item;
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

  saveConsultationSettings(): void {
    this.settingsSavedNotice.set(true);
    setTimeout(() => {
      this.settingsSavedNotice.set(false);
    }, 2800);
  }
}
