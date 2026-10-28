import { Injectable } from '@angular/core';
import { Chemist } from '../../../core/models/chemist.models';
import { Medicine } from '../../../core/models/medicine.models';

@Injectable({ providedIn: 'root' })
export class MedicineService {
  // Mock data for now. Later this becomes HTTP calls to the backend,
  // and the pages won't need to change.
  private readonly chemists: Chemist[] = [
    { id: 1, name: 'Nyali Pharmacy', county: 'Mombasa' },
    { id: 2, name: 'Bamburi Chemist', county: 'Mombasa' },
    { id: 3, name: 'Likoni Road Pharmacy', county: 'Mombasa' },
    { id: 4, name: 'Westlands Pharmacy', county: 'Nairobi' },
    { id: 5, name: 'Kilimani Chemist', county: 'Nairobi' },
    { id: 6, name: 'Milimani Pharmacy', county: 'Kisumu' },
  ];

  private readonly chemistById = new Map(this.chemists.map((chemist) => [chemist.id, chemist]));

  private readonly everywhere = [1, 2, 3, 4, 5, 6];

  private readonly medicines: Medicine[] = [
    {
      id: 1, name: 'Paracetamol 500mg', price: 120, requiresPrescription: false,
      category: 'Pain relief', keywords: ['fever', 'headache', 'pain', 'cold'],
      chemistIds: [1, 2, 3, 4],
    },
    {
      id: 2, name: 'Ibuprofen 400mg', price: 200, requiresPrescription: false,
      category: 'Pain relief', keywords: ['pain', 'inflammation', 'toothache', 'period pain'],
      chemistIds: this.everywhere,
    },
    {
      id: 3, name: 'Amoxicillin 500mg', price: 450, requiresPrescription: true,
      category: 'Antibiotics', keywords: ['infection', 'throat', 'chest', 'ear'],
      chemistIds: this.everywhere,
    },
    {
      id: 4, name: 'ORS Sachets', price: 60, requiresPrescription: false,
      category: 'Stomach', keywords: ['diarrhoea', 'dehydration', 'vomiting'],
      chemistIds: this.everywhere,
    },
    {
      id: 5, name: 'Vitamin C 1000mg', price: 350, requiresPrescription: false,
      category: 'Vitamins', keywords: ['immunity', 'cold', 'flu'],
      chemistIds: this.everywhere,
    },
    {
      id: 6, name: 'Cetirizine 10mg', price: 180, requiresPrescription: false,
      category: 'Allergy', keywords: ['allergy', 'itching', 'hay fever', 'rash'],
      chemistIds: this.everywhere,
    },
    {
      id: 7, name: 'Omeprazole 20mg', price: 520, requiresPrescription: true,
      category: 'Stomach', keywords: ['heartburn', 'acidity', 'ulcer', 'reflux'],
      chemistIds: this.everywhere,
    },
    {
      id: 8, name: 'Zinc Tablets', price: 150, requiresPrescription: false,
      category: 'Vitamins', keywords: ['immunity', 'diarrhoea', 'cold'],
      chemistIds: this.everywhere,
    },
    // Not stocked by any Mombasa chemist, so you can see the "In Mombasa only" toggle at work
    {
      id: 9, name: 'Metronidazole 400mg', price: 250, requiresPrescription: true,
      category: 'Antibiotics', keywords: ['infection', 'stomach', 'amoeba'],
      chemistIds: [4, 6],
    },
    {
      id: 10, name: 'Multivitamin Syrup', price: 280, requiresPrescription: false,
      category: 'Vitamins', keywords: ['appetite', 'growth', 'children'],
      chemistIds: [5],
    },
    {
      id: 11, name: 'Paracetamol Syrup 120mg', price: 180, requiresPrescription: false,
      category: 'Pain relief', keywords: ['fever', 'pain', 'children'],
      chemistIds: [1, 3, 4],
    },
    {
      id: 12, name: 'Paracetamol 1g Tablets', price: 150, requiresPrescription: false,
      category: 'Pain relief', keywords: ['pain', 'fever', 'headache'],
      chemistIds: [2, 3, 6],
    },
  ];

  getAll(): Medicine[] {
    return this.medicines;
  }

  getPopular(): Medicine[] {
    return this.medicines.slice(0, 4);
  }

  /** True if at least one chemist in this county stocks the medicine. */
  isAvailableIn(medicine: Medicine, county: string): boolean {
    return medicine.chemistIds.some((id) => this.chemistById.get(id)?.county === county);
  }

  /** How many different chemists stock these medicines (optionally only in one county). */
  countChemists(medicines: Medicine[], county?: string): number {
    const ids = new Set<number>();

    for (const medicine of medicines) {
      for (const id of medicine.chemistIds) {
        const chemist = this.chemistById.get(id);
        if (chemist && (!county || chemist.county === county)) {
          ids.add(id);
        }
      }
    }

    return ids.size;
  }
}