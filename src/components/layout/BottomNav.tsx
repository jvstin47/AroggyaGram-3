import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse, HelpingHand, Pill, ShieldCheck, MapPin, Compass } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isVolunteer = user?.role === 'volunteer';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E8E6DF] pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {!isVolunteer ? (
          <>
            {/* Patient Bottom Nav */}
            <button
              onClick={() => navigate('/home')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                location.pathname === '/home' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <HeartPulse className="w-6 h-6" />
              <span className="text-xs font-semibold">Home</span>
            </button>

            <button
              onClick={() => navigate('/ask-aroggya')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                location.pathname === '/ask-aroggya' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <HeartPulse className="w-6 h-6 text-emerald-600" />
              <span className="text-xs font-semibold">AI Consult</span>
            </button>

            <button
              onClick={() => navigate('/requests/new')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                location.pathname === '/requests/new' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <HelpingHand className="w-6 h-6 text-[#E68A00]" />
              <span className="text-xs font-semibold">Get Help</span>
            </button>

            <button
              onClick={() => navigate('/medications')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                location.pathname === '/medications' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <Pill className="w-6 h-6" />
              <span className="text-xs font-semibold">Meds</span>
            </button>

            <button
              onClick={() => navigate('/facilities')}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                location.pathname === '/facilities' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-xs font-semibold">Clinics</span>
            </button>
          </>
        ) : (
          <>
            {/* Volunteer Bottom Nav */}
            <button
              onClick={() => navigate('/volunteer/dashboard')}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
                location.pathname === '/volunteer/dashboard' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <Compass className="w-6 h-6" />
              <span className="text-xs font-semibold">Discovery</span>
            </button>

            <button
              onClick={() => navigate('/facilities')}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
                location.pathname === '/facilities' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-xs font-semibold">Facilities</span>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all ${
                location.pathname === '/profile' ? 'text-[#005448] font-bold' : 'text-stone-500'
              }`}
            >
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-semibold">Volunteer Badge</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
