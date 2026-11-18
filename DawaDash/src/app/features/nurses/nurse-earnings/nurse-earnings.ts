import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NurseChartType,
  NurseEarningsBar,
  NurseEarningsDataset,
  NurseEarningsPeriod,
  NurseLogCategoryFilter,
  NursePaymentLog,
  NurseVisitType,
} from '../models/nurse-models';

@Component({
  selector: 'app-nurse-earnings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nurse-earnings.html',
  styleUrl: './nurse-earnings.css',
})
export class NurseEarnings {
  readonly periodOptions: { id: NurseEarningsPeriod; label: string }[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'week', label: 'Weekly' },
    { id: 'biweekly', label: 'Bi-weekly' },
    { id: 'month', label: 'Monthly' },
    { id: 'quarter', label: '3 months' },
    { id: 'sixMonths', label: '6 months' },
    { id: 'year', label: 'Yearly' },
    { id: 'allTime', label: 'All time' },
  ];

  readonly chartTypeOptions: { id: NurseChartType; label: string }[] = [
    { id: 'stackedBar', label: 'Stacked bar' },
    { id: 'line', label: 'Line graph' },
    { id: 'pie', label: 'Pie / Donut' },
    { id: 'area', label: 'Area trend' },
    { id: 'rankings', label: 'Stream bars' },
  ];

  selectedPeriod = signal<NurseEarningsPeriod>('year');
  selectedChartType = signal<NurseChartType>('stackedBar');
  hoveredBar = signal<NurseEarningsBar | null>(null);
  hoveredSliceKey = signal<string | null>(null);

  // Payment logs view state
  showPaymentLogs = signal<boolean>(false);
  logCategoryFilter = signal<NurseLogCategoryFilter>('all');
  logPeriodFilter = signal<'all' | NurseEarningsPeriod>('all');
  logSearchTerm = signal<string>('');

  // M-Pesa withdrawal modal state
  availableBalance = signal<number>(11880);
  showWithdrawModal = signal<boolean>(false);
  mpesaNumber = signal<string>('0722334455');
  withdrawAmount = signal<number>(3960);
  isSuccess = signal<boolean>(false);

  private readonly datasets: Record<NurseEarningsPeriod, NurseEarningsDataset> = {
    daily: {
      label: 'Daily',
      chartTitle: 'Nurse earnings today (by block)',
      totalEarned: 6160,
      fromWoundCare: 2040,
      fromPostOp: 1320,
      fromIvDrip: 1100,
      fromInjections: 880,
      fromCatheter: 820,
      monthlyBars: [
        {
          month: '8am',
          woundCareKes: 480,
          postOpKes: 320,
          ivDripKes: 260,
          injectionsKes: 200,
          catheterKes: 180,
          woundCareHeightPct: 16,
          postOpHeightPct: 12,
          ivDripHeightPct: 11,
          injectionsHeightPct: 8,
          catheterHeightPct: 7,
        },
        {
          month: '10am',
          woundCareKes: 560,
          postOpKes: 360,
          ivDripKes: 300,
          injectionsKes: 240,
          catheterKes: 220,
          woundCareHeightPct: 19,
          postOpHeightPct: 14,
          ivDripHeightPct: 13,
          injectionsHeightPct: 10,
          catheterHeightPct: 9,
        },
        {
          month: '12pm',
          woundCareKes: 540,
          postOpKes: 340,
          ivDripKes: 280,
          injectionsKes: 240,
          catheterKes: 220,
          woundCareHeightPct: 18,
          postOpHeightPct: 13,
          ivDripHeightPct: 12,
          injectionsHeightPct: 10,
          catheterHeightPct: 9,
        },
        {
          month: '2pm',
          woundCareKes: 460,
          postOpKes: 300,
          ivDripKes: 260,
          injectionsKes: 200,
          catheterKes: 200,
          woundCareHeightPct: 15,
          postOpHeightPct: 11,
          ivDripHeightPct: 11,
          injectionsHeightPct: 8,
          catheterHeightPct: 8,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 2240, youEarned: 2040, visits: 2, avgPerVisit: 1020 },
        { service: 'Post-op dressing', patientsPaid: 1450, youEarned: 1320, visits: 1, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 1210, youEarned: 1100, visits: 1, avgPerVisit: 1100 },
        { service: 'Injections', patientsPaid: 970, youEarned: 880, visits: 1, avgPerVisit: 880 },
        { service: 'Catheter care', patientsPaid: 900, youEarned: 820, visits: 1, avgPerVisit: 820 },
      ],
    },
    week: {
      label: 'Weekly',
      chartTitle: 'Nurse earnings this week',
      totalEarned: 24200,
      fromWoundCare: 7920,
      fromPostOp: 5280,
      fromIvDrip: 4620,
      fromInjections: 3520,
      fromCatheter: 2860,
      monthlyBars: [
        {
          month: 'Mon',
          woundCareKes: 1100,
          postOpKes: 740,
          ivDripKes: 640,
          injectionsKes: 480,
          catheterKes: 400,
          woundCareHeightPct: 17,
          postOpHeightPct: 13,
          ivDripHeightPct: 12,
          injectionsHeightPct: 9,
          catheterHeightPct: 7,
        },
        {
          month: 'Tue',
          woundCareKes: 1260,
          postOpKes: 840,
          ivDripKes: 740,
          injectionsKes: 560,
          catheterKes: 460,
          woundCareHeightPct: 19,
          postOpHeightPct: 15,
          ivDripHeightPct: 14,
          injectionsHeightPct: 10,
          catheterHeightPct: 8,
        },
        {
          month: 'Wed',
          woundCareKes: 1180,
          postOpKes: 780,
          ivDripKes: 680,
          injectionsKes: 520,
          catheterKes: 420,
          woundCareHeightPct: 18,
          postOpHeightPct: 14,
          ivDripHeightPct: 13,
          injectionsHeightPct: 9,
          catheterHeightPct: 8,
        },
        {
          month: 'Thu',
          woundCareKes: 1360,
          postOpKes: 900,
          ivDripKes: 780,
          injectionsKes: 600,
          catheterKes: 490,
          woundCareHeightPct: 21,
          postOpHeightPct: 16,
          ivDripHeightPct: 15,
          injectionsHeightPct: 11,
          catheterHeightPct: 9,
        },
        {
          month: 'Fri',
          woundCareKes: 1460,
          postOpKes: 980,
          ivDripKes: 860,
          injectionsKes: 660,
          catheterKes: 530,
          woundCareHeightPct: 23,
          postOpHeightPct: 18,
          ivDripHeightPct: 16,
          injectionsHeightPct: 12,
          catheterHeightPct: 10,
        },
        {
          month: 'Sat',
          woundCareKes: 1560,
          postOpKes: 1040,
          ivDripKes: 920,
          injectionsKes: 700,
          catheterKes: 560,
          woundCareHeightPct: 25,
          postOpHeightPct: 19,
          ivDripHeightPct: 18,
          injectionsHeightPct: 13,
          catheterHeightPct: 11,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 8710, youEarned: 7920, visits: 6, avgPerVisit: 1320 },
        { service: 'Post-op dressing', patientsPaid: 5810, youEarned: 5280, visits: 4, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 5080, youEarned: 4620, visits: 3, avgPerVisit: 1540 },
        { service: 'Injections', patientsPaid: 3870, youEarned: 3520, visits: 4, avgPerVisit: 880 },
        { service: 'Catheter care', patientsPaid: 3150, youEarned: 2860, visits: 2, avgPerVisit: 1430 },
      ],
    },
    biweekly: {
      label: 'Bi-weekly',
      chartTitle: 'Nurse earnings (last 14 days)',
      totalEarned: 48800,
      fromWoundCare: 15840,
      fromPostOp: 10560,
      fromIvDrip: 9240,
      fromInjections: 7160,
      fromCatheter: 6000,
      monthlyBars: [
        {
          month: 'D1-3',
          woundCareKes: 3500,
          postOpKes: 2350,
          ivDripKes: 2050,
          injectionsKes: 1600,
          catheterKes: 1350,
          woundCareHeightPct: 18,
          postOpHeightPct: 14,
          ivDripHeightPct: 13,
          injectionsHeightPct: 9,
          catheterHeightPct: 8,
        },
        {
          month: 'D4-6',
          woundCareKes: 3800,
          postOpKes: 2550,
          ivDripKes: 2240,
          injectionsKes: 1720,
          catheterKes: 1450,
          woundCareHeightPct: 20,
          postOpHeightPct: 15,
          ivDripHeightPct: 14,
          injectionsHeightPct: 10,
          catheterHeightPct: 9,
        },
        {
          month: 'D7-10',
          woundCareKes: 4100,
          postOpKes: 2720,
          ivDripKes: 2380,
          injectionsKes: 1860,
          catheterKes: 1540,
          woundCareHeightPct: 21,
          postOpHeightPct: 16,
          ivDripHeightPct: 15,
          injectionsHeightPct: 11,
          catheterHeightPct: 9,
        },
        {
          month: 'D11-14',
          woundCareKes: 4440,
          postOpKes: 2940,
          ivDripKes: 2570,
          injectionsKes: 1980,
          catheterKes: 1660,
          woundCareHeightPct: 23,
          postOpHeightPct: 18,
          ivDripHeightPct: 17,
          injectionsHeightPct: 12,
          catheterHeightPct: 10,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 17420, youEarned: 15840, visits: 12, avgPerVisit: 1320 },
        { service: 'Post-op dressing', patientsPaid: 11620, youEarned: 10560, visits: 8, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 10160, youEarned: 9240, visits: 6, avgPerVisit: 1540 },
        { service: 'Injections', patientsPaid: 7880, youEarned: 7160, visits: 8, avgPerVisit: 895 },
        { service: 'Catheter care', patientsPaid: 6600, youEarned: 6000, visits: 4, avgPerVisit: 1500 },
      ],
    },
    month: {
      label: 'Monthly',
      chartTitle: 'Nurse earnings this month',
      totalEarned: 88400,
      fromWoundCare: 29040,
      fromPostOp: 19800,
      fromIvDrip: 16800,
      fromInjections: 12760,
      fromCatheter: 10000,
      monthlyBars: [
        {
          month: 'W1',
          woundCareKes: 6400,
          postOpKes: 4300,
          ivDripKes: 3700,
          injectionsKes: 2800,
          catheterKes: 2200,
          woundCareHeightPct: 18,
          postOpHeightPct: 14,
          ivDripHeightPct: 13,
          injectionsHeightPct: 9,
          catheterHeightPct: 8,
        },
        {
          month: 'W2',
          woundCareKes: 7000,
          postOpKes: 4800,
          ivDripKes: 4050,
          injectionsKes: 3100,
          catheterKes: 2400,
          woundCareHeightPct: 20,
          postOpHeightPct: 15,
          ivDripHeightPct: 14,
          injectionsHeightPct: 10,
          catheterHeightPct: 8,
        },
        {
          month: 'W3',
          woundCareKes: 7400,
          postOpKes: 5050,
          ivDripKes: 4250,
          injectionsKes: 3260,
          catheterKes: 2550,
          woundCareHeightPct: 21,
          postOpHeightPct: 16,
          ivDripHeightPct: 15,
          injectionsHeightPct: 11,
          catheterHeightPct: 9,
        },
        {
          month: 'W4',
          woundCareKes: 8240,
          postOpKes: 5650,
          ivDripKes: 4800,
          injectionsKes: 3600,
          catheterKes: 2850,
          woundCareHeightPct: 24,
          postOpHeightPct: 18,
          ivDripHeightPct: 17,
          injectionsHeightPct: 12,
          catheterHeightPct: 10,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 31940, youEarned: 29040, visits: 22, avgPerVisit: 1320 },
        { service: 'Post-op dressing', patientsPaid: 21780, youEarned: 19800, visits: 15, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 18480, youEarned: 16800, visits: 11, avgPerVisit: 1527 },
        { service: 'Injections', patientsPaid: 14040, youEarned: 12760, visits: 14, avgPerVisit: 911 },
        { service: 'Catheter care', patientsPaid: 11000, youEarned: 10000, visits: 7, avgPerVisit: 1429 },
      ],
    },
    quarter: {
      label: '3 months',
      chartTitle: 'Nurse earnings (last 3 months)',
      totalEarned: 246500,
      fromWoundCare: 80520,
      fromPostOp: 55440,
      fromIvDrip: 46200,
      fromInjections: 35640,
      fromCatheter: 28700,
      monthlyBars: [
        {
          month: 'Sep',
          woundCareKes: 24200,
          postOpKes: 16600,
          ivDripKes: 13800,
          injectionsKes: 10600,
          catheterKes: 8500,
          woundCareHeightPct: 21,
          postOpHeightPct: 15,
          ivDripHeightPct: 14,
          injectionsHeightPct: 10,
          catheterHeightPct: 8,
        },
        {
          month: 'Oct',
          woundCareKes: 26800,
          postOpKes: 18500,
          ivDripKes: 15400,
          injectionsKes: 11840,
          catheterKes: 9600,
          woundCareHeightPct: 24,
          postOpHeightPct: 17,
          ivDripHeightPct: 16,
          injectionsHeightPct: 12,
          catheterHeightPct: 10,
        },
        {
          month: 'Nov',
          woundCareKes: 29520,
          postOpKes: 20340,
          ivDripKes: 17000,
          injectionsKes: 13200,
          catheterKes: 10600,
          woundCareHeightPct: 26,
          postOpHeightPct: 19,
          ivDripHeightPct: 18,
          injectionsHeightPct: 13,
          catheterHeightPct: 11,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 88570, youEarned: 80520, visits: 61, avgPerVisit: 1320 },
        { service: 'Post-op dressing', patientsPaid: 60980, youEarned: 55440, visits: 42, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 50820, youEarned: 46200, visits: 30, avgPerVisit: 1540 },
        { service: 'Injections', patientsPaid: 39200, youEarned: 35640, visits: 40, avgPerVisit: 891 },
        { service: 'Catheter care', patientsPaid: 31570, youEarned: 28700, visits: 20, avgPerVisit: 1435 },
      ],
    },
    sixMonths: {
      label: '6 months',
      chartTitle: 'Nurse earnings (last 6 months)',
      totalEarned: 472400,
      fromWoundCare: 154440,
      fromPostOp: 106920,
      fromIvDrip: 88400,
      fromInjections: 68140,
      fromCatheter: 54500,
      monthlyBars: [
        {
          month: 'Jun',
          woundCareKes: 20400,
          postOpKes: 14200,
          ivDripKes: 11600,
          injectionsKes: 9000,
          catheterKes: 7200,
          woundCareHeightPct: 16,
          postOpHeightPct: 12,
          ivDripHeightPct: 11,
          injectionsHeightPct: 8,
          catheterHeightPct: 7,
        },
        {
          month: 'Jul',
          woundCareKes: 22400,
          postOpKes: 15600,
          ivDripKes: 12800,
          injectionsKes: 9900,
          catheterKes: 7900,
          woundCareHeightPct: 18,
          postOpHeightPct: 13,
          ivDripHeightPct: 12,
          injectionsHeightPct: 9,
          catheterHeightPct: 8,
        },
        {
          month: 'Aug',
          woundCareKes: 24100,
          postOpKes: 16800,
          ivDripKes: 13900,
          injectionsKes: 10700,
          catheterKes: 8500,
          woundCareHeightPct: 19,
          postOpHeightPct: 14,
          ivDripHeightPct: 13,
          injectionsHeightPct: 10,
          catheterHeightPct: 8,
        },
        {
          month: 'Sep',
          woundCareKes: 26600,
          postOpKes: 18400,
          ivDripKes: 15300,
          injectionsKes: 11800,
          catheterKes: 9400,
          woundCareHeightPct: 22,
          postOpHeightPct: 16,
          ivDripHeightPct: 15,
          injectionsHeightPct: 11,
          catheterHeightPct: 9,
        },
        {
          month: 'Oct',
          woundCareKes: 29200,
          postOpKes: 20100,
          ivDripKes: 16600,
          injectionsKes: 12840,
          catheterKes: 10300,
          woundCareHeightPct: 24,
          postOpHeightPct: 18,
          ivDripHeightPct: 17,
          injectionsHeightPct: 12,
          catheterHeightPct: 10,
        },
        {
          month: 'Nov',
          woundCareKes: 31740,
          postOpKes: 21820,
          ivDripKes: 18200,
          injectionsKes: 13900,
          catheterKes: 11200,
          woundCareHeightPct: 26,
          postOpHeightPct: 19,
          ivDripHeightPct: 18,
          injectionsHeightPct: 13,
          catheterHeightPct: 11,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 169880, youEarned: 154440, visits: 117, avgPerVisit: 1320 },
        { service: 'Post-op dressing', patientsPaid: 117610, youEarned: 106920, visits: 81, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 97240, youEarned: 88400, visits: 57, avgPerVisit: 1551 },
        { service: 'Injections', patientsPaid: 74950, youEarned: 68140, visits: 76, avgPerVisit: 897 },
        { service: 'Catheter care', patientsPaid: 59950, youEarned: 54500, visits: 38, avgPerVisit: 1434 },
      ],
    },
    year: {
      label: 'Yearly',
      chartTitle: 'Nurse earnings per month',
      totalEarned: 846200,
      fromWoundCare: 277200,
      fromPostOp: 190080,
      fromIvDrip: 158400,
      fromInjections: 122120,
      fromCatheter: 98400,
      monthlyBars: [
        {
          month: 'Jun',
          woundCareKes: 36500,
          postOpKes: 25200,
          ivDripKes: 20800,
          injectionsKes: 16200,
          catheterKes: 13000,
          woundCareHeightPct: 17,
          postOpHeightPct: 12,
          ivDripHeightPct: 11,
          injectionsHeightPct: 8,
          catheterHeightPct: 7,
        },
        {
          month: 'Jul',
          woundCareKes: 40200,
          postOpKes: 27600,
          ivDripKes: 22900,
          injectionsKes: 17800,
          catheterKes: 14300,
          woundCareHeightPct: 19,
          postOpHeightPct: 14,
          ivDripHeightPct: 13,
          injectionsHeightPct: 9,
          catheterHeightPct: 8,
        },
        {
          month: 'Aug',
          woundCareKes: 43100,
          postOpKes: 29500,
          ivDripKes: 24700,
          injectionsKes: 19000,
          catheterKes: 15300,
          woundCareHeightPct: 20,
          postOpHeightPct: 15,
          ivDripHeightPct: 14,
          injectionsHeightPct: 10,
          catheterHeightPct: 8,
        },
        {
          month: 'Sep',
          woundCareKes: 47600,
          postOpKes: 32600,
          ivDripKes: 27200,
          injectionsKes: 20900,
          catheterKes: 16900,
          woundCareHeightPct: 22,
          postOpHeightPct: 16,
          ivDripHeightPct: 15,
          injectionsHeightPct: 11,
          catheterHeightPct: 9,
        },
        {
          month: 'Oct',
          woundCareKes: 52400,
          postOpKes: 35800,
          ivDripKes: 30000,
          injectionsKes: 23000,
          catheterKes: 18600,
          woundCareHeightPct: 24,
          postOpHeightPct: 18,
          ivDripHeightPct: 17,
          injectionsHeightPct: 12,
          catheterHeightPct: 10,
        },
        {
          month: 'Nov',
          woundCareKes: 57400,
          postOpKes: 39380,
          ivDripKes: 32800,
          injectionsKes: 25220,
          catheterKes: 20300,
          woundCareHeightPct: 27,
          postOpHeightPct: 20,
          ivDripHeightPct: 19,
          injectionsHeightPct: 13,
          catheterHeightPct: 11,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 304920, youEarned: 277200, visits: 210, avgPerVisit: 1320 },
        { service: 'Post-op dressing', patientsPaid: 209088, youEarned: 190080, visits: 144, avgPerVisit: 1320 },
        { service: 'IV drip / Infusion', patientsPaid: 174240, youEarned: 158400, visits: 103, avgPerVisit: 1538 },
        { service: 'Injections', patientsPaid: 134332, youEarned: 122120, visits: 136, avgPerVisit: 898 },
        { service: 'Catheter care', patientsPaid: 108240, youEarned: 98400, visits: 68, avgPerVisit: 1447 },
      ],
    },
    allTime: {
      label: 'All time',
      chartTitle: 'All-time nurse earnings by year',
      totalEarned: 2184000,
      fromWoundCare: 715000,
      fromPostOp: 492000,
      fromIvDrip: 410000,
      fromInjections: 315000,
      fromCatheter: 252000,
      monthlyBars: [
        {
          month: '2023',
          woundCareKes: 118000,
          postOpKes: 81000,
          ivDripKes: 68000,
          injectionsKes: 52000,
          catheterKes: 42000,
          woundCareHeightPct: 15,
          postOpHeightPct: 11,
          ivDripHeightPct: 10,
          injectionsHeightPct: 7,
          catheterHeightPct: 6,
        },
        {
          month: '2024',
          woundCareKes: 204000,
          postOpKes: 140000,
          ivDripKes: 117000,
          injectionsKes: 90000,
          catheterKes: 72000,
          woundCareHeightPct: 21,
          postOpHeightPct: 15,
          ivDripHeightPct: 14,
          injectionsHeightPct: 10,
          catheterHeightPct: 8,
        },
        {
          month: '2025',
          woundCareKes: 277000,
          postOpKes: 190000,
          ivDripKes: 158000,
          injectionsKes: 122000,
          catheterKes: 98000,
          woundCareHeightPct: 27,
          postOpHeightPct: 20,
          ivDripHeightPct: 19,
          injectionsHeightPct: 13,
          catheterHeightPct: 11,
        },
        {
          month: '2026*',
          woundCareKes: 116000,
          postOpKes: 81000,
          ivDripKes: 67000,
          injectionsKes: 51000,
          catheterKes: 40000,
          woundCareHeightPct: 22,
          postOpHeightPct: 16,
          ivDripHeightPct: 15,
          injectionsHeightPct: 11,
          catheterHeightPct: 9,
        },
      ],
      breakdown: [
        { service: 'Wound care', patientsPaid: 786500, youEarned: 715000, visits: 542, avgPerVisit: 1319 },
        { service: 'Post-op dressing', patientsPaid: 541200, youEarned: 492000, visits: 373, avgPerVisit: 1319 },
        { service: 'IV drip / Infusion', patientsPaid: 451000, youEarned: 410000, visits: 266, avgPerVisit: 1541 },
        { service: 'Injections', patientsPaid: 346500, youEarned: 315000, visits: 350, avgPerVisit: 900 },
        { service: 'Catheter care', patientsPaid: 277200, youEarned: 252000, visits: 175, avgPerVisit: 1440 },
      ],
    },
  };

  readonly paymentLogs = signal<NursePaymentLog[]>([
    {
      id: 'nlog-1',
      reference: 'NRS-80421',
      category: 'Wound care',
      patientName: 'Mariam Hassan',
      itemDescription: 'Sterile wound care dressing & assessment',
      neighborhood: 'Kisauni',
      dateTime: 'Today, 11:00 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1450,
      youEarned: 1320,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-2',
      reference: 'NRS-80417',
      category: 'Post-op dressing',
      patientName: 'Khadija Said',
      itemDescription: 'Post-op dressing change & vitals monitoring',
      neighborhood: 'Nyali',
      dateTime: 'Today, 09:00 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1450,
      youEarned: 1320,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-3',
      reference: 'NRS-80412',
      category: 'Injections',
      patientName: 'Ali Omar',
      itemDescription: 'Insulin injection & glucose monitoring training',
      neighborhood: 'Majengo',
      dateTime: 'Today, 07:30 am',
      periodBuckets: ['daily', 'week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 970,
      youEarned: 880,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-4',
      reference: 'NRS-80398',
      category: 'IV drip / Infusion',
      patientName: 'Grace Wanjiku',
      itemDescription: 'Home IV rehydration therapy (1000ml)',
      neighborhood: 'Bamburi',
      dateTime: 'Yesterday, 04:15 pm',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1690,
      youEarned: 1540,
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'nlog-5',
      reference: 'NRS-80384',
      category: 'Catheter care',
      patientName: 'Peter Omondi',
      itemDescription: 'Foley catheter replacement & flush',
      neighborhood: 'Likoni',
      dateTime: '2 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1570,
      youEarned: 1430,
      paymentMethod: 'Insurance',
      status: 'Pending payout',
    },
    {
      id: 'nlog-6',
      reference: 'NRS-80360',
      category: 'Wound care',
      patientName: 'Salim Bakari',
      itemDescription: 'Diabetic foot ulcer dressing & debridement',
      neighborhood: 'Changamwe',
      dateTime: '4 days ago',
      periodBuckets: ['week', 'biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1450,
      youEarned: 1320,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-7',
      reference: 'NRS-80319',
      category: 'Post-op dressing',
      patientName: 'Fatma Omar',
      itemDescription: 'Post-caesarean incision check & BP monitoring',
      neighborhood: 'Tudor',
      dateTime: '8 days ago',
      periodBuckets: ['biweekly', 'month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1450,
      youEarned: 1320,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-8',
      reference: 'NRS-80285',
      category: 'IV drip / Infusion',
      patientName: 'Samuel Kiprop',
      itemDescription: 'Antibiotic IV infusion session (Evening)',
      neighborhood: 'Nyali',
      dateTime: '17 days ago',
      periodBuckets: ['month', 'quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 1690,
      youEarned: 1540,
      paymentMethod: 'Card',
      status: 'Settled',
    },
    {
      id: 'nlog-9',
      reference: 'NRS-80190',
      category: 'Injections',
      patientName: 'Beatrice Akinyi',
      itemDescription: 'Vitamin B12 intramuscular injection',
      neighborhood: 'Mtwapa',
      dateTime: '2 months ago',
      periodBuckets: ['quarter', 'sixMonths', 'year', 'allTime'],
      patientPaid: 970,
      youEarned: 880,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-10',
      reference: 'NRS-79812',
      category: 'Catheter care',
      patientName: 'John Karanja',
      itemDescription: 'Elderly home care · Catheter hygiene & review',
      neighborhood: 'Shanzu',
      dateTime: '4 months ago',
      periodBuckets: ['sixMonths', 'year', 'allTime'],
      patientPaid: 1570,
      youEarned: 1430,
      paymentMethod: 'M-Pesa',
      status: 'Settled',
    },
    {
      id: 'nlog-11',
      reference: 'NRS-78405',
      category: 'Vitals check',
      patientName: 'Lucy Muthoni',
      itemDescription: 'Routine home vitals & blood pressure monitoring',
      neighborhood: 'Nyali',
      dateTime: '14 months ago',
      periodBuckets: ['allTime'],
      patientPaid: 1450,
      youEarned: 1320,
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
      { key: 'woundCare', label: 'Wound care', amount: d.fromWoundCare, color: '#0B7358' },
      { key: 'postOp', label: 'Post-op dressing', amount: d.fromPostOp, color: '#0D2923' },
      { key: 'ivDrip', label: 'IV drip / Infusion', amount: d.fromIvDrip, color: '#0891B2' },
      { key: 'injections', label: 'Injections', amount: d.fromInjections, color: '#F5B031' },
      { key: 'catheter', label: 'Catheter care', amount: d.fromCatheter, color: '#2563EB' },
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
      { key: 'woundCare', label: 'Wound care & dressings', amount: d.fromWoundCare, color: '#0B7358' },
      { key: 'postOp', label: 'Post-op dressing', amount: d.fromPostOp, color: '#0D2923' },
      { key: 'ivDrip', label: 'IV drip / Infusion', amount: d.fromIvDrip, color: '#0891B2' },
      { key: 'injections', label: 'Home injections', amount: d.fromInjections, color: '#F5B031' },
      { key: 'catheter', label: 'Catheter care', amount: d.fromCatheter, color: '#2563EB' },
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
      b.woundCareKes,
      b.postOpKes,
      b.ivDripKes,
      b.injectionsKes,
      b.catheterKes,
    ]);
    const maxVal = Math.max(...allVals, 1) * 1.12;
    const count = bars.length;

    const xAt = (idx: number) =>
      count <= 1 ? left + plotW / 2 : left + (idx / (count - 1)) * plotW;
    const yAt = (val: number) => bottom - (val / maxVal) * plotH;

    const seriesMeta = [
      { key: 'woundCare', label: 'Wound care', color: '#0B7358', getVal: (b: NurseEarningsBar) => b.woundCareKes },
      { key: 'postOp', label: 'Post-op dressing', color: '#0D2923', getVal: (b: NurseEarningsBar) => b.postOpKes },
      { key: 'ivDrip', label: 'IV drip / Infusion', color: '#0891B2', getVal: (b: NurseEarningsBar) => b.ivDripKes },
      { key: 'injections', label: 'Injections', color: '#F5B031', getVal: (b: NurseEarningsBar) => b.injectionsKes },
      { key: 'catheter', label: 'Catheter care', color: '#2563EB', getVal: (b: NurseEarningsBar) => b.catheterKes },
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
        log.patientName.toLowerCase().includes(query) ||
        log.itemDescription.toLowerCase().includes(query) ||
        log.neighborhood.toLowerCase().includes(query);

      return matchesCategory && matchesPeriod && matchesQuery;
    });
  });

  logSummary = computed(() => {
    const logs = this.filteredPaymentLogs();
    return {
      count: logs.length,
      patientsPaid: logs.reduce((sum, l) => sum + l.patientPaid, 0),
      youEarned: logs.reduce((sum, l) => sum + l.youEarned, 0),
    };
  });

  setPeriod(period: NurseEarningsPeriod): void {
    this.selectedPeriod.set(period);
    this.hoveredBar.set(null);
    this.hoveredSliceKey.set(null);
  }

  setChartType(type: NurseChartType): void {
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

  setLogCategory(category: NurseLogCategoryFilter): void {
    this.logCategoryFilter.set(category);
  }

  getCategoryClass(category: NurseVisitType): string {
    switch (category) {
      case 'Wound care':
        return 'wound';
      case 'Post-op dressing':
      case 'Vitals check':
        return 'postop';
      case 'IV drip / Infusion':
        return 'ivdrip';
      case 'Injections':
        return 'injections';
      case 'Catheter care':
        return 'catheter';
    }
  }

  getBarTotal(bar: NurseEarningsBar): number {
    return (
      bar.woundCareKes +
      bar.postOpKes +
      bar.ivDripKes +
      bar.injectionsKes +
      bar.catheterKes
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
