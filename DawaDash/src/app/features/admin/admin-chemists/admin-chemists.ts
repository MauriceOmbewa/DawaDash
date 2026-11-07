import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chemist, ChemistStatus } from '../models/admin-models';

@Component({
  selector: 'app-admin-chemists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-chemists.html',
  styleUrl: './admin-chemists.css',
})
export class AdminChemists {
  // Search query & active filter pill
  searchTerm = signal<string>('');
  activeFilter = signal<ChemistStatus>('all');

  // Reason modal dialog state for Suspend or Ban
  showReasonModal = signal<boolean>(false);
  actionTarget = signal<Chemist | null>(null);
  actionType = signal<'suspend' | 'ban'>('suspend');
  actionReason = signal<string>('');

  // Initial chemists matching the provided screenshots
  chemists = signal<Chemist[]>([
    {
      id: 'ch-1',
      name: '[Chemist name]',
      location: 'Mombasa',
      licenceStatus: 'Licence valid',
      ordersCount: 126,
      status: 'active',
      licenseNumber: 'PPB/RET/2026/884',
      phone: '+254 711 234 567',
    },
    {
      id: 'ch-2',
      name: '[Chemist name]',
      location: 'Nairobi',
      licenceStatus: 'Licence uploaded · Not reviewed',
      status: 'pending',
      licenseNumber: 'PPB/RET/2026/912',
      phone: '+254 722 345 678',
    },
    {
      id: 'ch-3',
      name: '[Chemist name]',
      location: 'Kisumu',
      licenceStatus: 'Licence expired · Reason saved',
      status: 'suspended',
      reason: 'Pharmacy Board licence renewal fee pending validation.',
      licenseNumber: 'PPB/RET/2025/441',
      phone: '+254 733 456 789',
    },
    {
      id: 'ch-4',
      name: '[Chemist name]',
      location: 'Nakuru',
      licenceStatus: 'Banned · Reason saved',
      status: 'banned',
      reason: 'Repeated non-compliance with digital prescription dispatch policy.',
      licenseNumber: 'PPB/RET/2024/110',
      phone: '+254 744 567 890',
    },
  ]);

  // Computed filtered list based on search and active chip
  filteredChemists = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.chemists().filter((c) => {
      const matchesFilter = filter === 'all' || c.status === filter;
      const matchesSearch =
        !query ||
        c.name.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.licenceStatus.toLowerCase().includes(query) ||
        (c.reason && c.reason.toLowerCase().includes(query));
      return matchesFilter && matchesSearch;
    });
  });

  setFilter(filter: ChemistStatus): void {
    this.activeFilter.set(filter);
  }

  onSearch(): void {
    // Computed automatically updates with searchTerm
  }

  approveChemist(id: string): void {
    this.chemists.update((list) =>
      list.map((c) =>
        c.id === id
          ? { ...c, status: 'active' as const, licenceStatus: 'Licence valid · 0 orders', ordersCount: 0 }
          : c
      )
    );
  }

  rejectChemist(id: string): void {
    this.chemists.update((list) => list.filter((c) => c.id !== id));
  }

  reactivateChemist(id: string): void {
    this.chemists.update((list) =>
      list.map((c) =>
        c.id === id
          ? { ...c, status: 'active' as const, licenceStatus: 'Licence reinstated · Active', reason: undefined }
          : c
      )
    );
  }

  liftBan(id: string): void {
    this.chemists.update((list) =>
      list.map((c) =>
        c.id === id
          ? { ...c, status: 'active' as const, licenceStatus: 'Ban lifted · Active', reason: undefined }
          : c
      )
    );
  }

  openReasonModal(chemist: Chemist, type: 'suspend' | 'ban'): void {
    this.actionTarget.set(chemist);
    this.actionType.set(type);
    this.actionReason.set(
      type === 'suspend'
        ? 'Licence expired or pending inspection'
        : 'Policy violation or repeated customer complaints'
    );
    this.showReasonModal.set(true);
  }

  closeReasonModal(): void {
    this.showReasonModal.set(false);
    this.actionTarget.set(null);
    this.actionReason.set('');
  }

  confirmReasonAction(): void {
    const target = this.actionTarget();
    if (!target) return;

    const type = this.actionType();
    const reasonText = this.actionReason().trim() || 'Reason recorded by platform admin';

    this.chemists.update((list) =>
      list.map((c) => {
        if (c.id !== target.id) return c;
        return type === 'suspend'
          ? { ...c, status: 'suspended' as const, licenceStatus: 'Licence expired · Reason saved', reason: reasonText }
          : { ...c, status: 'banned' as const, licenceStatus: 'Banned · Reason saved', reason: reasonText };
      })
    );
    this.closeReasonModal();
  }
}