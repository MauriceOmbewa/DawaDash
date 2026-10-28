import { DecimalPipe, Location } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.services';
import { LocationService } from '../../../../core/services/location.services';
import { Notice } from '../../../../shared/components/notice/notice';
import { CountyOption } from '../../components/county-option/county-option';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-availability-page',
  imports: [DecimalPipe, Notice, CountyOption],
  templateUrl: './availability-page.html',
  styleUrl: './availability-page.css',
})
export class AvailabilityPage {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly cart = inject(CartService);
  private readonly medicineService = inject(MedicineService);

  readonly county = inject(LocationService).county;

  // The medicine comes from the address: /medicines/3/availability
  readonly medicine = this.medicineService.getById(
    Number(inject(ActivatedRoute).snapshot.paramMap.get('id')),
  );

  readonly availableHere = this.medicine
    ? this.medicineService.isAvailableIn(this.medicine, this.county())
    : false;

  /** The other counties that have it, nearest first */
  readonly offers = this.medicine
    ? this.medicineService.getOffers(this.medicine, this.county())
    : [];

  // The nearest county is selected to start with
  selectedCounty = signal(this.offers[0]?.county ?? '');
  selectedOffer = computed(() =>
    this.offers.find((offer) => offer.county === this.selectedCounty()),
  );

  orderFromSelected() {
    const offer = this.selectedOffer();
    if (!this.medicine || !offer) return;

    this.cart.add(this.medicine, { county: offer.county, price: offer.price });
    this.router.navigate(['/cart']); // the cart page comes next
  }

  cancel() {
    // Go back to the search results; if the page was opened directly, go to the medicines list
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/medicines']);
    }
  }
}