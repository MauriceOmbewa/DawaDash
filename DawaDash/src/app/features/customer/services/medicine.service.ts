import { Injectable } from '@angular/core';
import { Chemist } from '../../../core/models/chemist.models';
import { CountyOffer } from '../../../core/models/county-offer.models';
import { Medicine } from '../../../core/models/medicine.models';

// Mock: counties ordered from nearest to Mombasa. Later this is worked out from real locations.
const NEAREST_FIRST = ['Kilifi', 'Kwale', 'Taita Taveta', 'Tana River', 'Nairobi', 'Kisumu'];

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
    { id: 7, name: 'Kilifi Town Pharmacy', county: 'Kilifi' },
    { id: 8, name: 'Ukunda Chemist', county: 'Kwale' },
    { id: 9, name: 'Msambweni Pharmacy', county: 'Kwale' },
    { id: 10, name: 'CBD Pharmacy', county: 'Nairobi' },
    { id: 11, name: 'Karen Chemist', county: 'Nairobi' },
    { id: 12, name: 'Eastleigh Pharmacy', county: 'Nairobi' },
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
    // Not stocked in Mombasa: stocked in Kilifi (1 chemist), Kwale (2) and Nairobi (5)
    {
      id: 3, name: 'Amoxicillin 500mg', price: 450, requiresPrescription: true,
      category: 'Antibiotics', keywords: ['infection', 'throat', 'chest', 'ear'],
      chemistIds: [7, 8, 9, 4, 5, 10, 11, 12],
      countyPrices: { Kilifi: 450, Kwale: 470, Nairobi: 440 },
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

  getById(id: number): Medicine | undefined {
    return this.medicines.find((medicine) => medicine.id === id);
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

  /** The counties that have this medicine, nearest first (skipping the customer's own county). */
  getOffers(medicine: Medicine, excludeCounty?: string): CountyOffer[] {
    const chemistsPerCounty = new Map<string, number>();

    for (const id of medicine.chemistIds) {
      const chemist = this.chemistById.get(id);
      if (!chemist || chemist.county === excludeCounty) continue;
      chemistsPerCounty.set(chemist.county, (chemistsPerCounty.get(chemist.county) ?? 0) + 1);
    }

    const rank = (county: string) => {
      const index = NEAREST_FIRST.indexOf(county);
      return index === -1 ? NEAREST_FIRST.length : index;
    };

    return [...chemistsPerCounty]
      .map(([county, chemists]) => ({
        county,
        chemists,
        price: medicine.countyPrices?.[county] ?? medicine.price,
      }))
      .sort((a, b) => rank(a.county) - rank(b.county));
  }
}