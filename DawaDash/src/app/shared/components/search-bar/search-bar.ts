import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  placeholder = input('Search…');
  search = output<string>();

  onSubmit(event: Event, term: string) {
    event.preventDefault();
    this.search.emit(term.trim());
  }
}