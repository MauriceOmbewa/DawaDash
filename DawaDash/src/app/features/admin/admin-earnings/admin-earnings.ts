import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AdminEarningsBar,
  AdminEarningsDataset,
  AdminEarningsPeriod,
} from '../models/admin-models';

@Component({
  selector: 'app-admin-earnings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-earnings.html',
  styleUrl: './admin-earnings.css',
})
export class AdminEarnings {
  selectedPeriod = signal<AdminEarningsPeriod>('year');
  hoveredBar = signal<AdminEarningsBar | null>(null);

  private readonly datasets: Record<AdminEarningsPeriod, AdminEarningsDataset> = {
    year: {
      totalEarned: 420000,
      fromDoctors: 200000,
      fromNurses: 100000,
      fromChemists: 120000,
      monthlyBars: [
        {
          month: 'Jun',
          doctorsKes: 20000,
          nursesKes: 11000,
          chemistsKes: 16000,
          doctorsHeightPct: 20,
          nursesHeightPct: 11,
          chemistsHeightPct: 19,
        },
        {
          month: 'Jul',
          doctorsKes: 24000,
          nursesKes: 13000,
          chemistsKes: 19000,
          doctorsHeightPct: 24,
          nursesHeightPct: 13,
          chemistsHeightPct: 22,
        },
        {
          month: 'Aug',
          doctorsKes: 23000,
          nursesKes: 12000,
          chemistsKes: 22000,
          doctorsHeightPct: 23,
          nursesHeightPct: 12,
          chemistsHeightPct: 24,
        },
        {
          month: 'Sep',
          doctorsKes: 29000,
          nursesKes: 15000,
          chemistsKes: 25000,
          doctorsHeightPct: 29,
          nursesHeightPct: 15,
          chemistsHeightPct: 28,
        },
        {
          month: 'Oct',
          doctorsKes: 33000,
          nursesKes: 17000,
          chemistsKes: 28000,
          doctorsHeightPct: 33,
          nursesHeightPct: 17,
          chemistsHeightPct: 32,
        },
        {
          month: 'Nov',
          doctorsKes: 39000,
          nursesKes: 19000,
          chemistsKes: 33000,
          doctorsHeightPct: 38,
          nursesHeightPct: 19,
          chemistsHeightPct: 36,
        },
      ],
      breakdown: [
        {
          source: 'Doctors',
          customersPaid: 2200000,
          platformKeeps: 200000,
          paidToProviders: 2000000,
          rate: '10%',
        },
        {
          source: 'Nurses',
          customersPaid: 1100000,
          platformKeeps: 100000,
          paidToProviders: 1000000,
          rate: '10%',
        },
        {
          source: 'Chemists',
          customersPaid: 1320000,
          platformKeeps: 120000,
          paidToProviders: 1200000,
          rate: '[rate]',
        },
      ],
    },
    quarter: {
      totalEarned: 248000,
      fromDoctors: 118000,
      fromNurses: 58000,
      fromChemists: 72000,
      monthlyBars: [
        {
          month: 'Sep',
          doctorsKes: 34000,
          nursesKes: 17000,
          chemistsKes: 21000,
          doctorsHeightPct: 30,
          nursesHeightPct: 16,
          chemistsHeightPct: 24,
        },
        {
          month: 'Oct',
          doctorsKes: 40000,
          nursesKes: 19000,
          chemistsKes: 24000,
          doctorsHeightPct: 35,
          nursesHeightPct: 18,
          chemistsHeightPct: 27,
        },
        {
          month: 'Nov',
          doctorsKes: 44000,
          nursesKes: 22000,
          chemistsKes: 27000,
          doctorsHeightPct: 40,
          nursesHeightPct: 20,
          chemistsHeightPct: 31,
        },
      ],
      breakdown: [
        {
          source: 'Doctors',
          customersPaid: 1298000,
          platformKeeps: 118000,
          paidToProviders: 1180000,
          rate: '10%',
        },
        {
          source: 'Nurses',
          customersPaid: 638000,
          platformKeeps: 58000,
          paidToProviders: 580000,
          rate: '10%',
        },
        {
          source: 'Chemists',
          customersPaid: 792000,
          platformKeeps: 72000,
          paidToProviders: 720000,
          rate: '[rate]',
        },
      ],
    },
    month: {
      totalEarned: 91000,
      fromDoctors: 44000,
      fromNurses: 21000,
      fromChemists: 26000,
      monthlyBars: [
        {
          month: 'W1',
          doctorsKes: 9500,
          nursesKes: 4500,
          chemistsKes: 5500,
          doctorsHeightPct: 24,
          nursesHeightPct: 12,
          chemistsHeightPct: 18,
        },
        {
          month: 'W2',
          doctorsKes: 11000,
          nursesKes: 5200,
          chemistsKes: 6500,
          doctorsHeightPct: 28,
          nursesHeightPct: 14,
          chemistsHeightPct: 21,
        },
        {
          month: 'W3',
          doctorsKes: 10500,
          nursesKes: 5000,
          chemistsKes: 6200,
          doctorsHeightPct: 26,
          nursesHeightPct: 14,
          chemistsHeightPct: 20,
        },
        {
          month: 'W4',
          doctorsKes: 13000,
          nursesKes: 6300,
          chemistsKes: 7800,
          doctorsHeightPct: 34,
          nursesHeightPct: 17,
          chemistsHeightPct: 26,
        },
      ],
      breakdown: [
        {
          source: 'Doctors',
          customersPaid: 484000,
          platformKeeps: 44000,
          paidToProviders: 440000,
          rate: '10%',
        },
        {
          source: 'Nurses',
          customersPaid: 231000,
          platformKeeps: 21000,
          paidToProviders: 210000,
          rate: '10%',
        },
        {
          source: 'Chemists',
          customersPaid: 286000,
          platformKeeps: 26000,
          paidToProviders: 260000,
          rate: '[rate]',
        },
      ],
    },
  };

  activeData = computed(() => this.datasets[this.selectedPeriod()]);

  setPeriod(period: AdminEarningsPeriod): void {
    this.selectedPeriod.set(period);
    this.hoveredBar.set(null);
  }
}
