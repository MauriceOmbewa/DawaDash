import { Routes } from '@angular/router';
import { PublicLayout } from '../../layouts/public-layout/public-layout';
import { AvailabilityPage } from './pages/availability-page/availability-page';
import { BookPage } from './pages/book-page/book-page';
import { CartPage } from './pages/cart-page/cart-page';
import { DoctorsPage } from './pages/doctors-page/doctors-page';
import { HomePage } from './pages/home-page/home-page';
import { HospitalDetailPage } from './pages/hospital-detail-page/hospital-detail-page';
import { HospitalsPage } from './pages/hospitals-page/hospitals-page';
import { MedicinesPage } from './pages/medicines-page/medicines-page';
import { NursesPage } from './pages/nurses-page/nurses-page';
import { OrdersPage } from './pages/orders-page/orders-page';
import { SignInPage } from './pages/sign-in-page/sign-in-page';

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
      { path: 'hospitals', component: HospitalsPage, title: 'DawaDash – Hospitals' },
      {
        path: 'hospitals/:id',
        component: HospitalDetailPage,
        title: 'DawaDash – Hospital',
      },
      { path: 'book/:id', component: BookPage, title: 'DawaDash – Book appointment' },
      { path: 'cart', component: CartPage, title: 'DawaDash – My cart' },
      { path: 'orders', component: OrdersPage, title: 'DawaDash – My orders' },
      { path: 'sign-in', component: SignInPage, title: 'DawaDash – Sign in' },
    ],
  },
];