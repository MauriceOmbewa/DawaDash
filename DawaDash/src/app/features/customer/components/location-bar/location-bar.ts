import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-location-bar',
  templateUrl: './location-bar.html',
  styleUrl: './location-bar.css',
})
export class LocationBar {
  address = input.required<string>();
  changeRequested = output<void>();
}