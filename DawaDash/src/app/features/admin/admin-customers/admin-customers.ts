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

  // Reason modal dialog state for Suspend or Ban action
  showReasonModal = signal<boolean>(false);
  selectedCustomer = signal<AdminCustomer | null>(null);
  actionType = signal<'suspend' | 'ban'>('suspend');
  actionReason = signal<string>('');

  // Customer list
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
    {
      id: 'cust-5',
      name: '[Customer name]',
      city: 'Nakuru',
      ordersCount: 3,
      joinedDate: '[date]',
      status: 'suspended',
      email: 'grace.wanjiku@example.com',
      phone: '+254 756 789 012',
      suspendReason: 'Pending review after repeated cancelled COD orders.',
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
        (customer.suspendReason && customer.suspendReason.toLowerCase().includes(query)) ||
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

  onStatusSelectChange(customer: AdminCustomer, event: Event): void {
    const selectEl = event.target as HTMLSelectElement;
    const nextStatus = selectEl.value as AdminCustomer['status'];

    if (nextStatus === customer.status) return;

    if (nextStatus === 'active') {
      this.reactivateCustomer(customer.id);
      return;
    }

    if (nextStatus === 'suspended' || nextStatus === 'banned') {
      // Revert visual select until modal confirmation
      selectEl.value = customer.status;
      this.openReasonModal(customer, nextStatus === 'suspended' ? 'suspend' : 'ban');
    }
  }

  openReasonModal(customer: AdminCustomer, type: 'suspend' | 'ban'): void {
    this.selectedCustomer.set(customer);
    this.actionType.set(type);
    this.actionReason.set(
      type === 'suspend'
        ? 'Temporary hold pending order or verification review'
        : 'Fraudulent prescription or abusive order conduct'
    );
    this.showReasonModal.set(true);
  }

  closeReasonModal(): void {
    this.showReasonModal.set(false);
    this.selectedCustomer.set(null);
    this.actionReason.set('');
  }

  confirmReasonAction(): void {
    const target = this.selectedCustomer();
    if (!target) return;

    const type = this.actionType();
    const reason =
      this.actionReason().trim() ||
      (type === 'suspend'
        ? 'Account temporarily suspended by platform administrator'
        : 'Account banned by platform administrator');

    this.customers.update((list) =>
      list.map((c) => {
        if (c.id !== target.id) return c;
        return type === 'suspend'
          ? {
              ...c,
              status: 'suspended' as const,
              suspendReason: reason,
              banReason: undefined,
            }
          : {
              ...c,
              status: 'banned' as const,
              banReason: reason,
              suspendReason: undefined,
            };
      })
    );

    this.closeReasonModal();
  }

  reactivateCustomer(id: string): void {
    this.customers.update((list) =>
      list.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'active' as const,
              suspendReason: undefined,
              banReason: undefined,
            }
          : c
      )
    );
  }
}
