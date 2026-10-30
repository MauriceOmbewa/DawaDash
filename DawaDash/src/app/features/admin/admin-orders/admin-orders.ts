import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminOrder } from '../models/admin-models';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
})
export class AdminOrders {
  searchQuery = signal('');
  countyFilter = signal('All');

  orders = signal<AdminOrder[]>([
    {
      id: 'ord-101',
      orderNumber: 'DD-9842',
      customerName: 'Brian Kiprop',
      itemsSummary: 'Cetirizine 10mg (x1), Panadol Extra (x2)',
      chemistName: 'Westlands Care Pharmacy',
      county: 'Nairobi',
      totalAmount: 950,
      status: 'Dispatched',
      time: '12:15 pm',
    },
    {
      id: 'ord-102',
      orderNumber: 'DD-9841',
      customerName: 'Faith Muthoni',
      itemsSummary: 'Panadol Extra (x1), Cetirizine (x1)',
      chemistName: 'Kilimani Medical Chemists',
      county: 'Nairobi',
      totalAmount: 600,
      status: 'Preparing',
      time: '11:40 am',
    },
    {
      id: 'ord-103',
      orderNumber: 'DD-9840',
      customerName: 'Moses Wafula',
      itemsSummary: 'Augmentin 625mg (x1)',
      chemistName: 'Nyali Coast Dispensary',
      county: 'Mombasa',
      totalAmount: 1850,
      status: 'Delivered',
      time: '10:05 am',
    },
    {
      id: 'ord-104',
      orderNumber: 'DD-9839',
      customerName: 'David Mutua',
      itemsSummary: 'Omeprazole 20mg (x1)',
      chemistName: 'Milimani Chemist Kisumu',
      county: 'Kisumu',
      totalAmount: 450,
      status: 'Delivered',
      time: '9:20 am',
    },
  ]);

  filteredOrders = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const c = this.countyFilter();

    return this.orders().filter((o: AdminOrder) => {
      const matchSearch =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.itemsSummary.toLowerCase().includes(q);
      const matchCounty = c === 'All' || o.county === c;
      return matchSearch && matchCounty;
    });
  });
}
