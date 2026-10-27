import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Medicine } from '../../../../core/models/medicine.models';

@Component({
  selector: 'app-medicine-card',
  imports: [DecimalPipe],
  templateUrl: './medicine-card.html',
  styleUrl: './medicine-card.css',
})
export class MedicineCard {
  medicine = input.required<Medicine>();
  addToCart = output<Medicine>();
}