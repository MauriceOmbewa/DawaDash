import { Component, input } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.html',
  styleUrl: './notice.css',
})
export class Notice {
  title = input.required<string>();
}