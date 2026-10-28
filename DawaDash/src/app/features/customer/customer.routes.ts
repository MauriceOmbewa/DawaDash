import { Routes } from '@angular/router';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { HomePage } from './pages/home-page/home-page';
import { MedicinesPage } from './pages/medicines-page/medicines-page';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: HomePage, title: 'DawaDash – Home' },
      { path: 'medicines', component: MedicinesPage, title: 'DawaDash – Medicines' },
    ],
  },
];