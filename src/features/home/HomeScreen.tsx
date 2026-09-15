import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Bot, Pill, Clock, ArrowRight,
  ShieldCheck, Heart, User, MapPin, Activity, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';
import { ResponseOrchestrator } from '@/services/orchestration/orchestrator.service';
import { CareCaseIntakeModal } from '@/features/care-cases/CareCaseIntakeModal';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { medications } = useMedicationsQuery(user?.id || 'citizen-user');

  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [initialIntakeQuery, setInitialIntakeQuery] = useState('');

  const pendingMeds = medications.filter((m) => !m.taken);
  const allCases = ResponseOrchestrator.getCareCases();
  const activeCases = allCases.filter(c => ['ACTION_REQUIRED', 'MATCHING', 'ASSIGNED', 'IN_PROGRESS', 'FOLLOW_UP'].includes(c.status));

  const handleOpenIntakeWithPrompt = (prompt: string) => {
    setInitialIntakeQuery(prompt);
    setIsIntakeOpen(true);
  };

  return (
    <div className="pb-36 px-4 pt-3 max-w-lg mx-auto space-y-5 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Quick Greeting */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E7A5B] dark:text-emerald-400">
            Community Health-Response Network
          </span>
          <h2 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">
            Namaskaram, {profile?.full_name?.split(' ')[0] || user?.fullName?.split(' ')[0] || 'Citizen'}
          </h2>
        </div>
      </div>

      {/* SIGNATURE PRIMARY ACTION: "TELL US WHAT IS HAPPENING" */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0A433A] dark:from-[#093830] dark:to-[#04241F] text-white p-5 rounded-3xl shadow-xl shadow-[#005448]/25 space-y-4 border border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-emerald-100 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              Intelligent Intake
            </span>
          </div>
          <h3 className="text-xl font-black tracking-tight leading-snug">
            Tell us what is happening
          </h3>
          <p className="text-xs text-emerald-100/90 font-normal leading-relaxed">
            Speak or type naturally. AroggyaGram turns human situations into coordinated real-world clinical and volunteer action.
          </p>
        </div>

        {/* Big Touch CTA Button */}
        <button
          type="button"
          onClick={() => {
            setInitialIntakeQuery('');
            setIsIntakeOpen(true);
          }}
          className="w-full bg-white hover:bg-emerald-50 text-[#005448] font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Describe Need via Voice or Text</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Fast Shortcut Chips */}
        <div className="space-y-1.5 pt-1 border-t border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
            Quick Scenarios:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Missed morning insulin and blood pressure pills. Need pharmacy delivery from local store.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
            >
              💊 Urgent Medication Refill
            </button>
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Need wheelchair-accessible vehicle for clinic visit to Community Health Centre tomorrow.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
            >
              🚗 Clinic Wheelchair Transport
            </button>
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Elderly resident had a dizzy spell and fell down. Conscious but unable to stand unassisted.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors cursor-pointer"
            >
              ⚠️ Fall / Welfare Check
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE CARE NETWORK CASES ("MISSION CONTROL") */}
      {activeCases.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#005448] dark:text-emerald-400" />
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Active Care Network Cases ({activeCases.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigate('/care-cases')}
              className="text-[11px] font-bold text-[#005448] dark:text-emerald-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              View All
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {activeCases.slice(0, 2).map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`/care-cases/${c.id}`)}
                className="bg-white dark:bg-[#14211F] border-2 border-emerald-600/30 dark:border-emerald-700/40 p-4 rounded-2xl shadow-sm hover:border-[#005448] dark:hover:border-emerald-500 transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                        {c.trackingNumber}
                      </span>
                      <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                        {c.personContext.fullName} {c.personContext.age ? `(${c.personContext.age}y)` : ''}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-stone-900 dark:text-white mt-0.5">
                      {c.immediateNeed.title}
                    </h4>
                  </div>

                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      c.status === 'IN_PROGRESS'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300'
                        : c.status === 'ACTION_REQUIRED'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300'
                        : 'bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-300'
                    }`}
                  >
                    {c.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100 dark:border-stone-800 text-stone-500 dark:text-stone-400">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {c.address.split(',')[0]}
                  </span>
                  
                  {c.assignedVolunteer ? (
                    <span className="font-bold text-[#005448] dark:text-emerald-400 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {c.assignedVolunteer.fullName} ({c.assignedVolunteer.distanceKm}km)
                    </span>
                  ) : (
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      Awaiting Responder Match
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECONDARY PILLARS */}
      <div className="grid grid-cols-2 gap-3">
        {/* PILLAR 1: ASK AROGGYA */}
        <button
          type="button"
          onClick={() => navigate('/ask-aroggya')}
          className="bg-white dark:bg-[#14211F] hover:bg-stone-50 dark:hover:bg-stone-800/80 border border-stone-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm text-left transition-all space-y-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#005448] dark:text-emerald-400 flex items-center justify-center">
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wide">
              Ask Aroggya
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium leading-snug mt-0.5">
              Multilingual clinical triage & health guidance
            </p>
          </div>
        </button>

        {/* PILLAR 2: COMMUNITY TIMELINE */}
        <button
          type="button"
          onClick={() => navigate('/timeline')}
          className="bg-white dark:bg-[#14211F] hover:bg-stone-50 dark:hover:bg-stone-800/80 border border-stone-200 dark:border-stone-800 p-4 rounded-2xl shadow-sm text-left transition-all space-y-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-wide">
              Health Timeline
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium leading-snug mt-0.5">
              Chronological log of events & prescriptions
            </p>
          </div>
        </button>
      </div>

      {/* QUICK STATUS SNAPSHOTS (MEDICATIONS & CARE CASES) */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigate('/medications')}
          className="bg-white dark:bg-[#14211F] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm cursor-pointer hover:border-[#005448] dark:hover:border-emerald-600 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[#005448] dark:text-emerald-400 mb-1">
            <Pill className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Medications</span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-white">
            {pendingMeds.length} <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">pending</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
            {pendingMeds[0] ? `Next: ${pendingMeds[0].name}` : 'All taken today!'}
          </p>
        </div>

        <div
          onClick={() => navigate('/care-cases')}
          className="bg-white dark:bg-[#14211F] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm cursor-pointer hover:border-[#E68A00] dark:hover:border-amber-600 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[#E68A00] dark:text-amber-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Care Cases</span>
          </div>
          <div className="text-xl font-black text-stone-900 dark:text-white">
            {allCases.length} <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">registered</span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
            {activeCases.length} active in community
          </p>
        </div>
      </div>

      {/* Rural Wellness Tip */}
      <div className="bg-[#FAF9F4] dark:bg-[#13201E] border border-[#E8E6DF] dark:border-stone-800 p-3.5 rounded-2xl flex items-start gap-2.5">
        <Heart className="w-4 h-4 text-[#2E7A5B] dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-[11px] font-bold text-[#005448] dark:text-emerald-400 uppercase tracking-wide">Community Health Note</p>
          <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
            Drink clean boiled water regularly during the humid season. If fever develops above 101°F, use Ask Aroggya or alert your local ASHA worker.
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
