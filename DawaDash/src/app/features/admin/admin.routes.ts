import { Routes } from '@angular/router';
import { AdminLayout } from '../../layouts/admin-layout/admin-layout';
import { AdminApprovals } from './admin-approvals/admin-approvals';
import { AdminOverview } from './admin-overview/admin-overview';
import { AdminSettings } from './admin-settings/admin-settings';
import { AdminChemists } from './admin-chemists/admin-chemists';
import { AdminCustomers } from './admin-customers/admin-customers';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: AdminOverview, title: 'DawaDash – Admin Overview' },
      { path: 'approvals', component: AdminApprovals, title: 'DawaDash – Admin Approvals' },
      { path: 'chemists', component: AdminChemists, title: 'DawaDash – Admin Chemists' },
      { path: 'customers', component: AdminCustomers, title: 'DawaDash – Admin Customers' },
      { path: 'settings', component: AdminSettings, title: 'DawaDash – Admin Settings' },
    ],
  },
];
