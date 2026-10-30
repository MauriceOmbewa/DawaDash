import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nurse-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-profile.html',
  styleUrl: './nurse-profile.css',
})
export class NurseProfile {
  name = signal('Mercy Chebet');
  title = signal('Registered Community Health Nurse (KRCHN)');
  nckNumber = signal('NCK-RN/44291');
  baseStation = signal('Coast General & DawaDash Mombasa Hub');
  county = signal('Mombasa');
  phone = signal('+254 722 334 455');
  email = signal('mercy.chebet@dawadash.health');
  rating = signal(4.9);
  completedVisits = signal(48);
  savedNotification = signal(false);

  saveProfile() {
    this.savedNotification.set(true);
    setTimeout(() => {
      this.savedNotification.set(false);
    }, 2500);
  }
}
