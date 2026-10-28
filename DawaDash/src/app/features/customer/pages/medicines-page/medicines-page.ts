import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MEDICINE_CATEGORIES, Medicine } from '../../../../core/models/medicine.models';
import { CartService } from '../../../../core/services/cart.services';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';
import { CategoryChips } from '../../components/category-chips/category-chips';
import { FilterBar } from '../../components/filter-bar/filter-bar';
import { MedicineCard } from '../../components/medicine-card/medicine-card';
import { PrescriptionFilter, PriceFilter, matchesPrice } from '../../models/medicine-filters';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-medicines-page',
  imports: [SearchBar, CategoryChips, FilterBar, MedicineCard],
  templateUrl: './medicines-page.html',
  styleUrl: './medicines-page.css',
})
export class MedicinesPage {
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService);
  private readonly medicineService = inject(MedicineService);
  private readonly allMedicines = this.medicineService.getAll();

  // Later this will come from the customer's saved delivery location
  readonly county = 'Mombasa';
  readonly categories = ['All', ...MEDICINE_CATEGORIES];

  // The filters. Changing any of these updates `results` automatically.
  // The search starts with whatever was typed on the home page (/medicines?search=...)
  searchTerm = signal(this.route.snapshot.queryParamMap.get('search') ?? '');
  category = signal('All');
  price = signal<PriceFilter>('any');
  prescription = signal<PrescriptionFilter>('any');
  localOnly = signal(true);

  /** True when the customer has typed a search (the page then shows "Results for ...") */
  searching = computed(() => this.searchTerm().trim() !== '');

  title = computed(() =>
    this.searching() ? `Results for ${this.searchTerm().trim()}` : 'Medicines',
  );

  results = computed(() => this.applyFilters(this.localOnly()));

  /** Same filters, but ignoring the county, to tell "not sold anywhere" from "not sold here" */
  resultsAnywhere = computed(() => this.applyFilters(false));

  // Text for the page
  summary = computed(() =>
    this.localOnly()
      ? `Showing medicines available in ${this.county} county`
      : 'Showing medicines from all counties',
  );

  bannerTitle = computed(() =>
    this.localOnly() ? `Available in ${this.county} county` : 'Showing all counties',
  );

  chemistText = computed(() => {
    const count = this.medicineService.countChemists(
      this.results(),
      this.localOnly() ? this.county : undefined,
    );
    return `${count} ${count === 1 ? 'chemist' : 'chemists'} can fill this`;
  });

  chemistsElsewhere = computed(() =>
    this.medicineService.countChemists(this.resultsAnywhere()),
  );

  onSearch(term: string) {
    this.searchTerm.set(term);

    // The category chips are hidden while searching, so don't leave one switched on
    if (term) {
      this.category.set('All');
    }
  }

  clearFilters() {
    this.searchTerm.set('');
    this.category.set('All');
    this.price.set('any');
    this.prescription.set('any');
  }

  onAddToCart(medicine: Medicine) {
    this.cart.add(medicine);
  }

  private applyFilters(onlyLocal: boolean): Medicine[] {
    const term = this.searchTerm().trim().toLowerCase();

    return this.allMedicines.filter((medicine) => {
      const matchesSearch =
        !term ||
        medicine.name.toLowerCase().includes(term) ||
        medicine.keywords.some((keyword) => keyword.includes(term));

      const matchesCategory =
        this.category() === 'All' || medicine.category === this.category();

      const matchesPrescription =
        this.prescription() === 'any' ||
        (this.prescription() === 'rx' && medicine.requiresPrescription) ||
        (this.prescription() === 'otc' && !medicine.requiresPrescription);

      const matchesCounty =
        !onlyLocal || this.medicineService.isAvailableIn(medicine, this.county);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrescription &&
        matchesCounty &&
        matchesPrice(medicine.price, this.price())
      );
    });
  }
}