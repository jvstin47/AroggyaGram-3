import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Newspaper, Calendar, ShieldCheck, HeartPulse, ExternalLink } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  authority: string;
  readTime: string;
  imageUrl: string;
}

const HEALTH_NEWS: NewsItem[] = [
  {
    id: 'n-1',
    title: 'Monsoon Dengue & Viral Fever Alert: Free PHC Diagnostic Camps in Kottayam & Idukki',
    category: 'Public Health Alert',
    summary: 'The Kerala Health Department has deployed mobile fever clinics across rural panchayats. Free NS1 antigen tests and platelet monitoring available at all primary health centers.',
    date: 'September 14, 2026',
    authority: 'Directorate of Health Services (DHS)',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n-2',
    title: 'Jan Aushadhi Scheme: 40+ Essential Cardiovascular Medicines Now at 80% Subsidy',
    category: 'Medication Access',
    summary: 'Senior citizens registered under Karunya Arogya Suraksha Padhathi (KASP) can now obtain monthly refills of Amlodipine, Telmisartan, and Atorvastatin directly via verified community volunteers.',
    date: 'September 12, 2026',
    authority: 'Ministry of Health & Family Welfare',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n-3',
    title: 'Boiled Water Advisory Issued for Low-Lying Riverine Panchayats',
    category: 'Sanitation & Prevention',
    summary: 'Health inspectors recommend chlorination and boiling drinking water for at least 10 minutes to prevent waterborne diarrheal illness following seasonal water table shifts.',
    date: 'September 10, 2026',
    authority: 'Community Health Mission',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n-4',
    title: 'Community Mental Health & Elderly Companionship Circles Launched',
    category: 'Mental Wellbeing',
    summary: 'Trained ASHA health volunteers begin weekly home visits to monitor vital signs and provide companionship for elderly residents living independently.',
    date: 'September 8, 2026',
    authority: 'Kerala State Mental Health Authority',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'
  }
];

export const NewsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-36 px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">Community Health News</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Government advisories & rural health bulletins</p>
        </div>
      </div>

      {/* Featured Bulletin Card */}
      <div className="bg-gradient-to-br from-[#E68A00] to-[#C66900] text-white p-5 rounded-3xl shadow-lg shadow-amber-600/20 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
          Verified Bulletin
        </span>
        <h2 className="text-lg font-black leading-snug">
          24/7 Telemedicine & ASHA Helpline Active across Rural Districts
        </h2>
        <p className="text-xs text-amber-100 font-medium leading-relaxed">
          Dial 1056 for state mental health and medical counseling services anytime without toll charges.
        </p>
      </div>

      {/* News Articles List */}
      <div className="space-y-4">
        {HEALTH_NEWS.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-[#14211F] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden hover:border-[#005448] dark:hover:border-emerald-600 transition-colors"
          >
            <div className="relative h-44 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 text-[11px] font-bold text-[#005448] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
                <span>{item.readTime}</span>
              </div>

              <h3 className="text-base font-black text-stone-900 dark:text-white leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700 dark:text-stone-300 truncate max-w-[70%]">
                  {item.authority}
                </span>
                <span className="text-[#005448] dark:text-emerald-400 font-bold">Read More →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
