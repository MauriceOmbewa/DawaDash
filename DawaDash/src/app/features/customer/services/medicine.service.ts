import { Injectable } from '@angular/core';
import { Medicine } from '../../../core/models/medicine.models';

@Injectable({ providedIn: 'root' })
export class MedicineService {
  // Mock data for now. Later this becomes an HTTP call to the backend
  // (where "counties" will come from the chemists that stock each medicine),
  // and the pages won't need to change.
  private readonly medicines: Medicine[] = [
    {
      id: 1, name: 'Paracetamol 500mg', price: 120, requiresPrescription: false,
      category: 'Pain relief', keywords: ['fever', 'headache', 'pain', 'cold'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 2, name: 'Ibuprofen 400mg', price: 200, requiresPrescription: false,
      category: 'Pain relief', keywords: ['pain', 'inflammation', 'toothache', 'period pain'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 3, name: 'Amoxicillin 500mg', price: 450, requiresPrescription: true,
      category: 'Antibiotics', keywords: ['infection', 'throat', 'chest', 'ear'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 4, name: 'ORS Sachets', price: 60, requiresPrescription: false,
      category: 'Stomach', keywords: ['diarrhoea', 'dehydration', 'vomiting'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 5, name: 'Vitamin C 1000mg', price: 350, requiresPrescription: false,
      category: 'Vitamins', keywords: ['immunity', 'cold', 'flu'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 6, name: 'Cetirizine 10mg', price: 180, requiresPrescription: false,
      category: 'Allergy', keywords: ['allergy', 'itching', 'hay fever', 'rash'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 7, name: 'Omeprazole 20mg', price: 520, requiresPrescription: true,
      category: 'Stomach', keywords: ['heartburn', 'acidity', 'ulcer', 'reflux'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    {
      id: 8, name: 'Zinc Tablets', price: 150, requiresPrescription: false,
      category: 'Vitamins', keywords: ['immunity', 'diarrhoea', 'cold'],
      counties: ['Mombasa', 'Nairobi', 'Kisumu'],
    },
    // Not sold in Mombasa, so you can see the "In Mombasa only" toggle at work
    {
      id: 9, name: 'Metronidazole 400mg', price: 250, requiresPrescription: true,
      category: 'Antibiotics', keywords: ['infection', 'stomach', 'amoeba'],
      counties: ['Nairobi', 'Kisumu'],
    },
    {
      id: 10, name: 'Multivitamin Syrup', price: 280, requiresPrescription: false,
      category: 'Vitamins', keywords: ['appetite', 'growth', 'children'],
      counties: ['Nairobi'],
    },
  ];

  getAll(): Medicine[] {
    return this.medicines;
  }

  getPopular(): Medicine[] {
    return this.medicines.slice(0, 4);
  }
}