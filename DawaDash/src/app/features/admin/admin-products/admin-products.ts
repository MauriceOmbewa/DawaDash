import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminProduct, ProductFilterStatus } from '../models/admin-models';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.css',
})
export class AdminProducts {
  searchTerm = signal<string>('');
  activeFilter = signal<ProductFilterStatus>('all');
  selectedProductId = signal<string | null>(null);
  statusNotice = signal<string | null>(null);

  products = signal<AdminProduct[]>([
    {
      id: 'prod-1',
      sku: 'PD-001',
      initials: 'Pa',
      name: 'Paracetamol 500mg',
      chemistName: '[Chemist name]',
      location: 'Mombasa',
      price: 120,
      status: 'live',
      requiresPrescription: false,
      category: 'Pain & Fever',
      packSize: '20 tablets',
      stockCount: 145,
      updatedAt: 'Today, 10:15 am',
    },
    {
      id: 'prod-2',
      sku: 'PD-022',
      initials: 'Am',
      name: 'Amoxicillin 500mg',
      chemistName: '[Chemist name]',
      location: 'Nairobi',
      price: 450,
      status: 'prescription',
      requiresPrescription: true,
      category: 'Antibiotics',
      packSize: '15 capsules',
      stockCount: 64,
      updatedAt: 'Yesterday, 4:40 pm',
    },
    {
      id: 'prod-3',
      sku: 'PD-014',
      initials: 'OR',
      name: 'ORS Sachets',
      chemistName: '[Chemist name]',
      location: 'Mombasa',
      price: 60,
      status: 'live',
      requiresPrescription: false,
      category: 'Hydration & Digestive',
      packSize: '5 sachets',
      stockCount: 210,
      updatedAt: '27 Oct 2026',
    },
    {
      id: 'prod-4',
      sku: 'PD-031',
      initials: 'Zi',
      name: 'Zinc Tablets',
      chemistName: '[Chemist name]',
      location: 'Kisumu',
      price: 150,
      status: 'hidden',
      requiresPrescription: false,
      category: 'Supplements',
      packSize: '10 tablets',
      stockCount: 0,
      updatedAt: '24 Oct 2026',
    },
  ]);

  filteredProducts = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.products().filter((product) => {
      const matchesFilter = filter === 'all' || product.status === filter;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        (product.sku && product.sku.toLowerCase().includes(query)) ||
        product.chemistName.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query) ||
        product.price.toString().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  selectedProduct = computed(() => {
    const id = this.selectedProductId();
    if (!id) return null;
    return this.products().find((p) => p.id === id) ?? null;
  });

  setFilter(filter: ProductFilterStatus): void {
    this.activeFilter.set(filter);
  }

  onSearch(): void {
    // Computed signal filters live as searchTerm changes
  }

  openDetails(productId: string): void {
    this.selectedProductId.set(productId);
  }

  backToList(): void {
    this.selectedProductId.set(null);
  }

  hideProduct(id: string): void {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, status: 'hidden' as const } : p))
    );
    this.flashNotice('Product hidden from customer catalogue.');
  }

  showProduct(id: string): void {
    this.products.update((list) =>
      list.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.requiresPrescription ? ('prescription' as const) : ('live' as const),
            }
          : p
      )
    );
    this.flashNotice('Product restored to active catalogue.');
  }

  togglePrescription(id: string): void {
    this.products.update((list) =>
      list.map((p) => {
        if (p.id !== id) return p;
        const nextReq = !p.requiresPrescription;
        const nextStatus =
          p.status === 'hidden' ? ('hidden' as const) : nextReq ? ('prescription' as const) : ('live' as const);
        return { ...p, requiresPrescription: nextReq, status: nextStatus };
      })
    );
    this.flashNotice('Prescription requirement updated.');
  }

  statusLabel(status: AdminProduct['status']): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  private flashNotice(msg: string): void {
    this.statusNotice.set(msg);
    setTimeout(() => {
      this.statusNotice.set(null);
    }, 3000);
  }
}
