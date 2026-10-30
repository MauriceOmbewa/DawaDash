import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/customer/customer.routes').then((m) => m.CUSTOMER_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/doctors/doctor.routes').then((m) => m.DOCTOR_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/nurses/nurse.routes').then((m) => m.NURSE_ROUTES),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // Pages that don't exist yet send you home. We'll replace this as we build them.
  { path: '**', redirectTo: '' },
];