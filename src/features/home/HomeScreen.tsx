import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Bot, HelpingHand, AlertOctagon, Pill, Clock, ArrowRight,
  ShieldCheck, Heart, User, MapPin, Sliders, Activity, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';
import { ResponseOrchestrator } from '@/services/orchestration/orchestrator.service';
import { CareCaseIntakeModal } from '@/features/care-cases/CareCaseIntakeModal';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { medications } = useMedicationsQuery(user?.id || 'dev-patient-1');

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
    <div className="pb-36 px-4 pt-3 max-w-lg mx-auto space-y-5">
      
      {/* Quick Greeting */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E7A5B]">
            Community Health-Response Network
          </span>
          <h2 className="text-2xl font-black text-[#121E1C] tracking-tight">
            Namaskaram, {profile?.full_name?.split(' ')[0] || 'Friend'}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/simulator')}
          className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          title="Response Simulator"
        >
          <Sliders className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      {/* SIGNATURE PRIMARY ACTION: "TELL US WHAT IS HAPPENING" */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0A433A] text-white p-5 rounded-3xl shadow-xl shadow-[#005448]/25 space-y-4 border border-white/10">
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
          className="w-full bg-white hover:bg-emerald-50 text-[#005448] font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 group"
        >
          <span>Describe Need via Voice or Text</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Fast Shortcut Chips */}
        <div className="space-y-1.5 pt-1 border-t border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
            Quick Examples:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Lakshmi Amma (74) ran out of insulin and BP tablets and needs urgent pharmacy delivery from Neethi store.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors"
            >
              💊 Insulin Refill
            </button>
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Mr. Joseph needs wheelchair transport to Ponkunnam PHC for wound dressing check tomorrow morning.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors"
            >
              🚗 Clinic Wheelchair Transport
            </button>
            <button
              type="button"
              onClick={() => handleOpenIntakeWithPrompt('Elderly resident had a dizzy spell and fell down inside house. Conscious but unable to stand.')}
              className="bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl transition-colors"
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
              <Activity className="w-4 h-4 text-[#005448]" />
              <h3 className="text-xs font-black uppercase tracking-wider text-stone-800">
                Active Care Network Cases ({activeCases.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => navigate('/care-cases')}
              className="text-[11px] font-bold text-[#005448] hover:underline flex items-center gap-0.5"
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
                className="bg-white border-2 border-emerald-600/30 p-4 rounded-2xl shadow-sm hover:border-[#005448] transition-all cursor-pointer space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                        {c.trackingNumber}
                      </span>
                      <span className="text-xs font-bold text-stone-700">
                        {c.personContext.fullName} {c.personContext.age ? `(${c.personContext.age}y)` : ''}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-stone-900 mt-0.5">
                      {c.immediateNeed.title}
                    </h4>
                  </div>

                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      c.status === 'IN_PROGRESS'
                        ? 'bg-emerald-100 text-[#005448]'
                        : c.status === 'ACTION_REQUIRED'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-teal-100 text-teal-900'
                    }`}
                  >
                    {c.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-100 text-stone-500">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {c.address.split(',')[0]}
                  </span>
                  
                  {c.assignedVolunteer ? (
                    <span className="font-bold text-[#005448] flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {c.assignedVolunteer.fullName} ({c.assignedVolunteer.distanceKm}km)
                    </span>
                  ) : (
                    <span className="font-bold text-amber-700">
                      Awaiting Responder Match
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* THREE SECONDARY PILLARS */}
      <div className="grid grid-cols-2 gap-3">
        {/* PILLAR 1: ASK AROGGYA */}
        <button
          type="button"
          onClick={() => navigate('/ask-aroggya')}
          className="bg-white hover:bg-stone-50 border border-stone-200 p-4 rounded-2xl shadow-sm text-left transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#005448] flex items-center justify-center">
            <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wide">
              Ask Aroggya
            </h4>
            <p className="text-[11px] text-stone-500 font-medium leading-snug mt-0.5">
              Multilingual clinical triage & health guidance
            </p>
          </div>
        </button>

        {/* PILLAR 2: RESPONSE SIMULATOR */}
        <button
          type="button"
          onClick={() => navigate('/simulator')}
          className="bg-white hover:bg-stone-50 border border-stone-200 p-4 rounded-2xl shadow-sm text-left transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Sliders className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wide">
              Network Simulator
            </h4>
            <p className="text-[11px] text-stone-500 font-medium leading-snug mt-0.5">
              Simulate volunteer loads & response speed
            </p>
          </div>
        </button>
      </div>

      {/* QUICK STATUS SNAPSHOTS (MEDICATIONS & TASKS) */}
      <div className="grid grid-cols-2 gap-3">
        <div
          onClick={() => navigate('/medications')}
          className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm cursor-pointer hover:border-[#005448] transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[#005448] mb-1">
            <Pill className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Medications</span>
          </div>
          <div className="text-xl font-black text-stone-900">
            {pendingMeds.length} <span className="text-xs font-semibold text-stone-500">pending</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5 truncate">
            {pendingMeds[0] ? `Next: ${pendingMeds[0].name}` : 'All taken today!'}
          </p>
        </div>

        <div
          onClick={() => navigate('/care-cases')}
          className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm cursor-pointer hover:border-[#E68A00] transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[#E68A00] mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Care Cases</span>
          </div>
          <div className="text-xl font-black text-stone-900">
            {allCases.length} <span className="text-xs font-semibold text-stone-500">registered</span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5 truncate">
            {activeCases.length} active in community
          </p>
        </div>
      </div>

      {/* Rural Wellness Tip */}
      <div className="bg-[#FAF9F4] border border-[#E8E6DF] p-3.5 rounded-2xl flex items-start gap-2.5">
        <Heart className="w-4 h-4 text-[#2E7A5B] shrink-0 mt-0.5" />
        <div>
          <p className="text-[11px] font-bold text-[#005448] uppercase tracking-wide">Community Health Note</p>
          <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
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
