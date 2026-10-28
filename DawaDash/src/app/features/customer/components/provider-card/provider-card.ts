import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { CareProvider } from '../../../../core/models/care-provider.models';

@Component({
  selector: 'app-provider-card',
  imports: [DecimalPipe],
  templateUrl: './provider-card.html',
  styleUrl: './provider-card.css',
})
export class ProviderCard {
  provider = input.required<CareProvider>();
  badge = input.required<string>(); // "Dr" or "Nu"
  actionLabel = input.required<string>(); // "Book now" or "Request visit"
  action = output<CareProvider>();
}