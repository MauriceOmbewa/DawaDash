import { Routes } from '@angular/router';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { AvailabilityPage } from './pages/availability-page/availability-page';
import { DoctorsPage } from './pages/doctors-page/doctors-page';
import { HomePage } from './pages/home-page/home-page';
import { MedicinesPage } from './pages/medicines-page/medicines-page';
import { NursesPage } from './pages/nurses-page/nurses-page';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: HomePage, title: 'DawaDash – Home' },
      { path: 'medicines', component: MedicinesPage, title: 'DawaDash – Medicines' },
      {
        path: 'medicines/:id/availability',
        component: AvailabilityPage,
        title: 'DawaDash – Check availability',
      },
      { path: 'doctors', component: DoctorsPage, title: 'DawaDash – Doctors' },
      { path: 'nurses', component: NursesPage, title: 'DawaDash – Home nurses' },
    ],
  },
];