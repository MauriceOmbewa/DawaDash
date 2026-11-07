import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCustomer, CustomerFilterStatus } from '../models/admin-models';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css',
})
export class AdminCustomers {
  // Search query & active filter chip
  searchTerm = signal<string>('');
  activeFilter = signal<CustomerFilterStatus>('all');

  // Reason modal dialog state for Ban action
  showBanModal = signal<boolean>(false);
  selectedCustomer = signal<AdminCustomer | null>(null);
  banReason = signal<string>('');

  // Customer list matching screenshot
  customers = signal<AdminCustomer[]>([
    {
      id: 'cust-1',
      name: '[Customer name]',
      city: 'Mombasa',
      ordersCount: 12,
      joinedDate: '[date]',
      status: 'active',
      email: 'amina.juma@example.com',
      phone: '+254 712 345 678',
    },
    {
      id: 'cust-2',
      name: '[Customer name]',
      city: 'Nairobi',
      ordersCount: 4,
      joinedDate: '[date]',
      status: 'active',
      email: 'david.kamau@example.com',
      phone: '+254 723 456 789',
    },
    {
      id: 'cust-3',
      name: '[Customer name]',
      city: 'Kisumu',
      ordersCount: 1,
      joinedDate: '[date]',
      status: 'banned',
      email: 'brian.otieno@example.com',
      phone: '+254 734 567 890',
      banReason: 'Fraudulent prescription submission attempts.',
    },
    {
      id: 'cust-4',
      name: '[Customer name]',
      city: 'Mombasa',
      ordersCount: 7,
      joinedDate: '[date]',
      status: 'active',
      email: 'fatma.omar@example.com',
      phone: '+254 745 678 901',
    },
  ]);

  // Computed filtered customers based on search and active filter
  filteredCustomers = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.customers().filter((customer) => {
      const matchesFilter = filter === 'all' || customer.status === filter;
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        (customer.banReason && customer.banReason.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });
  });

  setFilter(filter: CustomerFilterStatus): void {
    this.activeFilter.set(filter);
  }

  onSearch(): void {
    // Computed automatically updates with searchTerm signal
  }

  openBanModal(customer: AdminCustomer): void {
    this.selectedCustomer.set(customer);
    this.banReason.set('Fraudulent prescription or abusive order conduct');
    this.showBanModal.set(true);
  }

  closeBanModal(): void {
    this.showBanModal.set(false);
    this.selectedCustomer.set(null);
    this.banReason.set('');
  }

  confirmBan(): void {
    const target = this.selectedCustomer();
    if (!target) return;

    const reason = this.banReason().trim() || 'Account restricted by platform administrator';

    this.customers.update((list) =>
      list.map((c) =>
        c.id === target.id
          ? {
              ...c,
              status: 'banned' as const,
              banReason: reason,
            }
          : c
      )
    );

    this.closeBanModal();
  }

  liftBan(id: string): void {
    this.customers.update((list) =>
      list.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'active' as const,
              banReason: undefined,
            }
          : c
      )
    );
  }
}