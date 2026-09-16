import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  PhoneCall,
  ArrowLeft,
  AlertOctagon,
  Search,
  X,
  Clock,
  Ambulance,
  Bed,
  ShieldCheck,
  Stethoscope,
  Droplets,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { FacilityService } from '@/services/location/facility.service';
import type { HealthcareFacility } from '@/types/database.types';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/i18n/translations';

export const FacilityDiscoveryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const t = getTranslation(profile?.language);

  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [filter, setFilter] = useState<'all' | 'hospital' | 'clinic' | 'pharmacy'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await FacilityService.getNearbyFacilities(undefined, undefined, filter);
      setFacilities(data);
      setLoading(false);
    };
    load();
  }, [filter]);

  // Client-side filtering by search query (hospital name, specialties, address, or schemes)
  const filteredFacilities = useMemo(() => {
    if (!searchQuery.trim()) return facilities;
    const q = searchQuery.toLowerCase().trim();
    return facilities.filter((fac) => {
      const matchName = fac.name.toLowerCase().includes(q);
      const matchAddress = fac.address.toLowerCase().includes(q);
      const matchLevel = fac.facility_level?.toLowerCase().includes(q) || false;
      const matchSpecialty = fac.specialties?.some((s) => s.toLowerCase().includes(q)) || false;
      const matchScheme = fac.schemes_accepted?.some((s) => s.toLowerCase().includes(q)) || false;
      return matchName || matchAddress || matchLevel || matchSpecialty || matchScheme;
    });
  }, [facilities, searchQuery]);

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-5 text-stone-900 dark:text-stone-100 transition-colors">
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
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">{t.facilities_title}</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.facilities_subtitle}</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.facilities_search_placeholder}
          className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#14211F] border border-stone-200 dark:border-[#223733] rounded-2xl text-xs font-medium text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#005448] dark:focus:ring-emerald-500 transition-all shadow-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: t.facilities_all },
          { id: 'hospital', label: t.facilities_hospitals },
          { id: 'clinic', label: t.facilities_clinics },
          { id: 'pharmacy', label: t.facilities_pharmacies }
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

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-[#223733] animate-pulse space-y-3">
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
              <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
              <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* No Results Empty State */}
      {!loading && filteredFacilities.length === 0 && (
        <div className="text-center py-12 px-4 bg-white dark:bg-[#14211F] rounded-3xl border border-dashed border-stone-200 dark:border-[#223733]">
          <Info className="w-10 h-10 text-stone-400 mx-auto mb-2" />
          <p className="text-sm font-bold text-stone-700 dark:text-stone-300">{t.facilities_no_results}</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
            }}
            className="mt-3 text-xs font-bold text-[#005448] dark:text-emerald-400 hover:underline cursor-pointer"
          >
            Reset search & filters
          </button>
        </div>
      )}

      {/* Facility Cards */}
      <div className="space-y-4">
        {filteredFacilities.map((fac) => {
          const isExpanded = selectedFacility?.id === fac.id;

          return (
            <div
              key={fac.id}
              className="bg-white dark:bg-[#14211F] p-4 sm:p-5 rounded-3xl border border-stone-200 dark:border-[#223733] shadow-sm space-y-3.5 hover:border-[#005448] dark:hover:border-emerald-500 transition-all"
            >
              {/* Header: Type, Emergency Badge, Distance */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded-md">
                      {fac.type.toUpperCase()}
                    </span>
                    {fac.has_emergency && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" />
                        {t.facilities_er_24}
                      </span>
                    )}
                    {fac.rating && (
                      <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-md">
                        ★ {fac.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-black text-stone-900 dark:text-white leading-tight">{fac.name}</h2>
                  {fac.facility_level && (
                    <p className="text-[11px] font-semibold text-[#005448] dark:text-emerald-400">{fac.facility_level}</p>
                  )}
                  <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{fac.address}</span>
                  </p>
                </div>

                <span className="text-xs font-bold text-[#005448] dark:text-emerald-300 bg-[#E0F2EE] dark:bg-emerald-950 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                  {fac.distance_km} km
                </span>
              </div>

              {/* Operating Hours & Key Clinical Specs */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                {fac.operating_hours && (
                  <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#005448] dark:text-emerald-400" />
                    {fac.operating_hours}
                  </span>
                )}
                {fac.has_icu && fac.icu_beds && fac.icu_beds > 0 && (
                  <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {fac.icu_beds} {t.facilities_icu}
                  </span>
                )}
                {fac.total_beds && fac.total_beds > 0 && (
                  <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                    <Bed className="w-3 h-3 text-stone-400" />
                    {fac.total_beds} {t.facilities_beds}
                  </span>
                )}
                {fac.has_ambulance && (
                  <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                    <Ambulance className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    {t.facilities_ambulance}
                  </span>
                )}
                {fac.has_blood_bank && (
                  <span className="bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-rose-600" />
                    {t.facilities_blood_bank}
                  </span>
                )}
                {fac.duty_doctor_available && (
                  <span className="bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                    <Stethoscope className="w-3 h-3" />
                    {t.facilities_duty_doctor}
                  </span>
                )}
              </div>

              {/* Specialties preview pills */}
              {fac.specialties && fac.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {fac.specialties.slice(0, 3).map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                  {fac.specialties.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setSelectedFacility(isExpanded ? null : fac)}
                      className="text-[10px] font-bold text-[#005448] dark:text-emerald-400 hover:underline px-1 py-0.5 cursor-pointer"
                    >
                      +{fac.specialties.length - 3} more
                    </button>
                  )}
                </div>
              )}

              {/* Accepted Government & Insurance Schemes */}
              {fac.schemes_accepted && fac.schemes_accepted.length > 0 && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate font-semibold">
                    {fac.schemes_accepted.slice(0, 2).join(' • ')}
                    {fac.schemes_accepted.length > 2 ? ` (+${fac.schemes_accepted.length - 2})` : ''}
                  </span>
                </div>
              )}

              {/* Expanded Clinical Profile Drawer */}
              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 space-y-3 text-xs animate-in fade-in duration-200">
                  {fac.description && (
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-normal bg-stone-50 dark:bg-stone-800/50 p-3 rounded-2xl">
                      {fac.description}
                    </p>
                  )}

                  {/* All Specialties */}
                  {fac.specialties && fac.specialties.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-[#005448] dark:text-emerald-400" />
                        {t.facilities_specialties}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {fac.specialties.map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-50 dark:bg-emerald-950/60 text-[#005448] dark:text-emerald-300 text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Schemes */}
                  {fac.schemes_accepted && fac.schemes_accepted.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {t.facilities_schemes}
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {fac.schemes_accepted.map((sch, idx) => (
                          <span
                            key={idx}
                            className="bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-medium px-2 py-0.5 rounded-lg border border-stone-200 dark:border-stone-700"
                          >
                            {sch}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Operational Facilities Checklist */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">{t.facilities_lab}</span>
                      <span className={`font-bold ${fac.has_diagnostic_lab ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                        {fac.has_diagnostic_lab ? '✓ Yes' : '—'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">{t.facilities_pharmacy}</span>
                      <span className={`font-bold ${fac.has_pharmacy ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                        {fac.has_pharmacy ? '✓ Yes' : '—'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">{t.facilities_blood_bank}</span>
                      <span className={`font-bold ${fac.has_blood_bank ? 'text-rose-600 dark:text-rose-400' : 'text-stone-400'}`}>
                        {fac.has_blood_bank ? '✓ Available' : '—'}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <span className="text-stone-500 dark:text-stone-400 font-medium">{t.facilities_ambulance}</span>
                      <span className={`font-bold ${fac.has_ambulance ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                        {fac.has_ambulance ? '✓ 24/7' : '—'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="flex gap-2">
                  <a
                    href={`tel:${fac.phone}`}
                    className="flex-1 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-[#005448] dark:text-emerald-400" />
                    <span>{t.btn_call}</span>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${fac.latitude},${fac.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 bg-[#005448] dark:bg-emerald-600 hover:bg-[#004239] dark:hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{t.btn_directions}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedFacility(isExpanded ? null : fac)}
                    className="p-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl transition-colors cursor-pointer"
                    aria-label={isExpanded ? t.facilities_close_details : t.facilities_view_details}
                    title={isExpanded ? t.facilities_close_details : t.facilities_view_details}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Direct Emergency Ambulance Dispatch Button if available */}
                {fac.has_ambulance && fac.ambulance_phone && (
                  <a
                    href={`tel:${fac.ambulance_phone}`}
                    className="w-full py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Ambulance className="w-4 h-4 text-red-600 dark:text-red-400 animate-pulse" />
                    <span>Call Ambulance Hotline: {fac.ambulance_phone}</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
