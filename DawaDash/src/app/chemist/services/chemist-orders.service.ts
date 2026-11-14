import { Injectable, signal } from '@angular/core';
import { ChemistOrder, ChemistOrderStatus } from '../models/chemist-order.model';

@Injectable({ providedIn: 'root' })
export class ChemistOrdersService {
  readonly orders = signal<ChemistOrder[]>([
    {
      id: 1061,
      status: 'New',
      customerName: 'Customer name',
      phone: '+254 700 000 001',
      dropoff: 'Nyali Road, Mombasa',
      placedAt: '05/11/2026, 13:22',
      items: [
        { name: 'Paracetamol 500mg', code: 'MED-001', shortLabel: 'Pa', quantity: 2, unitPrice: 120 },
        { name: 'ORS Sachets', code: 'MED-002', shortLabel: 'OR', quantity: 1, unitPrice: 60 },
      ],
      deliveryFee: 0,
      total: 300,
      paymentStatus: 'Paid',
      paymentMethod: 'M-Pesa',
      paymentChannel: 'Online',
      requiresPrescription: false,
    },
    {
      id: 1060,
      status: 'Check Rx',
      customerName: 'Customer name',
      phone: '+254 700 000 002',
      dropoff: 'Nyali Road, Mombasa',
      placedAt: '05/11/2026, 12:48',
      items: [
        { name: 'Amoxicillin 500mg', code: 'MED-003', shortLabel: 'Am', quantity: 1, unitPrice: 450 },
      ],
      deliveryFee: 0,
      total: 450,
      paymentStatus: 'Paid',
      paymentMethod: 'M-Pesa',
      paymentChannel: 'Online',
      requiresPrescription: true,
    },
    {
      id: 1058,
      status: 'Preparing',
      customerName: 'Customer name',
      phone: '+254 700 000 003',
      dropoff: 'Kisauni, Mombasa',
      placedAt: '05/11/2026, 11:35',
      items: [
        { name: 'Vitamin C 1000mg', code: 'MED-005', shortLabel: 'VC', quantity: 1, unitPrice: 350 },
        { name: 'Zinc Tablets', code: 'MED-004', shortLabel: 'Zn', quantity: 2, unitPrice: 145 },
      ],
      deliveryFee: 0,
      total: 640,
      paymentStatus: 'Paid',
      paymentMethod: 'M-Pesa',
      paymentChannel: 'Online',
      requiresPrescription: false,
    },
    {
      id: 1055,
      status: 'Ready',
      customerName: 'Customer name',
      phone: '+254 700 000 004',
      dropoff: 'Mombasa Island',
      placedAt: '05/11/2026, 10:10',
      items: [
        { name: 'Paracetamol 500mg', code: 'MED-001', shortLabel: 'Pa', quantity: 1, unitPrice: 120 },
      ],
      deliveryFee: 0,
      total: 120,
      paymentStatus: 'Paid',
      paymentMethod: 'M-Pesa',
      paymentChannel: 'Online',
      requiresPrescription: false,
    },
  ]);

  getById(id: number): ChemistOrder | undefined {
    return this.orders().find((order) => order.id === id);
  }

  updateStatus(id: number, status: ChemistOrderStatus): void {
    this.orders.update((orders) =>
      orders.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  }
}
