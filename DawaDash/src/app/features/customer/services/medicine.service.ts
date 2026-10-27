import { Injectable } from '@angular/core';
import { Medicine } from '../../../core/models/medicine.models';

@Injectable({ providedIn: 'root' })
export class MedicineService {
  // Mock data for now. Later this becomes an HTTP call to the backend,
  // and the pages won't need to change.
  private readonly medicines: Medicine[] = [
    { id: 1, name: 'Paracetamol 500mg', price: 120, requiresPrescription: false },
    { id: 2, name: 'Ibuprofen 400mg', price: 200, requiresPrescription: false },
    { id: 3, name: 'Amoxicillin 500mg', price: 450, requiresPrescription: true },
    { id: 4, name: 'ORS Sachets', price: 60, requiresPrescription: false },
  ];

  getPopular(): Medicine[] {
    return this.medicines;
  }
}