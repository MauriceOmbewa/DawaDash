import { Component, inject } from '@angular/core';
import { CareProvider } from '../../../../core/models/care-provider.models';
import { ProviderList } from '../../components/provider-list/provider-list';
import { ProviderService } from '../../services/provider.services';

@Component({
  selector: 'app-doctors-page',
  imports: [ProviderList],
  templateUrl: './doctors-page.html',
})
export class DoctorsPage {
  doctors = inject(ProviderService).getDoctors();

  onBook(doctor: CareProvider) {
    // TODO: the booking flow comes next (we still need its design)
  }
}