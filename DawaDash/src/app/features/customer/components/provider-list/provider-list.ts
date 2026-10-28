import { LowerCasePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { CareProvider } from '../../../../core/models/care-provider.models';
import { SearchBar } from '../../../../shared/components/search-bar/search-bar';
import { CareTabs } from '../care-tabs/care-tabs';
import { CategoryChips } from '../category-chips/category-chips';
import { ProviderCard } from '../provider-card/provider-card';

@Component({
  selector: 'app-provider-list',
  imports: [LowerCasePipe, SearchBar, CareTabs, CategoryChips, ProviderCard],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css',
})
export class ProviderList {
  // What the page gives us
  title = input.required<string>();
  searchPlaceholder = input.required<string>();
  note = input.required<string>();
  providers = input.required<CareProvider[]>();
  badge = input.required<string>();
  actionLabel = input.required<string>();
  action = output<CareProvider>();

  // The filters
  searchTerm = signal('');
  category = signal('All');

  /** "All" plus one chip for each category found in the data */
  categories = computed(() => ['All', ...new Set(this.providers().map((p) => p.category))]);

  results = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    return this.providers().filter((provider) => {
      const matchesCategory = this.category() === 'All' || provider.category === this.category();
      const matchesSearch =
        !term ||
        provider.name.toLowerCase().includes(term) ||
        provider.specialty.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  });

  clearFilters() {
    this.searchTerm.set('');
    this.category.set('All');
  }
}