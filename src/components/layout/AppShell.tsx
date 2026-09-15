import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { BottomNav } from './BottomNav';
import { TopHeader } from './TopHeader';
import { GlobalSOSButton } from '../emergency/GlobalSOSButton';

export const AppShell: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let removeListener: (() => void) | null = null;

    try {
      CapApp.addListener('backButton', () => {
        // If already at Home hub, allow exiting the app
        if (location.pathname === '/home' || location.pathname === '/') {
          CapApp.exitApp();
        } else {
          // Go back to previous screen or fallback to home
          if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate('/home');
          }
        }
      }).then((handle) => {
        removeListener = () => handle.remove();
      });
    } catch {
      // Browser fallback - ignore if Capacitor not running
    }

    return () => {
      if (removeListener) removeListener();
    };
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#FBFAF6] dark:bg-[#0B1413] text-[#121E1C] dark:text-[#EBF2F0] flex flex-col font-sans selection:bg-[#E0F2EE] dark:selection:bg-[#132E27] transition-colors duration-200">
      <TopHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <GlobalSOSButton />
      <BottomNav />
    </div>
  );
};
