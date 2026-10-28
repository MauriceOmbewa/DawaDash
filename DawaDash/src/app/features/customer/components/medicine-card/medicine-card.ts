import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Medicine } from '../../../../core/models/medicine.models';

@Component({
  selector: 'app-medicine-card',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './medicine-card.html',
  styleUrl: './medicine-card.css',
})
export class MedicineCard {
  medicine = input.required<Medicine>();
  unavailable = input(false); // true when no chemist in the customer's county stocks it
  addToCart = output<Medicine>();
}