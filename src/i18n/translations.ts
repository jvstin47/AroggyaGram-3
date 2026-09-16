export type SupportedLanguage = 'en' | 'ml' | 'hi';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_consult: string;
  nav_sos: string;
  nav_meds: string;
  nav_clinics: string;
  nav_news: string;
  nav_about: string;
  nav_feedback: string;
  nav_profile: string;

  // Home Screen
  home_subtitle: string;
  home_intake_badge: string;
  home_intake_title: string;
  home_intake_desc: string;
  home_intake_btn: string;
  home_pillar_ai: string;
  home_pillar_ai_desc: string;
  home_pillar_timeline: string;
  home_pillar_timeline_desc: string;
  home_meds_title: string;
  home_clinics_title: string;
  home_health_tip_title: string;
  home_health_tip_body: string;
  home_pending: string;
  home_all_taken: string;
  home_next: string;
  home_chc_phc: string;
  home_find_doctors: string;

  // Common buttons & actions
  btn_back: string;
  btn_cancel: string;
  btn_save: string;
  btn_accept: string;
  btn_submit: string;
  btn_call: string;
  btn_directions: string;
  btn_remove: string;
  btn_keep: string;

  // Medications Screen
  meds_title: string;
  meds_subtitle: string;
  meds_add: string;
  meds_today_schedule: string;
  meds_completed: string;
  meds_taken_of: string;
  meds_ai_guidance: string;
  meds_ai_guidance_text: string;
  meds_scheduled: string;
  meds_tap_to_mark: string;
  meds_no_meds: string;
  meds_no_meds_hint: string;
  meds_add_title: string;
  meds_name_label: string;
  meds_name_placeholder: string;
  meds_form_label: string;
  meds_form_tablet: string;
  meds_form_capsule: string;
  meds_form_syrup: string;
  meds_form_drops: string;
  meds_form_inhaler: string;
  meds_form_injection: string;
  meds_quantity_label: string;
  meds_strength_label: string;
  meds_strength_placeholder: string;
  meds_timing_label: string;
  meds_timing_after: string;
  meds_timing_before: string;
  meds_timing_with: string;
  meds_timing_bedtime: string;
  meds_schedule_time: string;
  meds_time_morning: string;
  meds_time_afternoon: string;
  meds_time_evening: string;
  meds_time_night: string;
  meds_save_schedule: string;
  meds_remove_title: string;
  meds_remove_confirm: string;
  meds_remove_from_schedule: string;

  // Facilities Screen
  facilities_title: string;
  facilities_subtitle: string;
  facilities_all: string;
  facilities_hospitals: string;
  facilities_clinics: string;
  facilities_pharmacies: string;
  facilities_er_24: string;
  facilities_search_placeholder: string;
  facilities_ambulance: string;
  facilities_icu: string;
  facilities_beds: string;
  facilities_view_details: string;
  facilities_close_details: string;
  facilities_specialties: string;
  facilities_schemes: string;
  facilities_duty_doctor: string;
  facilities_blood_bank: string;
  facilities_lab: string;
  facilities_pharmacy: string;
  facilities_hours: string;
  facilities_no_results: string;

  // Ask Aroggya Screen
  ask_title: string;
  ask_subtitle: string;
  ask_disclaimer: string;
  ask_placeholder: string;
  ask_analyzing: string;
  ask_analyze_btn: string;
  ask_voice_unavailable: string;
  ask_welcome: string;
  ask_error: string;
  ask_possible_condition: string;
  ask_urgent_intervention: string;
  ask_activate_sos: string;
  ask_call_108: string;
  ask_immediate_actions: string;
  ask_red_flags: string;

  // News Screen
  news_title: string;
  news_subtitle: string;
  news_verified_bulletin: string;
  news_bulletin_title: string;
  news_bulletin_desc: string;
  news_read_more: string;

  // About Screen
  about_title: string;
  about_subtitle: string;
  about_mission: string;
  about_mission_heading: string;
  about_mission_desc: string;
  about_guiding: string;
  about_ai_title: string;
  about_ai_desc: string;
  about_emergency_title: string;
  about_emergency_desc: string;
  about_volunteer_title: string;
  about_volunteer_desc: string;
  about_version: string;
  about_engineered: string;

  // Feedback Screen
  feedback_title: string;
  feedback_subtitle: string;
  feedback_thank_you: string;
  feedback_recorded: string;
  feedback_return_home: string;
  feedback_rating_label: string;
  feedback_rating_5: string;
  feedback_rating_4: string;
  feedback_rating_3: string;
  feedback_rating_low: string;
  feedback_topic_label: string;
  feedback_cat_general: string;
  feedback_cat_ai: string;
  feedback_cat_meds: string;
  feedback_cat_volunteer: string;
  feedback_cat_language: string;
  feedback_cat_bug: string;
  feedback_comments_label: string;
  feedback_comments_placeholder: string;
  feedback_submit: string;

  // Timeline Screen
  timeline_title: string;
  timeline_subtitle: string;

  // Profile Screen
  profile_title: string;
  profile_subtitle: string;
  profile_active_role: string;
  profile_name_placeholder: string;
  profile_emergency_mobile: string;
  profile_save: string;
  profile_saved: string;
  profile_appearance: string;
  profile_dark_theme: string;
  profile_dark_desc: string;
  profile_select_language: string;
  profile_language_desc: string;
  profile_text_scaling: string;
  profile_text_size: string;
  profile_size_normal: string;
  profile_size_large: string;
  profile_size_xlarge: string;
  profile_high_contrast: string;
  profile_high_contrast_desc: string;

  // Care Cases
  cases_coordinated: string;
  cases_title: string;
  cases_new: string;
  cases_no_cases: string;
  cases_no_cases_hint: string;
  cases_mission_control: string;

  // Volunteer Dashboard
  volunteer_network: string;
  volunteer_switch_citizen: string;
  volunteer_verified: string;
  volunteer_tasks_completed: string;
  volunteer_reminder: string;
  volunteer_reminder_text: string;
  volunteer_nearby: string;
  volunteer_my_active: string;
  volunteer_done: string;
  volunteer_all_caught_up: string;
  volunteer_no_open: string;
  volunteer_active_mission: string;
  volunteer_navigate: string;
  volunteer_mark_completed: string;
  volunteer_no_active: string;
  volunteer_no_active_hint: string;
  volunteer_no_completed: string;
  volunteer_accept: string;
  volunteer_matching_score: string;

  // Intake Modal
  intake_title: string;
  intake_subtitle: string;
  intake_describe: string;
  intake_speak: string;
  intake_listening: string;
  intake_placeholder: string;
  intake_sample_label: string;
  intake_location: string;
  intake_analyzing: string;
  intake_emergency_override: string;
  intake_emergency_desc: string;
  intake_safety_passed: string;
  intake_person_vuln: string;
  intake_triage_risk: string;
  intake_identified_need: string;
  intake_launch: string;

  // Care Case Detail
  detail_not_found: string;
  detail_not_found_desc: string;
  detail_view_all: string;
  detail_mission_control: string;
  detail_person_context: string;
  detail_mobility: string;
  detail_language: string;
  detail_vulnerability: string;
  detail_family_alert: string;
  detail_clinical_triage: string;
  detail_chronic: string;
  detail_medications: string;
  detail_baseline_bp: string;
  detail_immediate_need: string;
  detail_response_plan: string;
  detail_estimated: string;
  detail_find_volunteer: string;
  detail_matching: string;
  detail_start_enroute: string;
  detail_mark_delivered: string;
  detail_assigned_responder: string;
  detail_match_score: string;
  detail_why_match: string;
  detail_followup_title: string;
  detail_followup_archived: string;
  detail_followup_instruction: string;
  detail_followup_symptoms: string;
  detail_followup_meds: string;
  detail_followup_comfort: string;
  detail_followup_notes_placeholder: string;
  detail_followup_submit: string;
  detail_followup_confirmed: string;
  detail_followup_confirmed_desc: string;
  detail_audit_log: string;
  detail_events: string;
  detail_actor: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_consult: 'Consult',
    nav_sos: 'Emergency',
    nav_meds: 'Meds',
    nav_clinics: 'Clinics',
    nav_news: 'Community News',
    nav_about: 'About AroggyaGram',
    nav_feedback: 'Community Feedback',
    nav_profile: 'Profile & Settings',

    // Home Screen
    home_subtitle: 'Community Health-Response Network',
    home_intake_badge: 'Intelligent Intake',
    home_intake_title: 'Tell us what is happening',
    home_intake_desc: 'Speak or type naturally. AroggyaGram turns human situations into coordinated clinical and volunteer action.',
    home_intake_btn: 'Describe Need via Voice or Text',
    home_pillar_ai: 'Ask Aroggya',
    home_pillar_ai_desc: 'Multilingual clinical triage & health guidance',
    home_pillar_timeline: 'Health Timeline',
    home_pillar_timeline_desc: 'Chronological log of events & prescriptions',
    home_meds_title: 'Medications',
    home_clinics_title: 'Nearby Clinics',
    home_health_tip_title: 'Community Health Note',
    home_health_tip_body: 'Drink clean boiled water regularly during humid seasons. If fever develops above 101°F, consult Ask Aroggya or alert your ASHA worker.',
    home_pending: 'pending',
    home_all_taken: 'All taken today!',
    home_next: 'Next',
    home_chc_phc: 'CHCs & PHCs',
    home_find_doctors: 'Find doctors & pharmacies',

    // Common buttons
    btn_back: 'Back',
    btn_cancel: 'Cancel',
    btn_save: 'Save',
    btn_accept: 'Accept Task',
    btn_submit: 'Submit',
    btn_call: 'Call Center',
    btn_directions: 'Directions',
    btn_remove: 'Remove',
    btn_keep: 'Keep It',

    // Medications
    meds_title: 'Medications',
    meds_subtitle: 'Daily adherence & dosage schedule',
    meds_add: 'Add Med',
    meds_today_schedule: "Today's Schedule",
    meds_completed: 'Completed',
    meds_taken_of: 'of',
    meds_ai_guidance: 'AI Adherence Guidance',
    meds_ai_guidance_text: 'Consistent timing of blood pressure and diabetes medicine protects against sudden dizziness. If you ever feel lightheaded, verify your dose with your caregiver.',
    meds_scheduled: 'Scheduled Prescriptions',
    meds_tap_to_mark: 'Tap to mark taken',
    meds_no_meds: 'No medications configured',
    meds_no_meds_hint: 'Tap "Add Med" above to set up your schedule.',
    meds_add_title: 'Add Scheduled Medication',
    meds_name_label: 'Medicine Name & Strength',
    meds_name_placeholder: 'e.g. Amlodipine, Metformin, Paracetamol',
    meds_form_label: 'Medicine Form',
    meds_form_tablet: 'Tablet',
    meds_form_capsule: 'Capsule',
    meds_form_syrup: 'Syrup',
    meds_form_drops: 'Drops',
    meds_form_inhaler: 'Inhaler',
    meds_form_injection: 'Injection',
    meds_quantity_label: 'Dose Quantity',
    meds_strength_label: 'Strength / Unit',
    meds_strength_placeholder: 'e.g. 500mg, 5ml',
    meds_timing_label: 'Consumption Timing',
    meds_timing_after: 'After Food',
    meds_timing_before: 'Before Food',
    meds_timing_with: 'With Meal',
    meds_timing_bedtime: 'Bedtime',
    meds_schedule_time: 'Schedule Time',
    meds_time_morning: 'Morning',
    meds_time_afternoon: 'Afternoon',
    meds_time_evening: 'Evening',
    meds_time_night: 'Night',
    meds_save_schedule: 'Save Schedule',
    meds_remove_title: 'Remove Medication?',
    meds_remove_confirm: 'Are you sure you want to remove',
    meds_remove_from_schedule: 'from your daily dosage schedule?',

    // Facilities
    facilities_title: 'Healthcare Facilities',
    facilities_subtitle: 'Hospitals, PHCs, & Pharmacies nearby',
    facilities_all: 'All Places',
    facilities_hospitals: 'Hospitals',
    facilities_clinics: 'Clinics & PHC',
    facilities_pharmacies: 'Pharmacies',
    facilities_er_24: '24/7 ER',
    facilities_search_placeholder: 'Search by hospital name, specialty, or scheme (e.g., KASP, ICU)...',
    facilities_ambulance: 'Ambulance',
    facilities_icu: 'ICU Beds',
    facilities_beds: 'Total Beds',
    facilities_view_details: 'Clinical Details',
    facilities_close_details: 'Close Details',
    facilities_specialties: 'Specialties & Key Services',
    facilities_schemes: 'Accepted Health Schemes',
    facilities_duty_doctor: 'Duty Doctor Available',
    facilities_blood_bank: 'Blood Bank',
    facilities_lab: 'Diagnostic Lab',
    facilities_pharmacy: '24/7 Pharmacy',
    facilities_hours: 'Operating Hours',
    facilities_no_results: 'No facilities found matching your search',

    // Ask Aroggya
    ask_title: 'Ask Aroggya',
    ask_subtitle: 'Safe clinical preliminary health assessment',
    ask_disclaimer: 'AroggyaGram AI provides initial risk classification and home guidance only. It does not replace clinical diagnosis by a registered medical officer or prescribe prescription dosages.',
    ask_placeholder: 'Describe your symptoms in your own words (e.g. \'Having severe dizziness and chest discomfort for the last 2 hours\')...',
    ask_analyzing: 'Analyzing Symptoms...',
    ask_analyze_btn: 'Analyze Health Concern',
    ask_voice_unavailable: 'Voice speech recognition is unavailable in this web context. Please type your message.',
    ask_welcome: 'Namaskaram! I am AroggyaGram AI. You can describe your symptoms, ask about your medications, or speak to me in Malayalam, Hindi, or English. How can I help you right now?',
    ask_error: 'I could not connect to cloud triage services. If this is an emergency, please use the SOS button immediately.',
    ask_possible_condition: 'Possible Condition',
    ask_urgent_intervention: 'Urgent Medical Intervention Required',
    ask_activate_sos: 'Activate SOS Now',
    ask_call_108: 'Call 108',
    ask_immediate_actions: 'Immediate Actions to Take',
    ask_red_flags: 'Red Flag Symptoms:',

    // News
    news_title: 'Community Health News',
    news_subtitle: 'Government advisories & rural health bulletins',
    news_verified_bulletin: 'Verified Bulletin',
    news_bulletin_title: '24/7 Telemedicine & ASHA Helpline Active across Rural Districts',
    news_bulletin_desc: 'Dial 1056 for state mental health and medical counseling services anytime without toll charges.',
    news_read_more: 'Read More →',

    // About
    about_title: 'About AroggyaGram',
    about_subtitle: 'Community Rural Health & Assistance Mission',
    about_mission: 'Mission & Vision',
    about_mission_heading: 'Dignified Rural Health & Neighborhood Support',
    about_mission_desc: 'AroggyaGram unites intelligent AI clinical triage, failsafe emergency response, and verified community volunteerism to ensure no rural citizen faces illness or isolation alone.',
    about_guiding: 'Our Guiding Architecture',
    about_ai_title: 'Intelligent AI Symptom Guidance',
    about_ai_desc: 'Powered by Google Gemini 2.5 Flash, providing preliminary risk classifications in native languages (Malayalam, Hindi, English) without replacing registered medical practitioners.',
    about_emergency_title: 'Deterministic Emergency Safety',
    about_emergency_desc: 'Critical conditions and keywords immediately trigger emergency SOS channels, strictly preventing volunteer assistance from ever substituting an ambulance.',
    about_volunteer_title: 'Verified Local Volunteerism',
    about_volunteer_desc: 'Neighbors assist neighbors with prescription pickups, clinic transport, and welfare checks while strictly shielding sensitive private clinical records.',
    about_version: 'AroggyaGram v3.0.0 (Unified Release)',
    about_engineered: 'Engineered for rural connectivity & native Android devices',

    // Feedback
    feedback_title: 'Community Feedback',
    feedback_subtitle: 'Help us refine care for rural Kerala',
    feedback_thank_you: 'Nanni! Thank you.',
    feedback_recorded: 'Your valuable feedback has been recorded. It directly shapes our community responder workflows and local medical triage.',
    feedback_return_home: 'Return to Home Hub',
    feedback_rating_label: 'How was your experience today?',
    feedback_rating_5: 'Excellent & Life-saving',
    feedback_rating_4: 'Very Helpful',
    feedback_rating_3: 'Satisfactory',
    feedback_rating_low: 'Needs Improvement',
    feedback_topic_label: 'Feedback Topic',
    feedback_cat_general: 'General Experience',
    feedback_cat_ai: 'AI Triage Quality',
    feedback_cat_meds: 'Medication Schedule',
    feedback_cat_volunteer: 'Volunteer Dispatch',
    feedback_cat_language: 'Language / Translation',
    feedback_cat_bug: 'App Bug / Glitch',
    feedback_comments_label: 'Your Suggestions or Comments',
    feedback_comments_placeholder: 'Tell us what you liked, or what could be made easier for elders...',
    feedback_submit: 'Submit Feedback',

    // Timeline
    timeline_title: 'Health & Care Timeline',
    timeline_subtitle: 'Chronological record of health events and assistance',

    // Profile
    profile_title: 'Profile & Preferences',
    profile_subtitle: 'Personal identity, dark mode & language',
    profile_active_role: 'Active Role',
    profile_name_placeholder: 'Your Full Name',
    profile_emergency_mobile: 'Registered Emergency Mobile',
    profile_save: 'Save Profile Changes',
    profile_saved: 'Changes Saved',
    profile_appearance: 'Appearance & Dark Theme',
    profile_dark_theme: 'Dark Theme',
    profile_dark_desc: 'Deep, eye-friendly contrast for nighttime and rural field conditions',
    profile_select_language: 'Select Preferred Language',
    profile_language_desc: 'Translations and AI health consultations adapt automatically to your native tongue.',
    profile_text_scaling: 'Text Scaling',
    profile_text_size: 'Text Size (Elderly Friendly)',
    profile_size_normal: 'Normal',
    profile_size_large: 'Large (115%)',
    profile_size_xlarge: 'X-Large (130%)',
    profile_high_contrast: 'High Contrast Mode',
    profile_high_contrast_desc: 'Extreme sunlight outdoor readability',

    // Care Cases
    cases_coordinated: 'Coordinated Action',
    cases_title: 'Care Network Cases',
    cases_new: 'New Case',
    cases_no_cases: 'No cases found matching filter',
    cases_no_cases_hint: 'Try switching tabs or creating a new Care Case.',
    cases_mission_control: 'Mission Control',

    // Volunteer Dashboard
    volunteer_network: 'Volunteer Network',
    volunteer_switch_citizen: 'Switch to Citizen',
    volunteer_verified: 'Community Verified',
    volunteer_tasks_completed: 'tasks completed',
    volunteer_reminder: 'Community Volunteer Reminder:',
    volunteer_reminder_text: 'You are assisting as a trusted neighbor. You are not a certified doctor. Only provide the specified delivery or accompaniment assistance.',
    volunteer_nearby: 'Nearby',
    volunteer_my_active: 'My Active',
    volunteer_done: 'Done',
    volunteer_all_caught_up: 'All caught up!',
    volunteer_no_open: 'No open requests in your area right now.',
    volunteer_active_mission: 'Active Mission',
    volunteer_navigate: 'Navigate on Maps',
    volunteer_mark_completed: 'Mark Completed',
    volunteer_no_active: 'No active tasks in progress',
    volunteer_no_active_hint: 'Accept a nearby request to help a neighbor.',
    volunteer_no_completed: 'No completed tasks yet.',
    volunteer_accept: 'Accept Task',
    volunteer_matching_score: 'Matching Score',

    // Intake Modal
    intake_title: 'Tell us what is happening',
    intake_subtitle: 'Intelligent situation synthesis & safety triage',
    intake_describe: 'Describe the situation in your own words',
    intake_speak: 'Speak',
    intake_listening: 'Listening...',
    intake_placeholder: 'Example: My 74-year-old mother lives alone in Kanjirappally and ran out of blood pressure medicine. She feels dizzy and cannot walk to the pharmacy...',
    intake_sample_label: 'Or select a sample situation:',
    intake_location: 'Response Location',
    intake_analyzing: 'Synthesizing person context, medical signals, and evaluating safety rules...',
    intake_emergency_override: 'Deterministic Emergency Safety Override',
    intake_emergency_desc: 'Acute life-safety trigger detected. Standard volunteer matching is bypassed — this will immediately trigger the 108 Emergency Medical Protocol.',
    intake_safety_passed: 'Deterministic Safety Check Passed — Eligible for Coordinated Community Response',
    intake_person_vuln: 'Person & Vulnerability',
    intake_triage_risk: 'Triage & Risk Level',
    intake_identified_need: 'Identified Need',
    intake_launch: 'Launch Response Plan',

    // Care Case Detail
    detail_not_found: 'Care Case Not Found',
    detail_not_found_desc: 'The requested care case could not be located in local memory.',
    detail_view_all: 'View All Cases',
    detail_mission_control: 'Care Case Mission Control',
    detail_person_context: 'Person Context',
    detail_mobility: 'Mobility:',
    detail_language: 'Language:',
    detail_vulnerability: 'Vulnerability Index:',
    detail_family_alert: 'Family Alert:',
    detail_clinical_triage: 'Clinical Triage',
    detail_chronic: 'Chronic Conditions:',
    detail_medications: 'Medications:',
    detail_baseline_bp: 'Baseline BP:',
    detail_immediate_need: 'Immediate Need & Constraints',
    detail_response_plan: '4-Step Response Orchestration Plan',
    detail_estimated: 'Estimated Resolution',
    detail_find_volunteer: 'Find Volunteer',
    detail_matching: 'Matching...',
    detail_start_enroute: 'Start En Route',
    detail_mark_delivered: 'Mark Delivered',
    detail_assigned_responder: 'Assigned First Responder',
    detail_match_score: 'Match Score',
    detail_why_match: 'Why this match:',
    detail_followup_title: 'Post-Care Health & Satisfaction Verification',
    detail_followup_archived: 'Archived & Closed',
    detail_followup_instruction: 'Please complete the follow-up checklist to verify patient safety and conclude the care case:',
    detail_followup_symptoms: 'Patient reports dizziness/symptoms improved',
    detail_followup_meds: 'Correct prescription/aid physically received',
    detail_followup_comfort: 'Patient is in a safe and comfortable condition',
    detail_followup_notes_placeholder: 'Optional closing observation notes...',
    detail_followup_submit: 'Submit Verification & Archive Case',
    detail_followup_confirmed: '✓ Follow-Up Verification Confirmed',
    detail_followup_confirmed_desc: 'Symptoms resolved, medication delivery verified, audit log filed. Case successfully completed.',
    detail_audit_log: 'Unified Real-Time Audit Log',
    detail_events: 'events',
    detail_actor: 'Actor',
  },

  ml: {
    // Navigation
    nav_home: 'ഹോം',
    nav_consult: 'ചികിത്സ',
    nav_sos: 'അടിയന്തരം',
    nav_meds: 'മരുന്നുകൾ',
    nav_clinics: 'ക്ലിനിക്കുകൾ',
    nav_news: 'ആരോഗ്യ വാർത്തകൾ',
    nav_about: 'ആരോഗ്യഗ്രാമിനെക്കുറിച്ച്',
    nav_feedback: 'അഭിപ്രായം അറിയിക്കുക',
    nav_profile: 'പ്രൊഫൈൽ & ക്രമീകരണം',

    // Home Screen
    home_subtitle: 'ഗ്രാമീണ ആരോഗ്യ സുരക്ഷാ ശൃംഖല',
    home_intake_badge: 'ബുദ്ധിപരമായ സഹായം',
    home_intake_title: 'എന്താണ് നിങ്ങളുടെ പ്രശ്നം എന്ന് പറയൂ',
    home_intake_desc: 'സംസാരിക്കുകയോ ടൈപ്പ് ചെയ്യുകയോ ചെയ്യാം. നിങ്ങളുടെ അവസ്ഥ മനസ്സിലാക്കി കൃത്യമായ മെഡിക്കൽ-വളണ്ടിയർ സഹായം എത്തിക്കുന്നു.',
    home_intake_btn: 'ശബ്ദത്തിലൂടെയോ എഴുത്തിലൂടെയോ അറിയിക്കൂ',
    home_pillar_ai: 'ആസ്ക് ആരോഗ്യ',
    home_pillar_ai_desc: 'ലക്ഷണങ്ങൾ വിലയിരുത്തി ഡോക്ടർ നിർദ്ദേശം നേടൂ',
    home_pillar_timeline: 'ആരോഗ്യ ചരിത്രം',
    home_pillar_timeline_desc: 'മരുന്നുകളുടെയും പരിശോധനകളുടെയും സമയരേഖ',
    home_meds_title: 'മരുന്നുകൾ',
    home_clinics_title: 'സമീപത്തെ ആശുപത്രികൾ',
    home_health_tip_title: 'ആരോഗ്യ ജാഗ്രതാ നിർദ്ദേശം',
    home_health_tip_body: 'മഴക്കാലത്ത് തിളപ്പിച്ചാറിയ വെള്ളം മാത്രം കുടിക്കുക. കടുത്ത പനിയോ തളർച്ചയോ ഉണ്ടായാൽ ഉടൻ ആശാ വർക്കറെ അറിയിക്കുക.',
    home_pending: 'ബാക്കി',
    home_all_taken: 'ഇന്ന് എല്ലാം കഴിച്ചു!',
    home_next: 'അടുത്തത്',
    home_chc_phc: 'CHC & PHC',
    home_find_doctors: 'ഡോക്ടർമാരെയും ഫാർമസികളെയും കണ്ടെത്തുക',

    // Common buttons
    btn_back: 'തിരികെ',
    btn_cancel: 'റദ്ദാക്കുക',
    btn_save: 'സൂക്ഷിക്കുക',
    btn_accept: 'ദൗത്യം സ്വീകരിക്കുക',
    btn_submit: 'സമർപ്പിക്കുക',
    btn_call: 'വിളിക്കുക',
    btn_directions: 'വഴി കാട്ടുക',
    btn_remove: 'നീക്കം ചെയ്യുക',
    btn_keep: 'നിലനിർത്തുക',

    // Medications
    meds_title: 'മരുന്നുകൾ',
    meds_subtitle: 'ദൈനംദിന മരുന്ന് ക്രമവും ഡോസേജും',
    meds_add: 'മരുന്ന് ചേർക്കുക',
    meds_today_schedule: 'ഇന്നത്തെ ഷെഡ്യൂൾ',
    meds_completed: 'പൂർത്തിയാക്കി',
    meds_taken_of: 'ൽ',
    meds_ai_guidance: 'AI മരുന്ന് നിർദ്ദേശം',
    meds_ai_guidance_text: 'രക്തസമ്മർദ്ദ-പ്രമേഹ മരുന്നുകൾ കൃത്യ സമയത്ത് കഴിക്കുന്നത് പെട്ടെന്നുള്ള തലകറക്കം തടയും. ക്ഷീണം അനുഭവപ്പെട്ടാൽ പരിചാരകനുമായി ബന്ധപ്പെടുക.',
    meds_scheduled: 'ഷെഡ്യൂൾ ചെയ്ത മരുന്നുകൾ',
    meds_tap_to_mark: 'കഴിച്ചതായി അടയാളപ്പെടുത്തുക',
    meds_no_meds: 'മരുന്നുകൾ ക്രമീകരിച്ചിട്ടില്ല',
    meds_no_meds_hint: 'ഷെഡ്യൂൾ സജ്ജീകരിക്കാൻ "മരുന്ന് ചേർക്കുക" ടാപ്പ് ചെയ്യുക.',
    meds_add_title: 'മരുന്ന് ഷെഡ്യൂൾ ചേർക്കുക',
    meds_name_label: 'മരുന്നിന്റെ പേരും ശക്തിയും',
    meds_name_placeholder: 'ഉദാ: അംലോഡിപിൻ, മെറ്റ്ഫോർമിൻ, പാരസെറ്റമോൾ',
    meds_form_label: 'മരുന്ന് രൂപം',
    meds_form_tablet: 'ടാബ്ലെറ്റ്',
    meds_form_capsule: 'ക്യാപ്സൂൾ',
    meds_form_syrup: 'സിറപ്പ്',
    meds_form_drops: 'ഡ്രോപ്‌സ്',
    meds_form_inhaler: 'ഇൻഹേലർ',
    meds_form_injection: 'ഇഞ്ചക്ഷൻ',
    meds_quantity_label: 'ഡോസ് അളവ്',
    meds_strength_label: 'ശക്തി / യൂണിറ്റ്',
    meds_strength_placeholder: 'ഉദാ: 500mg, 5ml',
    meds_timing_label: 'കഴിക്കേണ്ട സമയം',
    meds_timing_after: 'ഭക്ഷണത്തിന് ശേഷം',
    meds_timing_before: 'ഭക്ഷണത്തിന് മുമ്പ്',
    meds_timing_with: 'ഭക്ഷണത്തോടൊപ്പം',
    meds_timing_bedtime: 'ഉറങ്ങുന്നതിന് മുമ്പ്',
    meds_schedule_time: 'ഷെഡ്യൂൾ സമയം',
    meds_time_morning: 'രാവിലെ',
    meds_time_afternoon: 'ഉച്ചയ്ക്ക്',
    meds_time_evening: 'വൈകുന്നേരം',
    meds_time_night: 'രാത്രി',
    meds_save_schedule: 'ഷെഡ്യൂൾ സേവ് ചെയ്യുക',
    meds_remove_title: 'മരുന്ന് നീക്കം ചെയ്യണോ?',
    meds_remove_confirm: 'നിങ്ങൾക്ക് ഉറപ്പാണോ',
    meds_remove_from_schedule: 'ദൈനംദിന ഷെഡ്യൂളിൽ നിന്ന് നീക്കം ചെയ്യണമെന്ന്?',

    // Facilities
    facilities_title: 'ആരോഗ്യ സ്ഥാപനങ്ങൾ',
    facilities_subtitle: 'സമീപത്തെ ആശുപത്രികൾ, PHC, ഫാർമസികൾ',
    facilities_all: 'എല്ലാ സ്ഥലങ്ങളും',
    facilities_hospitals: 'ആശുപത്രികൾ',
    facilities_clinics: 'ക്ലിനിക്കുകൾ & PHC',
    facilities_pharmacies: 'ഫാർമസികൾ',
    facilities_er_24: '24/7 അടിയന്തരം',
    facilities_search_placeholder: 'ആശുപത്രി, സ്പെഷ്യാലിറ്റി, അല്ലെങ്കിൽ സ്കീം (ഉദാ: KASP, ICU) തിരയുക...',
    facilities_ambulance: 'ആംബുലൻസ്',
    facilities_icu: 'ഐസിയു ബെഡ്ഡുകൾ',
    facilities_beds: 'ആകെ ബെഡ്ഡുകൾ',
    facilities_view_details: 'വിശദാംശങ്ങൾ',
    facilities_close_details: 'അടയ്ക്കുക',
    facilities_specialties: 'സ്പെഷ്യാലിറ്റികളും സേവനങ്ങളും',
    facilities_schemes: 'അംഗീകൃത ആരോഗ്യ പദ്ധതികൾ',
    facilities_duty_doctor: 'ഡ്യൂട്ടി ഡോക്ടർ ലഭ്യമാണ്',
    facilities_blood_bank: 'ബ്ലഡ് ബാങ്ക്',
    facilities_lab: 'ഡയഗ്നോസ്റ്റിക് ലാബ്',
    facilities_pharmacy: 'ഫാർമസി',
    facilities_hours: 'പ്രവർത്തന സമയം',
    facilities_no_results: 'സ്ഥാപനങ്ങൾ ഒന്നും കണ്ടെത്തിയില്ല',

    // Ask Aroggya
    ask_title: 'ആസ്ക് ആരോഗ്യ',
    ask_subtitle: 'സുരക്ഷിത ക്ലിനിക്കൽ ആരോഗ്യ വിലയിരുത്തൽ',
    ask_disclaimer: 'ആരോഗ്യഗ്രാം AI പ്രാഥമിക റിസ്ക് വർഗ്ഗീകരണവും ഗൃഹ മാർഗ്ഗനിർദ്ദേശവും മാത്രം നൽകുന്നു. രജിസ്‌റ്റേഡ് മെഡിക്കൽ ഓഫീസറുടെ ക്ലിനിക്കൽ രോഗനിർണ്ണയത്തെ ഇത് പകരം വയ്ക്കുന്നില്ല.',
    ask_placeholder: 'നിങ്ങളുടെ ലക്ഷണങ്ങൾ സ്വന്തം വാക്കുകളിൽ വിവരിക്കുക (ഉദാ: കഴിഞ്ഞ 2 മണിക്കൂറായി കടുത്ത തലകറക്കവും നെഞ്ചു വേദനയും)...',
    ask_analyzing: 'ലക്ഷണങ്ങൾ വിശകലനം ചെയ്യുന്നു...',
    ask_analyze_btn: 'ആരോഗ്യ പ്രശ്നം വിശകലനം ചെയ്യുക',
    ask_voice_unavailable: 'ഈ സന്ദർഭത്തിൽ ശബ്ദ തിരിച്ചറിയൽ ലഭ്യമല്ല. ദയവായി ടൈപ്പ് ചെയ്യുക.',
    ask_welcome: 'നമസ്കാരം! ഞാൻ ആരോഗ്യഗ്രാം AI ആണ്. നിങ്ങളുടെ ലക്ഷണങ്ങൾ വിവരിക്കുക, മരുന്നുകളെക്കുറിച്ച് ചോദിക്കുക, അല്ലെങ്കിൽ മലയാളത്തിലോ ഹിന്ദിയിലോ ഇംഗ്ലീഷിലോ സംസാരിക്കുക.',
    ask_error: 'ക്ലൗഡ് ട്രയേജ് സേവനങ്ങളിലേക്ക് കണക്റ്റ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ഇത് അടിയന്തരാവസ്ഥയാണെങ്കിൽ ഉടൻ SOS ബട്ടൺ ഉപയോഗിക്കുക.',
    ask_possible_condition: 'സാധ്യമായ അവസ്ഥ',
    ask_urgent_intervention: 'അടിയന്തര വൈദ്യ ഇടപെടൽ ആവശ്യമാണ്',
    ask_activate_sos: 'SOS സജീവമാക്കുക',
    ask_call_108: '108 വിളിക്കുക',
    ask_immediate_actions: 'ഉടൻ ചെയ്യേണ്ട കാര്യങ്ങൾ',
    ask_red_flags: 'അപകട ലക്ഷണങ്ങൾ:',

    // News
    news_title: 'സാമൂഹ്യ ആരോഗ്യ വാർത്തകൾ',
    news_subtitle: 'സർക്കാർ അറിയിപ്പുകളും ഗ്രാമീണ ആരോഗ്യ ബുള്ളറ്റിനുകളും',
    news_verified_bulletin: 'പരിശോധിച്ച ബുള്ളറ്റിൻ',
    news_bulletin_title: '24/7 ടെലിമെഡിസിൻ & ആശാ ഹെൽപ്‌ലൈൻ ഗ്രാമീണ ജില്ലകളിൽ',
    news_bulletin_desc: 'സംസ്ഥാന മാനസികാരോഗ്യ-വൈദ്യ കൗൺസലിംഗ് സേവനങ്ങൾക്ക് 1056 ഡയൽ ചെയ്യുക.',
    news_read_more: 'കൂടുതൽ വായിക്കുക →',

    // About
    about_title: 'ആരോഗ്യഗ്രാമിനെക്കുറിച്ച്',
    about_subtitle: 'ഗ്രാമീണ ആരോഗ്യ-സഹായ ദൗത്യം',
    about_mission: 'ദൗത്യവും ദർശനവും',
    about_mission_heading: 'അന്തസ്സുള്ള ഗ്രാമീണ ആരോഗ്യ സംരക്ഷണം',
    about_mission_desc: 'ബുദ്ധിപരമായ AI ട്രയേജ്, അടിയന്തര പ്രതികരണം, പരിശോധിച്ച സാമൂഹ്യ സന്നദ്ധ പ്രവർത്തനം എന്നിവ ഒന്നിച്ച് ഒരു ഗ്രാമീണ പൗരനും ഒറ്റയ്ക്ക് രോഗവുമായി നിൽക്കേണ്ടി വരില്ല.',
    about_guiding: 'ഞങ്ങളുടെ മാർഗ്ഗനിർദ്ദേശ ചട്ടക്കൂട്',
    about_ai_title: 'ബുദ്ധിപരമായ AI ലക്ഷണ മാർഗ്ഗനിർദ്ദേശം',
    about_ai_desc: 'Google Gemini 2.5 Flash ഉപയോഗിച്ച് മാതൃഭാഷയിൽ (മലയാളം, ഹിന്ദി, ഇംഗ്ലീഷ്) പ്രാഥമിക റിസ്ക് വർഗ്ഗീകരണം നൽകുന്നു.',
    about_emergency_title: 'നിർണ്ണായക അടിയന്തര സുരക്ഷ',
    about_emergency_desc: 'ഗുരുതരാവസ്ഥകൾ ഉടൻ അടിയന്തര SOS ചാനലുകൾ പ്രവർത്തനക്ഷമമാക്കുന്നു, സന്നദ്ധ സഹായം ആംബുലൻസിന് പകരമാവില്ല.',
    about_volunteer_title: 'പരിശോധിച്ച പ്രാദേശിക സന്നദ്ധ പ്രവർത്തനം',
    about_volunteer_desc: 'അയൽക്കാർ അയൽക്കാരെ മരുന്ന് ശേഖരണം, ക്ലിനിക് ഗതാഗതം, ക്ഷേമ പരിശോധന എന്നിവയിൽ സഹായിക്കുന്നു.',
    about_version: 'ആരോഗ്യഗ്രാം v3.0.0 (ഏകീകൃത പതിപ്പ്)',
    about_engineered: 'ഗ്രാമീണ കണക്റ്റിവിറ്റിക്കും ആൻഡ്രോയിഡ് ഉപകരണങ്ങൾക്കുമായി രൂപകൽപ്പന ചെയ്തത്',

    // Feedback
    feedback_title: 'സാമൂഹ്യ അഭിപ്രായം',
    feedback_subtitle: 'ഗ്രാമീണ കേരളത്തിനായുള്ള പരിചരണം മെച്ചപ്പെടുത്താൻ സഹായിക്കുക',
    feedback_thank_you: 'നന്ദി! നന്ദി.',
    feedback_recorded: 'നിങ്ങളുടെ വിലപ്പെട്ട അഭിപ്രായം രേഖപ്പെടുത്തിയിട്ടുണ്ട്. സാമൂഹ്യ പ്രതികരണ വർക്ക്ഫ്ലോകളും മെഡിക്കൽ ട്രയേജും മെച്ചപ്പെടുത്താൻ ഇത് നേരിട്ട് സഹായിക്കുന്നു.',
    feedback_return_home: 'ഹോമിലേക്ക് മടങ്ങുക',
    feedback_rating_label: 'ഇന്നത്തെ നിങ്ങളുടെ അനുഭവം എങ്ങനെയായിരുന്നു?',
    feedback_rating_5: 'മികച്ചത് & ജീവൻ രക്ഷിക്കുന്നത്',
    feedback_rating_4: 'വളരെ സഹായകരം',
    feedback_rating_3: 'തൃപ്തികരം',
    feedback_rating_low: 'മെച്ചപ്പെടുത്തേണ്ടതുണ്ട്',
    feedback_topic_label: 'അഭിപ്രായ വിഷയം',
    feedback_cat_general: 'പൊതു അനുഭവം',
    feedback_cat_ai: 'AI ട്രയേജ് ഗുണനിലവാരം',
    feedback_cat_meds: 'മരുന്ന് ഷെഡ്യൂൾ',
    feedback_cat_volunteer: 'സന്നദ്ധ പ്രവർത്തക ഡിസ്പാച്ച്',
    feedback_cat_language: 'ഭാഷ / വിവർത്തനം',
    feedback_cat_bug: 'ആപ്പ് ബഗ് / തകരാർ',
    feedback_comments_label: 'നിങ്ങളുടെ നിർദ്ദേശങ്ങൾ അല്ലെങ്കിൽ അഭിപ്രായങ്ങൾ',
    feedback_comments_placeholder: 'നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ടത് അല്ലെങ്കിൽ മുതിർന്നവർക്ക് എളുപ്പമാക്കാൻ കഴിയുന്നത് പറയുക...',
    feedback_submit: 'അഭിപ്രായം സമർപ്പിക്കുക',

    // Timeline
    timeline_title: 'ആരോഗ്യ & പരിചരണ സമയരേഖ',
    timeline_subtitle: 'ആരോഗ്യ സംഭവങ്ങളുടെയും സഹായത്തിന്റെയും കാലക്രമ രേഖ',

    // Profile
    profile_title: 'പ്രൊഫൈൽ & മുൻഗണനകൾ',
    profile_subtitle: 'വ്യക്തിഗത വിവരങ്ങൾ, ഡാർക്ക് മോഡ് & ഭാഷ',
    profile_active_role: 'സജീവ റോൾ',
    profile_name_placeholder: 'നിങ്ങളുടെ പൂർണ നാമം',
    profile_emergency_mobile: 'രജിസ്റ്റർ ചെയ്ത അടിയന്തര മൊബൈൽ',
    profile_save: 'പ്രൊഫൈൽ മാറ്റങ്ങൾ സേവ് ചെയ്യുക',
    profile_saved: 'മാറ്റങ്ങൾ സേവ് ചെയ്തു',
    profile_appearance: 'രൂപം & ഡാർക്ക് തീം',
    profile_dark_theme: 'ഡാർക്ക് തീം',
    profile_dark_desc: 'രാത്രിയിലും ഗ്രാമീണ ഫീൽഡ് സാഹചര്യങ്ങളിലും കണ്ണിന് സുഖകരമായ കോൺട്രാസ്റ്റ്',
    profile_select_language: 'ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക',
    profile_language_desc: 'വിവർത്തനങ്ങളും AI ആരോഗ്യ കൺസൾട്ടേഷനുകളും നിങ്ങളുടെ മാതൃഭാഷയിലേക്ക് സ്വയം മാറും.',
    profile_text_scaling: 'ടെക്സ്റ്റ് സ്കേലിംഗ്',
    profile_text_size: 'ടെക്സ്റ്റ് വലിപ്പം (മുതിർന്നവർക്ക് അനുയോജ്യം)',
    profile_size_normal: 'സാധാരണം',
    profile_size_large: 'വലുത് (115%)',
    profile_size_xlarge: 'വളരെ വലുത് (130%)',
    profile_high_contrast: 'ഹൈ കോൺട്രാസ്റ്റ് മോഡ്',
    profile_high_contrast_desc: 'കടുത്ത സൂര്യപ്രകാശത്തിൽ വായിക്കാനുള്ള കഴിവ്',

    // Care Cases
    cases_coordinated: 'ഏകോപിത പ്രവർത്തനം',
    cases_title: 'പരിചരണ ശൃംഖല കേസുകൾ',
    cases_new: 'പുതിയ കേസ്',
    cases_no_cases: 'ഫിൽട്ടറുമായി പൊരുത്തപ്പെടുന്ന കേസുകളില്ല',
    cases_no_cases_hint: 'ടാബുകൾ മാറ്റുക അല്ലെങ്കിൽ പുതിയ കേസ് സൃഷ്ടിക്കുക.',
    cases_mission_control: 'ദൗത്യ നിയന്ത്രണം',

    // Volunteer Dashboard
    volunteer_network: 'സന്നദ്ധ പ്രവർത്തക ശൃംഖല',
    volunteer_switch_citizen: 'പൗരനിലേക്ക് മാറുക',
    volunteer_verified: 'സാമൂഹ്യ പരിശോധിതം',
    volunteer_tasks_completed: 'ടാസ്‌ക്കുകൾ പൂർത്തിയാക്കി',
    volunteer_reminder: 'സാമൂഹ്യ സന്നദ്ധ ഓർമ്മപ്പെടുത്തൽ:',
    volunteer_reminder_text: 'വിശ്വസ്ത അയൽക്കാരനായി നിങ്ങൾ സഹായിക്കുകയാണ്. നിങ്ങൾ ഡോക്ടറല്ല. നിർദ്ദിഷ്ട ഡെലിവറി അല്ലെങ്കിൽ അനുഗമന സഹായം മാത്രം നൽകുക.',
    volunteer_nearby: 'സമീപത്ത്',
    volunteer_my_active: 'എന്റെ സജീവം',
    volunteer_done: 'പൂർത്തിയായി',
    volunteer_all_caught_up: 'എല്ലാം പൂർത്തിയായി!',
    volunteer_no_open: 'നിങ്ങളുടെ പ്രദേശത്ത് ഇപ്പോൾ ഓപ്പൺ അഭ്യർത്ഥനകളില്ല.',
    volunteer_active_mission: 'സജീവ ദൗത്യം',
    volunteer_navigate: 'മാപ്പിൽ നാവിഗേറ്റ് ചെയ്യുക',
    volunteer_mark_completed: 'പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക',
    volunteer_no_active: 'പുരോഗമിക്കുന്ന ടാസ്‌ക്കുകളില്ല',
    volunteer_no_active_hint: 'അയൽക്കാരനെ സഹായിക്കാൻ ഒരു അഭ്യർത്ഥന സ്വീകരിക്കുക.',
    volunteer_no_completed: 'പൂർത്തിയാക്കിയ ടാസ്‌ക്കുകൾ ഇല്ല.',
    volunteer_accept: 'ടാസ്‌ക് സ്വീകരിക്കുക',
    volunteer_matching_score: 'പൊരുത്ത സ്കോർ',

    // Intake Modal
    intake_title: 'എന്താണ് സംഭവിക്കുന്നതെന്ന് പറയൂ',
    intake_subtitle: 'ബുദ്ധിപരമായ സാഹചര്യ വിശകലനം & സുരക്ഷാ ട്രയേജ്',
    intake_describe: 'സാഹചര്യം നിങ്ങളുടെ സ്വന്തം വാക്കുകളിൽ വിവരിക്കുക',
    intake_speak: 'സംസാരിക്കുക',
    intake_listening: 'കേൾക്കുന്നു...',
    intake_placeholder: 'ഉദാഹരണം: എന്റെ 74 വയസ്സുള്ള അമ്മ കാഞ്ഞിരപ്പള്ളിയിൽ ഒറ്റയ്ക്ക് താമസിക്കുന്നു, രക്തസമ്മർദ്ദ മരുന്ന് തീർന്നു. അവർക്ക് തലകറക്കം ഉണ്ട്...',
    intake_sample_label: 'അല്ലെങ്കിൽ ഒരു സാമ്പിൾ സാഹചര്യം തിരഞ്ഞെടുക്കുക:',
    intake_location: 'പ്രതികരണ സ്ഥലം',
    intake_analyzing: 'വ്യക്തി സന്ദർഭം, മെഡിക്കൽ സിഗ്നലുകൾ, സുരക്ഷാ നിയമങ്ങൾ വിലയിരുത്തുന്നു...',
    intake_emergency_override: 'നിർണ്ണായക അടിയന്തര സുരക്ഷാ ഓവർറൈഡ്',
    intake_emergency_desc: 'ഗുരുതരമായ ജീവൻ-സുരക്ഷാ ട്രിഗ്ഗർ കണ്ടെത്തി. സ്റ്റാൻഡേർഡ് വളണ്ടിയർ മാച്ചിംഗ് ബൈപാസ് ചെയ്തു — 108 അടിയന്തര മെഡിക്കൽ പ്രോട്ടോക്കോൾ ഉടൻ പ്രവർത്തനക്ഷമമാകും.',
    intake_safety_passed: 'നിർണ്ണായക സുരക്ഷാ പരിശോധന വിജയിച്ചു — ഏകോപിത സാമൂഹ്യ പ്രതികരണത്തിന് യോഗ്യം',
    intake_person_vuln: 'വ്യക്തി & ദുർബലത',
    intake_triage_risk: 'ട്രയേജ് & റിസ്ക് ലെവൽ',
    intake_identified_need: 'തിരിച്ചറിഞ്ഞ ആവശ്യം',
    intake_launch: 'പ്രതികരണ പദ്ധതി ആരംഭിക്കുക',

    // Care Case Detail
    detail_not_found: 'പരിചരണ കേസ് കണ്ടെത്തിയില്ല',
    detail_not_found_desc: 'അഭ്യർത്ഥിച്ച പരിചരണ കേസ് ലോക്കൽ മെമ്മറിയിൽ കണ്ടെത്താൻ കഴിഞ്ഞില്ല.',
    detail_view_all: 'എല്ലാ കേസുകളും കാണുക',
    detail_mission_control: 'പരിചരണ കേസ് ദൗത്യ നിയന്ത്രണം',
    detail_person_context: 'വ്യക്തി സന്ദർഭം',
    detail_mobility: 'ചലനശേഷി:',
    detail_language: 'ഭാഷ:',
    detail_vulnerability: 'ദുർബലത സൂചിക:',
    detail_family_alert: 'കുടുംബ അറിയിപ്പ്:',
    detail_clinical_triage: 'ക്ലിനിക്കൽ ട്രയേജ്',
    detail_chronic: 'ദീർഘകാല അവസ്ഥകൾ:',
    detail_medications: 'മരുന്നുകൾ:',
    detail_baseline_bp: 'അടിസ്ഥാന BP:',
    detail_immediate_need: 'അടിയന്തര ആവശ്യം & നിയന്ത്രണങ്ങൾ',
    detail_response_plan: '4-ഘട്ട പ്രതികരണ ഓർക്കെസ്‌ട്രേഷൻ പദ്ധതി',
    detail_estimated: 'കണക്കാക്കിയ പരിഹാരം',
    detail_find_volunteer: 'സന്നദ്ധ പ്രവർത്തകനെ കണ്ടെത്തുക',
    detail_matching: 'പൊരുത്തം തിരയുന്നു...',
    detail_start_enroute: 'യാത്ര ആരംഭിക്കുക',
    detail_mark_delivered: 'ഡെലിവറി ചെയ്തതായി അടയാളപ്പെടുത്തുക',
    detail_assigned_responder: 'നിയോഗിച്ച ഫസ്റ്റ് റെസ്‌പോണ്ടർ',
    detail_match_score: 'പൊരുത്ത സ്‌കോർ',
    detail_why_match: 'ഈ പൊരുത്തം എന്തുകൊണ്ട്:',
    detail_followup_title: 'പരിചരണ ശേഷ ആരോഗ്യ & സംതൃപ്തി പരിശോധന',
    detail_followup_archived: 'ആർക്കൈവ് ചെയ്തു & അടച്ചു',
    detail_followup_instruction: 'രോഗി സുരക്ഷ പരിശോധിക്കുന്നതിനും കേസ് അവസാനിപ്പിക്കുന്നതിനും ഫോളോ-അപ്പ് ചെക്ക്‌ലിസ്റ്റ് പൂർത്തിയാക്കുക:',
    detail_followup_symptoms: 'രോഗി തലകറക്കം/ലക്ഷണങ്ങൾ മെച്ചപ്പെട്ടതായി റിപ്പോർട്ട് ചെയ്യുന്നു',
    detail_followup_meds: 'ശരിയായ മരുന്ന്/സഹായം ഫിസിക്കലി ലഭിച്ചു',
    detail_followup_comfort: 'രോഗി സുരക്ഷിതവും സുഖകരവുമായ അവസ്ഥയിലാണ്',
    detail_followup_notes_placeholder: 'ഓപ്ഷണൽ ക്ലോസിംഗ് നിരീക്ഷണ കുറിപ്പുകൾ...',
    detail_followup_submit: 'പരിശോധന സമർപ്പിക്കുക & കേസ് ആർക്കൈവ് ചെയ്യുക',
    detail_followup_confirmed: '✓ ഫോളോ-അപ്പ് പരിശോധന സ്ഥിരീകരിച്ചു',
    detail_followup_confirmed_desc: 'ലക്ഷണങ്ങൾ പരിഹരിച്ചു, മരുന്ന് ഡെലിവറി പരിശോധിച്ചു, ഓഡിറ്റ് ലോഗ് ഫയൽ ചെയ്തു. കേസ് വിജയകരമായി പൂർത്തിയാക്കി.',
    detail_audit_log: 'ഏകീകൃത തത്സമയ ഓഡിറ്റ് ലോഗ്',
    detail_events: 'ഇവന്റുകൾ',
    detail_actor: 'ആക്ടർ',
  },

  hi: {
    // Navigation
    nav_home: 'होम',
    nav_consult: 'परामर्श',
    nav_sos: 'आपातकाल',
    nav_meds: 'दवाइयां',
    nav_clinics: 'अस्पताल',
    nav_news: 'स्वास्थ्य समाचार',
    nav_about: 'आरोग्यग्राम के बारे में',
    nav_feedback: 'सुझाव व प्रतिक्रिया',
    nav_profile: 'प्रोफाइल और सेटिंग्स',

    // Home Screen
    home_subtitle: 'सामुदायिक ग्रामीण स्वास्थ्य सहायता नेटवर्क',
    home_intake_badge: 'स्मार्ट सहायता',
    home_intake_title: 'बताएं आपको क्या परेशानी है',
    home_intake_desc: 'बोलकर या लिखकर बताएं। आरोग्यग्राम आपकी जरूरत समझकर तुरंत स्वयंसेवक या चिकित्सीय मदद पहुंचाएगा।',
    home_intake_btn: 'बोलकर या लिखकर समस्या बताएं',
    home_pillar_ai: 'आस्क आरोग्य',
    home_pillar_ai_desc: 'लक्षणों की जांच और प्राथमिक स्वास्थ्य सलाह',
    home_pillar_timeline: 'स्वास्थ्य समयरेखा',
    home_pillar_timeline_desc: 'दवाइयों और जांचों का पूरा रिकॉर्ड',
    home_meds_title: 'दवाइयां',
    home_clinics_title: 'निकटतम अस्पताल व केंद्र',
    home_health_tip_title: 'सामुदायिक स्वास्थ्य सूचना',
    home_health_tip_body: 'मौसम में उबला हुआ पानी पिएं। बुखार 101°F से अधिक होने पर तुरंत आस्क आरोग्य या आशा कार्यकर्ता से संपर्क करें।',
    home_pending: 'बाकी',
    home_all_taken: 'आज सब ली गई!',
    home_next: 'अगली',
    home_chc_phc: 'CHC और PHC',
    home_find_doctors: 'डॉक्टर और फार्मेसी खोजें',

    // Common buttons
    btn_back: 'वापस',
    btn_cancel: 'रद्द करें',
    btn_save: 'सुरक्षित करें',
    btn_accept: 'कार्य स्वीकार करें',
    btn_submit: 'जमा करें',
    btn_call: 'कॉल करें',
    btn_directions: 'दिशा-निर्देश',
    btn_remove: 'हटाएं',
    btn_keep: 'रखें',

    // Medications
    meds_title: 'दवाइयां',
    meds_subtitle: 'दैनिक पालन और खुराक अनुसूची',
    meds_add: 'दवाई जोड़ें',
    meds_today_schedule: 'आज की अनुसूची',
    meds_completed: 'पूर्ण',
    meds_taken_of: 'में से',
    meds_ai_guidance: 'AI दवाई मार्गदर्शन',
    meds_ai_guidance_text: 'रक्तचाप और मधुमेह की दवाई सही समय पर लेने से अचानक चक्कर आने से बचाव होता है। यदि कमजोरी महसूस हो, तो अपने देखभालकर्ता से पुष्टि करें।',
    meds_scheduled: 'निर्धारित दवाइयां',
    meds_tap_to_mark: 'ली गई चिह्नित करने के लिए टैप करें',
    meds_no_meds: 'कोई दवाई कॉन्फ़िगर नहीं है',
    meds_no_meds_hint: 'अपनी अनुसूची सेट करने के लिए ऊपर "दवाई जोड़ें" टैप करें।',
    meds_add_title: 'निर्धारित दवाई जोड़ें',
    meds_name_label: 'दवाई का नाम और शक्ति',
    meds_name_placeholder: 'जैसे: एम्लोडिपिन, मेटफॉर्मिन, पैरासिटामोल',
    meds_form_label: 'दवाई का रूप',
    meds_form_tablet: 'गोली',
    meds_form_capsule: 'कैप्सूल',
    meds_form_syrup: 'सिरप',
    meds_form_drops: 'ड्रॉप्स',
    meds_form_inhaler: 'इनहेलर',
    meds_form_injection: 'इंजेक्शन',
    meds_quantity_label: 'खुराक मात्रा',
    meds_strength_label: 'शक्ति / इकाई',
    meds_strength_placeholder: 'जैसे: 500mg, 5ml',
    meds_timing_label: 'सेवन का समय',
    meds_timing_after: 'खाने के बाद',
    meds_timing_before: 'खाने से पहले',
    meds_timing_with: 'खाने के साथ',
    meds_timing_bedtime: 'सोने से पहले',
    meds_schedule_time: 'निर्धारित समय',
    meds_time_morning: 'सुबह',
    meds_time_afternoon: 'दोपहर',
    meds_time_evening: 'शाम',
    meds_time_night: 'रात',
    meds_save_schedule: 'अनुसूची सुरक्षित करें',
    meds_remove_title: 'दवाई हटाएं?',
    meds_remove_confirm: 'क्या आप वाकई हटाना चाहते हैं',
    meds_remove_from_schedule: 'को अपनी दैनिक खुराक अनुसूची से?',

    // Facilities
    facilities_title: 'स्वास्थ्य सुविधाएं',
    facilities_subtitle: 'पास के अस्पताल, PHC और फार्मेसी',
    facilities_all: 'सभी स्थान',
    facilities_hospitals: 'अस्पताल',
    facilities_clinics: 'क्लीनिक और PHC',
    facilities_pharmacies: 'फार्मेसी',
    facilities_er_24: '24/7 आपातकालीन',
    facilities_search_placeholder: 'अस्पताल, विशेषज्ञता, या योजना (उदा. KASP, ICU) खोजें...',
    facilities_ambulance: 'एम्बुलेंस',
    facilities_icu: 'आईसीयू बेड',
    facilities_beds: 'कुल बेड',
    facilities_view_details: 'विवरण देखें',
    facilities_close_details: 'बंद करें',
    facilities_specialties: 'विशेषज्ञताएं और सेवाएं',
    facilities_schemes: 'स्वीकृत स्वास्थ्य योजनाएं',
    facilities_duty_doctor: 'ड्यूटी डॉक्टर उपलब्ध',
    facilities_blood_bank: 'ब्लड बैंक',
    facilities_lab: 'डायग्नोस्टिक लैब',
    facilities_pharmacy: 'फार्मेसी',
    facilities_hours: 'कार्य के घंटे',
    facilities_no_results: 'कोई सुविधा नहीं मिली',

    // Ask Aroggya
    ask_title: 'आस्क आरोग्य',
    ask_subtitle: 'सुरक्षित क्लिनिकल प्रारंभिक स्वास्थ्य मूल्यांकन',
    ask_disclaimer: 'आरोग्यग्राम AI केवल प्रारंभिक जोखिम वर्गीकरण और घरेलू मार्गदर्शन प्रदान करता है। यह पंजीकृत चिकित्सा अधिकारी के क्लिनिकल निदान का विकल्प नहीं है।',
    ask_placeholder: 'अपने लक्षणों का वर्णन अपने शब्दों में करें (जैसे: पिछले 2 घंटे से गंभीर चक्कर और सीने में तकलीफ)...',
    ask_analyzing: 'लक्षणों का विश्लेषण हो रहा है...',
    ask_analyze_btn: 'स्वास्थ्य समस्या का विश्लेषण करें',
    ask_voice_unavailable: 'इस संदर्भ में वॉइस पहचान उपलब्ध नहीं है। कृपया टाइप करें।',
    ask_welcome: 'नमस्कार! मैं आरोग्यग्राम AI हूं। आप अपने लक्षणों का वर्णन कर सकते हैं, दवाइयों के बारे में पूछ सकते हैं, या मलयालम, हिंदी या अंग्रेजी में बात कर सकते हैं।',
    ask_error: 'क्लाउड ट्राइएज सेवाओं से कनेक्ट नहीं हो सका। यदि यह आपातकालीन है, तो कृपया तुरंत SOS बटन का उपयोग करें।',
    ask_possible_condition: 'संभावित स्थिति',
    ask_urgent_intervention: 'तुरंत चिकित्सा हस्तक्षेप आवश्यक',
    ask_activate_sos: 'SOS सक्रिय करें',
    ask_call_108: '108 कॉल करें',
    ask_immediate_actions: 'तुरंत करने योग्य कदम',
    ask_red_flags: 'खतरे के लक्षण:',

    // News
    news_title: 'सामुदायिक स्वास्थ्य समाचार',
    news_subtitle: 'सरकारी सलाह और ग्रामीण स्वास्थ्य बुलेटिन',
    news_verified_bulletin: 'सत्यापित बुलेटिन',
    news_bulletin_title: 'ग्रामीण जिलों में 24/7 टेलीमेडिसिन और आशा हेल्पलाइन सक्रिय',
    news_bulletin_desc: 'राज्य मानसिक स्वास्थ्य और चिकित्सा परामर्श सेवाओं के लिए कभी भी 1056 डायल करें।',
    news_read_more: 'और पढ़ें →',

    // About
    about_title: 'आरोग्यग्राम के बारे में',
    about_subtitle: 'सामुदायिक ग्रामीण स्वास्थ्य और सहायता मिशन',
    about_mission: 'मिशन और दृष्टिकोण',
    about_mission_heading: 'गरिमापूर्ण ग्रामीण स्वास्थ्य और पड़ोस सहायता',
    about_mission_desc: 'आरोग्यग्राम बुद्धिमान AI क्लिनिकल ट्राइएज, फेलसेफ आपातकालीन प्रतिक्रिया और सत्यापित सामुदायिक स्वयंसेवी सेवा को एकजुट करता है ताकि कोई भी ग्रामीण नागरिक अकेले बीमारी का सामना न करे।',
    about_guiding: 'हमारी मार्गदर्शक वास्तुकला',
    about_ai_title: 'बुद्धिमान AI लक्षण मार्गदर्शन',
    about_ai_desc: 'Google Gemini 2.5 Flash द्वारा संचालित, मूल भाषाओं (मलयालम, हिंदी, अंग्रेजी) में प्रारंभिक जोखिम वर्गीकरण प्रदान करता है।',
    about_emergency_title: 'निर्धारित आपातकालीन सुरक्षा',
    about_emergency_desc: 'गंभीर स्थितियां तुरंत आपातकालीन SOS चैनल सक्रिय करती हैं, स्वयंसेवक सहायता कभी भी एम्बुलेंस का विकल्प नहीं बनती।',
    about_volunteer_title: 'सत्यापित स्थानीय स्वयंसेवा',
    about_volunteer_desc: 'पड़ोसी पड़ोसियों को नुस्खे लेने, क्लिनिक परिवहन और कल्याण जांच में सहायता करते हैं।',
    about_version: 'आरोग्यग्राम v3.0.0 (एकीकृत संस्करण)',
    about_engineered: 'ग्रामीण कनेक्टिविटी और एंड्रॉइड उपकरणों के लिए इंजीनियर किया गया',

    // Feedback
    feedback_title: 'सामुदायिक प्रतिक्रिया',
    feedback_subtitle: 'ग्रामीण केरल के लिए देखभाल को बेहतर बनाने में मदद करें',
    feedback_thank_you: 'धन्यवाद! शुक्रिया.',
    feedback_recorded: 'आपकी बहुमूल्य प्रतिक्रिया दर्ज कर ली गई है। यह सीधे हमारे सामुदायिक प्रतिक्रिया कार्यप्रवाह और स्थानीय चिकित्सा ट्राइएज को आकार देती है।',
    feedback_return_home: 'होम हब पर लौटें',
    feedback_rating_label: 'आज आपका अनुभव कैसा रहा?',
    feedback_rating_5: 'उत्कृष्ट और जीवन रक्षक',
    feedback_rating_4: 'बहुत मददगार',
    feedback_rating_3: 'संतोषजनक',
    feedback_rating_low: 'सुधार की आवश्यकता',
    feedback_topic_label: 'प्रतिक्रिया विषय',
    feedback_cat_general: 'सामान्य अनुभव',
    feedback_cat_ai: 'AI ट्राइएज गुणवत्ता',
    feedback_cat_meds: 'दवाई अनुसूची',
    feedback_cat_volunteer: 'स्वयंसेवक डिस्पैच',
    feedback_cat_language: 'भाषा / अनुवाद',
    feedback_cat_bug: 'ऐप बग / गड़बड़ी',
    feedback_comments_label: 'आपके सुझाव या टिप्पणियां',
    feedback_comments_placeholder: 'बताएं क्या अच्छा लगा, या बुजुर्गों के लिए क्या आसान बनाया जा सकता है...',
    feedback_submit: 'प्रतिक्रिया जमा करें',

    // Timeline
    timeline_title: 'स्वास्थ्य और देखभाल समयरेखा',
    timeline_subtitle: 'स्वास्थ्य घटनाओं और सहायता का कालानुक्रमिक रिकॉर्ड',

    // Profile
    profile_title: 'प्रोफाइल और प्राथमिकताएं',
    profile_subtitle: 'व्यक्तिगत पहचान, डार्क मोड और भाषा',
    profile_active_role: 'सक्रिय भूमिका',
    profile_name_placeholder: 'आपका पूरा नाम',
    profile_emergency_mobile: 'पंजीकृत आपातकालीन मोबाइल',
    profile_save: 'प्रोफाइल परिवर्तन सुरक्षित करें',
    profile_saved: 'परिवर्तन सुरक्षित हो गए',
    profile_appearance: 'रूप और डार्क थीम',
    profile_dark_theme: 'डार्क थीम',
    profile_dark_desc: 'रात्रि और ग्रामीण क्षेत्र की परिस्थितियों के लिए आंखों के अनुकूल कॉन्ट्रास्ट',
    profile_select_language: 'पसंदीदा भाषा चुनें',
    profile_language_desc: 'अनुवाद और AI स्वास्थ्य परामर्श स्वचालित रूप से आपकी मातृभाषा में बदल जाते हैं।',
    profile_text_scaling: 'टेक्स्ट स्केलिंग',
    profile_text_size: 'टेक्स्ट आकार (बुजुर्ग अनुकूल)',
    profile_size_normal: 'सामान्य',
    profile_size_large: 'बड़ा (115%)',
    profile_size_xlarge: 'बहुत बड़ा (130%)',
    profile_high_contrast: 'उच्च कॉन्ट्रास्ट मोड',
    profile_high_contrast_desc: 'तेज धूप में पढ़ने की क्षमता',

    // Care Cases
    cases_coordinated: 'समन्वित कार्रवाई',
    cases_title: 'देखभाल नेटवर्क केस',
    cases_new: 'नया केस',
    cases_no_cases: 'फ़िल्टर से मेल खाते कोई केस नहीं मिले',
    cases_no_cases_hint: 'टैब बदलें या नया केस बनाएं।',
    cases_mission_control: 'मिशन कंट्रोल',

    // Volunteer Dashboard
    volunteer_network: 'स्वयंसेवक नेटवर्क',
    volunteer_switch_citizen: 'नागरिक पर स्विच करें',
    volunteer_verified: 'सामुदायिक सत्यापित',
    volunteer_tasks_completed: 'कार्य पूर्ण',
    volunteer_reminder: 'सामुदायिक स्वयंसेवक अनुस्मारक:',
    volunteer_reminder_text: 'आप एक विश्वसनीय पड़ोसी के रूप में सहायता कर रहे हैं। आप प्रमाणित डॉक्टर नहीं हैं। केवल निर्दिष्ट डिलीवरी या साथ देने की सहायता प्रदान करें।',
    volunteer_nearby: 'पास में',
    volunteer_my_active: 'मेरे सक्रिय',
    volunteer_done: 'पूर्ण',
    volunteer_all_caught_up: 'सब अपडेट है!',
    volunteer_no_open: 'आपके क्षेत्र में अभी कोई खुले अनुरोध नहीं हैं।',
    volunteer_active_mission: 'सक्रिय मिशन',
    volunteer_navigate: 'मानचित्र पर नेविगेट करें',
    volunteer_mark_completed: 'पूर्ण चिह्नित करें',
    volunteer_no_active: 'प्रगति में कोई सक्रिय कार्य नहीं',
    volunteer_no_active_hint: 'पड़ोसी की मदद के लिए पास का अनुरोध स्वीकार करें।',
    volunteer_no_completed: 'अभी तक कोई पूर्ण कार्य नहीं।',
    volunteer_accept: 'कार्य स्वीकार करें',
    volunteer_matching_score: 'मिलान स्कोर',

    // Intake Modal
    intake_title: 'बताएं क्या हो रहा है',
    intake_subtitle: 'बुद्धिमान स्थिति विश्लेषण और सुरक्षा ट्राइएज',
    intake_describe: 'स्थिति का वर्णन अपने शब्दों में करें',
    intake_speak: 'बोलें',
    intake_listening: 'सुन रहे हैं...',
    intake_placeholder: 'उदाहरण: मेरी 74 वर्षीय माँ कांजीरप्पल्ली में अकेली रहती हैं और रक्तचाप की दवाई खत्म हो गई है। उन्हें चक्कर आ रहे हैं...',
    intake_sample_label: 'या एक नमूना स्थिति चुनें:',
    intake_location: 'प्रतिक्रिया स्थान',
    intake_analyzing: 'व्यक्ति संदर्भ, चिकित्सा संकेत, और सुरक्षा नियमों का मूल्यांकन हो रहा है...',
    intake_emergency_override: 'निर्धारित आपातकालीन सुरक्षा ओवरराइड',
    intake_emergency_desc: 'गंभीर जीवन-सुरक्षा ट्रिगर पाया गया। स्टैंडर्ड स्वयंसेवक मिलान को बाईपास किया गया — 108 आपातकालीन चिकित्सा प्रोटोकॉल तुरंत सक्रिय होगा।',
    intake_safety_passed: 'निर्धारित सुरक्षा जांच पास — समन्वित सामुदायिक प्रतिक्रिया के लिए योग्य',
    intake_person_vuln: 'व्यक्ति और भेद्यता',
    intake_triage_risk: 'ट्राइएज और जोखिम स्तर',
    intake_identified_need: 'पहचानी गई आवश्यकता',
    intake_launch: 'प्रतिक्रिया योजना शुरू करें',

    // Care Case Detail
    detail_not_found: 'देखभाल केस नहीं मिला',
    detail_not_found_desc: 'अनुरोधित देखभाल केस स्थानीय मेमोरी में नहीं मिला।',
    detail_view_all: 'सभी केस देखें',
    detail_mission_control: 'देखभाल केस मिशन कंट्रोल',
    detail_person_context: 'व्यक्ति संदर्भ',
    detail_mobility: 'गतिशीलता:',
    detail_language: 'भाषा:',
    detail_vulnerability: 'भेद्यता सूचकांक:',
    detail_family_alert: 'परिवार अलर्ट:',
    detail_clinical_triage: 'क्लिनिकल ट्राइएज',
    detail_chronic: 'दीर्घकालिक स्थितियां:',
    detail_medications: 'दवाइयां:',
    detail_baseline_bp: 'आधारभूत BP:',
    detail_immediate_need: 'तत्काल आवश्यकता और बाधाएं',
    detail_response_plan: '4-चरण प्रतिक्रिया योजना',
    detail_estimated: 'अनुमानित समाधान',
    detail_find_volunteer: 'स्वयंसेवक खोजें',
    detail_matching: 'मिलान हो रहा है...',
    detail_start_enroute: 'रास्ते में शुरू करें',
    detail_mark_delivered: 'डिलीवर किया गया चिह्नित करें',
    detail_assigned_responder: 'नियुक्त प्रथम प्रतिसादकर्ता',
    detail_match_score: 'मिलान स्कोर',
    detail_why_match: 'यह मिलान क्यों:',
    detail_followup_title: 'देखभाल पश्चात स्वास्थ्य और संतुष्टि सत्यापन',
    detail_followup_archived: 'संग्रहित और बंद',
    detail_followup_instruction: 'रोगी सुरक्षा सत्यापित करने और केस समाप्त करने के लिए फॉलो-अप चेकलिस्ट पूरी करें:',
    detail_followup_symptoms: 'रोगी चक्कर/लक्षणों में सुधार की रिपोर्ट करता है',
    detail_followup_meds: 'सही नुस्खा/सहायता भौतिक रूप से प्राप्त हुई',
    detail_followup_comfort: 'रोगी सुरक्षित और आरामदायक स्थिति में है',
    detail_followup_notes_placeholder: 'वैकल्पिक समापन अवलोकन टिप्पणियां...',
    detail_followup_submit: 'सत्यापन जमा करें और केस संग्रहित करें',
    detail_followup_confirmed: '✓ फॉलो-अप सत्यापन की पुष्टि हुई',
    detail_followup_confirmed_desc: 'लक्षण हल हुए, दवाई डिलीवरी सत्यापित, ऑडिट लॉग दर्ज। केस सफलतापूर्वक पूर्ण हुआ।',
    detail_audit_log: 'एकीकृत रियल-टाइम ऑडिट लॉग',
    detail_events: 'इवेंट',
    detail_actor: 'एक्टर',
  }
};

export function getTranslation(lang?: string): Translations {
  if (lang === 'ml') return TRANSLATIONS.ml;
  if (lang === 'hi') return TRANSLATIONS.hi;
  return TRANSLATIONS.en;
}
