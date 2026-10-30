import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApprovalType, PendingProvider } from '../models/admin-models';

@Component({
  selector: 'app-admin-approvals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-approvals.html',
  styleUrl: './admin-approvals.css',
})
export class AdminApprovals {
  filterType = signal<'All' | ApprovalType>('All');

  providers = signal<PendingProvider[]>([
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
    {
      id: 'app-4',
      type: 'Chemist',
      name: 'Apex Care Chemists',
      specialtyOrDetails: 'Licence uploaded · Nairobi West',
      location: 'Nairobi',
      licenseNumber: 'PPB/RET/2026/102',
      submittedDate: 'Oct 28',
      status: 'pending',
    },
  ]);

  filteredProviders = computed(() => {
    const f = this.filterType();
    return this.providers().filter((p: PendingProvider) => f === 'All' || p.type === f);
  });

  approve(id: string) {
    this.providers.update((list: PendingProvider[]) =>
      list.filter((p: PendingProvider) => p.id !== id)
    );
  }

  reject(id: string) {
    this.providers.update((list: PendingProvider[]) =>
      list.filter((p: PendingProvider) => p.id !== id)
    );
  }
}
