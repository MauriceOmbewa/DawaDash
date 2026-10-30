import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-doctor-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './doctor-navbar.html',
  styleUrl: './doctor-navbar.css',
})
export class DoctorNavbar {
  isAvailable = signal<boolean>(true);

  toggleAvailability(): void {
    this.isAvailable.update(v => !v);
  }
}
