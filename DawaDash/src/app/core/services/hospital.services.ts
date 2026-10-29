import { Injectable } from '@angular/core';
import { Hospital } from '../models/hospital.models';

/** Sample data for now. Swap the array for an HTTP call when the API is ready. */
@Injectable({ providedIn: 'root' })
export class HospitalService {
  private readonly hospitals: Hospital[] = [
    {
      id: 1,
      name: '[Hospital name]',
      type: 'Private',
      level: 5,
      open24h: true,
      address: '[Street address], Mombasa',
      distanceKm: 2.1,
      services: ['Emergency', 'Maternity', 'Lab', 'Pharmacy'],
      phone: '+254700000001',
      directions: {
        from: 'Nyali Road',
        distanceKm: 4.2,
        minutes: 12,
        steps: ['Head south on Nyali Road', 'Turn right at the roundabout', 'Hospital on your left'],
      },
    },
    {
      id: 2,
      name: '[Hospital name]',
      type: 'Public',
      level: 4,
      open24h: true,
      address: '[Street address], Mombasa',
      distanceKm: 3.4,
      services: ['Emergency', 'Dental', 'Eye'],
      phone: '+254700000002',
      directions: {
        from: 'Nyali Road',
        distanceKm: 5.1,
        minutes: 15,
        steps: ['Head south on Nyali Road', 'Turn right at the roundabout', 'Hospital on your left'],
      },
    },
    {
      id: 3,
      name: '[Hospital name]',
      type: 'Faith-based',
      level: 4,
      open24h: false,
      address: '[Street address], Mombasa',
      distanceKm: 4.8,
      services: ['Maternity', 'Lab', 'Pharmacy'],
      phone: '+254700000003',
      directions: {
        from: 'Nyali Road',
        distanceKm: 6.3,
        minutes: 18,
        steps: ['Head south on Nyali Road', 'Turn right at the roundabout', 'Hospital on your left'],
      },
    },
    {
      id: 4,
      name: '[Hospital name]',
      type: 'Private',
      level: 3,
      open24h: false,
      address: '[Street address], Mombasa',
      distanceKm: 5.2,
      services: ['Dental', 'Eye', 'Lab'],
      phone: '+254700000004',
      directions: {
        from: 'Nyali Road',
        distanceKm: 6.9,
        minutes: 20,
        steps: ['Head south on Nyali Road', 'Turn right at the roundabout', 'Hospital on your left'],
      },
    },
  ];

  getHospitals(): Hospital[] {
    return [...this.hospitals].sort((a, b) => a.distanceKm - b.distanceKm);
  }

  getById(id: number): Hospital | undefined {
    return this.hospitals.find((h) => h.id === id);
  }
}
