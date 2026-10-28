import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-care-tabs',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './care-tabs.html',
  styleUrl: './care-tabs.css',
})
export class CareTabs {}