import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ShieldCheck, ArrowRight, Phone, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types/database.types';

export const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { signInDev } = useAuth();

  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('aroggya_phone') || '');
  const [fullName, setFullName] = useState(() => localStorage.getItem('aroggya_name') || '');
  const [phoneError, setPhoneError] = useState('');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digitsOnly);
    if (phoneError && digitsOnly.length === 10) {
      setPhoneError('');
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.trim();

    if (cleanPhone.length !== 10) {
      setPhoneError('Mobile number must be exactly 10 digits long.');
      return;
    }

    const finalName = fullName.trim() || (selectedRole === 'patient' ? 'Citizen' : 'Volunteer');
    
    signInDev(selectedRole, finalName);
    localStorage.setItem('aroggya_phone', cleanPhone);

    if (selectedRole === 'volunteer') {
      navigate('/volunteer/dashboard');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFAF6] dark:bg-[#0B1413] text-stone-900 dark:text-stone-100 px-6 pt-[calc(2.5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))] max-w-md mx-auto flex flex-col justify-between transition-colors">
      {/* Brand Header */}
      <div className="space-y-3 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#005448] text-white flex items-center justify-center mx-auto shadow-xl shadow-[#005448]/20">
          <HeartPulse className="w-9 h-9" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#121E1C] dark:text-white tracking-tight">AroggyaGram</h1>
          <p className="text-xs font-bold text-[#2E7A5B] dark:text-emerald-400 uppercase tracking-widest mt-1">
            Rural Health & Assistance Network
          </p>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="my-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-black text-stone-900 dark:text-white">Choose Your Role to Enter</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">Sign in with phone or tap one-click profile</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleRoleChange('patient')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedRole === 'patient'
                ? 'border-[#005448] dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#14211F] hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-2 text-stone-900 dark:text-white font-black text-sm">
              <HeartPulse className="w-4 h-4 text-[#005448] dark:text-emerald-400" />
              <span>Citizen / Patient</span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
              Access AI consultation, SOS rescue, and local help requests.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange('volunteer')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedRole === 'volunteer'
                ? 'border-[#005448] dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm'
                : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#14211F] hover:border-stone-300'
            }`}
          >
            <div className="flex items-center gap-2 text-stone-900 dark:text-white font-black text-sm">
              <ShieldCheck className="w-4 h-4 text-[#2E7A5B] dark:text-emerald-400" />
              <span>Volunteer</span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
              Discover nearby needs, navigate requests, and support neighbors.
            </p>
          </button>
        </div>

        {/* Input Form with clean placeholders */}
        <form onSubmit={handleSignIn} className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3.5 transition-colors">
          <div>
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
              Your Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-3 pl-10 text-sm font-semibold bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-white focus:border-[#005448] focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                Registered Mobile Number
              </label>
              <span className={`text-[11px] font-semibold ${phoneNumber.length === 10 ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                {phoneNumber.length}/10 digits
              </span>
            </div>
            <div className="relative">
              <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={`w-full border rounded-xl p-3 pl-10 text-sm font-semibold bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-white focus:outline-none transition-colors ${
                  phoneError
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-stone-300 dark:border-stone-700 focus:border-[#005448]'
                }`}
                required
              />
            </div>
            {phoneError && (
              <p className="text-xs text-red-500 font-medium mt-1.5 flex items-center gap-1">
                {phoneError}
              </p>
            )}
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
      <div className="text-center text-xs text-stone-400 dark:text-stone-500 space-y-1">
        <p className="font-semibold text-stone-500 dark:text-stone-400">AroggyaGram Privacy Pledge</p>
        <p>Patient health details and exact coordinates are strictly isolated.</p>
      </div>
    </div>
  );
};
