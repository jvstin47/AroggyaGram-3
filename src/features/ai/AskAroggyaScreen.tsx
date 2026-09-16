import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Mic,
  MicOff,
  Send,
  AlertTriangle,
  ShieldAlert,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  PhoneCall,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AIService } from '@/services/ai/ai.service';
import { SpeechService } from '@/services/speech/speech.service';
import type { HealthAnalysisResult, RiskLevel } from '@/types/ai.types';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/i18n/translations';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  result?: HealthAnalysisResult;
  timestamp: string;
}

export const AskAroggyaScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const t = getTranslation(profile?.language);

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: t.ask_welcome,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever messages change or loading state toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 80);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  useEffect(() => {
    SpeechService.isAvailable().then(setSpeechSupported);
  }, []);

  const handleVoiceToggle = async () => {
    if (isListening) {
      await SpeechService.stopListening();
      setIsListening(false);
      return;
    }

    setIsListening(true);
    await SpeechService.startListening({
      language: profile?.language || 'en',
      onResult: (transcript) => {
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        inputRef.current?.focus();
      },
      onError: (err) => {
        console.warn('Voice recognition error:', err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : input).trim();
    if (!query || loading) return;

    setInput('');
    setLoading(true);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const analysis = await AIService.analyzeHealthConcern(query, profile?.language || 'en');
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: analysis.explanation,
        result: analysis,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: t.ask_error,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="bg-red-600 text-white font-black px-2.5 py-0.5 rounded-full text-[11px] animate-pulse">CRITICAL RISK</span>;
      case 'HIGH':
        return <span className="bg-orange-600 text-white font-black px-2.5 py-0.5 rounded-full text-[11px]">HIGH RISK</span>;
      case 'MODERATE':
        return <span className="bg-amber-500 text-white font-black px-2.5 py-0.5 rounded-full text-[11px]">MODERATE</span>;
      case 'LOW':
      default:
        return <span className="bg-emerald-600 text-white font-black px-2.5 py-0.5 rounded-full text-[11px]">LOW RISK</span>;
    }
  };

  return (
    <div className="min-h-screen pb-44 px-4 pt-3 max-w-lg mx-auto text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#005448] dark:text-emerald-400" />
              <h1 className="text-lg font-black text-[#121E1C] dark:text-white tracking-tight leading-none">
                {t.ask_title}
              </h1>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium mt-0.5">
              {t.ask_subtitle}
            </p>
          </div>
        </div>

        {/* Toggle Clinical Disclaimer */}
        <button
          type="button"
          onClick={() => setShowDisclaimer((prev) => !prev)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#005448] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 cursor-pointer"
        >
          <Info className="w-3.5 h-3.5" />
          <span>Notice</span>
          {showDisclaimer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Collapsible Clinical Notice Banner */}
      {showDisclaimer && (
        <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-[11px] text-[#005448] dark:text-emerald-300 leading-relaxed animate-in fade-in slide-in-from-top-1">
          <strong>Important Clinical Notice:</strong> {t.ask_disclaimer}
        </div>
      )}

      {/* Scrollable Conversation Feed */}
      <div className="py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
          >
            <div
              className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#005448] dark:bg-emerald-700 text-white rounded-br-xs shadow-sm font-medium'
                  : 'bg-white dark:bg-[#14211F] border border-stone-200 dark:border-[#223733] text-stone-900 dark:text-stone-100 rounded-bl-xs shadow-xs'
              }`}
            >
              {msg.text}
            </div>

            {/* Structured Clinical Diagnosis & Risk Analysis Card */}
            {msg.result && (
              <div
                className={`w-full max-w-[95%] rounded-2xl p-4 border-2 space-y-3.5 shadow-md transition-all ${
                  msg.result.risk_level === 'CRITICAL'
                    ? 'bg-red-50 dark:bg-red-950/50 border-red-500 dark:border-red-700'
                    : msg.result.risk_level === 'HIGH'
                    ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-400 dark:border-orange-800'
                    : 'bg-white dark:bg-[#14211F] border-stone-200 dark:border-[#223733]'
                }`}
              >
                {/* Header risk bar */}
                <div className="flex items-center justify-between border-b border-stone-200/60 dark:border-[#1E302C] pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      {t.ask_possible_condition}
                    </span>
                    <h3 className="text-base font-black text-stone-900 dark:text-white leading-tight">
                      {msg.result.possible_condition}
                    </h3>
                  </div>
                  <div>{getRiskBadge(msg.result.risk_level)}</div>
                </div>

                {/* Emergency Warning */}
                {(msg.result.risk_level === 'CRITICAL' || msg.result.risk_level === 'HIGH') && (
                  <div className="bg-red-600 text-white p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 font-black text-sm">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      <span>{t.ask_urgent_intervention}</span>
                    </div>
                    <p className="text-xs text-red-100 font-medium leading-relaxed">
                      {msg.result.emergency_warning || 'Do not delay. Please trigger SOS or call 108 emergency ambulance.'}
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const sosBtn = document.querySelector('button[aria-label*="Emergency SOS"]') as HTMLButtonElement;
                          if (sosBtn) sosBtn.click();
                        }}
                        className="flex-1 bg-white text-red-600 font-black py-2 rounded-lg text-center text-xs shadow-sm cursor-pointer"
                      >
                        {t.ask_activate_sos}
                      </button>
                      <a
                        href="tel:108"
                        className="flex-1 bg-red-800 text-white font-black py-2 rounded-lg text-center text-xs flex items-center justify-center gap-1"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{t.ask_call_108}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Immediate Actions */}
                {msg.result.immediate_actions?.length > 0 && (
                  <div className="space-y-1.5 bg-stone-50 dark:bg-[#0E1A18] p-3 rounded-xl border border-stone-100 dark:border-[#1E302C]">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#005448] dark:text-emerald-400">
                      {t.ask_immediate_actions}
                    </h4>
                    <ul className="space-y-1">
                      {msg.result.immediate_actions.map((act, i) => (
                        <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7A5B] dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warning signs / red flags */}
                {msg.result.warning_signs?.length > 0 && (
                  <div className="space-y-1 text-xs text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800">
                    <span className="font-bold flex items-center gap-1 text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      {t.ask_red_flags}
                    </span>
                    <p className="text-[11px]">{msg.result.warning_signs.join(' · ')}</p>
                  </div>
                )}

                {/* Recommendation */}
                {msg.result.recommendation && (
                  <div className="pt-1.5 text-xs text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-[#1E302C] italic">
                    {msg.result.recommendation}
                  </div>
                )}
              </div>
            )}

            <span className="text-[10px] text-stone-400 dark:text-stone-500 px-2 font-medium">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Typing / Analyzing Loader Bubble */}
        {loading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-[#005448] dark:text-emerald-400 bg-white dark:bg-[#14211F] border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 w-fit shadow-xs animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-[#005448] dark:text-emerald-400" />
            <span>{t.ask_analyzing}</span>
          </div>
        )}

        {/* Scroll anchor with offset so messages aren't occluded by floating bar */}
        <div ref={messagesEndRef} className="h-28 shrink-0" />
      </div>

      {/* Pinned Bottom Input Bar - Floating Elevated Card Above BottomNav */}
      <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] left-0 right-0 max-w-lg mx-auto px-3 z-30 pointer-events-auto">
        <div className="bg-white dark:bg-[#14211F] p-2 rounded-3xl border border-stone-200 dark:border-stone-700 shadow-xl dark:shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Native Speech Mic Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              aria-label={isListening ? 'Stop voice recording' : 'Start speech recognition'}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-lg scale-105'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isListening ? 'Listening...' : (profile?.language === 'ml' ? 'ലക്ഷണങ്ങൾ ടൈപ്പ് ചെയ്യുക...' : profile?.language === 'hi' ? 'लक्षण टाइप करें...' : 'Type symptoms or tap mic...')}
                className="w-full h-11 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#0B1413] px-3.5 text-sm focus:border-[#005448] dark:focus:border-emerald-500 focus:outline-none transition-all text-stone-800 dark:text-white"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="p-2.5 rounded-2xl bg-[#005448] dark:bg-emerald-600 hover:bg-[#004239] dark:hover:bg-emerald-700 disabled:opacity-40 text-white transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {!speechSupported && (
            <p className="text-[10px] text-stone-400 text-center mt-1">
              {t.ask_voice_unavailable}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
