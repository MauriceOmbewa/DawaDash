import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nurse-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nurse-layout.html',
  styleUrl: './nurse-layout.css',
})
export class NurseLayout {
  isAvailable = signal<boolean>(true);

  toggleAvailability(): void {
    this.isAvailable.update(v => !v);
  }
}
