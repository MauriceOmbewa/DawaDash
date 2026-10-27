import { Injectable, computed, signal } from '@angular/core';
import { Medicine } from '../models/medicine.models';

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly items = signal<CartItem[]>([]);

  /** Total number of items, shown as "Cart (2)" in the navbar */
  readonly count = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0),
  );

  add(medicine: Medicine) {
    this.items.update((items) => {
      const existing = items.find((i) => i.medicine.id === medicine.id);
      if (existing) {
        return items.map((i) =>
          i.medicine.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...items, { medicine, quantity: 1 }];
    });
  }
}