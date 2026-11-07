import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './doctor-layout.html',
  styleUrl: './doctor-layout.css',
})
export class DoctorLayout {
  isAvailable = signal<boolean>(true);

  toggleAvailability(): void {
    this.isAvailable.update(v => !v);
  }
}
