import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type StockStatus = 'in' | 'low' | 'out';
type StatusFilter = 'all' | 'active' | 'low' | 'out';
type MarketplaceFilter = 'all' | 'published' | 'hidden';
type ViewMode = 'table' | 'grid';

interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  needsPrescription: boolean;
  published: boolean;
}

@Component({
  selector: 'app-products-page',
  imports: [RouterLink],
  templateUrl: './products-page.html',
  styleUrls: ['../../../shared/styles/page-shared.css', './products-page.css'],
})
export class ProductsPage {
  readonly products = signal<Product[]>([
    { id: 1, name: 'Paracetamol 500mg', code: 'MED-001', category: 'Pain relief', price: 120, stock: 240, sales: 38, needsPrescription: false, published: true },
    { id: 2, name: 'ORS Sachets', code: 'MED-002', category: 'Rehydration', price: 60, stock: 8, sales: 17, needsPrescription: false, published: true },
    { id: 3, name: 'Amoxicillin 500mg', code: 'MED-003', category: 'Antibiotics', price: 450, stock: 30, sales: 12, needsPrescription: true, published: true },
    { id: 4, name: 'Zinc Tablets', code: 'MED-004', category: 'Vitamins and supplements', price: 150, stock: 0, sales: 0, needsPrescription: false, published: false },
    { id: 5, name: 'Vitamin C 1000mg', code: 'MED-005', category: 'Vitamins and supplements', price: 350, stock: 60, sales: 9, needsPrescription: false, published: true },
  ]);

  readonly categories = [
    'Pain relief',
    'Antibiotics',
    'Vitamins and supplements',
    'Rehydration',
  ];
  readonly query = signal('');
  readonly category = signal('all');
  readonly status = signal<StatusFilter>('all');
  readonly marketplace = signal<MarketplaceFilter>('all');
  readonly view = signal<ViewMode>('table');

  readonly visible = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.products().filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query);
      const matchesCategory =
        this.category() === 'all' || product.category === this.category();
      const stockStatus = this.statusOf(product);
      const matchesStatus =
        this.status() === 'all' ||
        (this.status() === 'active' && stockStatus !== 'out') ||
        this.status() === stockStatus;
      const matchesMarketplace =
        this.marketplace() === 'all' ||
        (this.marketplace() === 'published' && product.published) ||
        (this.marketplace() === 'hidden' && !product.published);

      return matchesQuery && matchesCategory && matchesStatus && matchesMarketplace;
    });
  });

  readonly publishedCount = computed(
    () => this.products().filter((product) => product.published).length,
  );

  statusOf(product: Product): StockStatus {
    if (product.stock === 0) return 'out';
    if (product.stock <= 10) return 'low';
    return 'in';
  }

  statusLabel(product: Product): string {
    return this.statusOf(product) === 'out' ? 'Out of stock' : 'Active';
  }

  toggleMarketplace(product: Product): void {
    this.products.update((products) =>
      products.map((item) =>
        item.id === product.id ? { ...item, published: !item.published } : item,
      ),
    );
  }

  publishAll(): void {
    this.products.update((products) => products.map((product) => ({ ...product, published: true })));
  }
}
