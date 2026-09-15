import React, { useState } from 'react';
import { Menu, ShieldCheck, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useNavigate } from 'react-router-dom';
import { DrawerMenu } from './DrawerMenu';

export const TopHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signInDev } = useAuth();
  const { darkMode, toggleDarkMode } = useAccessibility();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="px-4 pt-[calc(1.2rem+env(safe-area-inset-top,0px))] pb-3 border-b border-stone-200/80 dark:border-stone-800 bg-[#FBFAF6]/90 dark:bg-[#0B1413]/90 backdrop-blur-md sticky top-0 z-20 transition-colors">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="p-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-xs transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2E7A5B] dark:text-emerald-400 block">
                AroggyaGram · Kerala
              </span>
              <h1 className="text-base font-black text-stone-900 dark:text-stone-100 leading-tight">
                {profile?.full_name?.split(' ')[0] || user?.fullName?.split(' ')[0] || 'Citizen'} 🙏
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all active:scale-95"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* Role Switcher */}
            <button
              type="button"
              onClick={() => {
                const nextRole = user?.role === 'patient' ? 'volunteer' : 'patient';
                signInDev(nextRole, profile?.full_name || user?.fullName);
                if (nextRole === 'volunteer') navigate('/volunteer/dashboard');
                else navigate('/home');
              }}
              className="text-xs bg-[#E0F2EE] dark:bg-emerald-950/60 text-[#005448] dark:text-emerald-300 font-bold px-3 py-1.5 rounded-full border border-[#005448]/20 dark:border-emerald-700/30 flex items-center gap-1.5 hover:bg-[#cbeae3] dark:hover:bg-emerald-900/60 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="capitalize">{user?.role || 'patient'}</span>
            </button>
          </div>
        </div>
      </header>

      <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
