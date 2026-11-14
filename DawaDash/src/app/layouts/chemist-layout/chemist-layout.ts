import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chemist-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './chemist-layout.html',
  styleUrl: './chemist-layout.css',
})
export class ChemistLayout {}
