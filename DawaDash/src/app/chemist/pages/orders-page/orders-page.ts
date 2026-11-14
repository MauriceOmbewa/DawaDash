import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ChemistOrderStatus } from '../../models/chemist-order.model';
import { ChemistOrdersService } from '../../services/chemist-orders.service';

type OrderFilter = 'All' | 'New' | 'Preparing' | 'Ready' | 'Delivered';

@Component({
  selector: 'app-orders-page',
  imports: [RouterLink],
  templateUrl: './orders-page.html',
  styleUrls: ['../../../shared/styles/page-shared.css', './orders-page.css'],
})
export class OrdersPage {
  private readonly orderService = inject(ChemistOrdersService);
  private readonly router = inject(Router);

  readonly orders = this.orderService.orders;
  readonly filter = signal<OrderFilter>('All');
  readonly tabs: OrderFilter[] = ['All', 'New', 'Preparing', 'Ready', 'Delivered'];
  readonly stats = [
    { label: 'New', value: 4 },
    { label: 'Preparing', value: 2 },
    { label: 'Ready', value: 1 },
    { label: 'Done today', value: 9 },
  ];

  readonly visible = computed(() => {
    const filter = this.filter();
    return this.orders().filter((order) => {
      if (filter === 'All') return true;
      if (filter === 'New') return order.status === 'New' || order.status === 'Check Rx';
      return order.status === filter;
    });
  });

  statusClass(status: ChemistOrderStatus): string {
    return status.toLowerCase().replace(/\s+/g, '-');
  }

  formatPrice(amount: number): string {
    return `KES ${amount.toLocaleString()}`;
  }

  openOrder(id: number): void {
    this.router.navigate(['/chemist/orders', id]);
  }

  openOrderFromKeyboard(event: Event, id: number): void {
    if (event.target instanceof HTMLAnchorElement) return;
    this.openOrder(id);
  }
}
