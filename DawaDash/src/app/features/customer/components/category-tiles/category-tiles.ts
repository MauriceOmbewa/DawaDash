import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Category {
  label: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-category-tiles',
  imports: [RouterLink],
  templateUrl: './category-tiles.html',
  styleUrl: './category-tiles.css',
})
export class CategoryTiles {
  categories: Category[] = [
    { label: 'Medicine', icon: 'Rx', path: '/medicines' },
    { label: 'Doctors', icon: 'Dr', path: '/doctors' },
    { label: 'Nurses', icon: '+', path: '/nurses' },
    { label: 'Hospitals', icon: 'H', path: '/hospitals' },
  ];
}