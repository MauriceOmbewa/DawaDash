import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  imports: [RouterLink],
  templateUrl: './add-product-page.html',
  styleUrls: ['../../../shared/styles/page-shared.css', './add-product-page.css'],
})
export class AddProductPage {
  constructor(private router: Router) {}

  readonly categories = [
    'Pain relief',
    'Antibiotics',
    'Vitamins and supplements',
    'Rehydration',
    'Cold and flu',
    'First aid',
    'Other',
  ];

  readonly needsPrescription = signal(true);
  readonly photoName = signal<string | null>(null);

  togglePrescription() {
    this.needsPrescription.update((v) => !v);
  }

  onPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.photoName.set(file ? file.name : null);
  }

  onSave() {
    // TODO: save the product, then go back to the list
    this.router.navigate(['/chemist/products']);
  }
}
