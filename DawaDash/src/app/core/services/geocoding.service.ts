import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  /** Converts a map position into a short, readable address. */
  async reverse(lat: number, lng: number): Promise<string> {
    const url =
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&lat=${lat}&lon=${lng}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Could not look up that location');
    }

    const data = await response.json();
    const a = data.address ?? {};

    // Build something short like "Nyali Road, Nyali, Mombasa"
    const parts = [
      a.road,
      a.suburb ?? a.neighbourhood,
      a.city ?? a.town ?? a.village ?? a.county,
    ].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(', ');
    }

    // Fallback: first three parts of the long address
    return String(data.display_name ?? '')
      .split(',')
      .slice(0, 3)
      .join(',')
      .trim();
  }
}