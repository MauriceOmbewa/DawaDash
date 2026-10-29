import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CareProvider } from '../../../../core/models/care-provider.models';
import { ProviderList } from '../../components/provider-list/provider-list';
import { ProviderService } from '../../services/provider.services';

@Component({
  selector: 'app-doctors-page',
  imports: [ProviderList],
  templateUrl: './doctors-page.html',
})
export class DoctorsPage {
  private readonly router = inject(Router);

  doctors = inject(ProviderService).getDoctors();

  onBook(doctor: CareProvider) {
    this.router.navigate(['/book', doctor.id]);
  }
}