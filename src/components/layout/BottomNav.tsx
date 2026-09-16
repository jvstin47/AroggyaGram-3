import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, HelpingHand, Pill, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/i18n/translations';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();
  const t = getTranslation(profile?.language);

  const isVolunteer = user?.role === 'volunteer';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-[#14211F] border-t border-[#E8E6DF] dark:border-[#223733] pt-1.5 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between gap-1">
        {!isVolunteer ? (
          <>
            {/* Patient Bottom Nav */}
            <button
              onClick={() => navigate('/home')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/home'
                  ? 'bg-[#E0F2EE] dark:bg-[#132E27] text-[#005448] dark:text-emerald-300 font-black shadow-xs border border-[#005448]/20 dark:border-emerald-600/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <HeartPulse className={`w-5 h-5 ${location.pathname === '/home' ? 'text-[#005448] dark:text-emerald-400 stroke-[2.5]' : ''}`} />
              <span className="text-[11px] font-bold mt-0.5">{t.nav_home}</span>
            </button>

            <button
              onClick={() => navigate('/ask-aroggya')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/ask-aroggya'
                  ? 'bg-emerald-100/80 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300 font-black shadow-xs border border-emerald-600/30 dark:border-emerald-500/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <HeartPulse className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 ${location.pathname === '/ask-aroggya' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[11px] font-bold mt-0.5">{t.nav_consult}</span>
            </button>

            <button
              onClick={() => navigate('/requests/new')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/requests/new'
                  ? 'bg-amber-100/80 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-black shadow-xs border border-amber-500/30 dark:border-amber-500/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <HelpingHand className={`w-5 h-5 text-[#E68A00] dark:text-amber-400 ${location.pathname === '/requests/new' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[11px] font-bold mt-0.5">{t.nav_sos}</span>
            </button>

            <button
              onClick={() => navigate('/medications')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/medications'
                  ? 'bg-purple-100/80 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 font-black shadow-xs border border-purple-500/30 dark:border-purple-500/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <Pill className={`w-5 h-5 text-purple-600 dark:text-purple-400 ${location.pathname === '/medications' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[11px] font-bold mt-0.5">{t.nav_meds}</span>
            </button>

            <button
              onClick={() => navigate('/facilities')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/facilities'
                  ? 'bg-blue-100/80 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 font-black shadow-xs border border-blue-500/30 dark:border-blue-500/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <MapPin className={`w-5 h-5 text-blue-600 dark:text-blue-400 ${location.pathname === '/facilities' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[11px] font-bold mt-0.5">{t.nav_clinics}</span>
            </button>
          </>
        ) : (
          <>
            {/* Volunteer Bottom Nav */}
            <button
              onClick={() => navigate('/volunteer/dashboard')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/volunteer/dashboard'
                  ? 'bg-[#E0F2EE] dark:bg-[#132E27] text-[#005448] dark:text-emerald-300 font-black shadow-xs border border-[#005448]/20 dark:border-emerald-600/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <Compass className={`w-5 h-5 ${location.pathname === '/volunteer/dashboard' ? 'text-[#005448] dark:text-emerald-400 stroke-[2.5]' : ''}`} />
              <span className="text-xs font-bold mt-0.5">Discovery</span>
            </button>

            <button
              onClick={() => navigate('/facilities')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/facilities'
                  ? 'bg-blue-100/80 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 font-black shadow-xs border border-blue-500/30 dark:border-blue-500/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <MapPin className={`w-5 h-5 text-blue-600 dark:text-blue-400 ${location.pathname === '/facilities' ? 'stroke-[2.5]' : ''}`} />
              <span className="text-xs font-bold mt-0.5">Facilities</span>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                location.pathname === '/profile'
                  ? 'bg-[#E0F2EE] dark:bg-[#132E27] text-[#005448] dark:text-emerald-300 font-black shadow-xs border border-[#005448]/20 dark:border-emerald-600/40 scale-102'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-transparent'
              }`}
            >
              <ShieldCheck className={`w-5 h-5 ${location.pathname === '/profile' ? 'text-[#005448] dark:text-emerald-400 stroke-[2.5]' : ''}`} />
              <span className="text-xs font-bold mt-0.5">Badge</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
