import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Medicine } from '../models/medicine.models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  /** Read-only list of what is in the cart (the cart page will use this) */
  readonly items = this._items.asReadonly();

  /** Total number of items, shown as "Cart (2)" in the navbar */
  readonly count = computed(() =>
    this._items().reduce((total, item) => total + item.quantity, 0),
  );

  /**
   * Adds one medicine to the cart.
   * Pass `source` when the customer is ordering from another county.
   */
  add(medicine: Medicine, source?: { county: string; price: number }) {
    const fromCounty = source?.county ?? null;
    const unitPrice = source?.price ?? medicine.price;

    this._items.update((items) => {
      const existing = items.find(
        (item) => item.medicine.id === medicine.id && item.fromCounty === fromCounty,
      );

      if (existing) {
        return items.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...items, { medicine, quantity: 1, unitPrice, fromCounty }];
    });
  }
}