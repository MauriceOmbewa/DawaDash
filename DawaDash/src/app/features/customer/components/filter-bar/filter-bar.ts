import { Component, computed, input, model } from '@angular/core';
import {
  PRESCRIPTION_OPTIONS,
  PRICE_OPTIONS,
  PrescriptionFilter,
  PriceFilter,
  nextOption,
} from '../../models/medicine-filters';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class FilterBar {
  price = model.required<PriceFilter>();
  prescription = model.required<PrescriptionFilter>();
  localOnly = model.required<boolean>();
  county = input.required<string>();

  priceLabel = computed(
    () => PRICE_OPTIONS.find((option) => option.value === this.price())?.label ?? 'Any',
  );
  prescriptionLabel = computed(
    () => PRESCRIPTION_OPTIONS.find((option) => option.value === this.prescription())?.label ?? 'Any',
  );

  nextPrice() {
    this.price.set(nextOption(PRICE_OPTIONS, this.price()));
  }

  nextPrescription() {
    this.prescription.set(nextOption(PRESCRIPTION_OPTIONS, this.prescription()));
  }

  toggleLocal() {
    this.localOnly.update((on) => !on);
  }
}