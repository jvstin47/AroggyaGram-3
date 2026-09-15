import React, { useState } from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DrawerMenu } from './DrawerMenu';

export const TopHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signInDev } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="px-4 pt-[calc(1.2rem+env(safe-area-inset-top,0px))] pb-3 border-b border-stone-200/80 bg-[#FBFAF6]/90 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="p-2.5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 shadow-xs transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#2E7A5B] block">
                AroggyaGram · Kerala
              </span>
              <h1 className="text-base font-black text-stone-900 leading-tight">
                {profile?.full_name?.split(' ')[0] || 'Friend'} 🙏
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const nextRole = user?.role === 'patient' ? 'volunteer' : 'patient';
              signInDev(nextRole);
              if (nextRole === 'volunteer') navigate('/volunteer/dashboard');
              else navigate('/home');
            }}
            className="text-xs bg-[#E0F2EE] text-[#005448] font-bold px-3 py-1.5 rounded-full border border-[#005448]/20 flex items-center gap-1.5 hover:bg-[#cbeae3] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="capitalize">{user?.role || 'patient'}</span>
          </button>
        </div>
      </header>

      <DrawerMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
