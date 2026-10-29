import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-book-page',
  imports: [],
  templateUrl: './book-page.html',
  styleUrls: ['../../../../shared/styles/page-shared.css', './book-page.css'],
})
export class BookPage {
  // Sample doctor. Look the real one up with the :id route param and ProviderService.
  readonly doctor = {
    name: 'Dr. [Name]',
    title: 'General practitioner',
    location: 'Mombasa',
    mode: 'Clinic or video',
  };

  readonly slots = ['Today 4:00 pm', '5:00 pm', 'Tomorrow 9:00 am'];
  readonly selectedSlot = signal(this.slots[0]);

  readonly consultationFee = 2000;
  readonly platformFee = this.consultationFee * 0.1;
  readonly total = this.consultationFee + this.platformFee;

  get initials(): string {
    return 'Dr';
  }

  onPay() {
    // TODO: start the M-Pesa payment, then hold the slot once it is confirmed
  }
}
