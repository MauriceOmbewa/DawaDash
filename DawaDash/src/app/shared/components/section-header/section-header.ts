import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-header',
  imports: [RouterLink],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  title = input.required<string>();
  linkText = input('See more');
  linkTo = input<string>(); // leave empty to hide the link
}