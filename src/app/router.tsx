import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { HomeScreen } from '@/features/home/HomeScreen';
import { AskAroggyaScreen } from '@/features/ai/AskAroggyaScreen';
import { NewRequestWizard } from '@/features/requests/NewRequestWizard';
import { MedicationsScreen } from '@/features/medications/MedicationsScreen';
import { VolunteerDashboard } from '@/features/volunteers/VolunteerDashboard';
import { FacilityDiscoveryScreen } from '@/features/facilities/FacilityDiscoveryScreen';
import { UnifiedTimelineScreen } from '@/features/timeline/UnifiedTimelineScreen';
import { ProfileScreen } from '@/features/profile/ProfileScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: 'home',
        element: <HomeScreen />
      },
      {
        path: 'ask-aroggya',
        element: <AskAroggyaScreen />
      },
      {
        path: 'requests/new',
        element: <NewRequestWizard />
      },
      {
        path: 'medications',
        element: <MedicationsScreen />
      },
      {
        path: 'volunteer/dashboard',
        element: <VolunteerDashboard />
      },
      {
        path: 'facilities',
        element: <FacilityDiscoveryScreen />
      },
      {
        path: 'timeline',
        element: <UnifiedTimelineScreen />
      },
      {
        path: 'profile',
        element: <ProfileScreen />
      },
      {
        path: '*',
        element: <Navigate to="/home" replace />
      }
    ]
  }
]);
