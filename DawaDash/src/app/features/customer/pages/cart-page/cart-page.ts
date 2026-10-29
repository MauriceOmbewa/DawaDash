import { Component, computed, signal } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  unitPrice: number;
  qty: number;
}

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.html',
  styleUrls: ['../../../../shared/styles/page-shared.css', './cart-page.css'],
})
export class CartPage {
  // Sample items. Connect these to CartService when it exposes the cart lines.
  readonly items = signal<CartItem[]>([
    { id: 1, name: 'Paracetamol 500mg', unitPrice: 120, qty: 2 },
    { id: 2, name: 'ORS Sachets', unitPrice: 60, qty: 1 },
  ]);

  readonly dropOff = signal('Nyali Road, Mombasa');
  readonly deliveryFee = 150;

  readonly itemCount = computed(() => this.items().length);
  readonly itemsTotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
  );
  readonly total = computed(() => (this.items().length ? this.itemsTotal() + this.deliveryFee : 0));

  changeQty(id: number, delta: number) {
    this.items.update((items) =>
      items
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0),
    );
  }

  changeDropOff() {
    // TODO: open the location picker
  }

  onPay() {
    // TODO: sign in with Google if needed, then start the M-Pesa payment
  }
}
