import { Component, computed, signal } from '@angular/core';

type Range = 'today' | 'week' | 'month';

@Component({
  selector: 'app-analytics-page',
  imports: [],
  templateUrl: './analytics-page.html',
  styleUrls: ['../../../shared/styles/page-shared.css', './analytics-page.css'],
})
export class AnalyticsPage {
  readonly ranges: { key: Range; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This week' },
    { key: 'month', label: 'This month' },
  ];
  readonly range = signal<Range>('today');

  // Sample numbers. Load the real ones for the selected range from your analytics service.
  readonly stats = [
    { label: 'Sales', value: 'KES 48,200' },
    { label: 'Orders', value: '63' },
    { label: 'Average order', value: 'KES 765' },
    { label: 'Orders accepted', value: '94%' },
  ];

  readonly week = [
    { day: 'Mon', sales: 5200 },
    { day: 'Tue', sales: 7100 },
    { day: 'Wed', sales: 4300 },
    { day: 'Thu', sales: 8900 },
    { day: 'Fri', sales: 8100 },
    { day: 'Sat', sales: 9800 },
    { day: 'Sun', sales: 6000 },
  ];

  // Highlights the best day.
  readonly best = Math.max(...this.week.map((d) => d.sales));
  readonly bars = computed(() =>
    this.week.map((d) => ({
      ...d,
      height: Math.round((d.sales / this.best) * 100),
      top: d.sales === this.best,
    })),
  );

  readonly topMedicines = [
    { name: 'Paracetamol 500mg', sold: 84 },
    { name: 'ORS Sachets', sold: 61 },
    { name: 'Vitamin C 1000mg', sold: 47 },
    { name: 'Ibuprofen 400mg', sold: 39 },
  ];
}
