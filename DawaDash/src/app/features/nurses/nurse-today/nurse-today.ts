import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NursePatient, NurseStats } from '../models/nurse-models';

interface VisitRequest {
  id: string;
  patientName: string;
  service: string;
  locationTime: string;
  isPaid: boolean;
  status: 'pending' | 'accepted' | 'declined';
}

interface TodayVisit {
  id: string;
  time: string;
  patientName: string;
  locationService: string;
  address: string;
  service: string;
  phone: string;
}

@Component({
  selector: 'app-nurse-today',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-today.html',
  styleUrl: './nurse-today.css',
})
export class NurseToday {
  nurseName = signal('Mercy');
  isAvailable = signal(true);

  // Statistics matching screenshot
  stats = signal<NurseStats>({
    visitsToday: 3,
    newRequests: 2,
    earnedToday: 3960, // KES
    rating: 4.9,
    completedVisitsCount: 14,
  });

  // Section: New requests matching screenshot
  newRequests = signal<VisitRequest[]>([
    {
      id: 'req-1',
      patientName: 'Halima Abdi',
      service: 'Wound care',
      locationTime: 'Nyali, tomorrow 8:00 am · Paid',
      isPaid: true,
      status: 'pending',
    },
    {
      id: 'req-2',
      patientName: 'Peter Mwangi',
      service: 'Injections',
      locationTime: 'Bamburi, today 4:00 pm · Paid',
      isPaid: true,
      status: 'pending',
    },
  ]);

  // Section: Today visits matching screenshot
  todayVisits = signal<TodayVisit[]>([
    {
      id: 'visit-1',
      time: '11:00 am',
      patientName: 'Mariam Hassan',
      locationService: 'Kisauni · Wound care',
      address: 'House 14, Near Kisauni Health Centre, Mombasa',
      service: 'Post-op dressing & sterile wound cleansing',
      phone: '+254 712 998 877',
    },
  ]);

  // Modal states
  selectedDirections = signal<TodayVisit | null>(null);

  acceptRequest(reqId: string) {
    const target = this.newRequests().find((r: VisitRequest) => r.id === reqId);
    if (!target) return;

    // Remove from new requests
    this.newRequests.update((list: VisitRequest[]) =>
      list.filter((r: VisitRequest) => r.id !== reqId)
    );

    // Add to today visits
    const newVisit: TodayVisit = {
      id: `visit-${Date.now()}`,
      time: target.locationTime.includes('4:00 pm') ? '4:00 pm' : '8:00 am',
      patientName: target.patientName,
      locationService: target.locationTime.split(',')[0] + ' · ' + target.service,
      address: target.locationTime.split(',')[0] + ', Mombasa',
      service: target.service,
      phone: '+254 722 000 111',
    };

    this.todayVisits.update((list: TodayVisit[]) => [...list, newVisit]);

    // Update KPI
    this.stats.update((st: NurseStats) => ({
      ...st,
      visitsToday: st.visitsToday + 1,
      newRequests: Math.max(0, st.newRequests - 1),
    }));
  }

  declineRequest(reqId: string) {
    this.newRequests.update((list: VisitRequest[]) =>
      list.filter((r: VisitRequest) => r.id !== reqId)
    );
    this.stats.update((st: NurseStats) => ({
      ...st,
      newRequests: Math.max(0, st.newRequests - 1),
    }));
  }

  openDirections(visit: TodayVisit) {
    this.selectedDirections.set(visit);
  }

  closeDirections() {
    this.selectedDirections.set(null);
  }
}
