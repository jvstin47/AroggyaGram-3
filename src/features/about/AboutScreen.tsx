import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Heart, Users, Bot, AlertOctagon } from 'lucide-react';

export const AboutScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-36 px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#121E1C] tracking-tight">About AroggyaGram</h1>
          <p className="text-xs text-stone-500 font-medium">Community Rural Health & Assistance Mission</p>
        </div>
      </div>

      {/* Hero Mission Card */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0D6B5D] text-white p-6 rounded-3xl shadow-xl shadow-[#005448]/20 space-y-3">
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
          Mission & Vision
        </span>
        <h2 className="text-2xl font-black leading-tight">
          Dignified Rural Health & Neighborhood Support
        </h2>
        <p className="text-xs text-emerald-100 leading-relaxed font-medium">
          AroggyaGram unites intelligent AI clinical triage, failsafe emergency response, and verified community volunteerism to ensure no rural citizen faces illness or isolation alone.
        </p>
      </div>

      {/* Core Principles */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">
          Our Guiding Architecture
        </h3>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-[#005448] font-bold text-sm">
            <Bot className="w-5 h-5" />
            <span>Intelligent AI Symptom Guidance</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Powered by Google Gemini 2.5 Flash, providing preliminary risk classifications in native languages (Malayalam, Hindi, Tamil, Bengali, English) without replacing registered medical practitioners.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-[#D62828] font-bold text-sm">
            <AlertOctagon className="w-5 h-5" />
            <span>Deterministic Emergency Safety</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Critical conditions and keywords (such as falls, chest pains, and trauma) immediately trigger emergency SOS channels, strictly preventing volunteer assistance from ever substituting an ambulance.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-[#2E7A5B] font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>Verified Local Volunteerism</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Neighbors assist neighbors with prescription pickups, clinic transport, and welfare checks while strictly shielding sensitive private clinical records.
          </p>
        </div>
      </div>

      {/* Version & Build info */}
      <div className="text-center pt-4 text-xs text-stone-400 space-y-1">
        <p className="font-bold text-stone-600">AroggyaGram v3.0.0 (Unified Release)</p>
        <p>Engineered for rural connectivity & native Android devices</p>
      </div>
    </div>
  );
};
