import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.css',
})
export class DoctorProfile {
  name = signal('Felix Omondi');
  specialty = signal('Family Medicine & Primary Care');
  kmpdcNumber = signal('KMPDC-A84920');
  clinicName = signal('DawaMtaani Telehealth & Westlands Suite');
  county = signal('Nairobi');
  phone = signal('+254 712 345 678');
  email = signal('felixomondi186@gmail.com');
  rating = signal(4.8);
  reviewsCount = signal(148);
  savedNotification = signal(false);

  saveProfile() {
    this.savedNotification.set(true);
    setTimeout(() => {
      this.savedNotification.set(false);
    }, 2500);
  }
}
