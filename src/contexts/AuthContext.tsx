import React, { createContext, useContext, useEffect, useState } from 'react';
import type { UserRole, Profile } from '@/types/database.types';
import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signInDev: (role: UserRole, name?: string) => void;
  signOut: () => Promise<void>;
  updateLanguage: (lang: 'en' | 'ml' | 'hi' | 'ta' | 'bn') => void;
}

const DEFAULT_DEV_PATIENT: AuthUser = {
  id: 'patient-dev-1',
  email: 'patient@aroggyagram.org',
  role: 'patient',
  fullName: 'Lakshmi Amma'
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signInDev: () => {},
  signOut: async () => {},
  updateLanguage: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Load local persisted dev session or check Supabase auth
    const initAuth = async () => {
      try {
        if (!isSupabaseConfigured) {
          const savedRole = (localStorage.getItem('aroggya_role') as UserRole) || 'patient';
          const savedName = localStorage.getItem('aroggya_name') || 'Lakshmi Amma';
          const devUser: AuthUser = {
            id: `dev-${savedRole}-1`,
            email: `${savedRole}@aroggyagram.org`,
            role: savedRole,
            fullName: savedName
          };
          setUser(devUser);
          setProfile({
            id: devUser.id,
            role: savedRole,
            full_name: devUser.fullName,
            phone: '+91 94471 23456',
            language: (localStorage.getItem('aroggya_lang') as any) || 'en',
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          setLoading(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const uRole = (session.user.user_metadata?.role as UserRole) || 'patient';
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: uRole,
            fullName: session.user.user_metadata?.full_name || 'User'
          });
        }
      } catch (err) {
        console.error('Failed auth initialization:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signInDev = (role: UserRole, name?: string) => {
    const fullName = name || (role === 'patient' ? 'Lakshmi Amma' : role === 'volunteer' ? 'Rahul Nair' : 'Dr. Anita Kurian');
    localStorage.setItem('aroggya_role', role);
    localStorage.setItem('aroggya_name', fullName);
    const devUser: AuthUser = {
      id: `dev-${role}-1`,
      email: `${role}@aroggyagram.org`,
      role,
      fullName
    };
    setUser(devUser);
    setProfile({
      id: devUser.id,
      role,
      full_name: fullName,
      phone: '+91 94471 23456',
      language: (localStorage.getItem('aroggya_lang') as any) || 'en',
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('aroggya_role');
    localStorage.removeItem('aroggya_name');
    setUser(null);
    setProfile(null);
  };

  const updateLanguage = (lang: 'en' | 'ml' | 'hi' | 'ta' | 'bn') => {
    localStorage.setItem('aroggya_lang', lang);
    if (profile) {
      setProfile({ ...profile, language: lang });
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInDev, signOut, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
