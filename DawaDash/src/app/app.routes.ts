import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/customer/customer.routes').then((m) => m.CUSTOMER_ROUTES),
  },

    
  // Pages that don't exist yet send you home. We'll replace this as we build them.
  { path: '**', redirectTo: '' },
];