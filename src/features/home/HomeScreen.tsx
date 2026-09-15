import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Bot, Pill, Clock, ArrowRight,
  ShieldCheck, Heart, User, MapPin, Activity, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';
import { CareCaseIntakeModal } from '@/features/care-cases/CareCaseIntakeModal';
import { getTranslation } from '@/i18n/translations';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { medications } = useMedicationsQuery(user?.id || 'citizen-user');
  const t = getTranslation(profile?.language);

  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [initialIntakeQuery, setInitialIntakeQuery] = useState('');

  const pendingMeds = medications.filter((m) => !m.taken);

  const handleOpenIntakeWithPrompt = (prompt: string) => {
    setInitialIntakeQuery(prompt);
    setIsIntakeOpen(true);
  };

  return (
    <div className="pb-36 px-4 pt-3 max-w-lg mx-auto space-y-4 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Quick Greeting */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E7A5B] dark:text-emerald-400">
            {t.home_subtitle}
          </span>
          <h2 className="text-xl font-black text-[#121E1C] dark:text-white tracking-tight">
            Namaskaram, {profile?.full_name?.split(' ')[0] || user?.fullName?.split(' ')[0] || 'Citizen'}
          </h2>
        </div>
      </div>

      {/* SIGNATURE PRIMARY ACTION: "TELL US WHAT IS HAPPENING" */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0A433A] dark:from-[#093830] dark:to-[#04241F] text-white p-4 rounded-3xl shadow-lg shadow-[#005448]/20 space-y-3 border border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-emerald-100 text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              {t.home_intake_badge}
            </span>
          </div>
          <h3 className="text-lg font-black tracking-tight leading-snug">
            {t.home_intake_title}
          </h3>
          <p className="text-xs text-emerald-100/90 font-normal leading-relaxed">
            {t.home_intake_desc}
          </p>
        </div>

        {/* Touch CTA Button */}
        <button
          type="button"
          onClick={() => {
            setInitialIntakeQuery('');
            setIsIntakeOpen(true);
          }}
          className="w-full bg-white hover:bg-emerald-50 text-[#005448] font-black text-xs uppercase tracking-wider py-3 px-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
        >
          <span>{t.home_intake_btn}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Compact Scenario Chips - Horizontal Scroll */}
        <div className="space-y-1 pt-1 border-t border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
            {t.home_quick_scenarios}
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Missed morning insulin and blood pressure pills. Need pharmacy delivery from local store.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.home_scenario_meds}
            </button>
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Need wheelchair-accessible vehicle for clinic visit to Community Health Centre tomorrow.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.home_scenario_transport}
            </button>
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Elderly resident had a dizzy spell and fell down. Conscious but unable to stand unassisted.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.home_scenario_fall}
            </button>
          </div>
        </div>
      </div>

      {/* SECONDARY PILLARS */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* PILLAR 1: ASK AROGGYA */}
        <button
          type="button"
          onClick={() => navigate('/ask-aroggya')}
          className="bg-white dark:bg-[#14211F] hover:bg-stone-50 dark:hover:bg-stone-800/80 border border-stone-200 dark:border-stone-800 p-3.5 rounded-2xl shadow-xs text-left transition-all space-y-1.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#005448] dark:text-emerald-400 flex items-center justify-center">
            <Bot className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wide">
              {t.home_pillar_ai}
            </h4>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium leading-tight mt-0.5 line-clamp-2">
              {t.home_pillar_ai_desc}
            </p>
          </div>
        </button>

        {/* PILLAR 2: COMMUNITY TIMELINE */}
        <button
          type="button"
          onClick={() => navigate('/timeline')}
          className="bg-white dark:bg-[#14211F] hover:bg-stone-50 dark:hover:bg-stone-800/80 border border-stone-200 dark:border-stone-800 p-3.5 rounded-2xl shadow-xs text-left transition-all space-y-1.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wide">
              {t.home_pillar_timeline}
            </h4>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 font-medium leading-tight mt-0.5 line-clamp-2">
              {t.home_pillar_timeline_desc}
            </p>
          </div>
        </button>
      </div>

      {/* QUICK STATUS SNAPSHOTS (MEDICATIONS & CLINICS) */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigate('/medications')}
          className="bg-white dark:bg-[#14211F] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm cursor-pointer hover:border-[#005448] dark:hover:border-emerald-600 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[#005448] dark:text-emerald-400 mb-1">
            <Pill className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.home_meds_title}</span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-white">
            {pendingMeds.length} <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">pending</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
            {pendingMeds[0] ? `Next: ${pendingMeds[0].name}` : 'All taken today!'}
          </p>
        </div>

        <div
          onClick={() => navigate('/facilities')}
          className="bg-white dark:bg-[#14211F] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm cursor-pointer hover:border-blue-600 dark:hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">{t.home_clinics_title}</span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-white">
            CHCs & PHCs
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
            Find doctors & pharmacies
          </p>
        </div>
      </div>

      {/* Rural Wellness Tip */}
      <div className="bg-[#FAF9F4] dark:bg-[#13201E] border border-[#E8E6DF] dark:border-stone-800 p-3.5 rounded-2xl flex items-start gap-2.5">
        <Heart className="w-4 h-4 text-[#2E7A5B] dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-[11px] font-bold text-[#005448] dark:text-emerald-400 uppercase tracking-wide">{t.home_health_tip_title}</p>
          <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
            {t.home_health_tip_body}
          </p>
        </div>
      </div>

      {/* Intake Modal */}
      <CareCaseIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        initialQuery={initialIntakeQuery}
      />
    </div>
  );
};
