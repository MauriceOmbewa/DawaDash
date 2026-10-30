import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nurse-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './nurse-navbar.html',
  styleUrl: './nurse-navbar.css',
})
export class NurseNavbar {
  isAvailable = signal<boolean>(true);

  toggleAvailability(): void {
    this.isAvailable.update(v => !v);
  }
}
