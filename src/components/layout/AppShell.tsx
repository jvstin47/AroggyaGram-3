import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { GlobalSOSButton } from '../emergency/GlobalSOSButton';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBFAF6] text-[#121E1C] flex flex-col font-sans selection:bg-[#E0F2EE]">
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <GlobalSOSButton />
      <BottomNav />
    </div>
  );
};
