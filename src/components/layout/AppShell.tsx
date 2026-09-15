import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { TopHeader } from './TopHeader';
import { GlobalSOSButton } from '../emergency/GlobalSOSButton';

export const AppShell: React.FC = () => {
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
