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
    address: 'Near Panchayat Office, Koovappally, Kanjirappally 686518',
    latitude: 9.5310,
    longitude: 76.8205,
    phone: '+91 4828 251 210',
    has_emergency: false,
    distance_km: 1.2,
    facility_level: 'Primary Health Centre (Arogya Keralam)',
    operating_hours: '9:00 AM - 4:00 PM (OPD)',
    specialties: ['General Medicine', 'Maternal & Child Care', 'Immunization', 'Preventive Health', 'NCD Screening'],
    schemes_accepted: ['Arogya Keralam (NHM)', 'Free Government OP Medicine'],
    has_ambulance: false,
    has_icu: false,
    total_beds: 6,
    has_blood_bank: false,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.2,
    description: 'Government primary healthcare facility serving Koovappally panchayat. Provides basic laboratory tests, mother-child care, routine immunization, and free essential medicines.'
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
    distance_km: 1.3,
    facility_level: 'Subsidized Cooperative Pharmacy',
    operating_hours: '8:00 AM - 9:30 PM (Daily)',
    specialties: ['Subsidized Prescription Drugs', 'Surgical Supplies', 'Insulin & Diabetic Care', 'First Aid'],
    schemes_accepted: ['Kerala State Cooperative Subsidies', 'Karunya Benevolent Discounts'],
    has_ambulance: false,
    has_icu: false,
    total_beds: 0,
    has_blood_bank: false,
    has_diagnostic_lab: false,
    has_pharmacy: true,
    duty_doctor_available: false,
    rating: 4.4,
    description: 'Kerala Co-operative Department subsidized pharmacy providing quality generic and branded formulations at 15-40% below MRP to local residents.'
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
    distance_km: 4.5,
    facility_level: 'Multi-Specialty Mission Hospital',
    operating_hours: '24/7 (Emergency & IPD)',
    specialties: ['24/7 Emergency & Trauma', 'Cardiology', 'Orthopaedics', 'Obstetrics & Gynaecology', 'General Surgery', 'Pediatrics', 'Nephrology & Dialysis'],
    schemes_accepted: ['KASP (Karunya)', 'Ayushman Bharat PM-JAY', 'MEDISEP', 'Cashless Insurance / TPA'],
    has_ambulance: true,
    ambulance_phone: '+91 4828 201 333',
    has_icu: true,
    icu_beds: 22,
    total_beds: 250,
    has_blood_bank: true,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.6,
    description: 'Premier multi-specialty Catholic mission hospital in Kanjirappally equipped with 24/7 emergency casualty, advanced ICU, hemodialysis unit, digital radiology, and 24-hour pharmacy.'
  },
  {
    id: 'fac-jan-aushadhi',
    name: 'Pradhan Mantri Jan Aushadhi Kendra',
    type: 'pharmacy',
    address: 'Private Bus Stand Complex, Kanjirappally Town 686507',
    latitude: 9.5568,
    longitude: 76.7880,
    phone: '+91 4828 205 890',
    has_emergency: false,
    distance_km: 6.2,
    facility_level: 'Central Government Generic Medicine Store',
    operating_hours: '9:00 AM - 8:30 PM (Mon-Sat)',
    specialties: ['Generic Essential Medicines (50-90% Discount)', 'Hypertension & Cardiac Refills', 'Diabetic Formulations', 'Surgical Disposables'],
    schemes_accepted: ['PMBJP (Pradhan Mantri Bhartiya Janaushadhi Pariyojana)'],
    has_ambulance: false,
    has_icu: false,
    total_beds: 0,
    has_blood_bank: false,
    has_diagnostic_lab: false,
    has_pharmacy: true,
    duty_doctor_available: false,
    rating: 4.7,
    description: 'Official PMBJP pharmacy offering certified top-grade generic drugs at up to 90% savings for chronic cardiac, diabetic, and hypertensive patients.'
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
    distance_km: 6.8,
    facility_level: 'Sub-District Taluk Government Hospital',
    operating_hours: '24/7 (Casualty & Inpatient)',
    specialties: ['24/7 Casualty & Trauma', 'General Medicine', 'Pediatrics', 'Obstetrics & Gynaecology', 'Orthopaedics', 'Ophthalmology', 'Dental Surgery'],
    schemes_accepted: ['KASP (Karunya)', 'Ayushman Bharat PM-JAY', 'Karunya Benevolent Fund', 'MEDISEP'],
    has_ambulance: true,
    ambulance_phone: '+91 4828 202 108',
    has_icu: true,
    icu_beds: 12,
    total_beds: 160,
    has_blood_bank: true,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.1,
    description: 'Central government hospital for Kanjirappally taluk. Houses 24/7 government emergency casualty, maternity ward, major OT, blood storage center, digital X-ray, and dialysis wing.'
  },
  {
    id: 'fac-phc-chirakkadavu',
    name: 'Primary Health Centre (PHC) Chirakkadavu',
    type: 'clinic',
    address: 'Near Ponkunnam, Chirakkadavu, Kanjirappally 686506',
    latitude: 9.5650,
    longitude: 76.7610,
    phone: '+91 4828 221 410',
    has_emergency: false,
    distance_km: 7.5,
    facility_level: 'Family Health Centre (Arogya Keralam FHC)',
    operating_hours: '9:00 AM - 6:00 PM',
    specialties: ['Family Medicine', 'Geriatric Clinic', 'Palliative Home Care', 'Pediatric Immunization', 'Telemedicine'],
    schemes_accepted: ['National Health Mission (NHM)', 'Arogya Keralam Free OP'],
    has_ambulance: false,
    has_icu: false,
    total_beds: 10,
    has_blood_bank: false,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.3,
    description: 'Modernized Family Health Centre under Aardram Mission with extended outpatient hours, palliative home-care outreach, automated laboratory, and community wellness programs.'
  },
  {
    id: 'fac-st-marys',
    name: "St. Mary's Hospital Podimattom",
    type: 'hospital',
    address: 'Podimattom, Parathode, Kottayam 686512',
    latitude: 9.5620,
    longitude: 76.8450,
    phone: '+91 4828 232 240',
    has_emergency: true,
    distance_km: 8.2,
    facility_level: 'General Community Hospital',
    operating_hours: '24/7 (Emergency & IPD)',
    specialties: ['General Medicine', 'General Surgery', 'Obstetrics & Gynaecology', 'Pediatrics', 'ENT'],
    schemes_accepted: ['KASP', 'Private Medical Insurance'],
    has_ambulance: true,
    ambulance_phone: '+91 4828 232 299',
    has_icu: true,
    icu_beds: 8,
    total_beds: 100,
    has_blood_bank: false,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.3,
    description: 'Serving Parathode and plantation communities with inpatient wards, surgical theater, obstetric care, 24-hour emergency response, and ultrasound imaging.'
  },
  {
    id: 'fac-chc-mundakkayam',
    name: 'Community Health Centre (CHC) Mundakkayam',
    type: 'clinic',
    address: 'Near Mini Civil Station, Mundakkayam, Kottayam 686513',
    latitude: 9.5372,
    longitude: 76.8850,
    phone: '+91 4828 272 233',
    has_emergency: true,
    distance_km: 14.1,
    facility_level: 'Community Health Centre (Block CHC)',
    operating_hours: '24/7 (Emergency & Delivery Suite)',
    specialties: ['24/7 Casualty', 'Emergency Maternity Care', 'Pediatrics', 'General Medicine', 'Public Health Outreach'],
    schemes_accepted: ['KASP', 'Ayushman Bharat PM-JAY', 'Free Government Diagnostics'],
    has_ambulance: true,
    ambulance_phone: '+91 4828 272 108',
    has_icu: false,
    total_beds: 40,
    has_blood_bank: false,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.0,
    description: 'Block-level public hospital providing emergency stabilization, safe birthing center, inpatient treatment, and ambulance referral services along the Kottayam-Kumily highway.'
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
    distance_km: 32.4,
    facility_level: 'Quaternary Care Academic Medical Center',
    operating_hours: '24/7 (Emergency, Trauma & Critical Care)',
    specialties: ['Interventional Cardiology', 'Cardiothoracic Surgery', 'Neurology & Neurosurgery', 'Medical & Surgical Oncology', 'Organ Transplant', 'Level 1 Trauma Care'],
    schemes_accepted: ['KASP (Karunya)', 'Ayushman Bharat PM-JAY', 'MEDISEP', 'CGHS', 'All Major Insurance / TPAs'],
    has_ambulance: true,
    ambulance_phone: '+91 4822 269 777',
    has_icu: true,
    icu_beds: 120,
    total_beds: 750,
    has_blood_bank: true,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.8,
    description: 'Premier NABH-accredited tertiary care university medical center. Features cath labs, ECMO support, modular surgical suites, advanced stroke center, and round-the-clock mobile ICU fleet.'
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
    distance_km: 38.2,
    facility_level: 'Tertiary Care Multi-Specialty & Oncology Center',
    operating_hours: '24/7 (Emergency & Comprehensive Care)',
    specialties: ['Comprehensive Cancer Institute', 'Cardiology & CTVS', 'Gastroenterology', 'Renal Sciences', 'Neonatology (NICU Level III)', 'Emergency & Critical Care'],
    schemes_accepted: ['KASP', 'Ayushman Bharat PM-JAY', 'MEDISEP', 'ESI', 'Cashless TPA'],
    has_ambulance: true,
    ambulance_phone: '+91 481 279 0033',
    has_icu: true,
    icu_beds: 90,
    total_beds: 650,
    has_blood_bank: true,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.7,
    description: 'Pioneering healthcare institution in Central Travancore known for comprehensive oncology, advanced cardiac interventions, dedicated neuro-critical ICU, and robotic surgery.'
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
    distance_km: 39.5,
    facility_level: 'Multi-Specialty Private Hospital',
    operating_hours: '24/7 (Casualty & Inpatient)',
    specialties: ['General Surgery', 'Orthopaedics & Joint Replacement', 'Cardiology', 'ENT', 'Urology', 'Dialysis'],
    schemes_accepted: ['KASP', 'MEDISEP', 'Private Health Insurance'],
    has_ambulance: true,
    ambulance_phone: '+91 481 256 5455',
    has_icu: true,
    icu_beds: 18,
    total_beds: 150,
    has_blood_bank: false,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.3,
    description: 'Conveniently situated next to Kottayam railway station, offering fast trauma response, joint replacement surgeries, intensive care, and multi-specialty outpatient clinics.'
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
    distance_km: 41.0,
    facility_level: 'Apex Quaternary Government Teaching Hospital',
    operating_hours: '24/7 (Emergency, Trauma & Specialized IPD)',
    specialties: ['Apex Level Trauma Center', 'Cardiology & Cardiothoracic', 'Neurology & Neurosurgery', 'Nephrology & Renal Transplant', 'Burn ICU', 'Pediatric Intensive Care', 'Comprehensive Oncology'],
    schemes_accepted: ['KASP (Karunya 100% Free)', 'Ayushman Bharat PM-JAY', 'Government Employee Schemes', 'Free Statewide BPL Coverage'],
    has_ambulance: true,
    ambulance_phone: '+91 481 259 7288',
    has_icu: true,
    icu_beds: 150,
    total_beds: 1400,
    has_blood_bank: true,
    has_diagnostic_lab: true,
    has_pharmacy: true,
    duty_doctor_available: true,
    rating: 4.5,
    description: 'The central apex referral hospital and government medical college for Central Kerala. Provides state-of-the-art super-specialty surgery, organ transplantation, comprehensive 24/7 emergency care, and free life-saving healthcare.'
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

import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

export class FacilityService {
  private static parseArrayField(val: any): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // May be Postgres array literal format "{item1,item2}"
        if (val.startsWith('{') && val.endsWith('}')) {
          return val.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, ''));
        }
        return [val];
      }
    }
    return [];
  }

  public static async getNearbyFacilities(
    lat: number = AMAL_JYOTHI_COORDINATES.latitude,
    lng: number = AMAL_JYOTHI_COORDINATES.longitude,
    typeFilter?: string
  ): Promise<HealthcareFacility[]> {
    let rawList: HealthcareFacility[] = KOTTAYAM_FACILITIES;

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('facilities')
          .select('*');

        if (!error && data && data.length > 0) {
          rawList = data.map((item: any) => ({
            id: String(item.id),
            name: String(item.name || ''),
            type: (item.type || 'hospital') as HealthcareFacility['type'],
            address: String(item.address || ''),
            latitude: Number(item.latitude) || 0,
            longitude: Number(item.longitude) || 0,
            phone: String(item.phone || ''),
            has_emergency: Boolean(item.has_emergency),
            facility_level: item.facility_level ? String(item.facility_level) : undefined,
            operating_hours: item.operating_hours ? String(item.operating_hours) : undefined,
            specialties: FacilityService.parseArrayField(item.specialties),
            schemes_accepted: FacilityService.parseArrayField(item.schemes_accepted),
            has_ambulance: Boolean(item.has_ambulance),
            ambulance_phone: item.ambulance_phone ? String(item.ambulance_phone) : undefined,
            has_icu: Boolean(item.has_icu),
            icu_beds: item.icu_beds != null ? Number(item.icu_beds) : undefined,
            total_beds: item.total_beds != null ? Number(item.total_beds) : undefined,
            has_blood_bank: Boolean(item.has_blood_bank),
            has_diagnostic_lab: Boolean(item.has_diagnostic_lab),
            has_pharmacy: Boolean(item.has_pharmacy),
            duty_doctor_available: Boolean(item.duty_doctor_available),
            rating: item.rating != null ? Number(item.rating) : undefined,
            description: item.description ? String(item.description) : undefined,
            distance_km: item.distance_km != null ? Number(item.distance_km) : undefined
          }));
        }
      } catch (err) {
        console.warn('Supabase facilities fetch fallback to local seed:', err);
      }
    }

    // Dynamically calculate distance from current user coordinates
    const facilitiesWithDistances = rawList.map((f) => ({
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
