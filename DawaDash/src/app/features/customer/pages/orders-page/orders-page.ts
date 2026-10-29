import { Component, computed, signal } from '@angular/core';

type OrderKind = 'medicine' | 'appointment';
type OrderStatus = 'Delivered' | 'On the way' | 'Booked' | 'Done';
type OrderAction = 'Reorder' | 'Track' | 'Book again';

interface OrderItem {
  id: number;
  kind: OrderKind;
  title: string;
  subtitle: string;
  status: OrderStatus;
  action?: OrderAction;
}

@Component({
  selector: 'app-orders-page',
  imports: [],
  templateUrl: './orders-page.html',
  styleUrls: ['../../../../shared/styles/page-shared.css', './orders-page.css'],
})
export class OrdersPage {
  readonly tabs = [
    { label: 'All', value: 'all' },
    { label: 'Medicines', value: 'medicine' },
    { label: 'Appointments', value: 'appointment' },
  ] as const;

  // Sample orders. Load the real ones from an orders service later.
  private readonly orders: OrderItem[] = [
    { id: 1042, kind: 'medicine', title: 'Order 1042 · 3 items', subtitle: 'Nyali Road, Mombasa', status: 'Delivered', action: 'Reorder' },
    { id: 1051, kind: 'medicine', title: 'Order 1051 · 1 item', subtitle: 'Arriving soon', status: 'On the way', action: 'Track' },
    { id: 1, kind: 'appointment', title: 'Dr. [Name] · Dentist', subtitle: 'Tomorrow 9:00 am', status: 'Booked' },
    { id: 2, kind: 'appointment', title: 'Nurse [Name] · Wound care', subtitle: 'Last Friday', status: 'Done', action: 'Book again' },
    { id: 987, kind: 'medicine', title: 'Order 0987 · 2 items', subtitle: 'Kisauni, Mombasa', status: 'Delivered', action: 'Reorder' },
  ];

  readonly tab = signal<'all' | OrderKind>('all');

  readonly visible = computed(() =>
    this.orders.filter((o) => this.tab() === 'all' || o.kind === this.tab()),
  );

  badgeClass(status: OrderStatus): string {
    return status === 'On the way' ? 'badge badge-warn' : 'badge';
  }

  onAction(order: OrderItem) {
    // TODO: Reorder → refill the cart, Track → open tracking, Book again → open the booking page
  }
}
