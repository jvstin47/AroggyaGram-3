import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Key,
  ShieldCheck,
  ExternalLink,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Sparkles,
  Info,
  Cpu,
  Zap
} from 'lucide-react';
import { AIKeyService, type GeminiModelMode } from '@/services/ai/aiKey.service';

export const ApiKeySettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [currentMasked, setCurrentMasked] = useState(AIKeyService.getMaskedKey());
  const [hasCustomKey, setHasCustomKey] = useState(AIKeyService.hasCustomKey());
  const [modelMode, setModelMode] = useState<GeminiModelMode>(AIKeyService.getModel());
  const [modelChangeSuccess, setModelChangeSuccess] = useState(false);

  useEffect(() => {
    setCurrentMasked(AIKeyService.getMaskedKey());
    setHasCustomKey(AIKeyService.hasCustomKey());
    setModelMode(AIKeyService.getModel());
  }, []);

  const handleSelectModel = (mode: GeminiModelMode) => {
    AIKeyService.setModel(mode);
    setModelMode(mode);
    setModelChangeSuccess(true);
    setTimeout(() => setModelChangeSuccess(false), 2500);
  };

  const handleSave = async () => {
    const trimmed = apiKeyInput.trim();
    if (!trimmed) return;

    AIKeyService.setApiKey(trimmed);
    setCurrentMasked(AIKeyService.getMaskedKey());
    setHasCustomKey(AIKeyService.hasCustomKey());
    setSaveSuccess(true);
    setApiKeyInput('');
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleClear = () => {
    AIKeyService.clearApiKey();
    setCurrentMasked(AIKeyService.getMaskedKey());
    setHasCustomKey(false);
    setApiKeyInput('');
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const keyToTest = apiKeyInput.trim() || undefined;
    const result = await AIKeyService.testApiKey(keyToTest);
    setIsTesting(false);
    setTestResult(result);
  };

  return (
    <div className="pb-36 px-4 pt-3 max-w-lg mx-auto space-y-5 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            AI Engine Config
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0A433A] dark:from-[#093830] dark:to-[#04241F] text-white p-5 rounded-3xl shadow-xl shadow-[#005448]/25 space-y-3 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Key className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Gemini AI Key</h2>
            <p className="text-xs text-emerald-200">Configure Google AI Studio API for Ask Aroggya</p>
          </div>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed">
          Provide your own Google Gemini API key to power real-time multilingual triage, clinical reasoning, and automated intake synthesis.
        </p>
      </div>

      {/* Current Key Status Card */}
      <div className="bg-white dark:bg-[#14211F] border border-stone-200 dark:border-[#223733] p-4 rounded-2xl shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Active Key Status
          </span>
          <span
            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
              hasCustomKey
                ? 'bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300'
                : currentMasked
                ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
            }`}
          >
            {hasCustomKey ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                Custom Key Active
              </>
            ) : currentMasked ? (
              <>
                <ShieldCheck className="w-3 h-3" />
                Default Environment Key
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                Offline Mode (No Key)
              </>
            )}
          </span>
        </div>

        <div className="bg-stone-50 dark:bg-[#0E1A18] border border-stone-200 dark:border-[#223733] p-3 rounded-xl flex items-center justify-between">
          <div className="font-mono text-xs text-stone-700 dark:text-stone-300">
            {currentMasked || 'No API key configured'}
          </div>
          {hasCustomKey && (
            <button
              type="button"
              onClick={handleClear}
              className="text-red-600 dark:text-red-400 hover:text-red-700 text-xs font-bold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Model Mode Switcher */}
      <div className="bg-white dark:bg-[#14211F] border border-stone-200 dark:border-[#223733] p-4 rounded-2xl shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#005448] dark:text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Gemini AI Model Mode
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2EE] dark:bg-emerald-950 text-[#005448] dark:text-emerald-300">
            {modelMode === 'gemini-3.6-flash' ? '3.6 Flash Active' : '2.5 Flash Active'}
          </span>
        </div>

        <p className="text-[11px] text-stone-500 dark:text-stone-400">
          Select the Gemini model variant used for symptoms intake, clinical screening, and home care recommendations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
          {/* 2.5 Flash Option */}
          <button
            type="button"
            onClick={() => handleSelectModel('gemini-2.5-flash')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
              modelMode === 'gemini-2.5-flash'
                ? 'border-[#005448] dark:border-emerald-500 bg-[#F2FAF8] dark:bg-[#0E2622] ring-2 ring-[#005448]/20 dark:ring-emerald-500/20 shadow-sm'
                : 'border-stone-200 dark:border-[#223733] bg-stone-50/70 dark:bg-[#0E1A18] hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-black text-stone-900 dark:text-white">2.5 Flash</span>
                </div>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300">
                  Recommended
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed font-normal">
                Standard production tier. Optimized for sub-second response, reliable emergency triage, and high efficiency.
              </p>
            </div>
            {modelMode === 'gemini-2.5-flash' && (
              <div className="flex items-center gap-1 mt-2.5 text-[11px] font-bold text-[#005448] dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active Mode</span>
              </div>
            )}
          </button>

          {/* 3.6 Flash Option */}
          <button
            type="button"
            onClick={() => handleSelectModel('gemini-3.6-flash')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
              modelMode === 'gemini-3.6-flash'
                ? 'border-[#005448] dark:border-emerald-500 bg-[#F2FAF8] dark:bg-[#0E2622] ring-2 ring-[#005448]/20 dark:ring-emerald-500/20 shadow-sm'
                : 'border-stone-200 dark:border-[#223733] bg-stone-50/70 dark:bg-[#0E1A18] hover:border-stone-300 dark:hover:border-stone-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-black text-stone-900 dark:text-white">3.6 Flash</span>
                </div>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                  Next-Gen
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed font-normal">
                Experimental next-gen tier. Deeper contextual reasoning with automated resilient fallback to 2.5 Flash.
              </p>
            </div>
            {modelMode === 'gemini-3.6-flash' && (
              <div className="flex items-center gap-1 mt-2.5 text-[11px] font-bold text-[#005448] dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active Mode</span>
              </div>
            )}
          </button>
        </div>

        {/* Model mode switch notification */}
        {modelChangeSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Switched to {modelMode === 'gemini-3.6-flash' ? 'Gemini 3.6 Flash' : 'Gemini 2.5 Flash'} successfully!</span>
          </div>
        )}
      </div>

      {/* Input New / Change Key Form */}
      <div className="bg-white dark:bg-[#14211F] border border-stone-200 dark:border-[#223733] p-4 rounded-2xl shadow-sm space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-1">
            {hasCustomKey ? 'Update Gemini API Key' : 'Enter Gemini API Key'}
          </label>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Your key starts with <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">AIzaSy...</code>
          </p>
        </div>

        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            placeholder="Paste your Gemini API key here..."
            className="w-full text-xs font-mono p-3 pr-10 bg-stone-50 dark:bg-[#0E1A18] border border-stone-200 dark:border-[#223733] rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#005448] dark:focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!apiKeyInput.trim()}
            className="flex-1 bg-[#005448] dark:bg-emerald-600 hover:bg-[#004238] dark:hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save Key
          </button>

          <button
            type="button"
            onClick={handleTestConnection}
            disabled={isTesting || (!apiKeyInput.trim() && !currentMasked)}
            className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {isTesting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#005448] dark:text-emerald-400" />
                Testing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Test Connection
              </>
            )}
          </button>
        </div>

        {/* Save confirmation */}
        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>API key saved securely in device storage!</span>
          </div>
        )}

        {/* Test Connection Results */}
        {testResult && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold flex items-start gap-2 border ${
              testResult.valid
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/60 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
            }`}
          >
            {testResult.valid ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">{testResult.valid ? 'Success' : 'Validation Error'}</p>
              <p className="text-[11px] font-normal mt-0.5">{testResult.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* Guide on Getting Free Gemini API Key */}
      <div className="bg-[#FAF9F4] dark:bg-[#13201E] border border-[#E8E6DF] dark:border-stone-800 p-4 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-[#005448] dark:text-emerald-400 font-bold text-xs uppercase tracking-wide">
          <Info className="w-4 h-4" />
          <span>How to get a free API Key</span>
        </div>

        <ol className="text-xs text-stone-600 dark:text-stone-300 space-y-2 list-decimal list-inside leading-relaxed font-medium">
          <li>Visit Google AI Studio with your Google account.</li>
          <li>Click on <strong>"Get API key"</strong> and create a key in a project.</li>
          <li>Copy the key and paste it above. It enables high-speed AI responses with generous free limits!</li>
        </ol>

        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005448] dark:text-emerald-400 hover:underline pt-1"
        >
          <span>Open Google AI Studio</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
