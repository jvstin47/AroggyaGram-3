import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ShieldCheck, UserCheck, ArrowRight, Phone, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/database.types';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { signInDev } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [phoneNumber, setPhoneNumber] = useState('+91 94471 23456');
  const [fullName, setFullName] = useState('Lakshmi Amma');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'patient') {
      setFullName('Lakshmi Amma');
      setPhoneNumber('+91 94471 23456');
    } else if (role === 'volunteer') {
      setFullName('Rahul Nair');
      setPhoneNumber('+91 98460 77889');
    } else {
      setFullName('Dr. Anita Kurian');
      setPhoneNumber('+91 94471 00112');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    signInDev(selectedRole, fullName);
    if (selectedRole === 'volunteer') {
      navigate('/volunteer/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] px-6 pt-[calc(2.5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] max-w-md mx-auto flex flex-col justify-between">
      {/* Brand Header */}
      <div className="space-y-3 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#005448] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#005448]/20">
          <HeartPulse className="w-9 h-9" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#121E1C] tracking-tight">AroggyaGram</h1>
          <p className="text-xs font-bold text-[#2E7A5B] uppercase tracking-widest mt-1">
            Rural Health & Assistance Network
          </p>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="my-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black text-stone-900">Choose Your Role to Enter</h2>
          <p className="text-xs text-stone-500">Sign in with phone or tap one-click profile</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleRoleChange('patient')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedRole === 'patient'
                ? 'border-[#005448] bg-emerald-50 shadow-sm'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
              <HeartPulse className="w-4 h-4 text-[#005448]" />
              <span>Citizen / Patient</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 leading-snug">
              Access AI consultation, SOS rescue, and local help requests.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('volunteer')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedRole === 'volunteer'
                ? 'border-[#005448] bg-emerald-50 shadow-sm'
                : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-2 text-stone-900 font-black text-sm">
              <ShieldCheck className="w-4 h-4 text-[#2E7A5B]" />
              <span>Volunteer</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 leading-snug">
              Discover nearby needs, navigate requests, and support neighbors.
            </p>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSignIn} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3.5">
          <div>
            <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-stone-300 rounded-xl p-3 text-sm font-semibold focus:border-[#005448] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
              Registered Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-stone-300 rounded-xl p-3 pl-10 text-sm font-semibold focus:border-[#005448] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#005448] hover:bg-[#004239] text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-[#005448]/25 transition-all active:scale-98 mt-2"
          >
            <span>Continue as {selectedRole === 'patient' ? 'Citizen' : 'Volunteer'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Safety Notice Footer */}
      <div className="text-center text-xs text-stone-400 space-y-1">
        <p className="font-semibold text-stone-500">AroggyaGram Privacy Pledge</p>
        <p>Patient health details and exact coordinates are strictly isolated.</p>
      </div>
    </div>
  );
};
