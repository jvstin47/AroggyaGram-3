# AroggyaGram 3 — Rural Healthcare & Community Assistance Network

A modern, community-powered rural healthcare and assistance platform engineered from the ground up by synthesizing the strongest concepts of [AroggyaGram (Flutter)](https://github.com/jvstin47/AroggyaGram.git) and [Help-hive (React)](https://github.com/jvstin47/Help-hive.git).

---

## 🌟 Architecture & Highlights

1. **AI Clinical Health Assistant (`Ask Aroggya`)**:
   - Structured symptom evaluation output (`LOW`, `MODERATE`, `HIGH`, `CRITICAL` risk classification).
   - Clinical explanation, immediate actionable guidance, red-flag symptoms, and professional referral.
   - Multilingual support for English, Malayalam (മലയാളം), Hindi (हिन्दी), Tamil (தமிழ்), and Bengali (বাংলা).
   - Voice input integration via Web Speech API.

2. **Universal Emergency SOS**:
   - High-contrast, persistent 1-tap SOS overlay button accessible from every screen.
   - Non-blocking GPS location acquisition with graceful fallback if coordinates are unavailable.
   - Instant direct dial for 108/112 ambulance and registered family caregivers.
   - Pre-formatted SMS emergency dispatch with live Google Maps coordinate links.

3. **Intelligent Request Routing & Voice Wizard**:
   - 3-step voice-first request wizard allowing citizens to speak naturally in their native tongue.
   - Deterministic safety overrides: acute emergencies (falls, heart attacks, severe bleeding) are automatically detected and routed directly to emergency care, strictly preventing volunteers from replacing an ambulance.
   - Automatic intent classification (`pharmacy_pickup`, `medical_transport`, `grocery_pickup`, `custom`).

4. **Volunteer Discovery & Geospatial Dashboard**:
   - Dual List and interactive Leaflet map view for discovering open community needs.
   - Transparent, explainable matching score based on distance, verified skills (e.g. `healthcare_first_responder`, `vehicle_owner`), availability, and task completion history.
   - Safety guardrail banners reminding volunteers of non-clinical scope of practice.
   - Complete status machine tracking (`submitted` → `accepted` → `in_progress` → `completed`).

5. **Medication Adherence Checklist**:
   - Daily scheduled prescription adherence tracking.
   - Dynamic AI adherence insights and local/server persistence.

6. **Healthcare Facilities Finder**:
   - Discovery for Taluk hospitals, Primary Health Centres (PHC), and 24/7 pharmacies with 1-tap phone dial and map directions.

7. **Unified Activity Timeline**:
   - Integrated chronological record of health events, consultations, medication schedules, and community assistance.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React
- **Server State**: TanStack Query v5
- **Client State**: React Context (minimal, clean boundary for Auth & Accessibility)
- **Backend**: Supabase (PostgreSQL, Row Level Security, Realtime)
- **Maps**: Leaflet + React-Leaflet
- **AI**: Google Gemini 2.5 Flash
- **Mobile**: Capacitor v6 (Android packaging ready)
- **Testing**: Vitest test runner

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your Supabase and Gemini credentials (optional for local/offline run).

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Automated Unit Tests
```bash
npm test
```

### 5. Production Build
```bash
npm run build
```

---

## 🛡️ Clinical & Safety Disclaimer
AroggyaGram is a community-first assistance and preliminary triage system. AI symptom guidance is advisory only and does not replace certified clinical diagnoses. In any acute medical emergency, users are routed directly to emergency ambulance services (108/112).
