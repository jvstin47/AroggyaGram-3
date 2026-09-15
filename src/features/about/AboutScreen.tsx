import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Bot, AlertOctagon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/i18n/translations';

export const AboutScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const t = getTranslation(profile?.language);

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
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">{t.about_title}</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.about_subtitle}</p>
        </div>
      </div>

      {/* Hero Mission Card */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0D6B5D] text-white p-6 rounded-3xl shadow-xl shadow-[#005448]/20 space-y-3">
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
          {t.about_mission}
        </span>
        <h2 className="text-2xl font-black leading-tight">
          {t.about_mission_heading}
        </h2>
        <p className="text-xs text-emerald-100 leading-relaxed font-medium">
          {t.about_mission_desc}
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 px-1">
          {t.about_guiding}
        </h3>

        <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-[#005448] dark:text-emerald-400 font-bold text-sm">
            <Bot className="w-5 h-5" />
            <span>{t.about_ai_title}</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.about_ai_desc}
          </p>
        </div>

        <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-[#D62828] dark:text-red-400 font-bold text-sm">
            <AlertOctagon className="w-5 h-5" />
            <span>{t.about_emergency_title}</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.about_emergency_desc}
          </p>
        </div>

        <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-[#2E7A5B] dark:text-emerald-400 font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>{t.about_volunteer_title}</span>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.about_volunteer_desc}
          </p>
        </div>
      </div>

      {/* Version & Build info */}
      <div className="text-center pt-4 text-xs text-stone-400 space-y-1">
        <p className="font-bold text-stone-600 dark:text-stone-300">{t.about_version}</p>
        <p>{t.about_engineered}</p>
      </div>
    </div>
  );
};
