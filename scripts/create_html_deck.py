import os
import subprocess

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>AroggyaGram — Pitch Deck</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    * { font-family: 'Plus Jakarta Sans', sans-serif; }
    @page {
      size: 16in 9in;
      margin: 0;
    }
    html, body {
      margin: 0;
      padding: 0;
      background: #FBFAF6 !important;
      color: #121E1C;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide {
      display: flex !important;
      width: 16in;
      height: 9in;
      min-height: 9in;
      max-height: 9in;
      page-break-after: always;
      break-after: page;
      box-sizing: border-box;
      padding: 0.6in 0.9in;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;
    }
    .slide:last-child {
      page-break-after: avoid;
      break-after: avoid;
    }
  </style>
</head>
<body class="bg-[#FBFAF6] text-[#121E1C]">

  <!-- SLIDE 1: HERO & TITLE -->
  <div class="slide flex-col justify-center items-center bg-[#005448] text-center p-12">
    <div class="bg-[#FBFAF6] w-full max-w-5xl rounded-[2.5rem] p-12 shadow-2xl border-4 border-[#E0F2EE] flex flex-col items-center space-y-5">
      <img src="public/logo.jpg" alt="AroggyaGram" class="w-24 h-24 rounded-full shadow-lg border-2 border-[#005448]" />
      <span class="text-xs font-black uppercase tracking-widest text-[#005448] bg-[#E0F2EE] px-4 py-1.5 rounded-full">
        National Level Hackathon 2026 • Healthcare & AI Track
      </span>
      <h1 class="text-6xl font-black text-[#121E1C] tracking-tight">AroggyaGram</h1>
      <p class="text-2xl font-bold text-[#005448]">Intelligent Community Health-Response Network</p>
      <p class="text-base text-stone-600 max-w-2xl font-medium italic">
        “Turning unstructured human distress into coordinated real-world medical action in under 40 seconds.”
      </p>
      <div class="grid grid-cols-4 gap-4 w-full pt-4">
        <div class="bg-white border border-[#E8E6DF] py-3 px-4 rounded-2xl font-bold text-xs text-[#005448] shadow-xs">
          🤖 Multilingual AI Triage
        </div>
        <div class="bg-white border border-[#E8E6DF] py-3 px-4 rounded-2xl font-bold text-xs text-[#D62828] shadow-xs">
          🚨 Deterministic 108 SOS
        </div>
        <div class="bg-white border border-[#E8E6DF] py-3 px-4 rounded-2xl font-bold text-xs text-[#005448] shadow-xs">
          🤝 Verified Responders
        </div>
        <div class="bg-white border border-[#E8E6DF] py-3 px-4 rounded-2xl font-bold text-xs text-[#7C3AED] shadow-xs">
          💊 Smart Prescription Care
        </div>
      </div>
    </div>
  </div>

  <!-- SLIDE 2: THE CRISIS -->
  <div class="slide flex-col justify-between items-start bg-[#FBFAF6] p-14">
    <div class="space-y-1">
      <span class="text-xs font-black uppercase tracking-widest text-[#D62828]">The Crisis & Rural Reality</span>
      <h2 class="text-4xl font-black text-[#121E1C]">The 40-Kilometer Healthcare Desert</h2>
    </div>

    <div class="grid grid-cols-3 gap-6 w-full">
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-2">
        <span class="text-5xl font-black text-[#D62828]">65%</span>
        <h3 class="text-base font-bold text-[#121E1C]">Rural Population</h3>
        <p class="text-xs text-stone-600 leading-relaxed">Over 650M Indian citizens reside in rural panchayats with access to under 30% of emergency healthcare resources.</p>
      </div>
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-2">
        <span class="text-5xl font-black text-[#E68A00]">90+ Min</span>
        <h3 class="text-base font-bold text-[#121E1C]">Ambulance Transit Lag</h3>
        <p class="text-xs text-stone-600 leading-relaxed">Average emergency transit delay across Tier-3 panchayats, hilly terrain, and remote homesteads.</p>
      </div>
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-2">
        <span class="text-5xl font-black text-[#005448]">1 : 10,000</span>
        <h3 class="text-base font-bold text-[#121E1C]">Doctor Deficit</h3>
        <p class="text-xs text-stone-600 leading-relaxed">Severe rural practitioner deficit in community clinics compared to the WHO recommended 1:1,000 ratio.</p>
      </div>
    </div>

    <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm w-full space-y-2">
      <h4 class="text-sm font-bold text-[#121E1C]">The Daily Ground Reality in Isolated Panchayats:</h4>
      <div class="grid grid-cols-2 gap-3 text-xs text-stone-600">
        <p><strong class="text-[#005448]">• Chronic Neglect:</strong> Elderly diabetic patients miss insulin & BP doses because pharmacies are 10-15 km away.</p>
        <p><strong class="text-[#005448]">• ASHA Isolation:</strong> Health workers manage acute clinical events without real-time diagnostic decision support.</p>
        <p><strong class="text-[#005448]">• Unwitnessed Emergencies:</strong> Falls, cardiac events, and domestic trauma go unreported for critical golden hours.</p>
        <p><strong class="text-[#005448]">• Linguistic Barriers:</strong> Inability to convey dialect symptom histories in standardized terminology.</p>
      </div>
    </div>
  </div>

  <!-- SLIDE 3: THE SOLUTION -->
  <div class="slide flex-col justify-between items-start bg-[#FBFAF6] p-14">
    <div class="space-y-1">
      <span class="text-xs font-black uppercase tracking-widest text-[#005448]">The Platform Solution</span>
      <h2 class="text-4xl font-black text-[#121E1C]">AroggyaGram: One Unified Platform, Four Pillars</h2>
    </div>

    <div class="grid grid-cols-2 gap-6 w-full">
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-[#E0F2EE] flex items-center justify-center text-sm">🤖</span>
          <h3 class="text-base font-black text-[#005448]">Clinical AI Triage (Ask Aroggya)</h3>
        </div>
        <ul class="text-xs text-stone-600 space-y-1.5 leading-relaxed">
          <li>• Powered by Google Gemini 2.5 Flash + Deterministic Clinical Rules</li>
          <li>• Native voice-to-text in Malayalam, Hindi & English via Capacitor</li>
          <li>• Evaluates urgency: LOW, MODERATE, HIGH, CRITICAL risks</li>
          <li>• Floating zero-overlap input card + automatic reading scroll</li>
        </ul>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-sm">🚨</span>
          <h3 class="text-base font-black text-[#D62828]">Deterministic Emergency SOS</h3>
        </div>
        <ul class="text-xs text-stone-600 space-y-1.5 leading-relaxed">
          <li>• Automatic red-flag trauma detection bypasses AI for immediate rescue</li>
          <li>• 1-Tap direct emergency dial to 9539141210 / 108 Ambulance</li>
          <li>• Instant GPS coordinate capture with reverse geo-tagging</li>
          <li>• Multi-recipient caregiver alert dispatch with live status</li>
        </ul>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">🤝</span>
          <h3 class="text-base font-black text-[#2563EB]">Volunteer Task & Responder Network</h3>
        </div>
        <ul class="text-xs text-stone-600 space-y-1.5 leading-relaxed">
          <li>• Mobilizes verified local neighbors for high-impact care tasks</li>
          <li>• 100-Point algorithmic matching (distance, skills, rating, vehicle)</li>
          <li>• Interactive Leaflet map view for active community assistance calls</li>
          <li>• Scoped non-clinical tasks: medicine pickup, hospital escorts</li>
        </ul>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <div class="flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm">💊</span>
          <h3 class="text-base font-black text-[#7C3AED]">Structured Medication Adherence</h3>
        </div>
        <ul class="text-xs text-stone-600 space-y-1.5 leading-relaxed">
          <li>• Replaces forgotten paper prescriptions with digital schedules</li>
          <li>• Structured dosage picker: tablets, syrups, strength & meal relations</li>
          <li>• Native 24h clock selector + fast mealtime presets (M/N/E)</li>
          <li>• Strict 10-digit mobile number rules & Supabase cloud sync</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 4: ORCHESTRATION -->
  <div class="slide flex-col justify-between items-start bg-[#FBFAF6] p-14">
    <div class="space-y-1">
      <span class="text-xs font-black uppercase tracking-widest text-[#005448]">Intelligent Orchestration</span>
      <h2 class="text-4xl font-black text-[#121E1C]">From Colloquial Distress Signal to Coordinated Action</h2>
    </div>

    <div class="grid grid-cols-4 gap-5 w-full">
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm flex flex-col justify-between h-80">
        <div class="space-y-3">
          <span class="text-xs font-black text-[#005448] bg-[#E0F2EE] px-2.5 py-1 rounded-full">STEP 01</span>
          <h3 class="text-lg font-black text-[#121E1C]">Native Voice Intake</h3>
          <p class="text-xs text-stone-600 leading-relaxed">Citizen speaks in dialect (Malayalam/Hindi) or types raw symptoms. Offline-ready Android speech engine captures transcript.</p>
        </div>
        <div class="text-[11px] font-bold text-[#005448]">Zero medical jargon required</div>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm flex flex-col justify-between h-80">
        <div class="space-y-3">
          <span class="text-xs font-black text-[#E68A00] bg-amber-100 px-2.5 py-1 rounded-full">STEP 02</span>
          <h3 class="text-lg font-black text-[#121E1C]">Situation & Safety</h3>
          <p class="text-xs text-stone-600 leading-relaxed">Gemini triages distress severity. Trauma red flags trigger instant SOS bypass; stable needs create structured Care Cases.</p>
        </div>
        <div class="text-[11px] font-bold text-[#E68A00]">Deterministic triage guardrails</div>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm flex flex-col justify-between h-80">
        <div class="space-y-3">
          <span class="text-xs font-black text-[#7C3AED] bg-purple-100 px-2.5 py-1 rounded-full">STEP 03</span>
          <h3 class="text-lg font-black text-[#121E1C]">Volunteer Dispatch</h3>
          <p class="text-xs text-stone-600 leading-relaxed">MatchingService scores nearby responders (0-100) based on distance, verified skills, and transport. Best neighbor alerted.</p>
        </div>
        <div class="text-[11px] font-bold text-[#7C3AED]">Algorithmic neighbor routing</div>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm flex flex-col justify-between h-80">
        <div class="space-y-3">
          <span class="text-xs font-black text-[#2563EB] bg-blue-100 px-2.5 py-1 rounded-full">STEP 04</span>
          <h3 class="text-lg font-black text-[#121E1C]">Resolution & Trail</h3>
          <p class="text-xs text-stone-600 leading-relaxed">Task verified on ground. Complete audit history logged to Unified Health Timeline. Encrypted Supabase backup.</p>
        </div>
        <div class="text-[11px] font-bold text-[#2563EB]">Audited, closed-loop care</div>
      </div>
    </div>
  </div>

  <!-- SLIDE 5: TECH & SAFETY ARCHITECTURE -->
  <div class="slide flex-col justify-between items-start bg-[#FBFAF6] p-14">
    <div class="space-y-1">
      <span class="text-xs font-black uppercase tracking-widest text-[#005448]">Engineering & Architecture</span>
      <h2 class="text-4xl font-black text-[#121E1C]">Gemini Intelligence with Deterministic Safety Bounds</h2>
    </div>

    <div class="grid grid-cols-2 gap-6 w-full">
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <h3 class="text-base font-black text-[#005448]">Clinical AI & Safety Guardrails</h3>
        <ul class="text-xs text-stone-600 space-y-2 leading-relaxed">
          <li><strong class="text-[#121E1C]">Multilingual NLP:</strong> Gemini 2.5 Flash natively processes Malayalam, Hindi, and English with clinical grounding.</li>
          <li><strong class="text-[#121E1C]">Triage Classification:</strong> Categorizes urgency into LOW, MODERATE, HIGH, CRITICAL with recommended escalation.</li>
          <li><strong class="text-[#121E1C]">Configurable API Key:</strong> Dedicated in-app settings screen to test, validate, and store custom Gemini keys locally.</li>
          <li><strong class="text-[#121E1C]">Deterministic Safety Bypass:</strong> Acute symptoms bypass AI to eliminate critical response latency.</li>
          <li><strong class="text-[#121E1C]">Strict Volunteer Scoping:</strong> Volunteers perform ONLY logistics and accompaniment, never medical acts.</li>
        </ul>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <h3 class="text-base font-black text-[#2563EB]">Production Engineering Stack</h3>
        <ul class="text-xs text-stone-600 space-y-2 leading-relaxed">
          <li><strong class="text-[#121E1C]">Core Framework:</strong> React 19 + TypeScript + Vite (2,077 modules, ~1.3s build)</li>
          <li><strong class="text-[#121E1C]">Native Packaging:</strong> Capacitor 6 + Speech Recognition + Custom App Branding</li>
          <li><strong class="text-[#121E1C]">Intelligence:</strong> Google Gemini 2.5 Flash SDK + Situation Engine</li>
          <li><strong class="text-[#121E1C]">Geospatial:</strong> Leaflet.js + OpenStreetMap for live volunteer dispatch</li>
          <li><strong class="text-[#121E1C]">Database:</strong> Supabase (PostgreSQL with RLS & real-time sync)</li>
          <li><strong class="text-[#121E1C]">Validation:</strong> Strict 10-digit Indian phone verification + live counters</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SLIDE 6: KANJIRAPPALLY PILOT -->
  <div class="slide flex-col justify-between items-start bg-[#FBFAF6] p-14">
    <div class="space-y-1">
      <span class="text-xs font-black uppercase tracking-widest text-[#005448]">Field Deployment</span>
      <h2 class="text-4xl font-black text-[#121E1C]">Real-World Grounding: Kanjirappally Block, Kottayam</h2>
    </div>

    <div class="grid grid-cols-3 gap-6 w-full">
      <div class="col-span-2 bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-3">
        <h3 class="text-base font-black text-[#005448]">Mapped Healthcare Ecosystem</h3>
        <div class="grid grid-cols-2 gap-4 text-xs text-stone-600 leading-relaxed">
          <div class="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <h4 class="font-bold text-[#121E1C]">MaryQueens Mission Hospital</h4>
            <p>Multispecialty tertiary referral hospital with 24/7 emergency trauma care and ICU backup.</p>
          </div>
          <div class="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <h4 class="font-bold text-[#121E1C]">Kanjirappally General Hospital CHC</h4>
            <p>Public community health centre providing free diagnostic testing, fever clinics & pharmacy refills.</p>
          </div>
          <div class="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <h4 class="font-bold text-[#121E1C]">Chirakkadavu PHC</h4>
            <p>Sub-block immunization clinic, ASHA hub, and maternal health monitoring center.</p>
          </div>
          <div class="p-3 rounded-2xl bg-stone-50 border border-stone-100">
            <h4 class="font-bold text-[#121E1C]">St. Dominic's 24/7 Pharmacy</h4>
            <p>Emergency nocturnal medicine dispensary stocked with cardiovascular & diabetic medications.</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="bg-white border border-[#E8E6DF] rounded-3xl p-5 shadow-sm space-y-1">
          <span class="text-3xl font-black text-[#2E7A5B]">&lt; 40 Secs</span>
          <h4 class="text-xs font-bold text-[#121E1C]">Rapid Care Dispatch</h4>
          <p class="text-[11px] text-stone-500">From voice distress to nearby verified responder alert.</p>
        </div>
        <div class="bg-white border border-[#E8E6DF] rounded-3xl p-5 shadow-sm space-y-1">
          <span class="text-3xl font-black text-[#005448]">100%</span>
          <h4 class="text-xs font-bold text-[#121E1C]">Offline Resilience</h4>
          <p class="text-[11px] text-stone-500">Zero downtime: cached triage & local emergency contacts.</p>
        </div>
      </div>
    </div>

    <div class="bg-[#E0F2EE] border border-[#005448]/20 rounded-3xl p-5 w-full flex items-center justify-between">
      <div>
        <h4 class="text-sm font-bold text-[#005448]">Empowering Frontline ASHA Workers</h4>
        <p class="text-xs text-[#005448]/80">Instead of tedious paper logs, health workers get automated triage and emergency escalation in their pocket.</p>
      </div>
      <span class="text-xs font-bold text-[#005448] bg-white px-3 py-1.5 rounded-full shadow-xs">180 ASHA Hubs</span>
    </div>
  </div>

  <!-- SLIDE 7: PRODUCT READINESS -->
  <div class="slide flex-col justify-between items-start bg-[#FBFAF6] p-14">
    <div class="space-y-1">
      <span class="text-xs font-black uppercase tracking-widest text-[#005448]">Product Readiness</span>
      <h2 class="text-4xl font-black text-[#121E1C]">Tested and Verified on Physical Android Hardware</h2>
    </div>

    <div class="grid grid-cols-3 gap-6 w-full">
      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-2">
        <span class="text-2xl">📱</span>
        <h3 class="text-base font-bold text-[#121E1C]">Native Android APK</h3>
        <ul class="text-xs text-stone-600 space-y-1 leading-relaxed">
          <li>• Packaged with Capacitor 6</li>
          <li>• Verified on Redmi Note 14 5G</li>
          <li>• Official adaptive launcher icons</li>
          <li>• Lightweight ~4.1 MB download size</li>
        </ul>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-2">
        <span class="text-2xl">🎙️</span>
        <h3 class="text-base font-bold text-[#121E1C]">Native Voice-to-Text</h3>
        <ul class="text-xs text-stone-600 space-y-1 leading-relaxed">
          <li>• Malayalam, Hindi, and English</li>
          <li>• On-device speech recognition</li>
          <li>• One-tap microphone controls</li>
          <li>• Instant transcription into chat</li>
        </ul>
      </div>

      <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm space-y-2">
        <span class="text-2xl">🛡️</span>
        <h3 class="text-base font-bold text-[#121E1C]">Supabase & Data Sync</h3>
        <ul class="text-xs text-stone-600 space-y-1 leading-relaxed">
          <li>• Live community health news</li>
          <li>• Verified Kanjirappally clinics</li>
          <li>• Resilient offline fallback cache</li>
          <li>• Strict 10-digit phone verification</li>
        </ul>
      </div>
    </div>

    <div class="bg-white border border-[#E8E6DF] rounded-3xl p-6 shadow-sm w-full space-y-2">
      <h4 class="text-xs font-bold text-[#121E1C]">On-Device Performance Benchmarks (Redmi Note 14 5G):</h4>
      <div class="grid grid-cols-4 gap-4 text-xs text-stone-600">
        <div><strong class="text-[#005448]">Cold Launch:</strong> &lt; 850 ms to full interactive home screen</div>
        <div><strong class="text-[#005448]">Voice Latency:</strong> Sub-second speech-to-text response</div>
        <div><strong class="text-[#005448]">Chat Layout:</strong> Pinned floating card above navigation</div>
        <div><strong class="text-[#005448]">Build Speed:</strong> ~400 ms incremental Gradle compilation</div>
      </div>
    </div>
  </div>

  <!-- SLIDE 8: THE VISION -->
  <div class="slide flex-col justify-center items-center bg-[#005448] text-center p-12">
    <div class="bg-[#FBFAF6] w-full max-w-5xl rounded-[2.5rem] p-12 shadow-2xl border-4 border-[#E0F2EE] flex flex-col items-center space-y-5">
      <img src="public/logo.jpg" alt="AroggyaGram" class="w-20 h-20 rounded-full shadow-lg border-2 border-[#005448]" />
      <span class="text-xs font-black uppercase tracking-widest text-[#005448] bg-[#E0F2EE] px-4 py-1.5 rounded-full">
        National Level Hackathon 2026 • Final Pitch
      </span>
      <h2 class="text-4xl font-black text-[#121E1C]">“No Rural Citizen Should Face Illness Alone.”</h2>
      <p class="text-base text-stone-600 max-w-2xl font-medium">
        AroggyaGram doesn't wait for physical infrastructure to catch up. It bridges the 40-km healthcare desert using the smartphone in every villager's pocket.
      </p>

      <div class="grid grid-cols-3 gap-6 w-full pt-2 text-left">
        <div class="bg-white border border-[#E8E6DF] p-5 rounded-2xl space-y-1">
          <h3 class="text-xs font-bold text-[#005448]">🏆 The Ask</h3>
          <p class="text-xs text-stone-600">Partnership with National Health Mission (NHM) Kerala to pilot across 4 rural panchayats in Kottayam district.</p>
        </div>
        <div class="bg-white border border-[#E8E6DF] p-5 rounded-2xl space-y-1">
          <h3 class="text-xs font-bold text-[#005448]">🔬 Next Steps</h3>
          <p class="text-xs text-stone-600">ASHA worker beta group onboarding, Supabase database sync, and ABDM health ID integration.</p>
        </div>
        <div class="bg-white border border-[#E8E6DF] p-5 rounded-2xl space-y-1">
          <h3 class="text-xs font-bold text-[#005448]">📲 Live & Functional</h3>
          <p class="text-xs text-stone-600">Verified Android APK build available. Complete source code on GitHub: <strong>github.com/jvstin47/AroggyaGram-3</strong></p>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
"""

with open("deck_print.html", "w") as f:
    f.write(html_content)

print("deck_print.html generated successfully.")

# Export to PDF using Headless Chrome
chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if os.path.exists(chrome_path):
    pdf_out = os.path.abspath("AroggyaGram_Pitch_Deck.pdf")
    html_url = "file://" + os.path.abspath("deck_print.html")
    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_out}",
        html_url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"PDF successfully generated at: {pdf_out}")
    else:
        print("Chrome error:", res.stderr)
