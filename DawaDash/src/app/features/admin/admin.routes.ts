import { Routes } from '@angular/router';
import { AdminLayout } from '../../layouts/admin-layout/admin-layout';
import { AdminApprovals } from './admin-approvals/admin-approvals';
import { AdminOrders } from './admin-orders/admin-orders';
import { AdminOverview } from './admin-overview/admin-overview';
import { AdminSettings } from './admin-settings/admin-settings';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AdminOverview, title: 'DawaDash – Admin Overview' },
      { path: 'approvals', component: AdminApprovals, title: 'DawaDash – Admin Approvals' },
      { path: 'orders', component: AdminOrders, title: 'DawaDash – Admin Orders' },
      { path: 'settings', component: AdminSettings, title: 'DawaDash – Admin Settings' },
    ],
  },
];
