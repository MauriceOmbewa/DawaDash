import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css',
})
export class AdminSettings {
  platformFeePercent = signal(10);
  mpesaPaybill = signal('400200');
  mpesaAccountName = signal('DAWADASH HEALTHCARE');
  autoApprovalEnabled = signal(false);
  notificationEmail = signal('admin@dawadash.health');
  savedNotice = signal(false);

  saveSettings() {
    this.savedNotice.set(true);
    setTimeout(() => {
      this.savedNotice.set(false);
    }, 2000);
  }
}
