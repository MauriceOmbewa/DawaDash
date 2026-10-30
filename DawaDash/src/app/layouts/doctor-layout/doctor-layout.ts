import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DoctorNavbar } from '../../features/doctors/doctor-navbar/doctor-navbar';

@Component({
  selector: 'app-doctor-layout',
  imports: [RouterOutlet, DoctorNavbar],
  templateUrl: './doctor-layout.html',
  styleUrl: './doctor-layout.css',
})
export class DoctorLayout {}
