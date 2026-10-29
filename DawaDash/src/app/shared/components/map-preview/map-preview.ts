import { Component, input } from '@angular/core';

/** A simple map picture. Replace with a real map (Google Maps, Leaflet) later. */
@Component({
  selector: 'app-map-preview',
  template: `
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map preview">
      <rect width="400" height="300" fill="#e1eee6" />
      <path d="M0 238 C 90 210, 200 270, 400 220 L400 300 L0 300 Z" fill="#bcdbe8" />

      <!-- roads -->
      <line x1="0" y1="45" x2="400" y2="125" stroke="#fff" stroke-width="12" />
      <rect x="0" y="92" width="400" height="12" fill="#fff" />
      <rect x="148" y="0" width="12" height="300" fill="#fff" />
      <rect x="278" y="0" width="12" height="300" fill="#fff" />

      @if (route()) {
        <polyline
          points="154,190 154,98 284,98 284,52"
          fill="none"
          stroke="#0f7b63"
          stroke-width="6"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      }

      <!-- other places -->
      <circle cx="60" cy="98" r="10" fill="#0f7b63" />
      <circle cx="340" cy="190" r="10" fill="#0f7b63" />

      <!-- hospital -->
      <circle cx="284" cy="52" r="14" fill="#0f7b63" />
      <path d="M284 45v14M277 52h14" stroke="#fff" stroke-width="3.5" stroke-linecap="round" />

      <!-- you are here -->
      <circle cx="154" cy="190" r="12" fill="#0b2b26" stroke="#f4b400" stroke-width="4" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
      height: var(--map-height, 160px);
      border-radius: 16px;
      overflow: hidden;
      background: #e1eee6;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class MapPreview {
  /** Draw the driving route from "you" to the hospital */
  route = input(false);
}
