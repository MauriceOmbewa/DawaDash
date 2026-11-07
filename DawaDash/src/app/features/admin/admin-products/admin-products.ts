import { Component, signal, computed } from '@angular/core';
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
  // Search query & active filter chip
  searchTerm = signal<string>('');
  activeFilter = signal<ProductFilterStatus>('all');

  // Initial products matching the screenshots
  products = signal<AdminProduct[]>([
    {
      id: 'prod-1',
      name: 'Paracetamol 500mg',
      chemistName: '[Chemist name]',
      location: 'Mombasa',
      price: 120,
      status: 'live',
      requiresPrescription: false,
    },
    {
      id: 'prod-2',
      name: 'Amoxicillin 500mg',
      chemistName: '[Chemist name]',
      location: 'Nairobi',
      price: 450,
      status: 'prescription',
      requiresPrescription: true,
    },
    {
      id: 'prod-3',
      name: 'ORS Sachets',
      chemistName: '[Chemist name]',
      location: 'Mombasa',
      price: 60,
      status: 'live',
      requiresPrescription: false,
    },
    {
      id: 'prod-4',
      name: 'Zinc Tablets',
      chemistName: '[Chemist name]',
      location: 'Kisumu',
      price: 150,
      status: 'hidden',
      requiresPrescription: false,
    },
  ]);

  // Computed filtered products based on search query and active filter
  filteredProducts = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    const filter = this.activeFilter();

    return this.products().filter((product) => {
      const matchesFilter = filter === 'all' || product.status === filter;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.chemistName.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query) ||
        product.price.toString().includes(query);

      return matchesFilter && matchesSearch;
    });
  });

  setFilter(filter: ProductFilterStatus): void {
    this.activeFilter.set(filter);
  }

  onSearch(): void {
    // Computed automatically reacts to searchTerm signal
  }

  hideProduct(id: string): void {
    this.products.update((list) =>
      list.map((p) => (p.id === id ? { ...p, status: 'hidden' as const } : p))
    );
  }

  showProduct(id: string): void {
    this.products.update((list) =>
      list.map((p) =>
        p.id === id
          ? { ...p, status: p.requiresPrescription ? ('prescription' as const) : ('live' as const) }
          : p
      )
    );
  }

  toggleProductVisibility(product: AdminProduct): void {
    if (product.status === 'hidden') {
      this.showProduct(product.id);
    } else {
      this.hideProduct(product.id);
    }
  }
}