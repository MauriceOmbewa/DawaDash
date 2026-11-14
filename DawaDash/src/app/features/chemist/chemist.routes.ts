import { Routes } from '@angular/router';
import { ChemistLayout } from '../../layouts/chemist-layout/chemist-layout';
import { AddProductPage } from '../../chemist/pages/add-product-page/add-product-page';
import { AnalyticsPage } from '../../chemist/pages/analytics-page/analytics-page';
import { OrderDetailPage } from '../../chemist/pages/order-detail-page/order-detail-page';
import { OrdersPage } from '../../chemist/pages/orders-page/orders-page';
import { ProductsPage } from '../../chemist/pages/products-page/products-page';
import { ProfilePage } from '../../chemist/pages/profile-page/profile-page';

export const CHEMIST_ROUTES: Routes = [
  {
    path: 'chemist',
    component: ChemistLayout,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products/new', component: AddProductPage, title: 'DawaDash – Add product' },
      { path: 'products', component: ProductsPage, title: 'DawaDash – Chemist Products' },
      { path: 'orders/:id', component: OrderDetailPage, title: 'DawaDash – Order details' },
      { path: 'orders', component: OrdersPage, title: 'DawaDash – Chemist Orders' },
      { path: 'analytics', component: AnalyticsPage, title: 'DawaDash – Chemist Analytics' },
      { path: 'profile', component: ProfilePage, title: 'DawaDash – Chemist Profile' },
    ],
  },
];
