import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ChemistOrder, ChemistOrderStatus } from '../../models/chemist-order.model';
import { ChemistOrdersService } from '../../services/chemist-orders.service';

@Component({
  selector: 'app-order-detail-page',
  imports: [RouterLink],
  templateUrl: './order-detail-page.html',
  styleUrls: ['../../../shared/styles/page-shared.css', './order-detail-page.css'],
})
export class OrderDetailPage {
  private readonly orderService = inject(ChemistOrdersService);
  private readonly id = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: NaN },
  );

  readonly order = computed(() => this.orderService.getById(this.id()));
  readonly steps = ['New', 'Confirmed', 'Processing', 'Ready', 'Completed'];

  currentStep(status: ChemistOrderStatus): number {
    if (status === 'Cancelled') return -1;
    if (status === 'Check Rx' || status === 'New') return 0;
    if (status === 'Confirmed') return 1;
    if (status === 'Preparing' || status === 'Processing') return 2;
    if (status === 'Ready') return 3;
    return 4;
  }

  subtotal(order: ChemistOrder): number {
    return order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }

  formatPrice(amount: number): string {
    return `KES ${amount.toLocaleString()}`;
  }

  confirmOrder(order: ChemistOrder): void {
    if (order.status === 'New') {
      this.orderService.updateStatus(order.id, 'Confirmed');
    }
  }

  cancelOrder(order: ChemistOrder): void {
    if (order.status !== 'Completed' && order.status !== 'Delivered') {
      this.orderService.updateStatus(order.id, 'Cancelled');
    }
  }
}
