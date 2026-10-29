import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hospital, HospitalType } from '../../../../core/models/hospital.models';
import { MapPreview } from '../../../../shared/components/map-preview/map-preview';
import { HospitalService } from '../../../../core/services/hospital.services';

@Component({
  selector: 'app-hospitals-page',
  imports: [RouterLink, MapPreview],
  templateUrl: './hospitals-page.html',
  styleUrls: ['../../../../shared/styles/page-shared.css', './hospitals-page.css'],
})
export class HospitalsPage {
  private readonly hospitals = inject(HospitalService).getHospitals();

  readonly typeFilters: ('All' | HospitalType)[] = ['All', 'Public', 'Private', 'Faith-based'];
  readonly serviceFilters = ['Emergency', 'Maternity', 'Dental', 'Eye', 'Lab'];

  /** "Near me" shows hospitals within this many km */
  private readonly nearKm = 5;

  readonly searchTerm = signal('');
  readonly type = signal<'All' | HospitalType>('All');
  readonly service = signal<string | null>(null);
  readonly nearMe = signal(false);

  readonly results = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const type = this.type();
    const service = this.service();
    const near = this.nearMe();

    return this.hospitals.filter((h) => {
      const matchesText =
        !term ||
        h.name.toLowerCase().includes(term) ||
        h.services.some((s) => s.toLowerCase().includes(term));
      const matchesType = type === 'All' || h.type === type;
      const matchesService = !service || h.services.includes(service);
      const matchesNear = !near || h.distanceKm <= this.nearKm;
      return matchesText && matchesType && matchesService && matchesNear;
    });
  });

  toggleService(name: string) {
    this.service.update((current) => (current === name ? null : name));
  }

  toggleNearMe() {
    this.nearMe.update((on) => !on);
  }

  directionsUrl(h: Hospital): string {
    const destination = encodeURIComponent(`${h.name} ${h.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  }
}
