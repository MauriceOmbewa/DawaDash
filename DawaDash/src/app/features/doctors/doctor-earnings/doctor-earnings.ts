import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DoctorChartType,
  DoctorEarningCategory,
  DoctorEarningsBar,
  DoctorEarningsDataset,
  DoctorEarningsPeriod,
  DoctorLogCategoryFilter,
  DoctorPaymentLog,
} from '../models/doctor-models';

@Component({
  selector: 'app-doctor-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-earnings.html',
  styleUrl: './doctor-earnings.css',
})
export class DoctorEarnings {
  readonly periodOptions: { id: DoctorEarningsPeriod; label: string }[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'week', label: 'Weekly' },
    { id: 'biweekly', label: 'Bi-weekly' },
    { id: 'month', label: 'Monthly' },
    { id: 'quarter', label: '3 months' },
    { id: 'sixMonths', label: '6 months' },
    { id: 'year', label: 'Yearly' },
    { id: 'allTime', label: 'All time' },
  ];

  readonly chartTypeOptions: { id: DoctorChartType; label: string }[] = [
    { id: 'stackedBar', label: 'Stacked bar' },
    { id: 'line', label: 'Line graph' },
    { id: 'pie', label: 'Pie / Donut' },
    { id: 'area', label: 'Area trend' },
    { id: 'rankings', label: 'Stream bars' },
  ];

  selectedPeriod = signal<DoctorEarningsPeriod>('year');
  selectedChartType = signal<DoctorChartType>('stackedBar');
  hoveredBar = signal<DoctorEarningsBar | null>(null);
  hoveredSliceKey = signal<string | null>(null);

  // Consultation logs sub-view state
  showConsultationLogs = signal<boolean>(false);
  logCategoryFilter = signal<DoctorLogCategoryFilter>('all');
  logPeriodFilter = signal<'all' | DoctorEarningsPeriod>('all');
  logSearchTerm = signal<string>('');

  // M-Pesa withdrawal modal state
  availableBalance = signal<number>(24000);
  showWithdrawModal = signal<boolean>(false);
  mpesaNumber = signal<string>('0712345678');
  withdrawAmount = signal<number>(12000);
  isSuccess = signal<boolean>(false);

  private readonly datasets: Record<DoctorEarningsPeriod, DoctorEarningsDataset> = {
    daily: {
      label: 'Daily',
      chartTitle: 'Doctor earnings today (by block)',
      totalEarned: 14500,
      fromVirtual: 6000,
      fromHospital: 4000,
      fromHome: 2500,
      fromFollowUp: 1200,
      fromLabRx: 800,
      monthlyBars: [
        {
          month: '8am',
          virtualKes: 1200,
          hospitalKes: 800,
          homeKes: 500,
          followUpKes: 250,
          labRxKes: 180,
          virtualHeightPct: 16,
          hospitalHeightPct: 12,
          homeHeightPct: 9,
          followUpHeightPct: 6,
          labRxHeightPct: 5,
        },
        {
          month: '10am',
          virtualKes: 1700,
          hospitalKes: 1100,
          homeKes: 700,
          followUpKes: 350,
          labRxKes: 220,
          virtualHeightPct: 21,
          hospitalHeightPct: 15,
          homeHeightPct: 11,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: '12pm',
          virtualKes: 1600,
          hospitalKes: 1100,
          homeKes: 650,
          followUpKes: 300,
          labRxKes: 200,
          virtualHeightPct: 20,
          hospitalHeightPct: 15,
          homeHeightPct: 10,
          followUpHeightPct: 7,
          labRxHeightPct: 6,
        },
        {
          month: '2pm',
          virtualKes: 1500,
          hospitalKes: 1000,
          homeKes: 650,
          followUpKes: 300,
          labRxKes: 200,
          virtualHeightPct: 18,
          hospitalHeightPct: 14,
          homeHeightPct: 10,
          followUpHeightPct: 7,
          labRxHeightPct: 6,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 6600, youEarned: 6000, consults: 3, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 4400, youEarned: 4000, consults: 2, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 2750, youEarned: 2500, consults: 1, avgPerConsult: 2500 },
        { channel: 'Follow-up review', patientsPaid: 1320, youEarned: 1200, consults: 1, avgPerConsult: 1200 },
        { channel: 'Lab & Rx review', patientsPaid: 880, youEarned: 800, consults: 1, avgPerConsult: 800 },
      ],
    },
    week: {
      label: 'Weekly',
      chartTitle: 'Doctor earnings this week',
      totalEarned: 58400,
      fromVirtual: 24000,
      fromHospital: 16000,
      fromHome: 10000,
      fromFollowUp: 5200,
      fromLabRx: 3200,
      monthlyBars: [
        {
          month: 'Mon',
          virtualKes: 3200,
          hospitalKes: 2100,
          homeKes: 1300,
          followUpKes: 700,
          labRxKes: 420,
          virtualHeightPct: 17,
          hospitalHeightPct: 13,
          homeHeightPct: 10,
          followUpHeightPct: 6,
          labRxHeightPct: 5,
        },
        {
          month: 'Tue',
          virtualKes: 3700,
          hospitalKes: 2450,
          homeKes: 1500,
          followUpKes: 800,
          labRxKes: 480,
          virtualHeightPct: 19,
          hospitalHeightPct: 15,
          homeHeightPct: 11,
          followUpHeightPct: 7,
          labRxHeightPct: 6,
        },
        {
          month: 'Wed',
          virtualKes: 3500,
          hospitalKes: 2300,
          homeKes: 1450,
          followUpKes: 760,
          labRxKes: 460,
          virtualHeightPct: 18,
          hospitalHeightPct: 14,
          homeHeightPct: 11,
          followUpHeightPct: 7,
          labRxHeightPct: 5,
        },
        {
          month: 'Thu',
          virtualKes: 4100,
          hospitalKes: 2750,
          homeKes: 1750,
          followUpKes: 900,
          labRxKes: 560,
          virtualHeightPct: 21,
          hospitalHeightPct: 16,
          homeHeightPct: 12,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'Fri',
          virtualKes: 4550,
          hospitalKes: 3050,
          homeKes: 1900,
          followUpKes: 980,
          labRxKes: 620,
          virtualHeightPct: 23,
          hospitalHeightPct: 18,
          homeHeightPct: 13,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: 'Sat',
          virtualKes: 4950,
          hospitalKes: 3350,
          homeKes: 2100,
          followUpKes: 1060,
          labRxKes: 660,
          virtualHeightPct: 25,
          hospitalHeightPct: 19,
          homeHeightPct: 14,
          followUpHeightPct: 10,
          labRxHeightPct: 7,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 26400, youEarned: 24000, consults: 12, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 17600, youEarned: 16000, consults: 8, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 11000, youEarned: 10000, consults: 4, avgPerConsult: 2500 },
        { channel: 'Follow-up review', patientsPaid: 5720, youEarned: 5200, consults: 4, avgPerConsult: 1300 },
        { channel: 'Lab & Rx review', patientsPaid: 3520, youEarned: 3200, consults: 4, avgPerConsult: 800 },
      ],
    },
    biweekly: {
      label: 'Bi-weekly',
      chartTitle: 'Doctor earnings (last 14 days)',
      totalEarned: 116800,
      fromVirtual: 48000,
      fromHospital: 32000,
      fromHome: 20000,
      fromFollowUp: 10400,
      fromLabRx: 6400,
      monthlyBars: [
        {
          month: 'D1-3',
          virtualKes: 10600,
          hospitalKes: 7100,
          homeKes: 4400,
          followUpKes: 2300,
          labRxKes: 1400,
          virtualHeightPct: 18,
          hospitalHeightPct: 14,
          homeHeightPct: 11,
          followUpHeightPct: 7,
          labRxHeightPct: 6,
        },
        {
          month: 'D4-6',
          virtualKes: 11500,
          hospitalKes: 7700,
          homeKes: 4800,
          followUpKes: 2500,
          labRxKes: 1550,
          virtualHeightPct: 20,
          hospitalHeightPct: 15,
          homeHeightPct: 12,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'D7-10',
          virtualKes: 12400,
          hospitalKes: 8300,
          homeKes: 5200,
          followUpKes: 2700,
          labRxKes: 1650,
          virtualHeightPct: 21,
          hospitalHeightPct: 16,
          homeHeightPct: 13,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: 'D11-14',
          virtualKes: 13500,
          hospitalKes: 8900,
          homeKes: 5600,
          followUpKes: 2900,
          labRxKes: 1800,
          virtualHeightPct: 23,
          hospitalHeightPct: 18,
          homeHeightPct: 14,
          followUpHeightPct: 10,
          labRxHeightPct: 8,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 52800, youEarned: 48000, consults: 24, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 35200, youEarned: 32000, consults: 16, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 22000, youEarned: 20000, consults: 8, avgPerConsult: 2500 },
        { channel: 'Follow-up review', patientsPaid: 11440, youEarned: 10400, consults: 8, avgPerConsult: 1300 },
        { channel: 'Lab & Rx review', patientsPaid: 7040, youEarned: 6400, consults: 8, avgPerConsult: 800 },
      ],
    },
    month: {
      label: 'Monthly',
      chartTitle: 'Doctor earnings this month',
      totalEarned: 216000,
      fromVirtual: 90000,
      fromHospital: 60000,
      fromHome: 37500,
      fromFollowUp: 18000,
      fromLabRx: 10500,
      monthlyBars: [
        {
          month: 'W1',
          virtualKes: 19800,
          hospitalKes: 13200,
          homeKes: 8200,
          followUpKes: 3900,
          labRxKes: 2300,
          virtualHeightPct: 18,
          hospitalHeightPct: 14,
          homeHeightPct: 11,
          followUpHeightPct: 7,
          labRxHeightPct: 6,
        },
        {
          month: 'W2',
          virtualKes: 21600,
          hospitalKes: 14400,
          homeKes: 9000,
          followUpKes: 4300,
          labRxKes: 2500,
          virtualHeightPct: 20,
          hospitalHeightPct: 15,
          homeHeightPct: 12,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'W3',
          virtualKes: 22900,
          hospitalKes: 15300,
          homeKes: 9600,
          followUpKes: 4600,
          labRxKes: 2700,
          virtualHeightPct: 21,
          hospitalHeightPct: 16,
          homeHeightPct: 13,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: 'W4',
          virtualKes: 25700,
          hospitalKes: 17100,
          homeKes: 10700,
          followUpKes: 5200,
          labRxKes: 3000,
          virtualHeightPct: 24,
          hospitalHeightPct: 18,
          homeHeightPct: 14,
          followUpHeightPct: 10,
          labRxHeightPct: 8,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 99000, youEarned: 90000, consults: 45, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 66000, youEarned: 60000, consults: 30, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 41250, youEarned: 37500, consults: 15, avgPerConsult: 2500 },
        { channel: 'Follow-up review', patientsPaid: 19800, youEarned: 18000, consults: 15, avgPerConsult: 1200 },
        { channel: 'Lab & Rx review', patientsPaid: 11550, youEarned: 10500, consults: 13, avgPerConsult: 808 },
      ],
    },
    quarter: {
      label: '3 months',
      chartTitle: 'Doctor earnings (last 3 months)',
      totalEarned: 612000,
      fromVirtual: 256000,
      fromHospital: 170000,
      fromHome: 105000,
      fromFollowUp: 51000,
      fromLabRx: 30000,
      monthlyBars: [
        {
          month: 'Sep',
          virtualKes: 77000,
          hospitalKes: 51000,
          homeKes: 31500,
          followUpKes: 15300,
          labRxKes: 9000,
          virtualHeightPct: 21,
          hospitalHeightPct: 15,
          homeHeightPct: 12,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'Oct',
          virtualKes: 85000,
          hospitalKes: 56500,
          homeKes: 35000,
          followUpKes: 17000,
          labRxKes: 10000,
          virtualHeightPct: 24,
          hospitalHeightPct: 17,
          homeHeightPct: 14,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: 'Nov',
          virtualKes: 94000,
          hospitalKes: 62500,
          homeKes: 38500,
          followUpKes: 18700,
          labRxKes: 11000,
          virtualHeightPct: 26,
          hospitalHeightPct: 19,
          homeHeightPct: 16,
          followUpHeightPct: 10,
          labRxHeightPct: 8,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 281600, youEarned: 256000, consults: 128, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 187000, youEarned: 170000, consults: 85, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 115500, youEarned: 105000, consults: 42, avgPerConsult: 2500 },
        { channel: 'Follow-up review', patientsPaid: 56100, youEarned: 51000, consults: 42, avgPerConsult: 1214 },
        { channel: 'Lab & Rx review', patientsPaid: 33000, youEarned: 30000, consults: 37, avgPerConsult: 811 },
      ],
    },
    sixMonths: {
      label: '6 months',
      chartTitle: 'Doctor earnings (last 6 months)',
      totalEarned: 1180000,
      fromVirtual: 492000,
      fromHospital: 328000,
      fromHome: 202000,
      fromFollowUp: 98000,
      fromLabRx: 60000,
      monthlyBars: [
        {
          month: 'Jun',
          virtualKes: 65000,
          hospitalKes: 43000,
          homeKes: 26500,
          followUpKes: 13000,
          labRxKes: 7800,
          virtualHeightPct: 16,
          hospitalHeightPct: 12,
          homeHeightPct: 10,
          followUpHeightPct: 6,
          labRxHeightPct: 5,
        },
        {
          month: 'Jul',
          virtualKes: 71500,
          hospitalKes: 47500,
          homeKes: 29500,
          followUpKes: 14200,
          labRxKes: 8600,
          virtualHeightPct: 18,
          hospitalHeightPct: 13,
          homeHeightPct: 11,
          followUpHeightPct: 7,
          labRxHeightPct: 6,
        },
        {
          month: 'Aug',
          virtualKes: 77000,
          hospitalKes: 51000,
          homeKes: 31500,
          followUpKes: 15300,
          labRxKes: 9400,
          virtualHeightPct: 19,
          hospitalHeightPct: 14,
          homeHeightPct: 12,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'Sep',
          virtualKes: 84500,
          hospitalKes: 56500,
          homeKes: 34500,
          followUpKes: 16800,
          labRxKes: 10400,
          virtualHeightPct: 22,
          hospitalHeightPct: 16,
          homeHeightPct: 13,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: 'Oct',
          virtualKes: 93000,
          hospitalKes: 62000,
          homeKes: 38000,
          followUpKes: 18500,
          labRxKes: 11400,
          virtualHeightPct: 24,
          hospitalHeightPct: 18,
          homeHeightPct: 15,
          followUpHeightPct: 10,
          labRxHeightPct: 8,
        },
        {
          month: 'Nov',
          virtualKes: 101000,
          hospitalKes: 68000,
          homeKes: 42000,
          followUpKes: 20200,
          labRxKes: 12400,
          virtualHeightPct: 26,
          hospitalHeightPct: 19,
          homeHeightPct: 16,
          followUpHeightPct: 11,
          labRxHeightPct: 8,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 541200, youEarned: 492000, consults: 246, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 360800, youEarned: 328000, consults: 164, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 222200, youEarned: 202000, consults: 81, avgPerConsult: 2494 },
        { channel: 'Follow-up review', patientsPaid: 107800, youEarned: 98000, consults: 82, avgPerConsult: 1195 },
        { channel: 'Lab & Rx review', patientsPaid: 66000, youEarned: 60000, consults: 75, avgPerConsult: 800 },
      ],
    },
    year: {
      label: 'Yearly',
      chartTitle: 'Doctor earnings per month',
      totalEarned: 2140000,
      fromVirtual: 896000,
      fromHospital: 594000,
      fromHome: 368000,
      fromFollowUp: 174000,
      fromLabRx: 108000,
      monthlyBars: [
        {
          month: 'Jun',
          virtualKes: 118000,
          hospitalKes: 78000,
          homeKes: 48000,
          followUpKes: 23000,
          labRxKes: 14000,
          virtualHeightPct: 17,
          hospitalHeightPct: 12,
          homeHeightPct: 10,
          followUpHeightPct: 7,
          labRxHeightPct: 5,
        },
        {
          month: 'Jul',
          virtualKes: 130000,
          hospitalKes: 86000,
          homeKes: 53000,
          followUpKes: 25000,
          labRxKes: 15500,
          virtualHeightPct: 19,
          hospitalHeightPct: 14,
          homeHeightPct: 11,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'Aug',
          virtualKes: 140000,
          hospitalKes: 92500,
          homeKes: 57500,
          followUpKes: 27000,
          labRxKes: 16800,
          virtualHeightPct: 20,
          hospitalHeightPct: 15,
          homeHeightPct: 12,
          followUpHeightPct: 8,
          labRxHeightPct: 6,
        },
        {
          month: 'Sep',
          virtualKes: 154000,
          hospitalKes: 102000,
          homeKes: 63500,
          followUpKes: 29800,
          labRxKes: 18500,
          virtualHeightPct: 22,
          hospitalHeightPct: 16,
          homeHeightPct: 14,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: 'Oct',
          virtualKes: 169000,
          hospitalKes: 112000,
          homeKes: 69500,
          followUpKes: 33000,
          labRxKes: 20500,
          virtualHeightPct: 24,
          hospitalHeightPct: 18,
          homeHeightPct: 15,
          followUpHeightPct: 10,
          labRxHeightPct: 8,
        },
        {
          month: 'Nov',
          virtualKes: 185000,
          hospitalKes: 123500,
          homeKes: 76500,
          followUpKes: 36200,
          labRxKes: 22700,
          virtualHeightPct: 27,
          hospitalHeightPct: 20,
          homeHeightPct: 17,
          followUpHeightPct: 11,
          labRxHeightPct: 9,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 985600, youEarned: 896000, consults: 448, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 653400, youEarned: 594000, consults: 297, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 404800, youEarned: 368000, consults: 147, avgPerConsult: 2503 },
        { channel: 'Follow-up review', patientsPaid: 191400, youEarned: 174000, consults: 145, avgPerConsult: 1200 },
        { channel: 'Lab & Rx review', patientsPaid: 118800, youEarned: 108000, consults: 135, avgPerConsult: 800 },
      ],
    },
    allTime: {
      label: 'All time',
      chartTitle: 'All-time doctor earnings by year',
      totalEarned: 5480000,
      fromVirtual: 2296000,
      fromHospital: 1524000,
      fromHome: 942000,
      fromFollowUp: 444000,
      fromLabRx: 274000,
      monthlyBars: [
        {
          month: '2023',
          virtualKes: 380000,
          hospitalKes: 252000,
          homeKes: 156000,
          followUpKes: 74000,
          labRxKes: 45000,
          virtualHeightPct: 15,
          hospitalHeightPct: 11,
          homeHeightPct: 9,
          followUpHeightPct: 6,
          labRxHeightPct: 5,
        },
        {
          month: '2024',
          virtualKes: 650000,
          hospitalKes: 432000,
          homeKes: 266000,
          followUpKes: 126000,
          labRxKes: 78000,
          virtualHeightPct: 21,
          hospitalHeightPct: 15,
          homeHeightPct: 13,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
        {
          month: '2025',
          virtualKes: 896000,
          hospitalKes: 594000,
          homeKes: 368000,
          followUpKes: 174000,
          labRxKes: 108000,
          virtualHeightPct: 27,
          hospitalHeightPct: 20,
          homeHeightPct: 17,
          followUpHeightPct: 11,
          labRxHeightPct: 9,
        },
        {
          month: '2026*',
          virtualKes: 370000,
          hospitalKes: 246000,
          homeKes: 152000,
          followUpKes: 70000,
          labRxKes: 43000,
          virtualHeightPct: 22,
          hospitalHeightPct: 16,
          homeHeightPct: 14,
          followUpHeightPct: 9,
          labRxHeightPct: 7,
        },
      ],
      breakdown: [
        { channel: 'Virtual consult', patientsPaid: 2525600, youEarned: 2296000, consults: 1148, avgPerConsult: 2000 },
        { channel: 'Hospital visit', patientsPaid: 1676400, youEarned: 1524000, consults: 762, avgPerConsult: 2000 },
        { channel: 'Home visit', patientsPaid: 1036200, youEarned: 942000, consults: 377, avgPerConsult: 2499 },
        { channel: 'Follow-up review', patientsPaid: 488400, youEarned: 444000, consults: 370, avgPerConsult: 1200 },
        { channel: 'Lab & Rx review', patientsPaid: 301400, youEarned: 274000, consults: 343, avgPerConsult: 799 },
      ],
    },
  };

  readonly paymentLogs = signal<DoctorPaymentLog[]>([
    {
      id: 'dlog-1',
      reference: 'DOC-90421',
      category: 'Virtual consult',
      patientName: 'Kiprono Cheruiyot',
      itemDescription: 'Video consultation · Hypertension & Rx refill',
      location: 'Kilimani, Nairobi',
      dateTime: 'Today, 08:00 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 2200,
      platformFee: 200,
      youEarned: 2000,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-2',
      reference: 'DOC-90418',
      category: 'Hospital visit',
      patientName: 'Esther Njeri',
      itemDescription: 'Outpatient clinic review · General medicine',
      location: 'Nairobi West Clinic',
      dateTime: 'Today, 07:15 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 2200,
      platformFee: 200,
      youEarned: 2000,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-3',
      reference: 'DOC-90411',
      category: 'Home visit',
      patientName: 'Grace Wanjiku',
      itemDescription: 'Home specialist checkup & respiratory assessment',
      location: 'Westlands, Nairobi',
      dateTime: 'Today, 09:40 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 2750,
      platformFee: 250,
      youEarned: 2500,
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'dlog-4',
      reference: 'DOC-90399',
      category: 'Follow-up review',
      patientName: 'Moses Wafula',
      itemDescription: '7-day post-consult medication response review',
      location: 'South C, Nairobi',
      dateTime: 'Yesterday, 05:30 pm',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1320,
      platformFee: 120,
      youEarned: 1200,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-5',
      reference: 'DOC-90385',
      category: 'Lab & Rx review',
      patientName: 'Mercy Akinyi',
      itemDescription: 'CBC + HbA1c lab report interpretation & e-Rx',
      location: 'Kileleshwa, Nairobi',
      dateTime: 'Yesterday, 03:00 pm',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 880,
      platformFee: 80,
      youEarned: 800,
      paymentMethod: 'Insurance',
      status: 'Pending payout',
    },
    {
      id: 'dlog-6',
      reference: 'DOC-90364',
      category: 'Virtual consult',
      patientName: 'Sammy Gitonga',
      itemDescription: 'Evening teleconsult · Acute migraine workup',
      location: 'Lavington, Nairobi',
      dateTime: '3 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 2200,
      platformFee: 200,
      youEarned: 2000,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-7',
      reference: 'DOC-90322',
      category: 'Hospital visit',
      patientName: 'Fatma Omar',
      itemDescription: 'Cardiology clinic evaluation & ECG review',
      location: 'Aga Khan Wing',
      dateTime: '8 days ago',
      periodBuckets: ['biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 2200,
      platformFee: 200,
      youEarned: 2000,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-8',
      reference: 'DOC-90289',
      category: 'Home visit',
      patientName: 'John Karanja',
      itemDescription: 'Geriatric home consultation & care plan',
      location: 'Karen, Nairobi',
      dateTime: '17 days ago',
      periodBuckets: ['month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 2750,
      platformFee: 250,
      youEarned: 2500,
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'dlog-9',
      reference: 'DOC-90195',
      category: 'Follow-up review',
      patientName: 'Beatrice Akinyi',
      itemDescription: 'Chronic asthma control check-in & inhaler plan',
      location: 'Kisumu',
      dateTime: '2 months ago',
      periodBuckets: ['quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1320,
      platformFee: 120,
      youEarned: 1200,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-10',
      reference: 'DOC-89844',
      category: 'Lab & Rx review',
      patientName: 'Lucy Muthoni',
      itemDescription: 'Thyroid panel interpretation & dose adjustment',
      location: 'Nakuru',
      dateTime: '4 months ago',
      periodBuckets: ['sixMonths', 'year', 'allTime'],
      patientPaid: 880,
      platformFee: 80,
      youEarned: 800,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'dlog-11',
      reference: 'DOC-88120',
      category: 'Virtual consult',
      patientName: 'David Kamau',
      itemDescription: 'Telehealth consultation · Dermatology follow-up',
      location: 'Nairobi',
      dateTime: '14 months ago',
      periodBuckets: ['allTime'],
      patientPaid: 2200,
      platformFee: 200,
      youEarned: 2000,
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
      { key: 'virtual', label: 'Virtual consult', amount: d.fromVirtual, color: '#0B7358' },
      { key: 'hospital', label: 'Hospital visit', amount: d.fromHospital, color: '#0D2923' },
      { key: 'home', label: 'Home visit', amount: d.fromHome, color: '#0891B2' },
      { key: 'followUp', label: 'Follow-up review', amount: d.fromFollowUp, color: '#F5B031' },
      { key: 'labRx', label: 'Lab & Rx review', amount: d.fromLabRx, color: '#2563EB' },
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
      { key: 'virtual', label: 'Virtual consultations', amount: d.fromVirtual, color: '#0B7358' },
      { key: 'hospital', label: 'Hospital / Clinic visits', amount: d.fromHospital, color: '#0D2923' },
      { key: 'home', label: 'Home doctor visits', amount: d.fromHome, color: '#0891B2' },
      { key: 'followUp', label: 'Follow-up reviews', amount: d.fromFollowUp, color: '#F5B031' },
      { key: 'labRx', label: 'Lab & Rx reviews', amount: d.fromLabRx, color: '#2563EB' },
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
      b.virtualKes,
      b.hospitalKes,
      b.homeKes,
      b.followUpKes,
      b.labRxKes,
    ]);
    const maxVal = Math.max(...allVals, 1) * 1.12;
    const count = bars.length;

    const xAt = (idx: number) =>
      count <= 1 ? left + plotW / 2 : left + (idx / (count - 1)) * plotW;
    const yAt = (val: number) => bottom - (val / maxVal) * plotH;

    const seriesMeta = [
      { key: 'virtual', label: 'Virtual consult', color: '#0B7358', getVal: (b: DoctorEarningsBar) => b.virtualKes },
      { key: 'hospital', label: 'Hospital visit', color: '#0D2923', getVal: (b: DoctorEarningsBar) => b.hospitalKes },
      { key: 'home', label: 'Home visit', color: '#0891B2', getVal: (b: DoctorEarningsBar) => b.homeKes },
      { key: 'followUp', label: 'Follow-up review', color: '#F5B031', getVal: (b: DoctorEarningsBar) => b.followUpKes },
      { key: 'labRx', label: 'Lab & Rx review', color: '#2563EB', getVal: (b: DoctorEarningsBar) => b.labRxKes },
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

  filteredConsultationLogs = computed(() => {
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
        log.patientName.toLowerCase().includes(query) ||
        log.itemDescription.toLowerCase().includes(query) ||
        log.location.toLowerCase().includes(query);

      return matchesCategory && matchesPeriod && matchesQuery;
    });
  });

  logSummary = computed(() => {
    const logs = this.filteredConsultationLogs();
    return {
      count: logs.length,
      patientsPaid: logs.reduce((sum, l) => sum + l.patientPaid, 0),
      youEarned: logs.reduce((sum, l) => sum + l.youEarned, 0),
    };
  });

  setPeriod(period: DoctorEarningsPeriod): void {
    this.selectedPeriod.set(period);
    this.hoveredBar.set(null);
    this.hoveredSliceKey.set(null);
  }

  setChartType(type: DoctorChartType): void {
    this.selectedChartType.set(type);
    this.hoveredBar.set(null);
    this.hoveredSliceKey.set(null);
  }

  openLogs(): void {
    this.showConsultationLogs.set(true);
  }

  closeLogs(): void {
    this.showConsultationLogs.set(false);
  }

  setLogCategory(category: DoctorLogCategoryFilter): void {
    this.logCategoryFilter.set(category);
  }

  getCategoryClass(category: DoctorEarningCategory): string {
    switch (category) {
      case 'Virtual consult':
        return 'virtual';
      case 'Hospital visit':
        return 'hospital';
      case 'Home visit':
        return 'home';
      case 'Follow-up review':
        return 'followup';
      case 'Lab & Rx review':
        return 'labrx';
    }
  }

  getBarTotal(bar: DoctorEarningsBar): number {
    return (
      bar.virtualKes +
      bar.hospitalKes +
      bar.homeKes +
      bar.followUpKes +
      bar.labRxKes
    );
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

  private formatAxisValue(val: number): string {
    if (val <= 0) return '0';
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${Math.round(val / 1000)}k`;
    return `${Math.round(val)}`;
  }
}
