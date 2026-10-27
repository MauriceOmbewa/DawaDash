import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { GeocodingService } from '../../../../core/services/geocoding.service';

// Where the map opens first (Nyali, Mombasa)
const START_CENTER: L.LatLngTuple = [-4.03, 39.71];
const START_ZOOM = 13;

// Our own pin in the app colours, so we don't depend on Leaflet's default image files
const PIN_ICON = L.divIcon({
  className: '',
  html: `
    <svg width="36" height="44" viewBox="0 0 24 30" aria-hidden="true">
      <path d="M12 29s9-8.2 9-16A9 9 0 0 0 3 13c0 7.8 9 16 9 16z" fill="#12302b"/>
      <circle cx="12" cy="13" r="3.5" fill="#f2b43a"/>
    </svg>`,
  iconSize: [36, 44],
  iconAnchor: [18, 44], // the pin's tip sits exactly on the clicked point
});

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.html',
  styleUrl: './map-picker.css',
})
export class MapPicker implements AfterViewInit, OnDestroy {
  private readonly geocoder = inject(GeocodingService);
  private readonly mapElement = viewChild.required<ElementRef<HTMLDivElement>>('map');

  private map?: L.Map;
  private marker?: L.Marker;

  /** Emits the address every time the user drops or moves the pin */
  picked = output<string>();

  hint = signal('Tap the map to drop a pin. You can drag the pin to adjust it.');

  ngAfterViewInit() {
    this.map = L.map(this.mapElement().nativeElement).setView(START_CENTER, START_ZOOM);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.pin(event.latlng.lat, event.latlng.lng);
    });

    // The map sits inside a modal that has just appeared, so tell Leaflet to measure itself again
    setTimeout(() => this.map?.invalidateSize());
  }

  ngOnDestroy() {
    this.map?.remove();
  }

  useMyLocation() {
    if (!navigator.geolocation) {
      this.hint.set('Location is unavailable here. Tap the map to drop a pin instead.');
      return;
    }

    this.hint.set('Finding your location…');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.map?.setView([latitude, longitude], 17);
        this.pin(latitude, longitude);
      },
      () => this.hint.set('Location permission was denied. Tap the map to drop a pin instead.'),
    );
  }

  private async pin(lat: number, lng: number) {
    this.placeMarker(lat, lng);
    this.hint.set('Finding the address…');

    try {
      const address = await this.geocoder.reverse(lat, lng);
      this.picked.emit(address);
      this.hint.set('Pin dropped. Drag it to adjust, then confirm.');
    } catch {
      this.hint.set('Could not find the address for this spot. You can type it in instead.');
    }
  }

  private placeMarker(lat: number, lng: number) {
    if (!this.map) return;

    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
      return;
    }

    this.marker = L.marker([lat, lng], { icon: PIN_ICON, draggable: true }).addTo(this.map);
    this.marker.on('dragend', () => {
      const position = this.marker!.getLatLng();
      this.pin(position.lat, position.lng);
    });
  }
}