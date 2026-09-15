import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Eye, User, Phone, Moon, Sun, Save, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { getTranslation } from '@/i18n/translations';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, updateLanguage, signInDev } = useAuth();
  const t = getTranslation(profile?.language);
  const { fontSize, setFontSize, highContrast, setHighContrast, darkMode, toggleDarkMode } = useAccessibility();

  const [fullName, setFullName] = useState(profile?.full_name || user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone || '9539141210');
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role) {
      signInDev(user.role, fullName);
      localStorage.setItem('aroggya_phone', phoneNumber);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">{t.profile_title}</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.profile_subtitle}</p>
        </div>
      </div>

      {/* Editable Identity Card */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#005448] text-white flex items-center justify-center font-black text-xl shrink-0">
            {fullName.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E7A5B] dark:text-emerald-400">
              {t.profile_active_role}: {user?.role ? user.role.toUpperCase() : 'PATIENT'}
            </span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.profile_name_placeholder}
              className="w-full text-base font-black text-stone-900 dark:text-white bg-transparent border-b border-stone-200 dark:border-stone-700 focus:outline-none focus:border-[#005448] pb-0.5 mt-0.5"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            {t.profile_emergency_mobile}
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 9539141210"
              className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-[#005448]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-[#005448] hover:bg-[#004239] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          <span>{saved ? t.profile_saved : t.profile_save}</span>
        </button>
      </form>

      {/* Appearance & Dark Mode */}
      <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
          {darkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
          <span>{t.profile_appearance}</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700">
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-white">{t.profile_dark_theme}</h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.profile_dark_desc}</p>
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
              darkMode ? 'bg-[#10B981]' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Language Preferences */}
      <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 transition-colors">
        <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
          <Globe className="w-5 h-5 text-[#005448] dark:text-emerald-400" />
          <span>{t.profile_select_language}</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {t.profile_language_desc}
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {[
            { code: 'en', label: 'English' },
            { code: 'ml', label: 'മലയാളം' },
            { code: 'hi', label: 'हिन्दी' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => updateLanguage(lang.code as any)}
              className={`p-3 rounded-2xl text-xs font-bold border-2 transition-all text-center ${
                profile?.language === lang.code
                  ? 'border-[#005448] bg-emerald-50 dark:bg-emerald-950/50 text-[#005448] dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility Adjustments */}
      <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 transition-colors">
        <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-sm">
          <Eye className="w-5 h-5 text-[#005448] dark:text-emerald-400" />
          <span>{t.profile_text_scaling}</span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
            {t.profile_text_size}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['normal', 'large', 'xlarge'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  fontSize === s
                    ? 'bg-[#005448] text-white border-[#005448]'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                }`}
              >
                {s === 'normal' ? t.profile_size_normal : s === 'large' ? t.profile_size_large : t.profile_size_xlarge}
              </button>
            ))}
          </div>
        </div>

        {/* High contrast toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
          <div>
            <h4 className="text-xs font-bold text-stone-900 dark:text-white">{t.profile_high_contrast}</h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">{t.profile_high_contrast_desc}</p>
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
