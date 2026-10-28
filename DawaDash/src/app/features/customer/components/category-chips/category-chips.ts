import { Component, input, model } from '@angular/core';
import { ScrollRow } from '../../../../shared/components/scroll-row/scroll-row';

@Component({
  selector: 'app-category-chips',
  imports: [ScrollRow],
  templateUrl: './category-chips.html',
})
export class CategoryChips {
  categories = input.required<string[]>();
  selected = model.required<string>(); // two-way: the parent always knows the selection

  select(category: string, event: Event) {
    this.selected.set(category);

    // If the chip was half hidden at the edge, bring it fully into view
    (event.currentTarget as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }
}