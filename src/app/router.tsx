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
import { LoginScreen } from '@/features/auth/LoginScreen';
import { NewsScreen } from '@/features/news/NewsScreen';
import { AboutScreen } from '@/features/about/AboutScreen';
import { CareCaseListScreen } from '@/features/care-cases/CareCaseListScreen';
import { CareCaseDetailScreen } from '@/features/care-cases/CareCaseDetailScreen';
import { ResponseSimulator } from '@/features/simulator/ResponseSimulator';
import { ApiKeySettingsScreen } from '@/features/settings/ApiKeySettingsScreen';
import { FeedbackScreen } from '@/features/feedback/FeedbackScreen';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: 'home',
        element: <HomeScreen />
      },
      {
        path: 'care-cases',
        element: <CareCaseListScreen />
      },
      {
        path: 'care-cases/:id',
        element: <CareCaseDetailScreen />
      },
      {
        path: 'simulator',
        element: <ResponseSimulator />
      },
      {
        path: 'news',
        element: <NewsScreen />
      },
      {
        path: 'about',
        element: <AboutScreen />
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
        path: 'settings/api-key',
        element: <ApiKeySettingsScreen />
      },
      {
        path: 'feedback',
        element: <FeedbackScreen />
      },
      {
        path: '*',
        element: <Navigate to="/home" replace />
      }
    ]
  }
]);
