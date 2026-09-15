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
  const { user, signInDev } = useAuth();
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
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6">
      {/* Top Header & Role switcher */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E7A5B]">
            Volunteer Network
          </span>
          <h1 className="text-2xl font-black text-[#121E1C] tracking-tight">
            Hi, Rahul Nair 🙌
          </h1>
        </div>

        <button
          onClick={() => {
            signInDev('patient');
            navigate('/home');
          }}
          className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-3 py-1.5 rounded-full border border-stone-300"
        >
          Switch to Citizen
        </button>
      </div>

      {/* Trust & Verification Card */}
      <div className="bg-white border border-[#E8E6DF] p-4 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-stone-900">Community Verified</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-xs text-stone-500">
              Kanjirappally Ward #4 · {MOCK_VOLUNTEER_PROFILE.completed_tasks} tasks completed
            </p>
          </div>
        </div>

        <span className="text-sm font-black text-[#005448] bg-[#E0F2EE] px-3 py-1 rounded-full">
          ⭐ {MOCK_VOLUNTEER_PROFILE.average_rating}
        </span>
      </div>

      {/* Safety Guardrail Banner */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Community Volunteer Reminder:</strong> You are assisting as a trusted neighbor. You are not a certified doctor. Only provide the specified delivery or accompaniment assistance.
        </div>
      </div>

      {/* Tabs & View Mode toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-bold text-stone-600">
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'available' ? 'bg-white text-[#005448] shadow-sm' : ''
            }`}
          >
            Nearby ({availableRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'active' ? 'bg-white text-[#005448] shadow-sm' : ''
            }`}
          >
            My Active ({activeRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-3 rounded-xl transition-all ${
              activeTab === 'history' ? 'bg-white text-[#005448] shadow-sm' : ''
            }`}
          >
            Done ({completedRequests.length})
          </button>
        </div>

        {activeTab === 'available' && (
          <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl ${viewMode === 'list' ? 'bg-white text-[#005448] shadow-sm' : 'text-stone-500'}`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-xl ${viewMode === 'map' ? 'bg-white text-[#005448] shadow-sm' : 'text-stone-500'}`}
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
                    className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-3 hover:border-[#005448] transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {req.category.replace('_', ' ')}
                        </span>
                        <h3 className="text-lg font-black text-stone-900 mt-1">{req.title}</h3>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                        {req.urgency.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">{req.description}</p>

                    {/* Match explanation */}
                    <div className="bg-[#FAF9F4] p-2.5 rounded-xl border border-[#E8E6DF] text-[11px] text-stone-600">
                      <strong>Matching Score ({match.totalScore}/100):</strong> {match.explanation}
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-stone-500 font-medium">
                      <span>Location: {req.address}</span>
                      <button
                        type="button"
                        onClick={() => handleAccept(req.id)}
                        className="py-2 px-4 bg-[#005448] hover:bg-[#004239] text-white rounded-xl font-bold transition-all active:scale-95 shadow-md"
                      >
                        Accept Task
                      </button>
                    </div>
                  </div>
                );
              })}

              {availableRequests.length === 0 && (
                <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-stone-800">All caught up!</p>
                  <p className="text-xs text-stone-500">No open requests in your area right now.</p>
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
                          Accept
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
              className="bg-emerald-50/60 p-5 rounded-3xl border-2 border-emerald-300 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Active Mission
                  </span>
                  <h3 className="text-lg font-black text-stone-900 mt-1">{req.title}</h3>
                </div>
              </div>

              <p className="text-xs text-stone-700 leading-relaxed">{req.description}</p>
              <p className="text-xs font-semibold text-stone-600">Location: {req.address}</p>

              <div className="flex gap-2 pt-2">
                <a
                  href={`https://maps.google.com/?q=${req.latitude},${req.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-white border border-stone-300 text-stone-800 rounded-xl font-bold text-xs text-center shadow-xs"
                >
                  Navigate on Maps
                </a>
                <button
                  type="button"
                  onClick={() => handleComplete(req.id)}
                  className="flex-1 py-2.5 bg-[#2E7A5B] hover:bg-[#256349] text-white rounded-xl font-bold text-xs shadow-md"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          ))}

          {activeRequests.length === 0 && (
            <div className="text-center py-10 bg-white rounded-3xl border border-stone-200">
              <p className="text-sm font-bold text-stone-700">No active tasks in progress</p>
              <p className="text-xs text-stone-500 mt-1">Accept a nearby request to help a neighbor.</p>
            </div>
          )}
        </div>
      )}

      {/* TASK HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {completedRequests.map((req) => (
            <div key={req.id} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-stone-900">{req.title}</h4>
                <p className="text-xs text-stone-500">{req.category.replace('_', ' ')} · Completed</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
          ))}
          {completedRequests.length === 0 && (
            <div className="text-center py-8 text-xs text-stone-500">
              No completed tasks yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
