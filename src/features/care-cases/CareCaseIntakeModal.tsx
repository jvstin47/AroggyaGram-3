import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X, Mic, MicOff, Sparkles, ShieldCheck, AlertTriangle, ArrowRight,
  User, Activity, MapPin, CheckCircle2, HeartPulse, Clock
} from 'lucide-react';
import { SituationEngine, type ExtractedSituation } from '@/services/ai/situationEngine';
import { ResponseOrchestrator } from '@/services/orchestration/orchestrator.service';
import { useAuth } from '@/contexts/AuthContext';

interface CareCaseIntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const CareCaseIntakeModal: React.FC<CareCaseIntakeModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [inputStory, setInputStory] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedSituation | null>(null);
  const [activeAddress, setActiveAddress] = useState('Kanjirappally, Kottayam District');

  useEffect(() => {
    if (initialQuery) {
      setInputStory(initialQuery);
      handleAnalyze(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const quickScenarios = [
    {
      label: 'Insulin Refill',
      text: 'My neighbor Lakshmi Amma (74) lives alone on River Road. She missed her morning insulin and BP tablets and needs urgent pharmacy delivery from Neethi store.'
    },
    {
      label: 'Clinic Wheelchair Ride',
      text: 'Mr. Joseph (69) is recovering from hip surgery in Ponkunnam and needs wheelchair-friendly transport to the Community Health Centre tomorrow morning.'
    },
    {
      label: 'Fall / Dizziness',
      text: 'Aunt Saraswathi (81) had a dizzy spell and fell down inside her room. She is conscious but cannot stand up on her own. Lives alone.'
    },
    {
      label: 'Isolated Senior Check',
      text: 'Welfare check needed for 80-year-old retired teacher residing near St. Thomas church who has not opened front door today.'
    }
  ];

  const handleAnalyze = async (text: string) => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await SituationEngine.analyzeSituation(text, {
        name: profile?.full_name || 'Resident in Need',
        phone: profile?.phone || '+91 98470 12345',
        language: profile?.language || 'en'
      });
      setExtracted(result);
    } catch (err) {
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSpeechToggle = () => {
    const SpeechRec = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRec) {
      alert('Speech recognition is not supported in this browser. Please type your situation.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = profile?.language === 'ml' ? 'ml-IN' : profile?.language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const newStory = inputStory ? `${inputStory} ${transcript}` : transcript;
        setInputStory(newStory);
        handleAnalyze(newStory);
      };
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSubmitCareCase = () => {
    if (!extracted) return;

    const newCase = ResponseOrchestrator.createCareCase(
      extracted,
      {
        id: user?.id || 'dev-requester-1',
        name: extracted.personContext.fullName || profile?.full_name || 'Requester',
        phone: profile?.phone || '+91 98470 12345'
      },
      {
        address: activeAddress,
        latitude: 9.5560,
        longitude: 76.7870
      }
    );

    onClose();
    navigate(`/care-cases/${newCase.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-stone-100">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 bg-[#005448] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Tell us what is happening</h3>
              <p className="text-xs text-emerald-100">Intelligent situation synthesis & safety triage</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* Natural Story Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Describe the situation in your own words
              </label>
              <button
                type="button"
                onClick={handleSpeechToggle}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-emerald-50 text-[#005448] hover:bg-emerald-100'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                {isListening ? 'Listening...' : 'Speak'}
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={inputStory}
                onChange={(e) => {
                  setInputStory(e.target.value);
                  if (e.target.value.length > 20) {
                    handleAnalyze(e.target.value);
                  }
                }}
                placeholder="Example: My 74-year-old mother lives alone in Kanjirappally and ran out of blood pressure medicine. She feels dizzy and cannot walk to the pharmacy..."
                className="w-full text-stone-900 bg-stone-50 border border-stone-200 rounded-2xl p-3.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#005448] focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
              Or select a sample situation:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickScenarios.map((scen, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputStory(scen.text);
                    handleAnalyze(scen.text);
                  }}
                  className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-xl font-medium transition-colors border border-stone-200"
                >
                  {scen.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location context */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#005448] shrink-0" />
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">
                Response Location
              </label>
              <input
                type="text"
                value={activeAddress}
                onChange={(e) => setActiveAddress(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-stone-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Live Analysis Feedback */}
          {isAnalyzing && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 animate-pulse">
              <Sparkles className="w-5 h-5 text-[#005448] animate-spin" />
              <p className="text-xs font-semibold text-[#005448]">
                Synthesizing person context, medical signals, and evaluating safety rules...
              </p>
            </div>
          )}

          {extracted && !isAnalyzing && (
            <div className="space-y-3.5 pt-2 border-t border-stone-100">
              
              {/* Emergency Guardrail Warning if acute */}
              {extracted.isEmergencyOverride ? (
                <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-500 text-red-900 space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 animate-bounce" />
                    <h4 className="text-sm font-black uppercase tracking-wide text-red-700">
                      Deterministic Emergency Safety Override
                    </h4>
                  </div>
                  <p className="text-xs font-medium text-red-800 leading-relaxed">
                    Acute life-safety trigger detected. Standard volunteer matching is bypassed — this will immediately trigger the 108 Emergency Medical Protocol.
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-[#005448]">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs font-bold">
                    Deterministic Safety Check Passed — Eligible for Coordinated Community Response
                  </p>
                </div>
              )}

              {/* Extracted Blueprint Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Person Identified */}
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500 font-bold uppercase text-[10px]">
                    <User className="w-3.5 h-3.5 text-[#005448]" />
                    Person & Vulnerability
                  </div>
                  <p className="font-bold text-stone-900 truncate">
                    {extracted.personContext.fullName} {extracted.personContext.age ? `(${extracted.personContext.age})` : ''}
                  </p>
                  <p className="text-stone-500 text-[11px] capitalize">
                    {extracted.personContext.livingSituation.replace(/_/g, ' ')} • Score: {extracted.personContext.vulnerabilityScore}/100
                  </p>
                </div>

                {/* Clinical Risk Meter */}
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-500 font-bold uppercase text-[10px]">
                    <Activity className="w-3.5 h-3.5 text-amber-600" />
                    Triage & Risk Level
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        extracted.healthContext.riskLevel === 'CRITICAL'
                          ? 'bg-red-600 text-white'
                          : extracted.healthContext.riskLevel === 'HIGH'
                          ? 'bg-amber-600 text-white'
                          : extracted.healthContext.riskLevel === 'MODERATE'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {extracted.healthContext.riskLevel} RISK
                    </span>
                    <span className="text-stone-500 text-[11px]">
                      {extracted.immediateNeed.timeSensitivity.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] truncate">
                    {extracted.healthContext.knownConditions[0] || 'No chronic tags'}
                  </p>
                </div>
              </div>

              {/* Action Plan Preview */}
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-stone-600 font-bold text-[11px] uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4 text-[#005448]" />
                  Identified Need
                </div>
                <p className="text-xs font-black text-stone-900">
                  {extracted.immediateNeed.title}
                </p>
                {extracted.constraints.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {extracted.constraints.map((c, i) => (
                      <span key={i} className="bg-white border border-stone-200 text-stone-600 text-[10px] px-2 py-0.5 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!extracted || isAnalyzing}
            onClick={handleSubmitCareCase}
            className="flex-2 py-3 px-5 rounded-xl bg-[#005448] hover:bg-[#004238] disabled:opacity-50 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#005448]/20 transition-all"
          >
            Launch Response Plan
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
