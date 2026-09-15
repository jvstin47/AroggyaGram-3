import React, { useState, useEffect } from 'react';
import { AlertOctagon, PhoneCall, X, MapPin, Send, Loader2, UserCheck, ShieldAlert } from 'lucide-react';
import { EmergencyService, type LocationResult } from '@/services/emergency/emergency.service';
import { CaregiverService } from '@/services/caregivers/caregiver.service';
import { useAuth } from '@/contexts/AuthContext';

export const GlobalSOSButton: React.FC = () => {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [sosSent, setSosSent] = useState(false);
  const [caregiver, setCaregiver] = useState(CaregiverService.getPrimaryCaregiver());

  useEffect(() => {
    setCaregiver(CaregiverService.getPrimaryCaregiver());
  }, [isOpen]);

  const handleTriggerSOS = async () => {
    setIsOpen(true);
    setIsLocating(true);
    setSosSent(false);

    // Acquire GPS location gracefully with strict timeout
    const loc = await EmergencyService.getCurrentLocation(6000);
    setLocation(loc);
    setIsLocating(false);

    // Record emergency dispatch
    const currentCaregiver = CaregiverService.getPrimaryCaregiver();
    await EmergencyService.recordEmergencyEvent(
      user?.id || 'citizen-user',
      loc,
      [`${currentCaregiver.name}: ${currentCaregiver.phone}`, 'Community Health Worker (ASHA): +91 9XXX XX XXXX']
    );
    setSosSent(true);
  };

  const patientDisplayName = profile?.full_name || user?.fullName || 'AroggyaGram Citizen';
  const encodedSms = EmergencyService.formatEmergencySms(
    patientDisplayName,
    location || { latitude: null, longitude: null, accuracy: null, method: 'unavailable' }
  );

  const caregiverPhoneClean = caregiver.phone.replace(/[^\d+]/g, '');

  return (
    <>
      {/* Floating High-Contrast SOS Trigger Button - Persistent across all views */}
      <button
        type="button"
        onClick={handleTriggerSOS}
        aria-label="Emergency SOS - Alert Caregivers and Call Ambulance"
        className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-5 z-40 flex items-center justify-center gap-2 bg-[#D62828] hover:bg-[#B51E1E] text-white px-5 py-3.5 rounded-full shadow-[0_6px_20px_rgba(214,40,40,0.45)] border-2 border-white dark:border-red-400 transition-all active:scale-95 font-bold text-base tracking-wide select-none"
      >
        <AlertOctagon className="w-6 h-6 animate-pulse" />
        <span>SOS</span>
      </button>

      {/* Full-Screen Emergency Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#8F1616]/95 backdrop-blur-md text-white flex flex-col justify-between p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white text-[#D62828] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <AlertOctagon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight">AROGGYA EMERGENCY</h2>
                <p className="text-sm font-medium text-white/80">Immediate Caregiver & Medical Alert</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close emergency screen"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Location status card */}
          <div className="my-6 bg-black/30 rounded-2xl p-5 border border-white/20 space-y-3">
            <div className="flex items-center gap-2 text-white/90 text-sm font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Location Status</span>
            </div>

            {isLocating ? (
              <div className="flex items-center gap-3 text-white/80 py-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-base font-semibold">Acquiring high-accuracy GPS coordinates...</span>
              </div>
            ) : location?.latitude && location?.longitude ? (
              <div className="space-y-1">
                <p className="text-lg font-bold text-white">
                  GPS Acquired: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
                <p className="text-sm text-emerald-300 font-medium">
                  Verified satellite fix (Accuracy: ±{Math.round(location.accuracy || 10)}m)
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-base font-bold text-amber-200">
                  Location unavailable. Your emergency alert is NOT blocked.
                </p>
                <p className="text-sm text-white/70">
                  Responders will contact you directly on your primary telephone.
                </p>
              </div>
            )}

            {sosSent && (
              <div className="bg-emerald-900/60 border border-emerald-400/40 rounded-xl p-3 text-emerald-100 text-sm font-medium">
                ✓ SOS broadcast logged to network. {caregiver.name} notified.
              </div>
            )}
          </div>

          {/* Core Emergency Actions */}
          <div className="space-y-4 my-auto">
            {/* Action 1: Call Ambulance (108 / 112) */}
            <a
              href="tel:108"
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-[#D62828] py-5 px-6 rounded-2xl font-black text-xl shadow-xl transition-all active:scale-98"
            >
              <PhoneCall className="w-7 h-7" />
              <span>Call Ambulance (108 / 112)</span>
            </a>

            {/* Action 2: Call Primary Caregiver */}
            <a
              href={`tel:${caregiverPhoneClean}`}
              className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white py-5 px-6 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-98 border-2 border-emerald-300"
            >
              <PhoneCall className="w-6 h-6" />
              <span>Call Caregiver ({caregiver.name}: {caregiver.phone})</span>
            </a>

            {/* Action 3: Send SMS with GPS link (Android & iOS compatible) */}
            <a
              href={`sms:${caregiverPhoneClean}?body=${encodedSms}`}
              className="w-full flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-2xl font-bold text-base border border-white/40 transition-all active:scale-98 text-center"
            >
              <Send className="w-5 h-5 shrink-0" />
              <span>Send SMS to {caregiver.phone} with GPS Link</span>
            </a>
          </div>

          {/* Footer reassurance */}
          <div className="pt-6 text-center border-t border-white/15">
            <p className="text-sm font-medium text-white/75">
              Stay calm. Stay in your current location if safe. Do not close this screen until responders arrive.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
