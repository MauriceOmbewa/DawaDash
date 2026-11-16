import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EarningLedgerItem } from '../models/doctor-models';

export type EarningsPeriod = 'This month' | 'Last 3 months' | 'This year';

interface WeeklyBar {
  label: string;
  amount: number;
  heightPercent: number;
}

interface ChannelBreakdown {
  label: string;
  amount: number;
  percent: number;
}

interface PayoutRow {
  id: string;
  date: string;
  consults: number;
  amount: number;
  status: 'Paid' | 'Pending';
}

interface AnalyticsSnapshot {
  earned: number;
  waiting: number;
  consultations: number;
  averagePerPatient: number;
  weeklyBars: WeeklyBar[];
  channels: ChannelBreakdown[];
  insightTitle: string;
  insightSubtitle: string;
  payouts: PayoutRow[];
}

@Component({
  selector: 'app-doctor-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-earnings.html',
  styleUrl: './doctor-earnings.css',
})
export class DoctorEarnings {
  // Transitions between 'earnings' (overview + ledger) and 'analytics' (My earnings analytics UI)
  activeView = signal<'earnings' | 'analytics'>('earnings');
  selectedPeriod = signal<EarningsPeriod>('This month');

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

  private readonly analyticsByPeriod: Record<EarningsPeriod, AnalyticsSnapshot> = {
    'This month': {
      earned: 96000,
      waiting: 12000,
      consultations: 48,
      averagePerPatient: 2000,
      weeklyBars: [
        { label: 'W1', amount: 11500, heightPercent: 45 },
        { label: 'W2', amount: 15200, heightPercent: 60 },
        { label: 'W3', amount: 13000, heightPercent: 52 },
        { label: 'W4', amount: 19800, heightPercent: 80 },
        { label: 'W5', amount: 17000, heightPercent: 68 },
        { label: 'W6', amount: 23500, heightPercent: 95 },
      ],
      channels: [
        { label: 'Virtual', amount: 52800, percent: 55 },
        { label: 'Hospital visits', amount: 28800, percent: 30 },
        { label: 'Home visits', amount: 14400, percent: 15 },
      ],
      insightTitle: 'Saturday is your best day',
      insightSubtitle: 'Home visits earn the most per patient.',
      payouts: [
        { id: 'pay-1', date: '[date]', consults: 12, amount: 24000, status: 'Paid' },
        { id: 'pay-2', date: '[date]', consults: 9, amount: 18000, status: 'Paid' },
        { id: 'pay-3', date: '[date]', consults: 6, amount: 12000, status: 'Pending' },
      ],
    },
    'Last 3 months': {
      earned: 284000,
      waiting: 18000,
      consultations: 136,
      averagePerPatient: 2088,
      weeklyBars: [
        { label: 'W1', amount: 36000, heightPercent: 60 },
        { label: 'W2', amount: 42000, heightPercent: 70 },
        { label: 'W3', amount: 39000, heightPercent: 64 },
        { label: 'W4', amount: 51000, heightPercent: 84 },
        { label: 'W5', amount: 54000, heightPercent: 88 },
        { label: 'W6', amount: 62000, heightPercent: 96 },
      ],
      channels: [
        { label: 'Virtual', amount: 147680, percent: 52 },
        { label: 'Hospital visits', amount: 90880, percent: 32 },
        { label: 'Home visits', amount: 45440, percent: 16 },
      ],
      insightTitle: 'Virtual consults grew 18%',
      insightSubtitle: 'Evening slots between 6:00 pm and 9:00 pm have highest retention.',
      payouts: [
        { id: 'pay-3m-1', date: 'Oct 28, 2026', consults: 48, amount: 96000, status: 'Paid' },
        { id: 'pay-3m-2', date: 'Sep 30, 2026', consults: 46, amount: 98000, status: 'Paid' },
        { id: 'pay-3m-3', date: 'Aug 31, 2026', consults: 42, amount: 90000, status: 'Paid' },
      ],
    },
    'This year': {
      earned: 1120000,
      waiting: 12000,
      consultations: 540,
      averagePerPatient: 2074,
      weeklyBars: [
        { label: 'W1', amount: 145000, heightPercent: 58 },
        { label: 'W2', amount: 168000, heightPercent: 68 },
        { label: 'W3', amount: 182000, heightPercent: 74 },
        { label: 'W4', amount: 196000, heightPercent: 80 },
        { label: 'W5', amount: 210000, heightPercent: 86 },
        { label: 'W6', amount: 219000, heightPercent: 92 },
      ],
      channels: [
        { label: 'Virtual', amount: 616000, percent: 55 },
        { label: 'Hospital visits', amount: 336000, percent: 30 },
        { label: 'Home visits', amount: 168000, percent: 15 },
      ],
      insightTitle: 'Consistent growth across all modes',
      insightSubtitle: 'Saturday home visits deliver your highest average ticket size.',
      payouts: [
        { id: 'pay-yr-1', date: 'Q4 2026', consults: 142, amount: 296000, status: 'Pending' },
        { id: 'pay-yr-2', date: 'Q3 2026', consults: 198, amount: 418000, status: 'Paid' },
        { id: 'pay-yr-3', date: 'Q2 2026', consults: 200, amount: 406000, status: 'Paid' },
      ],
    },
  };

  activeAnalytics = computed(() => this.analyticsByPeriod[this.selectedPeriod()]);

  openAnalytics(): void {
    this.activeView.set('analytics');
  }

  backToEarnings(): void {
    this.activeView.set('earnings');
  }

  setPeriod(period: EarningsPeriod): void {
    this.selectedPeriod.set(period);
  }

  openWithdraw(): void {
    this.showWithdrawModal.set(true);
    this.isSuccess.set(false);
  }

  closeWithdraw(): void {
    this.showWithdrawModal.set(false);
  }

  processWithdrawal(): void {
    if (this.withdrawAmount() <= 0 || this.withdrawAmount() > this.availableBalance()) return;
    this.isSuccess.set(true);
    this.availableBalance.update((b: number) => b - this.withdrawAmount());
    setTimeout(() => {
      this.closeWithdraw();
    }, 1500);
  }
}
