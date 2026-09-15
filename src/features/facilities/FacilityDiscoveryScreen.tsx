import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, PhoneCall, ArrowLeft, Building2, Pill, Stethoscope, AlertOctagon } from 'lucide-react';
import { FacilityService } from '@/services/location/facility.service';
import type { HealthcareFacility } from '@/types/database.types';

export const FacilityDiscoveryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [filter, setFilter] = useState<'all' | 'hospital' | 'clinic' | 'pharmacy'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await FacilityService.getNearbyFacilities(undefined, undefined, filter);
      setFacilities(data);
      setLoading(false);
    };
    load();
  }, [filter]);

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">Healthcare Facilities</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">Hospitals, PHCs, & Pharmacies nearby</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'All Places' },
          { id: 'hospital', label: 'Hospitals' },
          { id: 'clinic', label: 'Clinics & PHC' },
          { id: 'pharmacy', label: 'Pharmacies' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`whitespace-nowrap py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filter === item.id
                ? 'bg-[#005448] dark:bg-emerald-600 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Facility Cards */}
      <div className="space-y-3.5">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-[#223733] shadow-sm space-y-3 hover:border-[#005448] dark:hover:border-emerald-500 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded-md">
                    {fac.type.toUpperCase()}
                  </span>
                  {fac.has_emergency && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <AlertOctagon className="w-3 h-3" />
                      24/7 ER
                    </span>
                  )}
                </div>
                <h3 className="text-base font-black text-stone-900 dark:text-white">{fac.name}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{fac.address}</span>
                </p>
              </div>

              <span className="text-xs font-bold text-[#005448] dark:text-emerald-300 bg-[#E0F2EE] dark:bg-emerald-950 px-2.5 py-1 rounded-full whitespace-nowrap">
                {fac.distance_km} km
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${fac.phone}`}
                className="flex-1 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#005448] dark:text-emerald-400" />
                <span>Call Center</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${fac.latitude},${fac.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 bg-[#005448] dark:bg-emerald-600 hover:bg-[#004239] dark:hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
