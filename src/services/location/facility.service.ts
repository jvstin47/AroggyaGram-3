import type { HealthcareFacility } from '@/types/database.types';

const KERALA_FACILITIES: HealthcareFacility[] = [
  {
    id: 'fac-1',
    name: 'Government Taluk Hospital Kanjirappally',
    type: 'hospital',
    address: 'Near NH 183, Kanjirappally, Kerala 686507',
    latitude: 9.5580,
    longitude: 76.7865,
    phone: '+91 4828 202 345',
    has_emergency: true,
    distance_km: 1.2
  },
  {
    id: 'fac-2',
    name: 'Primary Health Centre (PHC) Petta',
    type: 'clinic',
    address: 'Petta Junction, Ward 4, Kanjirappally',
    latitude: 9.5532,
    longitude: 76.7899,
    phone: '+91 4828 204 112',
    has_emergency: false,
    distance_km: 0.8
  },
  {
    id: 'fac-3',
    name: 'Jan Aushadhi Medical Store & Pharmacy',
    type: 'pharmacy',
    address: 'Municipal Bus Stand Road, Kanjirappally',
    latitude: 9.5568,
    longitude: 76.7880,
    phone: '+91 4828 205 890',
    has_emergency: false,
    distance_km: 0.4
  },
  {
    id: 'fac-4',
    name: 'Medical Trust Community Clinic',
    type: 'clinic',
    address: 'Post Office Road, Kanjirappally',
    latitude: 9.5595,
    longitude: 76.7850,
    phone: '+91 4828 203 765',
    has_emergency: true,
    distance_km: 1.6
  }
];

export class FacilityService {
  public static async getNearbyFacilities(
    _lat?: number,
    _lng?: number,
    typeFilter?: string
  ): Promise<HealthcareFacility[]> {
    if (!typeFilter || typeFilter === 'all') {
      return KERALA_FACILITIES;
    }
    return KERALA_FACILITIES.filter((f) => f.type === typeFilter);
  }
}
