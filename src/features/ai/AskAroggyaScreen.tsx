import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Mic, MicOff, Send, AlertTriangle, ShieldAlert, ArrowLeft, Loader2, CheckCircle2, PhoneCall } from 'lucide-react';
import { AIService } from '@/services/ai/ai.service';
import type { HealthAnalysisResult, RiskLevel } from '@/types/ai.types';
import { useAuth } from '@/contexts/AuthContext';

export const AskAroggyaScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HealthAnalysisResult | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  const handleVoiceToggle = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = profile?.language === 'ml' ? 'ml-IN' : profile?.language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (e: any) => {
        const transcript = e.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const analysis = await AIService.analyzeHealthConcern(input, profile?.language || 'en');
      setResult(analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="bg-red-600 text-white font-black px-3 py-1 rounded-full text-xs animate-pulse">CRITICAL RISK</span>;
      case 'HIGH':
        return <span className="bg-orange-600 text-white font-black px-3 py-1 rounded-full text-xs">HIGH RISK</span>;
      case 'MODERATE':
        return <span className="bg-amber-500 text-white font-black px-3 py-1 rounded-full text-xs">MODERATE</span>;
      case 'LOW':
      default:
        return <span className="bg-emerald-600 text-white font-black px-3 py-1 rounded-full text-xs">LOW RISK</span>;
    }
  };

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#121E1C] tracking-tight">Ask Aroggya</h1>
          <p className="text-xs text-stone-500 font-medium">Safe clinical preliminary health assessment</p>
        </div>
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-[#005448] flex items-start gap-2.5">
        <Bot className="w-5 h-5 text-[#005448] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important Clinical Notice:</strong> AroggyaGram AI provides initial risk classification and home guidance only. It does not replace clinical diagnosis by a registered medical officer or prescribe prescription dosages.
        </p>
      </div>

      {/* Input Form with Voice Button */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms in your own words (e.g. 'Having severe dizziness and chest discomfort for the last 2 hours')..."
            rows={4}
            className="w-full rounded-2xl border-2 border-stone-200 bg-white p-4 pr-14 text-base focus:border-[#005448] focus:outline-none transition-all resize-none shadow-sm text-stone-800"
          />

          {/* Voice Mic inside textarea */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            aria-label={isListening ? 'Stop voice recording' : 'Start speech recognition'}
            className={`absolute right-3.5 bottom-4 p-3 rounded-xl transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-md'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>

        {!speechSupported && (
          <p className="text-xs text-stone-500">
            Voice speech recognition is unavailable in this web context. Please type your message.
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-full py-4 bg-[#005448] hover:bg-[#004239] disabled:opacity-50 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Symptoms...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Analyze Health Concern</span>
            </>
          )}
        </button>
      </form>

      {/* STRUCTURED ASSESSMENT OUTPUT */}
      {result && (
        <div
          className={`rounded-3xl p-5 border-2 space-y-4 shadow-lg transition-all ${
            result.risk_level === 'CRITICAL'
              ? 'bg-red-50 border-red-500'
              : result.risk_level === 'HIGH'
              ? 'bg-orange-50 border-orange-400'
              : 'bg-white border-stone-200'
          }`}
        >
          {/* Header risk bar */}
          <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Possible Condition
              </span>
              <h3 className="text-xl font-black text-stone-900">{result.possible_condition}</h3>
            </div>
            <div>{getRiskBadge(result.risk_level)}</div>
          </div>

          {/* CRITICAL / HIGH RISK EMERGENCY WARNING */}
          {(result.risk_level === 'CRITICAL' || result.risk_level === 'HIGH') && (
            <div className="bg-red-600 text-white p-4 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-black text-base">
                <ShieldAlert className="w-6 h-6 shrink-0" />
                <span>Urgent Medical Intervention Required</span>
              </div>
              <p className="text-sm text-red-100 font-medium">
                {result.emergency_warning || 'Do not delay. Please trigger SOS or call 108 emergency ambulance.'}
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const sosBtn = document.querySelector('button[aria-label*="Emergency SOS"]') as HTMLButtonElement;
                    if (sosBtn) sosBtn.click();
                  }}
                  className="flex-1 bg-white text-red-600 font-black py-2.5 rounded-xl text-center text-sm shadow-md"
                >
                  Activate SOS Now
                </button>
                <a
                  href="tel:108"
                  className="flex-1 bg-red-800 text-white font-black py-2.5 rounded-xl text-center text-sm flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 108</span>
                </a>
              </div>
            </div>
          )}

          {/* Clinical Explanation */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">Explanation</h4>
            <p className="text-sm text-stone-800 leading-relaxed">{result.explanation}</p>
          </div>

          {/* Immediate Steps */}
          {result.immediate_actions?.length > 0 && (
            <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#005448]">
                Immediate Actions to Take
              </h4>
              <ul className="space-y-1.5">
                {result.immediate_actions.map((act, i) => (
                  <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2E7A5B] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warning signs */}
          {result.warning_signs?.length > 0 && (
            <div className="space-y-1 text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <span className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Red Flag Symptoms:
              </span>
              <p>{result.warning_signs.join(' · ')}</p>
            </div>
          )}

          {/* Professional Care Recommendation */}
          <div className="pt-2 text-xs text-stone-500 border-t border-stone-100 italic">
            {result.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};
