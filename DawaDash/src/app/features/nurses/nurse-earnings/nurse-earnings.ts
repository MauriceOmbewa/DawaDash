import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface NursePayoutItem {
  id: string;
  patientName: string;
  service: string;
  neighborhood: string;
  time: string;
  earnedAmount: number;
}

@Component({
  selector: 'app-nurse-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-earnings.html',
  styleUrl: './nurse-earnings.css',
})
export class NurseEarnings {
  earnedToday = signal(3960); // KES
  earnedWeek = signal(15840);
  availableBalance = signal(7920);

  showWithdrawModal = signal(false);
  mpesaNumber = signal('0722334455');
  withdrawAmount = signal(3960);
  isSuccess = signal(false);

  ledger = signal<NursePayoutItem[]>([
    {
      id: 'p-1',
      patientName: 'Mariam Hassan',
      service: 'Wound care dressing',
      neighborhood: 'Kisauni',
      time: 'Today, 11:00 am',
      earnedAmount: 1320,
    },
    {
      id: 'p-2',
      patientName: 'Khadija Said',
      service: 'Post-op dressing',
      neighborhood: 'Nyali',
      time: 'Today, 9:00 am',
      earnedAmount: 1320,
    },
    {
      id: 'p-3',
      patientName: 'Ali Omar',
      service: 'Insulin injection instruction',
      neighborhood: 'Majengo',
      time: 'Today, 7:30 am',
      earnedAmount: 1320,
    },
  ]);

  openWithdraw() {
    this.showWithdrawModal.set(true);
    this.isSuccess.set(false);
  }

  closeWithdraw() {
    this.showWithdrawModal.set(false);
  }

  processWithdrawal() {
    if (this.withdrawAmount() <= 0 || this.withdrawAmount() > this.availableBalance()) return;
    this.isSuccess.set(true);
    this.availableBalance.update((b: number) => b - this.withdrawAmount());
    setTimeout(() => {
      this.closeWithdraw();
    }, 1500);
  }
}
