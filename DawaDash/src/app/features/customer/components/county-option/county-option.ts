import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CountyOffer } from '../../../../core/models/county-offer.models';

@Component({
  selector: 'app-county-option',
  imports: [DecimalPipe],
  templateUrl: './county-option.html',
  styleUrl: './county-option.css',
})
export class CountyOption {
  offer = input.required<CountyOffer>();
  selected = input(false);
  picked = output<void>();
}