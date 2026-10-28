import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  placeholder = input('Search…');
  value = input(''); // text to show in the box when the page loads
  search = output<string>();

  onSubmit(event: Event, term: string) {
    event.preventDefault();
    this.search.emit(term.trim());
  }

  /** Browsers fire this when the user clicks the little × inside a search box. */
  onNativeSearch(term: string) {
    if (term === '') {
      this.search.emit('');
    }
  }
}