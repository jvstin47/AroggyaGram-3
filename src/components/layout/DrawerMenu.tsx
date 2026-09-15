import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  User,
  Newspaper,
  Info,
  ShieldCheck,
  Globe,
  LogOut,
  ChevronRight,
  HeartHandshake,
  Bot,
  Pill,
  Hospital,
  Activity,
  Sliders,
  Sparkles,
  Moon,
  Sun,
  Key
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { AIKeyService } from '@/services/ai/aiKey.service';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { darkMode, toggleDarkMode } = useAccessibility();

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = async () => {
    onClose();
    await signOut();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer content */}
      <div className="relative w-4/5 max-w-xs bg-white dark:bg-[#14211F] text-stone-900 dark:text-stone-100 h-full shadow-2xl flex flex-col z-10 overflow-y-auto transition-colors">
        {/* Drawer Header */}
        <div className="bg-gradient-to-br from-[#005448] to-[#0D6B5D] text-white p-6 pt-[calc(2rem+env(safe-area-inset-top,0px))] space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl text-white">
              {profile?.full_name?.charAt(0) || user?.fullName?.charAt(0) || 'U'}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div>
            <h3 className="font-black text-lg text-white leading-tight">
              {profile?.full_name || user?.fullName || 'Resident User'}
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5 capitalize">
              {user?.role ? `${user.role} Account` : 'Citizen'}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-1 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-3 py-2">
            Intelligent Health Network
          </div>

          <button
            onClick={() => handleNavigate('/home')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-5 h-5 text-[#005448] dark:text-emerald-400" />
              <span>Home Hub</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/care-cases')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#2E7A5B] dark:text-emerald-400" />
              <span>Care Network Cases</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/ask-aroggya')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Ask Aroggya (AI Chat)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-3 pt-4 pb-2">
            Care & Resources
          </div>

          <button
            onClick={() => handleNavigate('/medications')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Pill className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Medication Schedule</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/facilities')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Hospital className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Clinics & Facilities</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/news')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-5 h-5 text-[#E68A00]" />
              <span>Community Health News</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/about')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              <span>About AroggyaGram</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 px-3 pt-4 pb-2">
            Theme & Settings
          </div>

          {/* Dark Mode Switch inside Drawer */}
          <div className="flex items-center justify-between px-3 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-indigo-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-500" />
              )}
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
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

          <button
            onClick={() => handleNavigate('/settings/api-key')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Gemini AI API Key</span>
            </div>
            <div className="flex items-center gap-1.5">
              {AIKeyService.hasCustomKey() ? (
                <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Custom
                </span>
              ) : AIKeyService.hasAnyKey() ? (
                <span className="text-[10px] font-bold bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-full">
                  Default
                </span>
              ) : null}
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </div>
          </button>

          <button
            onClick={() => handleNavigate('/profile')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-stone-700 dark:text-stone-400" />
              <span>Profile & Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>

        {/* Footer with Sign Out */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold text-sm transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
