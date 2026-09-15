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
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

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
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Drawer Header */}
        <div className="bg-gradient-to-br from-[#005448] to-[#0D6B5D] text-white p-6 pt-[calc(2rem+env(safe-area-inset-top,0px))] space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl text-white">
              {profile?.full_name?.charAt(0) || 'U'}
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
              {profile?.full_name || 'Guest User'}
            </h3>
            <p className="text-xs text-emerald-200 mt-0.5 capitalize">
              {user?.role ? `${user.role} Account` : 'Guest'}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-1 flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-2">
            Intelligent Health Network
          </div>

          <button
            onClick={() => handleNavigate('/home')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-5 h-5 text-[#005448]" />
              <span>Home Hub</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/care-cases')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#2E7A5B]" />
              <span>Care Network Cases</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/simulator')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <span>Response Simulator</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/ask-aroggya')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-emerald-600" />
              <span>Ask Aroggya (AI Chat)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 pt-4 pb-2">
            Care & Resources
          </div>

          <button
            onClick={() => handleNavigate('/medications')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Pill className="w-5 h-5 text-purple-600" />
              <span>Medication Schedule</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/facilities')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Hospital className="w-5 h-5 text-blue-600" />
              <span>Clinics & Facilities</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/news')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-5 h-5 text-[#E68A00]" />
              <span>Community Health News</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => handleNavigate('/about')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-stone-600" />
              <span>About AroggyaGram</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 pt-4 pb-2">
            Account & Preferences
          </div>

          <button
            onClick={() => handleNavigate('/profile')}
            className="w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-stone-100 text-stone-800 font-semibold text-sm transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-stone-700" />
              <span>Profile & Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>

        {/* Footer with Sign Out */}
        <div className="p-4 border-t border-stone-200 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-600 hover:bg-red-50 font-bold text-sm transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
