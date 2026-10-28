import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.html',
  styleUrl: './category-chips.css',
})
export class CategoryChips {
  categories = input.required<string[]>();
  selected = model.required<string>(); // two-way: the parent always knows the selection
}