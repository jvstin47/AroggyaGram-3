import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, HelpingHand, AlertOctagon, Pill, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';
import { useRequestsQuery } from '@/hooks/useRequestsQuery';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signInDev } = useAuth();
  const { medications } = useMedicationsQuery(user?.id || 'dev-patient-1');
  const { requests } = useRequestsQuery();

  const activeRequests = requests.filter(
    (r) => r.requester_id === user?.id && ['submitted', 'matching', 'accepted', 'in_progress'].includes(r.status)
  );

  const pendingMeds = medications.filter((m) => !m.taken);

  return (
    <div className="pb-36 px-4 pt-4 max-w-lg mx-auto space-y-6">
      {/* Quick Greeting */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[#2E7A5B]">
          Welcome Back
        </span>
        <h2 className="text-2xl font-black text-[#121E1C] tracking-tight">
          How can Aroggya help you today?
        </h2>
      </div>

      {/* THREE PRIMARY BIG-TOUCH PILLARS */}
      <div className="space-y-3.5">
        {/* PILLAR 1: ASK AROGGYA (AI Health Assistant) */}
        <button
          type="button"
          onClick={() => navigate('/ask-aroggya')}
          className="w-full text-left bg-gradient-to-br from-[#005448] to-[#0D6B5D] text-white p-6 rounded-3xl shadow-lg shadow-[#005448]/20 transition-all hover:scale-[1.01] active:scale-[0.98] border border-white/10 flex items-center justify-between"
        >
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                AI Health Consultation
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">ASK AROGGYA</h2>
            <p className="text-sm text-emerald-100 font-medium leading-snug">
              Describe symptoms via voice or text in Malayalam, English, or Hindi.
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <Bot className="w-8 h-8" />
          </div>
        </button>

        {/* PILLAR 2: GET HELP (Request Human Assistance) */}
        <button
          type="button"
          onClick={() => navigate('/requests/new')}
          className="w-full text-left bg-gradient-to-br from-[#C66900] to-[#E68A00] text-white p-6 rounded-3xl shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.01] active:scale-[0.98] border border-white/10 flex items-center justify-between"
        >
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                Community Network
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">GET HELP</h2>
            <p className="text-sm text-amber-100 font-medium leading-snug">
              Request medicine delivery, clinic transport, or daily assistance.
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <HelpingHand className="w-8 h-8" />
          </div>
        </button>

        {/* PILLAR 3: EMERGENCY SOS */}
        <button
          type="button"
          onClick={() => {
            const sosBtn = document.querySelector('button[aria-label*="Emergency SOS"]') as HTMLButtonElement;
            if (sosBtn) sosBtn.click();
          }}
          className="w-full text-left bg-gradient-to-br from-[#D62828] to-[#AA1B1B] text-white p-6 rounded-3xl shadow-lg shadow-red-600/25 transition-all hover:scale-[1.01] active:scale-[0.98] border-2 border-white/30 flex items-center justify-between"
        >
          <div className="space-y-1 max-w-[75%]">
            <div className="flex items-center gap-2">
              <span className="bg-white/25 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full animate-pulse">
                Instant Rescue
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">EMERGENCY SOS</h2>
            <p className="text-sm text-red-100 font-medium leading-snug">
              1-Tap GPS location dispatch to family caregivers and emergency ambulance.
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <AlertOctagon className="w-8 h-8 animate-bounce" />
          </div>
        </button>
      </div>

      {/* QUICK STATUS SNAPSHOTS */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {/* Medication reminder card */}
        <div
          onClick={() => navigate('/medications')}
          className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm cursor-pointer hover:border-[#005448] transition-colors"
        >
          <div className="flex items-center gap-2 text-[#005448] mb-1.5">
            <Pill className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Medications</span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {pendingMeds.length} <span className="text-xs font-semibold text-stone-500">pending</span>
          </div>
          <p className="text-xs text-stone-500 mt-1 truncate">
            {pendingMeds[0] ? `Next: ${pendingMeds[0].name}` : 'All taken today!'}
          </p>
        </div>

        {/* Active Requests Card */}
        <div
          onClick={() => navigate('/timeline')}
          className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm cursor-pointer hover:border-[#E68A00] transition-colors"
        >
          <div className="flex items-center gap-2 text-[#E68A00] mb-1.5">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Active Tasks</span>
          </div>
          <div className="text-2xl font-black text-stone-900">
            {activeRequests.length} <span className="text-xs font-semibold text-stone-500">ongoing</span>
          </div>
          <p className="text-xs text-stone-500 mt-1 truncate">
            {activeRequests[0] ? activeRequests[0].title : 'No active requests'}
          </p>
        </div>
      </div>

      {/* Rural Wellness Tip */}
      <div className="bg-[#FAF9F4] border border-[#E8E6DF] p-4 rounded-2xl flex items-start gap-3">
        <Heart className="w-5 h-5 text-[#2E7A5B] shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-[#005448] uppercase tracking-wide">Community Health Note</p>
          <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
            Drink clean boiled water regularly during the humid season. If fever develops above 101°F, use Ask Aroggya or alert your local ASHA worker.
          </p>
        </div>
      </div>
    </div>
  );
};
