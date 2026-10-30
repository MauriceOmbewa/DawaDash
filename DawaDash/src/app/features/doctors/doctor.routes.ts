import { Routes } from '@angular/router';
import { DoctorLayout } from '../../layouts/doctor-layout/doctor-layout';
import { DoctorEarnings } from './doctor-earnings/doctor-earnings';
import { DoctorProfile } from './doctor-profile/doctor-profile';
import { DoctorSchedule } from './doctor-schedule/doctor-schedule';
import { DoctorToday } from './doctor-today/doctor-today';

export const DOCTOR_ROUTES: Routes = [
  {
    path: 'doctor',
    component: DoctorLayout,
    children: [
      { path: '', redirectTo: 'today', pathMatch: 'full' },
      { path: 'today', component: DoctorToday, title: 'DawaDash – Doctor Today' },
      { path: 'schedule', component: DoctorSchedule, title: 'DawaDash – Doctor Schedule' },
      { path: 'earnings', component: DoctorEarnings, title: 'DawaDash – Doctor Earnings' },
      { path: 'profile', component: DoctorProfile, title: 'DawaDash – Doctor Profile' },
    ],
  },
];
