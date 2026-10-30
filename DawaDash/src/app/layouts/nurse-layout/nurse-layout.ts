import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NurseNavbar } from '../../features/nurses/nurse-navbar/nurse-navbar';

@Component({
  selector: 'app-nurse-layout',
  imports: [RouterOutlet, NurseNavbar],
  templateUrl: './nurse-layout.html',
  styleUrl: './nurse-layout.css',
})
export class NurseLayout {}
