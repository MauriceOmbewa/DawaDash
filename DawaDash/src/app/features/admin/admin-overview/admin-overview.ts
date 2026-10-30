import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PendingProvider, PlatformOverviewStats } from '../models/admin-models';

@Component({
  selector: 'app-admin-overview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.css',
})
export class AdminOverview {
  // 4 Top Stats matching screenshot
  stats = signal<PlatformOverviewStats>({
    ordersToday: 128,
    chemistsCount: 42,
    doctorsCount: 31,
    nursesCount: 18,
    platformFeePercent: 10,
  });

  // Waiting for approval list matching screenshot
  pendingApprovals = signal<PendingProvider[]>([
    {
      id: 'app-1',
      type: 'Chemist',
      name: 'Diani Beach Pharmacy',
      specialtyOrDetails: 'Licence uploaded · Mombasa',
      location: 'Mombasa',
      licenseNumber: 'PPB/RET/2026/884',
      submittedDate: 'Today 9:15 am',
      status: 'pending',
    },
    {
      id: 'app-2',
      type: 'Doctor',
      name: 'Dr. Amani Otieno',
      specialtyOrDetails: 'Dentist · Kisumu',
      location: 'Kisumu',
      licenseNumber: 'KMPDC/B-41920',
      submittedDate: 'Today 8:40 am',
      status: 'pending',
    },
    {
      id: 'app-3',
      type: 'Nurse',
      name: 'Faith Kerubo',
      specialtyOrDetails: 'Wound care · Nairobi',
      location: 'Nairobi',
      licenseNumber: 'NCK/RN-5821',
      submittedDate: 'Yesterday 6:00 pm',
      status: 'pending',
    },
  ]);

  approveProvider(id: string) {
    const target = this.pendingApprovals().find((p: PendingProvider) => p.id === id);
    if (!target) return;

    // Remove from pending
    this.pendingApprovals.update((list: PendingProvider[]) =>
      list.filter((p: PendingProvider) => p.id !== id)
    );

    // Increment corresponding count
    this.stats.update((s: PlatformOverviewStats) => {
      if (target.type === 'Chemist') return { ...s, chemistsCount: s.chemistsCount + 1 };
      if (target.type === 'Doctor') return { ...s, doctorsCount: s.doctorsCount + 1 };
      if (target.type === 'Nurse') return { ...s, nursesCount: s.nursesCount + 1 };
      return s;
    });
  }

  rejectProvider(id: string) {
    this.pendingApprovals.update((list: PendingProvider[]) =>
      list.filter((p: PendingProvider) => p.id !== id)
    );
  }
}
