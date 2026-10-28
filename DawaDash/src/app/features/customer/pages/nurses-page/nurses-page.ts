import { Component, inject } from '@angular/core';
import { CareProvider } from '../../../../core/models/care-provider.models';
import { ProviderList } from '../../components/provider-list/provider-list';
import { ProviderService } from '../../services/provider.services';

@Component({
  selector: 'app-nurses-page',
  imports: [ProviderList],
  templateUrl: './nurses-page.html',
})
export class NursesPage {
  nurses = inject(ProviderService).getNurses();

  onRequestVisit(nurse: CareProvider) {
    // TODO: the visit request flow comes next (we still need its design)
  }
}