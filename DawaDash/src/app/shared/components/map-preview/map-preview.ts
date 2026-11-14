import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  input,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { Hospital } from '../../../core/models/hospital.models';

const MAP_CENTER: L.LatLngTuple = [-4.03, 39.71];
const HOSPITAL_ICON = L.divIcon({
  className: '',
  html: `
    <svg width="34" height="42" viewBox="0 0 24 30" aria-hidden="true">
      <path d="M12 29s9-8.2 9-16A9 9 0 0 0 3 13c0 7.8 9 16 9 16z" fill="#12302b"/>
      <path d="M11 8h2v9h-2zM7.5 11.5h9v2h-9z" fill="#fff"/>
    </svg>`,
  iconSize: [34, 42],
  iconAnchor: [17, 42],
});

@Component({
  selector: 'app-map-preview',
  template: `
    <div #map class="map" role="application" aria-label="OpenStreetMap showing hospital locations"></div>
  `,
  styles: `
    :host {
      display: block;
      height: var(--map-height, 160px);
      overflow: hidden;
      border-radius: 16px;
      background: #e1eee6;
    }

    .map {
      width: 100%;
      height: 100%;
      background: #e1eee6;
    }
  `,
})
export class MapPreview implements AfterViewInit, OnChanges, OnDestroy {
  readonly hospitals = input<Hospital[]>([]);
  readonly selectedHospital = input<Hospital | null>(null);

  private readonly mapElement = viewChild.required<ElementRef<HTMLDivElement>>('map');
  private map?: L.Map;
  private markers?: L.FeatureGroup;

  ngAfterViewInit(): void {
    this.map = L.map(this.mapElement().nativeElement).setView(MAP_CENTER, 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    this.markers = L.featureGroup().addTo(this.map);
    this.renderMarkers();

    requestAnimationFrame(() => this.map?.invalidateSize());
  }

  ngOnChanges(): void {
    this.renderMarkers();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  private renderMarkers(): void {
    const map = this.map;
    const markers = this.markers;
    if (!map || !markers) return;

    markers.clearLayers();
    const selected = this.selectedHospital();
    const hospitals = selected ? [selected] : this.hospitals();

    for (const hospital of hospitals) {
      const marker = L.marker([hospital.latitude, hospital.longitude], { icon: HOSPITAL_ICON });
      const popup = document.createElement('div');
      const name = document.createElement('strong');
      const address = document.createElement('div');
      name.textContent = hospital.name;
      address.textContent = hospital.address;
      popup.append(name, address);
      marker.bindPopup(popup).addTo(markers);
    }

    if (selected) {
      map.setView([selected.latitude, selected.longitude], 15);
    } else if (hospitals.length === 0) {
      map.setView(MAP_CENTER, 12);
    } else if (hospitals.length === 1) {
      map.setView([hospitals[0].latitude, hospitals[0].longitude], 14);
    } else {
      const bounds = L.latLngBounds(
        hospitals.map((hospital) => [hospital.latitude, hospital.longitude] as L.LatLngTuple),
      );
      map.fitBounds(bounds, { padding: [24, 24], maxZoom: 14 });
    }
  }
}
