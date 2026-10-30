import { Routes } from '@angular/router';
import { NurseLayout } from '../../layouts/nurse-layout/nurse-layout';
import { NurseEarnings } from './nurse-earnings/nurse-earnings';
import { NurseProfile } from './nurse-profile/nurse-profile';
import { NurseSchedule } from './nurse-schedule/nurse-schedule';
import { NurseToday } from './nurse-today/nurse-today';

export const NURSE_ROUTES: Routes = [
  {
    path: 'nurse',
    component: NurseLayout,
    children: [
      { path: '', redirectTo: 'today', pathMatch: 'full' },
      { path: 'today', component: NurseToday, title: 'DawaDash – Nurse Today' },
      { path: 'schedule', component: NurseSchedule, title: 'DawaDash – Nurse Schedule' },
      { path: 'earnings', component: NurseEarnings, title: 'DawaDash – Nurse Earnings' },
      { path: 'profile', component: NurseProfile, title: 'DawaDash – Nurse Profile' },
    ],
  },
];
