import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Eye, User, Phone, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, updateLanguage } = useAuth();
  const { fontSize, setFontSize, highContrast, setHighContrast } = useAccessibility();

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6">
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
          <h1 className="text-2xl font-black text-[#121E1C] tracking-tight">Profile & Preferences</h1>
          <p className="text-xs text-stone-500 font-medium">Language, Accessibility, and Personal Settings</p>
        </div>
      </div>

      {/* Identity Badge */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#005448] text-white flex items-center justify-center font-black text-xl">
          {profile?.full_name?.charAt(0) || 'U'}
        </div>
        <div>
          <h3 className="text-lg font-black text-stone-900">{profile?.full_name}</h3>
          <p className="text-xs text-stone-500">Role: {user?.role.toUpperCase()}</p>
          <p className="text-xs text-[#2E7A5B] font-semibold mt-0.5 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            {profile?.phone || '+91 94471 23456'}
          </p>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Globe className="w-5 h-5 text-[#005448]" />
          <span>Select Preferred Language</span>
        </div>
        <p className="text-xs text-stone-500">
          Translations and AI health consultations adapt automatically to your native tongue.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {[
            { code: 'en', label: 'English' },
            { code: 'ml', label: 'മലയാളം (Malayalam)' },
            { code: 'hi', label: 'हिन्दी (Hindi)' },
            { code: 'ta', label: 'தமிழ் (Tamil)' },
            { code: 'bn', label: 'বাংলা (Bengali)' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => updateLanguage(lang.code as any)}
              className={`p-3 rounded-2xl text-xs font-bold border-2 transition-all text-left ${
                profile?.language === lang.code
                  ? 'border-[#005448] bg-emerald-50 text-[#005448]'
                  : 'border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility & Visual Settings */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Eye className="w-5 h-5 text-[#005448]" />
          <span>Accessibility Adjustments</span>
        </div>

        {/* Text size */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
            Text Size (Elderly Friendly)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['normal', 'large', 'xlarge'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                  fontSize === s ? 'bg-[#005448] text-white border-[#005448]' : 'bg-stone-100 text-stone-700'
                }`}
              >
                {s === 'normal' ? 'Normal' : s === 'large' ? 'Large (115%)' : 'X-Large (130%)'}
              </button>
            ))}
          </div>
        </div>

        {/* High contrast toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div>
            <h4 className="text-xs font-bold text-stone-900">High Contrast Mode</h4>
            <p className="text-[11px] text-stone-500">Enhanced outdoor readability under bright sunlight</p>
          </div>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="w-5 h-5 accent-[#005448]"
          />
        </div>
      </div>
    </div>
  );
};
