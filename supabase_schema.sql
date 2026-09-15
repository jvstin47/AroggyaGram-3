-- AroggyaGram 3: Comprehensive Supabase Schema & Seed Data
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/avnhryhhblqfnvhfyrrn/sql

-- 1. Healthcare Facilities Table (Kanjirappally & Kottayam region)
CREATE TABLE IF NOT EXISTS public.facilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('hospital', 'clinic', 'pharmacy', 'emergency')),
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone TEXT NOT NULL,
    has_emergency BOOLEAN DEFAULT false,
    distance_km DOUBLE PRECISION DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on facilities" ON public.facilities FOR ALL USING (true);

-- 2. Public Health & Community News Table
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    date TEXT NOT NULL,
    authority TEXT NOT NULL,
    read_time TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access on news" ON public.news FOR ALL USING (true);

-- 3. Seed Healthcare Facilities (Focused on Kanjirappally & nearby taluks)
INSERT INTO public.facilities (id, name, type, address, latitude, longitude, phone, has_emergency, distance_km)
VALUES
    ('fac-phc-koovappally', 'Primary Health Centre (PHC) Koovappally', 'clinic', 'Near Panchayat Office, Koovappally, Kanjirappally', 9.5310, 76.8205, '+91 4828 251 210', false, 1.2),
    ('fac-neethi-koovappally', 'Neethi Co-op Medical Store & Pharmacy', 'pharmacy', 'Koovappally Junction, Kanjirappally - Erumely Road', 9.5320, 76.8190, '+91 4828 252 440', false, 1.3),
    ('fac-mary-queens', 'Mary Queens Mission Hospital', 'hospital', 'Palampra P.O., Kanjirappally, Kottayam 686518', 9.5485, 76.8042, '+91 4828 201 300', true, 4.5),
    ('fac-jan-aushadhi', 'Pradhan Mantri Jan Aushadhi Kendra', 'pharmacy', 'Private Bus Stand Complex, Kanjirappally Town', 9.5568, 76.7880, '+91 4828 205 890', false, 6.2),
    ('fac-taluk-hospital', 'Government Taluk Hospital Kanjirappally', 'hospital', 'Near NH 183, Kanjirappally, Kottayam 686507', 9.5580, 76.7865, '+91 4828 202 345', true, 6.8),
    ('fac-phc-chirakkadavu', 'Primary Health Centre (PHC) Chirakkadavu', 'clinic', 'Near Ponkunnam, Chirakkadavu, Kanjirappally', 9.5650, 76.7610, '+91 4828 221 410', false, 7.5),
    ('fac-st-marys', 'St. Mary''s Hospital Podimattom', 'hospital', 'Podimattom, Parathode, Kottayam 686512', 9.5620, 76.8450, '+91 4828 232 240', false, 8.2),
    ('fac-chc-mundakkayam', 'Community Health Centre (CHC) Mundakkayam', 'clinic', 'Near Mini Civil Station, Mundakkayam, Kottayam', 9.5372, 76.8850, '+91 4828 272 233', true, 14.1),
    ('fac-mar-sleeva', 'Mar Sleeva Medicity Palai', 'hospital', 'Cherpunkal, Palai, Kottayam 686584', 9.6880, 76.6340, '+91 4822 269 500', true, 32.4),
    ('fac-caritas', 'Caritas Hospital & Institute of Health Sciences', 'hospital', 'Thellakom P.O., Kottayam 686630', 9.6410, 76.5400, '+91 481 279 0025', true, 38.2),
    ('fac-bharat', 'Bharat Hospital', 'hospital', 'Near Railway Station, Nagampadam, Kottayam 686001', 9.5890, 76.5260, '+91 481 256 5451', true, 39.5),
    ('fac-mch-kottayam', 'Government Medical College Hospital (MCH) Kottayam', 'hospital', 'Medical College P.O., Gandhinagar, Kottayam 686008', 9.6640, 76.5290, '+91 481 259 7279', true, 41.0)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    type = EXCLUDED.type,
    address = EXCLUDED.address,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    phone = EXCLUDED.phone,
    has_emergency = EXCLUDED.has_emergency,
    distance_km = EXCLUDED.distance_km;

-- 4. Seed Health News Bulletins
INSERT INTO public.news (id, title, category, summary, date, authority, read_time, image_url)
VALUES
    (
        'n-1',
        'Monsoon Dengue & Viral Fever Alert: Free PHC Diagnostic Camps in Kottayam & Idukki',
        'Public Health Alert',
        'The Kerala Health Department has deployed mobile fever clinics across rural panchayats. Free NS1 antigen tests and platelet monitoring available at all primary health centers.',
        'September 14, 2026',
        'Directorate of Health Services (DHS)',
        '2 min read',
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
    ),
    (
        'n-2',
        'Jan Aushadhi Scheme: 40+ Essential Cardiovascular Medicines Now at 80% Subsidy',
        'Medication Access',
        'Senior citizens registered under Karunya Arogya Suraksha Padhathi (KASP) can now obtain monthly refills of Amlodipine, Telmisartan, and Atorvastatin directly via verified community volunteers.',
        'September 12, 2026',
        'Ministry of Health & Family Welfare',
        '3 min read',
        'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80'
    ),
    (
        'n-3',
        'Boiled Water Advisory Issued for Low-Lying Riverine Panchayats',
        'Sanitation & Prevention',
        'Health inspectors recommend chlorination and boiling drinking water for at least 10 minutes to prevent waterborne diarrheal illness following seasonal water table shifts.',
        'September 10, 2026',
        'Community Health Mission',
        '2 min read',
        'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
    ),
    (
        'n-4',
        'Community Mental Health & Elderly Companionship Circles Launched',
        'Mental Wellbeing',
        'Trained ASHA health volunteers begin weekly home visits to monitor vital signs and provide companionship for elderly residents living independently.',
        'September 8, 2026',
        'Kerala State Mental Health Authority',
        '4 min read',
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    summary = EXCLUDED.summary,
    date = EXCLUDED.date,
    authority = EXCLUDED.authority,
    read_time = EXCLUDED.read_time,
    image_url = EXCLUDED.image_url;
