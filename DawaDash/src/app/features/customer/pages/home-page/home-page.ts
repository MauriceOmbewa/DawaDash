import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from '../../../../core/models/medicine.models';
import { CartService } from '../../../../core/services/cart.services';
import { LocationService } from '../../../../core/services/location.services';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';
import { SectionHeader } from '../../../../shared/components/section-header/section-header';
import { CategoryTiles } from '../../components/category-tiles/category-tiles';
import { LocationBar } from '../../components/location-bar/location-bar';
import { LocationModal } from '../../components/location-modal/location-modal';
import { MedicineCard } from '../../components/medicine-card/medicine-card';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-home-page',
  imports: [LocationBar, LocationModal, SearchBar, CategoryTiles, SectionHeader, MedicineCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);
  private readonly medicineService = inject(MedicineService);
  private readonly county = inject(LocationService).county;

  address = signal('Nyali Road, Mombasa');
  locationModalOpen = signal(false);
  popularMedicines = this.medicineService.getPopular();

  /** True when no chemist in the customer's county stocks this medicine */
  isUnavailable(medicine: Medicine): boolean {
    return !this.medicineService.isAvailableIn(medicine, this.county());
  }

  openLocationModal() {
    this.locationModalOpen.set(true);
  }

  closeLocationModal() {
    this.locationModalOpen.set(false);
  }

  onLocationSaved(address: string) {
    this.address.set(address);
    this.locationModalOpen.set(false);
  }

  onSearch(term: string) {
    this.router.navigate(['/medicines'], { queryParams: { search: term } });
  }

  onAddToCart(medicine: Medicine) {
    this.cart.add(medicine);
  }
}