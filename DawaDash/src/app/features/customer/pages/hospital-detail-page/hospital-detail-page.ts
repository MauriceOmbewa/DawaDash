import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Hospital } from '../../../../core/models/hospital.models';
import { MapPreview } from '../../../../shared/components/map-preview/map-preview';
import { HospitalService } from '../../../../core/services/hospital.services';

@Component({
  selector: 'app-hospital-detail-page',
  imports: [RouterLink, MapPreview],
  templateUrl: './hospital-detail-page.html',
  styleUrls: ['../../../../shared/styles/page-shared.css', './hospital-detail-page.css'],
})
export class HospitalDetailPage {
  private readonly hospitalService = inject(HospitalService);

  private readonly id = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: NaN },
  );

  readonly hospital = computed<Hospital | undefined>(() => this.hospitalService.getById(this.id()));

  startUrl(h: Hospital): string {
    const destination = encodeURIComponent(`${h.name} ${h.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
  }
}
