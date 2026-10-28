import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocationService {
  /** The county the customer is in. Hard-coded for now; later it comes from their saved location. */
  readonly county = signal('Mombasa');
}