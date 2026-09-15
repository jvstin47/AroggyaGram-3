import type { HealthcareFacility } from '@/types/database.types';

// Coordinates for Amal Jyothi College of Engineering (AJCE), Koovappally, Kanjirappally
export const AMAL_JYOTHI_COORDINATES = {
  latitude: 9.5292,
  longitude: 76.8227
};

const KOTTAYAM_FACILITIES: HealthcareFacility[] = [
  {
    id: 'fac-phc-koovappally',
    name: 'Primary Health Centre (PHC) Koovappally',
    type: 'clinic',
    address: 'Near Panchayat Office, Koovappally, Kanjirappally',
    latitude: 9.5310,
    longitude: 76.8205,
    phone: '+91 4828 251 210',
    has_emergency: false,
    distance_km: 1.2
  },
  {
    id: 'fac-neethi-koovappally',
    name: 'Neethi Co-op Medical Store & Pharmacy',
    type: 'pharmacy',
    address: 'Koovappally Junction, Kanjirappally - Erumely Road',
    latitude: 9.5320,
    longitude: 76.8190,
    phone: '+91 4828 252 440',
    has_emergency: false,
    distance_km: 1.3
  },
  {
    id: 'fac-mary-queens',
    name: 'Mary Queens Mission Hospital',
    type: 'hospital',
    address: 'Palampra P.O., Kanjirappally, Kottayam 686518',
    latitude: 9.5485,
    longitude: 76.8042,
    phone: '+91 4828 201 300',
    has_emergency: true,
    distance_km: 4.5
  },
  {
    id: 'fac-jan-aushadhi',
    name: 'Pradhan Mantri Jan Aushadhi Kendra',
    type: 'pharmacy',
    address: 'Private Bus Stand Complex, Kanjirappally Town',
    latitude: 9.5568,
    longitude: 76.7880,
    phone: '+91 4828 205 890',
    has_emergency: false,
    distance_km: 6.2
  },
  {
    id: 'fac-taluk-hospital',
    name: 'Government Taluk Hospital Kanjirappally',
    type: 'hospital',
    address: 'Near NH 183, Kanjirappally, Kottayam 686507',
    latitude: 9.5580,
    longitude: 76.7865,
    phone: '+91 4828 202 345',
    has_emergency: true,
    distance_km: 6.8
  },
  {
    id: 'fac-st-marys',
    name: "St. Mary's Hospital Podimattom",
    type: 'hospital',
    address: 'Podimattom, Parathode, Kottayam 686512',
    latitude: 9.5620,
    longitude: 76.8450,
    phone: '+91 4828 232 240',
    has_emergency: false,
    distance_km: 8.2
  },
  {
    id: 'fac-chc-mundakkayam',
    name: 'Community Health Centre (CHC) Mundakkayam',
    type: 'clinic',
    address: 'Near Mini Civil Station, Mundakkayam, Kottayam',
    latitude: 9.5372,
    longitude: 76.8850,
    phone: '+91 4828 272 233',
    has_emergency: true,
    distance_km: 14.1
  },
  {
    id: 'fac-mar-sleeva',
    name: 'Mar Sleeva Medicity Palai',
    type: 'hospital',
    address: 'Cherpunkal, Palai, Kottayam 686584',
    latitude: 9.6880,
    longitude: 76.6340,
    phone: '+91 4822 269 500',
    has_emergency: true,
    distance_km: 32.4
  },
  {
    id: 'fac-caritas',
    name: 'Caritas Hospital & Institute of Health Sciences',
    type: 'hospital',
    address: 'Thellakom P.O., Kottayam 686630',
    latitude: 9.6410,
    longitude: 76.5400,
    phone: '+91 481 279 0025',
    has_emergency: true,
    distance_km: 38.2
  },
  {
    id: 'fac-bharat',
    name: 'Bharat Hospital',
    type: 'hospital',
    address: 'Near Railway Station, Nagampadam, Kottayam 686001',
    latitude: 9.5890,
    longitude: 76.5260,
    phone: '+91 481 256 5451',
    has_emergency: true,
    distance_km: 39.5
  },
  {
    id: 'fac-mch-kottayam',
    name: 'Government Medical College Hospital (MCH) Kottayam',
    type: 'hospital',
    address: 'Medical College P.O., Gandhinagar, Kottayam 686008',
    latitude: 9.6640,
    longitude: 76.5290,
    phone: '+91 481 259 7279',
    has_emergency: true,
    distance_km: 41.0
  }
];

// Haversine distance in kilometers
function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export class FacilityService {
  public static async getNearbyFacilities(
    lat: number = AMAL_JYOTHI_COORDINATES.latitude,
    lng: number = AMAL_JYOTHI_COORDINATES.longitude,
    typeFilter?: string
  ): Promise<HealthcareFacility[]> {
    // Dynamically calculate distance from current user coordinates (defaults to Amal Jyothi College)
    const facilitiesWithDistances = KOTTAYAM_FACILITIES.map((f) => ({
      ...f,
      distance_km: calculateHaversineDistance(lat, lng, f.latitude, f.longitude)
    }));

    // Rank / sort by closest distance first
    facilitiesWithDistances.sort((a, b) => a.distance_km - b.distance_km);

    if (!typeFilter || typeFilter === 'all') {
      return facilitiesWithDistances;
    }
    return facilitiesWithDistances.filter((f) => f.type === typeFilter);
  }
}
