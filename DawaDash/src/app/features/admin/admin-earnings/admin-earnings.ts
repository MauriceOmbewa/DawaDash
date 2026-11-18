import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AdminChartType,
  AdminEarningsBar,
  AdminEarningsDataset,
  AdminEarningsPeriod,
  AdminPaymentLog,
  PaymentLogCategory,
} from '../models/admin-models';

@Component({
  selector: 'app-admin-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-earnings.html',
  styleUrl: './admin-earnings.css',
})
export class AdminEarnings {
  readonly periodOptions: { id: AdminEarningsPeriod; label: string }[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'week', label: 'Weekly' },
    { id: 'biweekly', label: 'Bi-weekly' },
    { id: 'month', label: 'Monthly' },
    { id: 'quarter', label: '3 months' },
    { id: 'sixMonths', label: '6 months' },
    { id: 'year', label: 'Yearly' },
    { id: 'allTime', label: 'All time' },
  ];

  readonly chartTypeOptions: { id: AdminChartType; label: string }[] = [
    { id: 'stackedBar', label: 'Stacked bar' },
    { id: 'line', label: 'Line graph' },
    { id: 'pie', label: 'Pie / Donut' },
    { id: 'area', label: 'Area trend' },
    { id: 'rankings', label: 'Stream bars' },
  ];

  selectedPeriod = signal<AdminEarningsPeriod>('year');
  selectedChartType = signal<AdminChartType>('stackedBar');
  hoveredBar = signal<AdminEarningsBar | null>(null);
  hoveredSliceKey = signal<string | null>(null);

  // Payment logs view state
  showPaymentLogs = signal<boolean>(false);
  logCategoryFilter = signal<PaymentLogCategory>('all');
  logPeriodFilter = signal<'all' | AdminEarningsPeriod>('all');
  logSearchTerm = signal<string>('');

  private readonly datasets: Record<AdminEarningsPeriod, AdminEarningsDataset> = {
    daily: {
      label: 'Daily',
      chartTitle: 'Platform earnings today (by block)',
      totalEarned: 8950,
      fromDoctors: 2400,
      fromProducts: 1950,
      fromChemists: 2500,
      fromNurses: 1100,
      fromHospitals: 1000,
      monthlyBars: [
        {
          month: '8am',
          doctorsKes: 450,
          productsKes: 350,
          chemistsKes: 500,
          nursesKes: 200,
          hospitalsKes: 180,
          doctorsHeightPct: 14,
          productsHeightPct: 12,
          chemistsHeightPct: 14,
          nursesHeightPct: 7,
          hospitalsHeightPct: 7,
        },
        {
          month: '10am',
          doctorsKes: 650,
          productsKes: 520,
          chemistsKes: 750,
          nursesKes: 300,
          hospitalsKes: 260,
          doctorsHeightPct: 19,
          productsHeightPct: 16,
          chemistsHeightPct: 18,
          nursesHeightPct: 10,
          hospitalsHeightPct: 9,
        },
        {
          month: '12pm',
          doctorsKes: 700,
          productsKes: 580,
          chemistsKes: 750,
          nursesKes: 320,
          hospitalsKes: 300,
          doctorsHeightPct: 21,
          productsHeightPct: 17,
          chemistsHeightPct: 18,
          nursesHeightPct: 11,
          hospitalsHeightPct: 10,
        },
        {
          month: '2pm',
          doctorsKes: 600,
          productsKes: 500,
          chemistsKes: 500,
          nursesKes: 280,
          hospitalsKes: 260,
          doctorsHeightPct: 18,
          productsHeightPct: 15,
          chemistsHeightPct: 14,
          nursesHeightPct: 9,
          hospitalsHeightPct: 9,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 26400, platformKeeps: 2400, paidToProviders: 24000, rate: '10%' },
        { source: 'Products', customersPaid: 21450, platformKeeps: 1950, paidToProviders: 19500, rate: '10%' },
        { source: 'Chemists', customersPaid: 2500, platformKeeps: 2500, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 12100, platformKeeps: 1100, paidToProviders: 11000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 13500, platformKeeps: 1000, paidToProviders: 12500, rate: '8%' },
      ],
    },
    week: {
      label: 'Weekly',
      chartTitle: 'Platform earnings this week',
      totalEarned: 47300,
      fromDoctors: 14200,
      fromProducts: 9600,
      fromChemists: 12500,
      fromNurses: 5800,
      fromHospitals: 5200,
      monthlyBars: [
        {
          month: 'Mon',
          doctorsKes: 1800,
          productsKes: 1200,
          chemistsKes: 1500,
          nursesKes: 750,
          hospitalsKes: 650,
          doctorsHeightPct: 17,
          productsHeightPct: 13,
          chemistsHeightPct: 14,
          nursesHeightPct: 8,
          hospitalsHeightPct: 7,
        },
        {
          month: 'Tue',
          doctorsKes: 2100,
          productsKes: 1400,
          chemistsKes: 2000,
          nursesKes: 850,
          hospitalsKes: 750,
          doctorsHeightPct: 19,
          productsHeightPct: 14,
          chemistsHeightPct: 17,
          nursesHeightPct: 9,
          hospitalsHeightPct: 8,
        },
        {
          month: 'Wed',
          doctorsKes: 1950,
          productsKes: 1350,
          chemistsKes: 1800,
          nursesKes: 800,
          hospitalsKes: 700,
          doctorsHeightPct: 18,
          productsHeightPct: 14,
          chemistsHeightPct: 16,
          nursesHeightPct: 9,
          hospitalsHeightPct: 8,
        },
        {
          month: 'Thu',
          doctorsKes: 2400,
          productsKes: 1600,
          chemistsKes: 2200,
          nursesKes: 950,
          hospitalsKes: 850,
          doctorsHeightPct: 21,
          productsHeightPct: 16,
          chemistsHeightPct: 18,
          nursesHeightPct: 10,
          hospitalsHeightPct: 9,
        },
        {
          month: 'Fri',
          doctorsKes: 2750,
          productsKes: 1850,
          chemistsKes: 2500,
          nursesKes: 1150,
          hospitalsKes: 1050,
          doctorsHeightPct: 23,
          productsHeightPct: 17,
          chemistsHeightPct: 20,
          nursesHeightPct: 11,
          hospitalsHeightPct: 10,
        },
        {
          month: 'Sat',
          doctorsKes: 3200,
          productsKes: 2200,
          chemistsKes: 2500,
          nursesKes: 1300,
          hospitalsKes: 1200,
          doctorsHeightPct: 26,
          productsHeightPct: 19,
          chemistsHeightPct: 20,
          nursesHeightPct: 12,
          hospitalsHeightPct: 11,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 156200, platformKeeps: 14200, paidToProviders: 142000, rate: '10%' },
        { source: 'Products', customersPaid: 105600, platformKeeps: 9600, paidToProviders: 96000, rate: '10%' },
        { source: 'Chemists', customersPaid: 12500, platformKeeps: 12500, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 63800, platformKeeps: 5800, paidToProviders: 58000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 70200, platformKeeps: 5200, paidToProviders: 65000, rate: '8%' },
      ],
    },
    biweekly: {
      label: 'Bi-weekly',
      chartTitle: 'Platform earnings (last 14 days)',
      totalEarned: 93500,
      fromDoctors: 28000,
      fromProducts: 19000,
      fromChemists: 25000,
      fromNurses: 11500,
      fromHospitals: 10000,
      monthlyBars: [
        {
          month: 'D1-3',
          doctorsKes: 6200,
          productsKes: 4200,
          chemistsKes: 5500,
          nursesKes: 2500,
          hospitalsKes: 2200,
          doctorsHeightPct: 18,
          productsHeightPct: 14,
          chemistsHeightPct: 16,
          nursesHeightPct: 9,
          hospitalsHeightPct: 8,
        },
        {
          month: 'D4-6',
          doctorsKes: 6800,
          productsKes: 4600,
          chemistsKes: 6000,
          nursesKes: 2800,
          hospitalsKes: 2400,
          doctorsHeightPct: 20,
          productsHeightPct: 15,
          chemistsHeightPct: 17,
          nursesHeightPct: 10,
          hospitalsHeightPct: 9,
        },
        {
          month: 'D7-10',
          doctorsKes: 7200,
          productsKes: 4900,
          chemistsKes: 6500,
          nursesKes: 3000,
          hospitalsKes: 2600,
          doctorsHeightPct: 21,
          productsHeightPct: 16,
          chemistsHeightPct: 19,
          nursesHeightPct: 11,
          hospitalsHeightPct: 10,
        },
        {
          month: 'D11-14',
          doctorsKes: 7800,
          productsKes: 5300,
          chemistsKes: 7000,
          nursesKes: 3200,
          hospitalsKes: 2800,
          doctorsHeightPct: 23,
          productsHeightPct: 17,
          chemistsHeightPct: 20,
          nursesHeightPct: 12,
          hospitalsHeightPct: 11,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 308000, platformKeeps: 28000, paidToProviders: 280000, rate: '10%' },
        { source: 'Products', customersPaid: 209000, platformKeeps: 19000, paidToProviders: 190000, rate: '10%' },
        { source: 'Chemists', customersPaid: 25000, platformKeeps: 25000, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 126500, platformKeeps: 11500, paidToProviders: 115000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 135000, platformKeeps: 10000, paidToProviders: 125000, rate: '8%' },
      ],
    },
    month: {
      label: 'Monthly',
      chartTitle: 'Platform earnings this month',
      totalEarned: 163000,
      fromDoctors: 48000,
      fromProducts: 32000,
      fromChemists: 45000,
      fromNurses: 21000,
      fromHospitals: 17000,
      monthlyBars: [
        {
          month: 'W1',
          doctorsKes: 10500,
          productsKes: 7000,
          chemistsKes: 10000,
          nursesKes: 4500,
          hospitalsKes: 3800,
          doctorsHeightPct: 18,
          productsHeightPct: 13,
          chemistsHeightPct: 17,
          nursesHeightPct: 9,
          hospitalsHeightPct: 8,
        },
        {
          month: 'W2',
          doctorsKes: 11800,
          productsKes: 7900,
          chemistsKes: 11000,
          nursesKes: 5200,
          hospitalsKes: 4100,
          doctorsHeightPct: 20,
          productsHeightPct: 15,
          chemistsHeightPct: 18,
          nursesHeightPct: 10,
          hospitalsHeightPct: 9,
        },
        {
          month: 'W3',
          doctorsKes: 11400,
          productsKes: 7600,
          chemistsKes: 11500,
          nursesKes: 5000,
          hospitalsKes: 4200,
          doctorsHeightPct: 19,
          productsHeightPct: 14,
          chemistsHeightPct: 19,
          nursesHeightPct: 10,
          hospitalsHeightPct: 9,
        },
        {
          month: 'W4',
          doctorsKes: 14300,
          productsKes: 9500,
          chemistsKes: 12500,
          nursesKes: 6300,
          hospitalsKes: 4900,
          doctorsHeightPct: 24,
          productsHeightPct: 18,
          chemistsHeightPct: 21,
          nursesHeightPct: 12,
          hospitalsHeightPct: 10,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 528000, platformKeeps: 48000, paidToProviders: 480000, rate: '10%' },
        { source: 'Products', customersPaid: 352000, platformKeeps: 32000, paidToProviders: 320000, rate: '10%' },
        { source: 'Chemists', customersPaid: 45000, platformKeeps: 45000, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 231000, platformKeeps: 21000, paidToProviders: 210000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 229500, platformKeeps: 17000, paidToProviders: 212500, rate: '8%' },
      ],
    },
    quarter: {
      label: '3 months',
      chartTitle: 'Platform earnings (last 3 months)',
      totalEarned: 447000,
      fromDoctors: 128000,
      fromProducts: 84000,
      fromChemists: 135000,
      fromNurses: 56000,
      fromHospitals: 44000,
      monthlyBars: [
        {
          month: 'Sep',
          doctorsKes: 38000,
          productsKes: 25000,
          chemistsKes: 42000,
          nursesKes: 17000,
          hospitalsKes: 13000,
          doctorsHeightPct: 21,
          productsHeightPct: 15,
          chemistsHeightPct: 21,
          nursesHeightPct: 10,
          hospitalsHeightPct: 8,
        },
        {
          month: 'Oct',
          doctorsKes: 43000,
          productsKes: 28000,
          chemistsKes: 45000,
          nursesKes: 18500,
          hospitalsKes: 14800,
          doctorsHeightPct: 24,
          productsHeightPct: 17,
          chemistsHeightPct: 23,
          nursesHeightPct: 12,
          hospitalsHeightPct: 10,
        },
        {
          month: 'Nov',
          doctorsKes: 47000,
          productsKes: 31000,
          chemistsKes: 48000,
          nursesKes: 20500,
          hospitalsKes: 16200,
          doctorsHeightPct: 26,
          productsHeightPct: 19,
          chemistsHeightPct: 25,
          nursesHeightPct: 13,
          hospitalsHeightPct: 11,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 1408000, platformKeeps: 128000, paidToProviders: 1280000, rate: '10%' },
        { source: 'Products', customersPaid: 924000, platformKeeps: 84000, paidToProviders: 840000, rate: '10%' },
        { source: 'Chemists', customersPaid: 135000, platformKeeps: 135000, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 616000, platformKeeps: 56000, paidToProviders: 560000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 594000, platformKeeps: 44000, paidToProviders: 550000, rate: '8%' },
      ],
    },
    sixMonths: {
      label: '6 months',
      chartTitle: 'Platform earnings (last 6 months)',
      totalEarned: 856000,
      fromDoctors: 240000,
      fromProducts: 158000,
      fromChemists: 270000,
      fromNurses: 106000,
      fromHospitals: 82000,
      monthlyBars: [
        {
          month: 'Jun',
          doctorsKes: 31000,
          productsKes: 20000,
          chemistsKes: 38000,
          nursesKes: 13500,
          hospitalsKes: 10500,
          doctorsHeightPct: 16,
          productsHeightPct: 11,
          chemistsHeightPct: 18,
          nursesHeightPct: 8,
          hospitalsHeightPct: 7,
        },
        {
          month: 'Jul',
          doctorsKes: 35000,
          productsKes: 23000,
          chemistsKes: 41000,
          nursesKes: 15500,
          hospitalsKes: 12000,
          doctorsHeightPct: 18,
          productsHeightPct: 13,
          chemistsHeightPct: 20,
          nursesHeightPct: 9,
          hospitalsHeightPct: 8,
        },
        {
          month: 'Aug',
          doctorsKes: 37000,
          productsKes: 25000,
          chemistsKes: 43000,
          nursesKes: 16500,
          hospitalsKes: 13000,
          doctorsHeightPct: 19,
          productsHeightPct: 14,
          chemistsHeightPct: 21,
          nursesHeightPct: 10,
          hospitalsHeightPct: 8,
        },
        {
          month: 'Sep',
          doctorsKes: 41000,
          productsKes: 27000,
          chemistsKes: 46000,
          nursesKes: 18500,
          hospitalsKes: 14000,
          doctorsHeightPct: 22,
          productsHeightPct: 15,
          chemistsHeightPct: 23,
          nursesHeightPct: 11,
          hospitalsHeightPct: 9,
        },
        {
          month: 'Oct',
          doctorsKes: 46000,
          productsKes: 30000,
          chemistsKes: 49000,
          nursesKes: 20000,
          hospitalsKes: 15500,
          doctorsHeightPct: 24,
          productsHeightPct: 17,
          chemistsHeightPct: 25,
          nursesHeightPct: 12,
          hospitalsHeightPct: 10,
        },
        {
          month: 'Nov',
          doctorsKes: 50000,
          productsKes: 33000,
          chemistsKes: 53000,
          nursesKes: 22000,
          hospitalsKes: 17000,
          doctorsHeightPct: 26,
          productsHeightPct: 19,
          chemistsHeightPct: 27,
          nursesHeightPct: 13,
          hospitalsHeightPct: 11,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 2640000, platformKeeps: 240000, paidToProviders: 2400000, rate: '10%' },
        { source: 'Products', customersPaid: 1738000, platformKeeps: 158000, paidToProviders: 1580000, rate: '10%' },
        { source: 'Chemists', customersPaid: 270000, platformKeeps: 270000, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 1166000, platformKeeps: 106000, paidToProviders: 1060000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 1107000, platformKeeps: 82000, paidToProviders: 1025000, rate: '8%' },
      ],
    },
    year: {
      label: 'Yearly',
      chartTitle: 'Platform earnings per month',
      totalEarned: 1482000,
      fromDoctors: 386000,
      fromProducts: 254000,
      fromChemists: 540000,
      fromNurses: 170000,
      fromHospitals: 132000,
      monthlyBars: [
        {
          month: 'Jun',
          doctorsKes: 50000,
          productsKes: 33000,
          chemistsKes: 76000,
          nursesKes: 22000,
          hospitalsKes: 17000,
          doctorsHeightPct: 17,
          productsHeightPct: 12,
          chemistsHeightPct: 20,
          nursesHeightPct: 8,
          hospitalsHeightPct: 7,
        },
        {
          month: 'Jul',
          doctorsKes: 56000,
          productsKes: 37000,
          chemistsKes: 82000,
          nursesKes: 24500,
          hospitalsKes: 19000,
          doctorsHeightPct: 19,
          productsHeightPct: 13,
          chemistsHeightPct: 22,
          nursesHeightPct: 9,
          hospitalsHeightPct: 7,
        },
        {
          month: 'Aug',
          doctorsKes: 59000,
          productsKes: 39000,
          chemistsKes: 86000,
          nursesKes: 26000,
          hospitalsKes: 20500,
          doctorsHeightPct: 20,
          productsHeightPct: 14,
          chemistsHeightPct: 23,
          nursesHeightPct: 10,
          hospitalsHeightPct: 8,
        },
        {
          month: 'Sep',
          doctorsKes: 66000,
          productsKes: 43000,
          chemistsKes: 92000,
          nursesKes: 29000,
          hospitalsKes: 22500,
          doctorsHeightPct: 22,
          productsHeightPct: 16,
          chemistsHeightPct: 25,
          nursesHeightPct: 11,
          hospitalsHeightPct: 9,
        },
        {
          month: 'Oct',
          doctorsKes: 74000,
          productsKes: 48000,
          chemistsKes: 98000,
          nursesKes: 32500,
          hospitalsKes: 25000,
          doctorsHeightPct: 24,
          productsHeightPct: 18,
          chemistsHeightPct: 26,
          nursesHeightPct: 12,
          hospitalsHeightPct: 10,
        },
        {
          month: 'Nov',
          doctorsKes: 81000,
          productsKes: 54000,
          chemistsKes: 106000,
          nursesKes: 36000,
          hospitalsKes: 28000,
          doctorsHeightPct: 27,
          productsHeightPct: 19,
          chemistsHeightPct: 28,
          nursesHeightPct: 13,
          hospitalsHeightPct: 11,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 4246000, platformKeeps: 386000, paidToProviders: 3860000, rate: '10%' },
        { source: 'Products', customersPaid: 2794000, platformKeeps: 254000, paidToProviders: 2540000, rate: '10%' },
        { source: 'Chemists', customersPaid: 540000, platformKeeps: 540000, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 1870000, platformKeeps: 170000, paidToProviders: 1700000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 1782000, platformKeeps: 132000, paidToProviders: 1650000, rate: '8%' },
      ],
    },
    allTime: {
      label: 'All time',
      chartTitle: 'All-time platform earnings by year',
      totalEarned: 3860000,
      fromDoctors: 1020000,
      fromProducts: 670000,
      fromChemists: 1380000,
      fromNurses: 445000,
      fromHospitals: 345000,
      monthlyBars: [
        {
          month: '2023',
          doctorsKes: 180000,
          productsKes: 115000,
          chemistsKes: 240000,
          nursesKes: 78000,
          hospitalsKes: 58000,
          doctorsHeightPct: 15,
          productsHeightPct: 10,
          chemistsHeightPct: 18,
          nursesHeightPct: 7,
          hospitalsHeightPct: 6,
        },
        {
          month: '2024',
          doctorsKes: 295000,
          productsKes: 195000,
          chemistsKes: 410000,
          nursesKes: 128000,
          hospitalsKes: 98000,
          doctorsHeightPct: 21,
          productsHeightPct: 15,
          chemistsHeightPct: 23,
          nursesHeightPct: 10,
          hospitalsHeightPct: 8,
        },
        {
          month: '2025',
          doctorsKes: 385000,
          productsKes: 254000,
          chemistsKes: 540000,
          nursesKes: 170000,
          hospitalsKes: 132000,
          doctorsHeightPct: 27,
          productsHeightPct: 19,
          chemistsHeightPct: 28,
          nursesHeightPct: 13,
          hospitalsHeightPct: 11,
        },
        {
          month: '2026*',
          doctorsKes: 160000,
          productsKes: 106000,
          chemistsKes: 190000,
          nursesKes: 69000,
          hospitalsKes: 57000,
          doctorsHeightPct: 22,
          productsHeightPct: 16,
          chemistsHeightPct: 22,
          nursesHeightPct: 11,
          hospitalsHeightPct: 10,
        },
      ],
      breakdown: [
        { source: 'Doctors', customersPaid: 11220000, platformKeeps: 1020000, paidToProviders: 10200000, rate: '10%' },
        { source: 'Products', customersPaid: 7370000, platformKeeps: 670000, paidToProviders: 6700000, rate: '10%' },
        { source: 'Chemists', customersPaid: 1380000, platformKeeps: 1380000, paidToProviders: 0, rate: 'Subscription' },
        { source: 'Nurses', customersPaid: 4895000, platformKeeps: 445000, paidToProviders: 4450000, rate: '10%' },
        { source: 'Hospitals', customersPaid: 4657500, platformKeeps: 345000, paidToProviders: 4312500, rate: '8%' },
      ],
    },
  };

  readonly paymentLogs = signal<AdminPaymentLog[]>([
    {
      id: 'log-1',
      reference: 'PAY-90412',
      category: 'Doctors',
      providerName: 'Dr. Amani Otieno',
      itemDescription: 'Virtual Consultation · General Medicine',
      customerName: 'Amina Juma',
      county: 'Mombasa',
      dateTime: 'Today, 11:45 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 2200,
      platformEarned: 200,
      providerPayout: 2000,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-2',
      reference: 'PAY-90409',
      category: 'Products',
      providerName: 'Diani Beach Pharmacy',
      itemDescription: 'Amoxicillin 500mg + Paracetamol Pack',
      customerName: 'David Kamau',
      county: 'Nairobi',
      dateTime: 'Today, 10:20 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 1650,
      platformEarned: 150,
      providerPayout: 1500,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-chem-1',
      reference: 'SUB-44108',
      category: 'Chemists',
      providerName: 'Diani Beach Pharmacy',
      itemDescription: 'Monthly Pro Chemist Subscription + Featured Placement',
      customerName: 'Partner Billing',
      county: 'Mombasa',
      dateTime: 'Today, 09:40 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 2500,
      platformEarned: 2500,
      providerPayout: 0,
      commissionRate: 'Subscription',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-3',
      reference: 'PAY-90404',
      category: 'Nurses',
      providerName: 'Faith Kerubo (RN)',
      itemDescription: 'Home Visit · Post-Op Wound Care',
      customerName: 'Grace Wanjiku',
      county: 'Nakuru',
      dateTime: 'Today, 09:15 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 3300,
      platformEarned: 300,
      providerPayout: 3000,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-4',
      reference: 'PAY-90398',
      category: 'Hospitals',
      providerName: 'Aga Khan Hospital Mombasa',
      itemDescription: 'Outpatient Specialist Clinic Booking',
      customerName: 'Fatma Omar',
      county: 'Mombasa',
      dateTime: 'Today, 08:30 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 5400,
      platformEarned: 400,
      providerPayout: 5000,
      commissionRate: '8%',
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'log-chem-2',
      reference: 'SUB-44089',
      category: 'Chemists',
      providerName: 'Apex Care Chemists',
      itemDescription: 'Monthly Enterprise Storefront Subscription',
      customerName: 'Partner Billing',
      county: 'Nairobi',
      dateTime: '2 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 5000,
      platformEarned: 5000,
      providerPayout: 0,
      commissionRate: 'Subscription',
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'log-5',
      reference: 'PAY-90375',
      category: 'Doctors',
      providerName: 'Dr. Peter Mwangi',
      itemDescription: 'Hospital Visit · Paediatric Checkup',
      customerName: 'Brian Otieno',
      county: 'Kisumu',
      dateTime: '2 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 2750,
      platformEarned: 250,
      providerPayout: 2500,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-6',
      reference: 'PAY-90361',
      category: 'Products',
      providerName: 'Apex Care Chemists',
      itemDescription: 'Insulin Glargine Pen + Test Strips',
      customerName: 'Hassan Ali',
      county: 'Nairobi',
      dateTime: '3 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 4400,
      platformEarned: 400,
      providerPayout: 4000,
      commissionRate: '10%',
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'log-7',
      reference: 'PAY-90342',
      category: 'Hospitals',
      providerName: 'Nairobi West Hospital',
      itemDescription: 'Lab Diagnostics + Radiology Package',
      customerName: 'Mary Njeri',
      county: 'Nairobi',
      dateTime: '5 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 8100,
      platformEarned: 600,
      providerPayout: 7500,
      commissionRate: '8%',
      paymentMethod: 'Insurance',
      status: 'Pending payout',
    },
    {
      id: 'log-chem-3',
      reference: 'SUB-44021',
      category: 'Chemists',
      providerName: 'Nyali Health Pharmacy',
      itemDescription: 'Quarterly Verification & Priority Dispatch Plan',
      customerName: 'Partner Billing',
      county: 'Mombasa',
      dateTime: '8 days ago',
      periodBuckets: ['biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 7500,
      platformEarned: 7500,
      providerPayout: 0,
      commissionRate: 'Subscription',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-8',
      reference: 'PAY-90310',
      category: 'Nurses',
      providerName: 'Samuel Kiprop (RN)',
      itemDescription: 'Home Visit · IV Hydration & Vitals',
      customerName: 'Esther Chebet',
      county: 'Eldoret',
      dateTime: '9 days ago',
      periodBuckets: ['biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 3850,
      platformEarned: 350,
      providerPayout: 3500,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-9',
      reference: 'PAY-90284',
      category: 'Products',
      providerName: 'Nyali Health Pharmacy',
      itemDescription: 'Ventolin Inhaler + Cetirizine 10mg',
      customerName: 'Salim Bakari',
      county: 'Mombasa',
      dateTime: '18 days ago',
      periodBuckets: ['month', 'quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 1320,
      platformEarned: 120,
      providerPayout: 1200,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-10',
      reference: 'PAY-90192',
      category: 'Doctors',
      providerName: 'Dr. Wanjiru Njoroge',
      itemDescription: 'Virtual Consultation · Dermatology',
      customerName: 'Lucy Muthoni',
      county: 'Nairobi',
      dateTime: '2 months ago',
      periodBuckets: ['quarter', 'sixMonths', 'year', 'allTime'],
      customerPaid: 3300,
      platformEarned: 300,
      providerPayout: 3000,
      commissionRate: '10%',
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'log-11',
      reference: 'PAY-89840',
      category: 'Hospitals',
      providerName: 'Kisumu County Referral Wing',
      itemDescription: 'Maternity Antenatal Clinic Visit',
      customerName: 'Beatrice Akinyi',
      county: 'Kisumu',
      dateTime: '4 months ago',
      periodBuckets: ['sixMonths', 'year', 'allTime'],
      customerPaid: 6480,
      platformEarned: 480,
      providerPayout: 6000,
      commissionRate: '8%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'log-12',
      reference: 'PAY-87210',
      category: 'Nurses',
      providerName: 'Miriam Adhiambo (RN)',
      itemDescription: 'Elderly Home Care · Weekly Plan',
      customerName: 'John Karanja',
      county: 'Nakuru',
      dateTime: '14 months ago',
      periodBuckets: ['allTime'],
      customerPaid: 5500,
      platformEarned: 500,
      providerPayout: 5000,
      commissionRate: '10%',
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
  ]);

  activeData = computed(() => this.datasets[this.selectedPeriod()]);

  pieSlices = computed(() => {
    const d = this.activeData();
    const total = Math.max(d.totalEarned, 1);
    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    const raw = [
      { key: 'chemists', label: 'Chemists (Sub)', amount: d.fromChemists, color: '#0891B2' },
      { key: 'doctors', label: 'Doctors', amount: d.fromDoctors, color: '#0B7358' },
      { key: 'products', label: 'Products', amount: d.fromProducts, color: '#0D2923' },
      { key: 'nurses', label: 'Nurses', amount: d.fromNurses, color: '#F5B031' },
      { key: 'hospitals', label: 'Hospitals', amount: d.fromHospitals, color: '#2563EB' },
    ];

    let offset = 0;
    return raw.map((item) => {
      const ratio = item.amount / total;
      const dashLength = ratio * circumference;
      const slice = {
        ...item,
        pct: Math.round(ratio * 1000) / 10,
        dashArray: `${dashLength} ${circumference}`,
        dashOffset: -offset,
      };
      offset += dashLength;
      return slice;
    });
  });

  activePieSlice = computed(() => {
    const key = this.hoveredSliceKey();
    if (!key) return null;
    return this.pieSlices().find((s) => s.key === key) ?? null;
  });

  rankedStreams = computed(() => {
    const d = this.activeData();
    const total = Math.max(d.totalEarned, 1);
    const items = [
      { key: 'chemists', label: 'Chemists (Subscriptions)', amount: d.fromChemists, color: '#0891B2' },
      { key: 'doctors', label: 'Doctors', amount: d.fromDoctors, color: '#0B7358' },
      { key: 'products', label: 'Products', amount: d.fromProducts, color: '#0D2923' },
      { key: 'nurses', label: 'Nurses', amount: d.fromNurses, color: '#F5B031' },
      { key: 'hospitals', label: 'Hospitals', amount: d.fromHospitals, color: '#2563EB' },
    ].sort((a, b) => b.amount - a.amount);

    const maxAmount = Math.max(...items.map((i) => i.amount), 1);
    return items.map((item) => ({
      ...item,
      sharePct: Math.round((item.amount / total) * 1000) / 10,
      widthPct: Math.max(8, Math.round((item.amount / maxAmount) * 100)),
    }));
  });

  lineChartData = computed(() => {
    const bars = this.activeData().monthlyBars;
    const left = 48;
    const right = 484;
    const top = 18;
    const bottom = 186;
    const plotW = right - left;
    const plotH = bottom - top;

    const allVals = bars.flatMap((b) => [
      b.doctorsKes,
      b.productsKes,
      b.chemistsKes,
      b.nursesKes,
      b.hospitalsKes,
    ]);
    const maxVal = Math.max(...allVals, 1) * 1.12;
    const count = bars.length;

    const xAt = (idx: number) =>
      count <= 1 ? left + plotW / 2 : left + (idx / (count - 1)) * plotW;
    const yAt = (val: number) => bottom - (val / maxVal) * plotH;

    const seriesMeta = [
      { key: 'chemists', label: 'Chemists (Sub)', color: '#0891B2', getVal: (b: AdminEarningsBar) => b.chemistsKes },
      { key: 'doctors', label: 'Doctors', color: '#0B7358', getVal: (b: AdminEarningsBar) => b.doctorsKes },
      { key: 'products', label: 'Products', color: '#0D2923', getVal: (b: AdminEarningsBar) => b.productsKes },
      { key: 'nurses', label: 'Nurses', color: '#F5B031', getVal: (b: AdminEarningsBar) => b.nursesKes },
      { key: 'hospitals', label: 'Hospitals', color: '#2563EB', getVal: (b: AdminEarningsBar) => b.hospitalsKes },
    ];

    const series = seriesMeta.map((s) => {
      const coords = bars.map((b, i) => ({
        x: Math.round(xAt(i) * 10) / 10,
        y: Math.round(yAt(s.getVal(b)) * 10) / 10,
        value: s.getVal(b),
        label: b.month,
      }));
      return {
        key: s.key,
        label: s.label,
        color: s.color,
        pointsAttr: coords.map((c) => `${c.x},${c.y}`).join(' '),
        coords,
      };
    });

    const gridTicks = [0, 0.33, 0.66, 1].map((t) => ({
      y: Math.round((bottom - t * plotH) * 10) / 10,
      label: this.formatAxisValue(t * maxVal),
    }));

    const xLabels = bars.map((b, i) => ({
      x: Math.round(xAt(i) * 10) / 10,
      label: b.month,
      bar: b,
    }));

    return { series, gridTicks, xLabels, left, right, top, bottom };
  });

  areaChartData = computed(() => {
    const bars = this.activeData().monthlyBars;
    const left = 48;
    const right = 484;
    const top = 20;
    const bottom = 186;
    const plotW = right - left;
    const plotH = bottom - top;

    const totals = bars.map((b) => this.getBarTotal(b));
    const maxVal = Math.max(...totals, 1) * 1.12;
    const count = bars.length;

    const xAt = (idx: number) =>
      count <= 1 ? left + plotW / 2 : left + (idx / (count - 1)) * plotW;
    const yAt = (val: number) => bottom - (val / maxVal) * plotH;

    const points = bars.map((b, i) => ({
      x: Math.round(xAt(i) * 10) / 10,
      y: Math.round(yAt(this.getBarTotal(b)) * 10) / 10,
      total: this.getBarTotal(b),
      label: b.month,
      bar: b,
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath =
      points.length > 0
        ? `${linePath} L ${points[points.length - 1].x} ${bottom} L ${points[0].x} ${bottom} Z`
        : '';

    const gridTicks = [0, 0.33, 0.66, 1].map((t) => ({
      y: Math.round((bottom - t * plotH) * 10) / 10,
      label: this.formatAxisValue(t * maxVal),
    }));

    const firstTotal = totals[0] ?? 0;
    const lastTotal = totals[totals.length - 1] ?? 0;
    const trendPct =
      firstTotal > 0 ? Math.round(((lastTotal - firstTotal) / firstTotal) * 100) : 0;

    return { points, linePath, areaPath, gridTicks, left, right, bottom, trendPct };
  });

  filteredPaymentLogs = computed(() => {
    const category = this.logCategoryFilter();
    const periodFilter = this.logPeriodFilter();
    const query = this.logSearchTerm().toLowerCase().trim();

    return this.paymentLogs().filter((log) => {
      const matchesCategory = category === 'all' || log.category === category;
      const matchesPeriod =
        periodFilter === 'all' || log.periodBuckets.includes(periodFilter);
      const matchesQuery =
        !query ||
        log.reference.toLowerCase().includes(query) ||
        log.providerName.toLowerCase().includes(query) ||
        log.itemDescription.toLowerCase().includes(query) ||
        log.customerName.toLowerCase().includes(query) ||
        log.county.toLowerCase().includes(query);

      return matchesCategory && matchesPeriod && matchesQuery;
    });
  });

  logSummary = computed(() => {
    const logs = this.filteredPaymentLogs();
    return {
      count: logs.length,
      customersPaid: logs.reduce((sum, l) => sum + l.customerPaid, 0),
      platformEarned: logs.reduce((sum, l) => sum + l.platformEarned, 0),
      providerPayout: logs.reduce((sum, l) => sum + l.providerPayout, 0),
    };
  });

  setPeriod(period: AdminEarningsPeriod): void {
    this.selectedPeriod.set(period);
    this.hoveredBar.set(null);
    this.hoveredSliceKey.set(null);
  }

  setChartType(type: AdminChartType): void {
    this.selectedChartType.set(type);
    this.hoveredBar.set(null);
    this.hoveredSliceKey.set(null);
  }

  openPaymentLogs(): void {
    this.showPaymentLogs.set(true);
  }

  closePaymentLogs(): void {
    this.showPaymentLogs.set(false);
  }

  setLogCategory(category: PaymentLogCategory): void {
    this.logCategoryFilter.set(category);
  }

  getBarTotal(bar: AdminEarningsBar): number {
    return (
      bar.doctorsKes +
      bar.productsKes +
      bar.chemistsKes +
      bar.nursesKes +
      bar.hospitalsKes
    );
  }

  private formatAxisValue(val: number): string {
    if (val <= 0) return '0';
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${Math.round(val / 1000)}k`;
    return `${Math.round(val)}`;
  }
}
