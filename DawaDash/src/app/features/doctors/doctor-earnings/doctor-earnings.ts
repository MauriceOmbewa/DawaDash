import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EarningLedgerItem } from '../models/doctor-models';

@Component({
  selector: 'app-doctor-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-earnings.html',
  styleUrl: './doctor-earnings.css',
})
export class DoctorEarnings {
  earnedToday = signal(12000);
  earnedWeek = signal(36000);
  availableBalance = signal(24000);

  // M-Pesa withdrawal state
  showWithdrawModal = signal(false);
  mpesaNumber = signal('0712345678');
  withdrawAmount = signal(12000);
  isSuccess = signal(false);

  ledger = signal<EarningLedgerItem[]>([
    {
      id: 'tx-101',
      patientName: 'Kiprono Cheruiyot',
      date: 'Today, Oct 29',
      time: '8:00 am',
      type: 'Video consult',
      grossAmount: 2200,
      platformFee: 200,
      netEarned: 2000,
      status: 'settled',
    },
    {
      id: 'tx-102',
      patientName: 'Esther Njeri',
      date: 'Today, Oct 29',
      time: '7:15 am',
      type: 'Clinic visit',
      grossAmount: 2200,
      platformFee: 200,
      netEarned: 2000,
      status: 'settled',
    },
    {
      id: 'tx-103',
      patientName: 'Moses Wafula',
      date: 'Yesterday, Oct 28',
      time: '5:30 pm',
      type: 'Video consult',
      grossAmount: 2200,
      platformFee: 200,
      netEarned: 2000,
      status: 'settled',
    },
    {
      id: 'tx-104',
      patientName: 'Mercy Akinyi',
      date: 'Yesterday, Oct 28',
      time: '3:00 pm',
      type: 'Video consult',
      grossAmount: 2200,
      platformFee: 200,
      netEarned: 2000,
      status: 'settled',
    },
    {
      id: 'tx-105',
      patientName: 'Sammy Gitonga',
      date: 'Yesterday, Oct 28',
      time: '11:15 am',
      type: 'Clinic visit',
      grossAmount: 2200,
      platformFee: 200,
      netEarned: 2000,
      status: 'settled',
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
