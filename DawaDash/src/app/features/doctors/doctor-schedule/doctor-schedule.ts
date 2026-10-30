import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment, ConsultType } from '../models/doctor-models';

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
  selectedDay = signal('Wed');
  typeFilter = signal<'All' | ConsultType>('All');
  showAddSlotModal = signal(false);

  // Form states
  newPatientName = signal('');
  newTime = signal('11:00 am');
  newType = signal<ConsultType>('Video consult');
  newSymptoms = signal('');

  weekDays = signal<DayOption[]>([
    { day: 'Mon', date: 'Oct 27', count: 5 },
    { day: 'Tue', date: 'Oct 28', count: 7 },
    { day: 'Wed', date: 'Oct 29', count: 6 },
    { day: 'Thu', date: 'Oct 30', count: 4 },
    { day: 'Fri', date: 'Oct 31', count: 8 },
    { day: 'Sat', date: 'Nov 01', count: 3 },
    { day: 'Sun', date: 'Nov 02', count: 0 },
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

  selectDay(day: string) {
    this.selectedDay.set(day);
  }

  setTypeFilter(type: 'All' | ConsultType) {
    this.typeFilter.set(type);
  }

  openAddSlot() {
    this.showAddSlotModal.set(true);
  }

  closeAddSlot() {
    this.showAddSlotModal.set(false);
  }

  saveSlot() {
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
}
