import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment, DoctorStats } from '../models/doctor-models';

@Component({
  selector: 'app-doctor-today',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-today.html',
  styleUrl: './doctor-today.css',
})
export class DoctorToday {
  // Doctor state
  doctorName = signal('Felix');
  isAvailable = signal(true);
  consultationFee = signal(2000); // KES

  // Editing state for fee modal
  isEditingFee = signal(false);
  tempFee = signal(2000);

  // Active consultation state
  activeConsultation = signal<Appointment | null>(null);

  // Appointments for today matching the screenshots
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
        symptoms: 'Persistent dry cough, mild sore throat for 3 days.',
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
        symptoms: 'Routine hypertension follow-up & chronic refill.',
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
        allergies: ['Sulfa drugs'],
        bloodGroup: 'B+',
        symptoms: 'Epigastric discomfort and acid regurgitation.',
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
        symptoms: 'Seasonal allergic rhinitis & congestion.',
      },
      time: '3:30 pm',
      date: 'Today',
      type: 'Video consult',
      isPaid: true,
      status: 'booked',
    },
    {
      id: 'apt-5',
      patient: {
        id: 'pat-5',
        name: 'Achieng Otieno',
        age: 51,
        gender: 'Female',
        phone: '+254 705 667 788',
        location: 'South B, Nairobi',
        county: 'Nairobi',
        allergies: ['Aspirin'],
        bloodGroup: 'AB+',
        symptoms: 'Right knee joint pain on movement.',
      },
      time: '4:45 pm',
      date: 'Today',
      type: 'Clinic visit',
      isPaid: true,
      status: 'booked',
    },
    {
      id: 'apt-6',
      patient: {
        id: 'pat-6',
        name: 'David Mutua',
        age: 38,
        gender: 'Male',
        phone: '+254 792 554 433',
        location: 'Lavington, Nairobi',
        county: 'Nairobi',
        allergies: [],
        bloodGroup: 'O-',
        symptoms: 'Tension headache & fatigue.',
      },
      time: '6:00 pm',
      date: 'Today',
      type: 'Video consult',
      isPaid: true,
      status: 'booked',
    },
  ]);

  // Computed platform fee calculations (10% platform fee)
  platformFee = computed(() => Math.round(this.consultationFee() * 0.1));
  totalPatientFee = computed(() => this.consultationFee() + this.platformFee());

  // Statistics
  stats = signal<DoctorStats>({
    todayCount: 6,
    weekCount: 18,
    earnedToday: 12000,
    rating: 4.8,
    reviewCount: 142,
  });

  // Action methods
  toggleAvailability() {
    this.isAvailable.update((val: boolean) => !val);
  }

  openEditFee() {
    this.tempFee.set(this.consultationFee());
    this.isEditingFee.set(true);
  }

  closeEditFee() {
    this.isEditingFee.set(false);
  }

  saveConsultationFee() {
    if (this.tempFee() > 0) {
      this.consultationFee.set(this.tempFee());
    }
    this.closeEditFee();
  }

  startConsultation(appointment: Appointment) {
    this.activeConsultation.set(appointment);
  }

  closeConsultation() {
    this.activeConsultation.set(null);
  }

  completeConsultation(appointmentId: string) {
    this.appointments.update((list: Appointment[]) =>
      list.map((apt: Appointment) =>
        apt.id === appointmentId ? { ...apt, status: 'completed' as const } : apt
      )
    );
    this.stats.update((st: DoctorStats) => ({
      ...st,
      earnedToday: st.earnedToday + this.consultationFee(),
    }));
    this.closeConsultation();
  }
}
