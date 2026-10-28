import { Injectable } from '@angular/core';
import { CareProvider } from '../../../core/models/care-provider.models';

@Injectable({ providedIn: 'root' })
export class ProviderService {
  // Mock data for now (replace the names with real ones later).
  // Later this becomes an HTTP call to the backend and the pages won't need to change.
  private readonly providers: CareProvider[] = [
    // Doctors
    { id: 1, type: 'doctor', name: 'Dr. Amina Hassan', specialty: 'Dentist', category: 'Dentist', county: 'Mombasa', price: 2200 },
    { id: 2, type: 'doctor', name: 'Dr. Peter Otieno', specialty: 'Optician', category: 'Optician', county: 'Mombasa', price: 1650 },
    { id: 3, type: 'doctor', name: 'Dr. Grace Wanjiku', specialty: 'General doctor', category: 'General', county: 'Mombasa', price: 2750 },
    { id: 4, type: 'doctor', name: 'Dr. Salim Mwinyi', specialty: 'Paediatrician', category: 'Paediatrician', county: 'Mombasa', price: 3300 },
    { id: 5, type: 'doctor', name: 'Dr. Faith Achieng', specialty: 'Dermatologist', category: 'Dermatologist', county: 'Mombasa', price: 1980 },
    { id: 6, type: 'doctor', name: 'Dr. Joyce Kamau', specialty: 'Gynaecologist', category: 'Gynaecologist', county: 'Mombasa', price: 2420 },

    // Home nurses
    { id: 7, type: 'nurse', name: 'Nurse Mary Njeri', specialty: 'Wound care', category: 'Wound care', county: 'Mombasa', price: 1320 },
    { id: 8, type: 'nurse', name: 'Nurse Halima Said', specialty: 'Elderly care', category: 'Elderly care', county: 'Mombasa', price: 1650 },
    { id: 9, type: 'nurse', name: 'Nurse John Kiptoo', specialty: 'Injections', category: 'Injections', county: 'Mombasa', price: 1100 },
    { id: 10, type: 'nurse', name: 'Nurse Esther Mutheu', specialty: 'Postnatal care', category: 'Postnatal', county: 'Mombasa', price: 2200 },
    { id: 11, type: 'nurse', name: 'Nurse Brian Omondi', specialty: 'Physiotherapy', category: 'Physiotherapy', county: 'Mombasa', price: 1980 },
    { id: 12, type: 'nurse', name: 'Nurse Lucy Wambui', specialty: 'Palliative care', category: 'Palliative', county: 'Mombasa', price: 1540 },
  ];

  getDoctors(): CareProvider[] {
    return this.providers.filter((provider) => provider.type === 'doctor');
  }

  getNurses(): CareProvider[] {
    return this.providers.filter((provider) => provider.type === 'nurse');
  }
}