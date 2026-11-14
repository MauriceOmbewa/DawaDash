import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrls: ['../../../shared/styles/page-shared.css', './profile-page.css'],
})
export class ProfilePage {
  // Sample data. Load the real pharmacy profile from your service.
  readonly accountStatus = signal<'active' | 'suspended'>('active');

  readonly licences = [
    { name: 'PPB premises licence', expires: '[date]', valid: true },
    { name: 'Pharmacist registration', expires: '[date]', valid: true },
  ];

  readonly counties = ['Mombasa', 'Kilifi', 'Kwale', 'Nairobi', 'Kisumu', 'Nakuru'];

  readonly business = {
    name: '',
    county: 'Mombasa',
    street: '',
    phone: '',
    till: '',
    hours: '8 am to 9 pm',
  };

  onSave() {
    // TODO: save the business details
  }
}
