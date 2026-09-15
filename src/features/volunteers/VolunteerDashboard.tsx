import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Map as MapIcon,
  List,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  AlertCircle
} from 'lucide-react';
import { useRequestsQuery } from '@/hooks/useRequestsQuery';
import { useAuth } from '@/contexts/AuthContext';
import { MatchingService } from '@/services/matching/matching.service';
import type { VolunteerProfile } from '@/types/database.types';
import { getTranslation } from '@/i18n/translations';

// Real Leaflet Map integration
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet default icon urls
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MOCK_VOLUNTEER_PROFILE: VolunteerProfile = {
  id: 'dev-volunteer-1',
  skills: ['healthcare_first_responder', 'vehicle_owner'],
  verification_state: 'community_verified',
  service_radius_km: 8,
  completed_tasks: 14,
  average_rating: 4.9,
  is_available: true,
  created_at: new Date().toISOString()
};

export const VolunteerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signInDev } = useAuth();
  const t = getTranslation(profile?.language);
  const { requests, updateStatus } = useRequestsQuery();

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'history'>('available');

  const availableRequests = requests.filter((r) => r.status === 'submitted');
  const activeRequests = requests.filter(
    (r) => r.volunteer_id === user?.id && ['accepted', 'in_progress'].includes(r.status)
  );
  const completedRequests = requests.filter(
    (r) => r.volunteer_id === user?.id && r.status === 'completed'
  );

  const handleAccept = async (id: string) => {
    if (!user) return;
    await updateStatus({ id, status: 'accepted', volunteerId: user.id });
    setActiveTab('active');
  };

  const handleComplete = async (id: string) => {
    await updateStatus({ id, status: 'completed' });
    setActiveTab('history');
  };

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Top Header & Role switcher */}
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E7A5B] dark:text-emerald-400">
            {t.volunteer_network}
          </span>
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">
            Hi, Rahul Nair 🙌
          </h1>
        </div>

        <button
          onClick={() => {
            signInDev('patient');
            navigate('/home');
          }}
          className="text-xs bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700"
        >
          {t.volunteer_switch_citizen}
        </button>
      </div>

      {/* Trust & Verification Card */}
      <div className="bg-white dark:bg-[#14211F] border border-[#E8E6DF] dark:border-stone-800 p-4 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-stone-900 dark:text-white">{t.volunteer_verified}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-stone-500">
              Kanjirappally Ward #4 · {MOCK_VOLUNTEER_PROFILE.completed_tasks} {t.volunteer_tasks_completed}
            </p>
          </div>
        </div>

        <span className="text-sm font-black text-[#005448] dark:text-emerald-300 bg-[#E0F2EE] dark:bg-emerald-950/60 px-3 py-1 rounded-full">
          ⭐ {MOCK_VOLUNTEER_PROFILE.average_rating}
        </span>
      </div>

      {/* Safety Guardrail Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong>{t.volunteer_reminder}</strong> {t.volunteer_reminder_text}
        </div>
      </div>

      {/* Tabs & View Mode toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl text-xs font-bold text-stone-600 dark:text-stone-300">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'available' ? 'bg-white dark:bg-stone-700 text-[#005448] dark:text-emerald-400 shadow-sm' : ''
            }`}
          >
            {t.volunteer_nearby} ({availableRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'active' ? 'bg-white dark:bg-stone-700 text-[#005448] dark:text-emerald-400 shadow-sm' : ''
            }`}
          >
            {t.volunteer_my_active} ({activeRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'history' ? 'bg-white dark:bg-stone-700 text-[#005448] dark:text-emerald-400 shadow-sm' : ''
            }`}
          >
            {t.volunteer_done} ({completedRequests.length})
          </button>
        </div>

        {activeTab === 'available' && (
          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl ${viewMode === 'list' ? 'bg-white dark:bg-stone-700 text-[#005448] dark:text-emerald-400 shadow-sm' : 'text-stone-500'}`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-xl ${viewMode === 'map' ? 'bg-white dark:bg-stone-700 text-[#005448] dark:text-emerald-400 shadow-sm' : 'text-stone-500'}`}
              aria-label="Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* AVAILABLE REQUESTS (LIST OR LEAFLET MAP) */}
      {activeTab === 'available' && (
        <>
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {availableRequests.map((req) => {
                const match = MatchingService.calculateMatchScore(
                  req,
                  MOCK_VOLUNTEER_PROFILE,
                  'Rahul Nair',
                  1.2
                );

                return (
                  <div
                    key={req.id}
                    className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 hover:border-[#005448] dark:hover:border-emerald-600 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                          {req.category.replace('_', ' ')}
                        </span>
                        <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">{req.title}</h3>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-lg">
                        {req.urgency.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{req.description}</p>

                    {/* Match explanation */}
                    <div className="bg-[#FAF9F4] dark:bg-stone-800/60 p-2.5 rounded-xl border border-[#E8E6DF] dark:border-stone-700 text-[11px] text-stone-600 dark:text-stone-400">
                      <strong>{t.volunteer_matching_score} ({match.totalScore}/100):</strong> {match.explanation}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-stone-500 font-medium">
                      <span>Location: {req.address}</span>
                      <button
                        type="button"
                        onClick={() => handleAccept(req.id)}
                        className="py-2 px-4 bg-[#005448] hover:bg-[#004239] text-white rounded-xl font-bold transition-all active:scale-95 shadow-md"
                      >
                        {t.volunteer_accept}
                      </button>
                    </div>
                  </div>
                );
              })}

              {availableRequests.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-[#14211F] rounded-3xl border border-stone-200 dark:border-stone-800">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-stone-800 dark:text-stone-200">{t.volunteer_all_caught_up}</p>
                  <p className="text-xs text-stone-500">{t.volunteer_no_open}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-80 w-full rounded-3xl overflow-hidden border-2 border-stone-200 shadow-md">
              <MapContainer
                center={[9.5550, 76.7885]}
                zoom={14}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {availableRequests.map((req) => (
                  <Marker key={req.id} position={[req.latitude || 9.5550, req.longitude || 76.7885]}>
                    <Popup>
                      <div className="p-1 space-y-1">
                        <strong className="text-xs block">{req.title}</strong>
                        <p className="text-[11px] text-stone-600">{req.description}</p>
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="mt-1 bg-[#005448] text-white text-[10px] font-bold py-1 px-2 rounded-lg"
                        >
                          {t.volunteer_accept}
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </>
      )}

      {/* ACTIVE TASKS */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeRequests.map((req) => (
            <div
              key={req.id}
              className="bg-emerald-50/60 dark:bg-emerald-950/20 p-5 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    {t.volunteer_active_mission}
                  </span>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">{req.title}</h3>
                </div>
              </div>

              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{req.description}</p>
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-400">Location: {req.address}</p>

              <div className="flex gap-2 pt-2">
                <a
                  href={`https://maps.google.com/?q=${req.latitude},${req.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-xl font-bold text-xs text-center shadow-xs"
                >
                  {t.volunteer_navigate}
                </a>
                <button
                  type="button"
                  onClick={() => handleComplete(req.id)}
                  className="flex-1 py-2.5 bg-[#2E7A5B] hover:bg-[#256349] text-white rounded-xl font-bold text-xs shadow-md"
                >
                  {t.volunteer_mark_completed}
                </button>
              </div>
            </div>
          ))}

          {activeRequests.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-[#14211F] rounded-3xl border border-stone-200 dark:border-stone-800">
              <p className="text-sm font-bold text-stone-700 dark:text-stone-300">{t.volunteer_no_active}</p>
              <p className="text-xs text-stone-500 mt-1">{t.volunteer_no_active_hint}</p>
            </div>
          )}
        </div>
      )}

      {/* TASK HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {completedRequests.map((req) => (
            <div key={req.id} className="bg-white dark:bg-[#14211F] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">{req.title}</h4>
                <p className="text-xs text-stone-500">{req.category.replace('_', ' ')} · Completed</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          ))}
          {completedRequests.length === 0 && (
            <div className="text-center py-8 text-xs text-stone-500">
              {t.volunteer_no_completed}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
