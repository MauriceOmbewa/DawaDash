import { Routes } from '@angular/router';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { HomePage } from './pages/home-page/home-page';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [{ path: '', component: HomePage, title: 'DawaDash – Home' }],
  },
];