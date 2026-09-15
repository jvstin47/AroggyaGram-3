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
  home_quick_scenarios: string;
  home_scenario_meds: string;
  home_scenario_transport: string;
  home_scenario_fall: string;
  home_pillar_ai: string;
  home_pillar_ai_desc: string;
  home_pillar_timeline: string;
  home_pillar_timeline_desc: string;
  home_meds_title: string;
  home_clinics_title: string;
  home_health_tip_title: string;
  home_health_tip_body: string;

  // Common buttons & actions
  btn_back: string;
  btn_cancel: string;
  btn_save: string;
  btn_accept: string;
  btn_submit: string;
  btn_call: string;
  btn_directions: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    nav_home: 'Home',
    nav_consult: 'Consult',
    nav_sos: 'Emergency',
    nav_meds: 'Meds',
    nav_clinics: 'Clinics',
    nav_news: 'Community News',
    nav_about: 'About AroggyaGram',
    nav_feedback: 'Community Feedback',
    nav_profile: 'Profile & Settings',

    home_subtitle: 'Community Health-Response Network',
    home_intake_badge: 'Intelligent Intake',
    home_intake_title: 'Tell us what is happening',
    home_intake_desc: 'Speak or type naturally. AroggyaGram turns human situations into coordinated clinical and volunteer action.',
    home_intake_btn: 'Describe Need via Voice or Text',
    home_quick_scenarios: 'Quick Scenarios:',
    home_scenario_meds: '💊 Urgent Medication Refill',
    home_scenario_transport: '🚗 Clinic Wheelchair Transport',
    home_scenario_fall: '⚠️ Fall / Welfare Check',
    home_pillar_ai: 'Ask Aroggya',
    home_pillar_ai_desc: 'Multilingual clinical triage & health guidance',
    home_pillar_timeline: 'Health Timeline',
    home_pillar_timeline_desc: 'Chronological log of events & prescriptions',
    home_meds_title: 'Medications',
    home_clinics_title: 'Nearby Clinics',
    home_health_tip_title: 'Community Health Note',
    home_health_tip_body: 'Drink clean boiled water regularly during humid seasons. If fever develops above 101°F, consult Ask Aroggya or alert your ASHA worker.',

    btn_back: 'Back',
    btn_cancel: 'Cancel',
    btn_save: 'Save',
    btn_accept: 'Accept Task',
    btn_submit: 'Submit',
    btn_call: 'Call Center',
    btn_directions: 'Directions'
  },
  ml: {
    nav_home: 'ഹോം',
    nav_consult: 'ചികിത്സ',
    nav_sos: 'അടിയന്തരം',
    nav_meds: 'മരുന്നുകൾ',
    nav_clinics: 'ക്ലിനിക്കുകൾ',
    nav_news: 'ആരോഗ്യ വാർത്തകൾ',
    nav_about: 'ആരോഗ്യഗ്രാമിനെക്കുറിച്ച്',
    nav_feedback: 'അഭിപ്രായം അറിയിക്കുക',
    nav_profile: 'പ്രൊഫൈൽ & ക്രമീകരണം',

    home_subtitle: 'ഗ്രാമീണ ആരോഗ്യ സുരക്ഷാ ശൃംഖല',
    home_intake_badge: 'ബുദ്ധിപരമായ സഹായം',
    home_intake_title: 'എന്താണ് നിങ്ങളുടെ പ്രശ്നം എന്ന് പറയൂ',
    home_intake_desc: 'സംസാരിക്കുകയോ ടൈപ്പ് ചെയ്യുകയോ ചെയ്യാം. നിങ്ങളുടെ അവസ്ഥ മനസ്സിലാക്കി കൃത്യമായ മെഡിക്കൽ-വളണ്ടിയർ സഹായം എത്തിക്കുന്നു.',
    home_intake_btn: 'ശബ്ദത്തിലൂടെയോ എഴുത്തിലൂടെയോ അറിയിക്കൂ',
    home_quick_scenarios: 'പ്രധാന സഹായങ്ങൾ:',
    home_scenario_meds: '💊 അത്യാവശ്യ മരുന്ന് എത്തിക്കൽ',
    home_scenario_transport: '🚗 ആശുപത്രി യാത്രയ്ക്ക് വാഹനം',
    home_scenario_fall: '⚠️ വീഴ്ച / ക്ഷേമാന്വേഷണം',
    home_pillar_ai: 'ആസ്ക് ആരോഗ്യ',
    home_pillar_ai_desc: 'ലക്ഷണങ്ങൾ വിലയിരുത്തി ഡോക്ടർ നിർദ്ദേശം നേടൂ',
    home_pillar_timeline: 'ആരോഗ്യ ചരിത്രം',
    home_pillar_timeline_desc: 'മരുന്നുകളുടെയും പരിശോധനകളുടെയും സമയരേഖ',
    home_meds_title: 'മരുന്നുകൾ',
    home_clinics_title: 'സമീപത്തെ ആശുപത്രികൾ',
    home_health_tip_title: 'ആരോഗ്യ ജാഗ്രതാ നിർദ്ദേശം',
    home_health_tip_body: 'മഴക്കാലത്ത് തിളപ്പിച്ചാറിയ വെള്ളം മാത്രം കുടിക്കുക. കടുത്ത പനിയോ തളർച്ചയോ ഉണ്ടായാൽ ഉടൻ ആശാ വർക്കറെ അറിയിക്കുക.',

    btn_back: 'തിരികെ',
    btn_cancel: 'റദ്ദാക്കുക',
    btn_save: 'സൂക്ഷിക്കുക',
    btn_accept: 'ദൗത്യം സ്വീകരിക്കുക',
    btn_submit: 'സമർപ്പിക്കുക',
    btn_call: 'വിളിക്കുക',
    btn_directions: 'വഴി കാട്ടുക'
  },
  hi: {
    nav_home: 'होम',
    nav_consult: 'परामर्श',
    nav_sos: 'आपातकाल',
    nav_meds: 'दवाइयां',
    nav_clinics: 'अस्पताल',
    nav_news: 'स्वास्थ्य समाचार',
    nav_about: 'आरोग्यग्राम के बारे में',
    nav_feedback: 'सुझाव व प्रतिक्रिया',
    nav_profile: 'प्रोफाइल और सेटिंग्स',

    home_subtitle: 'सामुदायिक ग्रामीण स्वास्थ्य सहायता नेटवर्क',
    home_intake_badge: 'स्मार्ट सहायता',
    home_intake_title: 'बताएं आपको क्या परेशानी है',
    home_intake_desc: 'बोलकर या लिखकर बताएं। आरोग्यग्राम आपकी जरूरत समझकर तुरंत स्वयंसेवक या चिकित्सीय मदद पहुंचाएगा।',
    home_intake_btn: 'बोलकर या लिखकर समस्या बताएं',
    home_quick_scenarios: 'त्वरित विकल्प:',
    home_scenario_meds: '💊 तुरंत दवाइयां मंगाना',
    home_scenario_transport: '🚗 अस्पताल जाने के लिए वाहन',
    home_scenario_fall: '⚠️ चक्कर आना / बुजुर्गों की जांच',
    home_pillar_ai: 'आस्क आरोग्य',
    home_pillar_ai_desc: 'लक्षणों की जांच और प्राथमिक स्वास्थ्य सलाह',
    home_pillar_timeline: 'स्वास्थ्य समयरेखा',
    home_pillar_timeline_desc: 'दवाइयों और जांचों का पूरा रिकॉर्ड',
    home_meds_title: 'दवाइयां',
    home_clinics_title: 'निकटतम अस्पताल व केंद्र',
    home_health_tip_title: 'सामुदायिक स्वास्थ्य सूचना',
    home_health_tip_body: 'मौसम में उबला हुआ पानी पिएं। बुखार 101°F से अधिक होने पर तुरंत आस्क आरोग्य या आशा कार्यकर्ता से संपर्क करें।',

    btn_back: 'वापस',
    btn_cancel: 'रद्द करें',
    btn_save: 'सुरक्षित करें',
    btn_accept: 'कार्य स्वीकार करें',
    btn_submit: 'जमा करें',
    btn_call: 'कॉल करें',
    btn_directions: 'दिशा-निर्देश'
  }
};

export function getTranslation(lang?: string): Translations {
  if (lang === 'ml') return TRANSLATIONS.ml;
  if (lang === 'hi') return TRANSLATIONS.hi;
  return TRANSLATIONS.en;
}
