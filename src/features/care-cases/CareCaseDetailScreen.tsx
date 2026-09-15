import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Shield, AlertTriangle, CheckCircle2, Clock, Phone,
  MapPin, User, Activity, Sparkles, HeartPulse, ChevronRight,
  ExternalLink, CheckSquare, MessageSquare, Send, Car, Navigation
} from 'lucide-react';
import { ResponseOrchestrator } from '@/services/orchestration/orchestrator.service';
import { MatchingService } from '@/services/matching/matching.service';
import type { CareCase, CareCaseStatus, AssignedVolunteer } from '@/types/careCase.types';
import { useAuth } from '@/contexts/AuthContext';

export const CareCaseDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [careCase, setCareCase] = useState<CareCase | null>(null);
  const [followUpSymptoms, setFollowUpSymptoms] = useState(true);
  const [followUpMeds, setFollowUpMeds] = useState(true);
  const [followUpComfort, setFollowUpComfort] = useState(true);
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [isMatchingActive, setIsMatchingActive] = useState(false);

  useEffect(() => {
    if (id) {
      const found = ResponseOrchestrator.getCareCaseById(id);
      if (found) {
        setCareCase(found);
      }
    }
  }, [id]);

  if (!careCase) {
    return (
      <div className="p-8 text-center space-y-4 max-w-md mx-auto pt-20">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h3 className="text-lg font-bold text-stone-800">Care Case Not Found</h3>
        <p className="text-xs text-stone-500">The requested care case could not be located in local memory.</p>
        <button
          type="button"
          onClick={() => navigate('/care-cases')}
          className="px-5 py-2.5 bg-[#005448] text-white text-xs font-bold rounded-xl"
        >
          View All Cases
        </button>
      </div>
    );
  }

  const handleStateAdvance = (newStatus: CareCaseStatus, note?: string) => {
    const updated = ResponseOrchestrator.advanceStatus(
      careCase,
      newStatus,
      note,
      'system',
      user?.fullName || profile?.full_name || 'Care Coordinator'
    );
    setCareCase({ ...updated });
  };

  const handleTriggerMatching = () => {
    setIsMatchingActive(true);
    setTimeout(() => {
      // Create a high-scoring realistic match
      const matchedVolunteer: AssignedVolunteer = {
        id: 'vol-rahul',
        fullName: 'Rahul Nair',
        phone: '+91 94471 22334',
        rating: 4.9,
        tasksCompleted: 48,
        skills: ['vehicle_owner', 'first_aid_certified', 'malayalam_fluent'],
        distanceKm: 1.4,
        matchScore: 94,
        matchExplanation: 'Rahul is 1.4 km away, has two-wheeler transport, first-aid certification, and fluent Malayalam.',
        verificationBadge: 'Community First Responder',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      };

      const updated = ResponseOrchestrator.assignVolunteer(careCase, matchedVolunteer);
      setCareCase({ ...updated });
      setIsMatchingActive(false);
    }, 1200);
  };

  const handleCompleteFollowUp = () => {
    const updated = ResponseOrchestrator.completeFollowUp(careCase, {
      symptomsImproved: followUpSymptoms,
      medicationsReceived: followUpMeds,
      patientComfortable: followUpComfort,
      notes: followUpNotes || 'Patient confirmed feeling better and medicine safely received.'
    });
    setCareCase({ ...updated });
  };

  const getStatusBadge = (status: CareCaseStatus) => {
    switch (status) {
      case 'DRAFT':
        return <span className="bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full text-xs font-bold">DRAFT</span>;
      case 'ANALYZING':
        return <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">ANALYZING</span>;
      case 'ASSESSED':
        return <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-bold">ASSESSED</span>;
      case 'ACTION_REQUIRED':
        return <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-bold">ACTION REQUIRED</span>;
      case 'MATCHING':
        return <span className="bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full text-xs font-bold animate-pulse">MATCHING RESPONDER</span>;
      case 'ASSIGNED':
        return <span className="bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full text-xs font-bold">RESPONDER ASSIGNED</span>;
      case 'IN_PROGRESS':
        return <span className="bg-emerald-100 text-[#005448] px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />IN PROGRESS</span>;
      case 'COMPLETED':
        return <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-bold">COMPLETED</span>;
      case 'FOLLOW_UP':
        return <span className="bg-orange-100 text-orange-800 px-2.5 py-0.5 rounded-full text-xs font-bold">FOLLOW-UP ACTIVE</span>;
      case 'RESOLVED':
        return <span className="bg-stone-200 text-stone-800 px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />RESOLVED & CLOSED</span>;
      case 'ESCALATED':
        return <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold animate-bounce">108 EMERGENCY DISPATCH</span>;
      default:
        return <span className="bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="pb-36 px-4 pt-3 max-w-xl mx-auto space-y-5">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/care-cases')}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Care Network Cases
        </button>

        <span className="text-xs font-mono font-bold text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
          {careCase.trackingNumber}
        </span>
      </div>

      {/* MISSION CONTROL HERO BANNER */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0B4D42] text-white p-5 rounded-3xl shadow-xl shadow-[#005448]/20 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-200 block mb-1">
              Care Case Mission Control
            </span>
            <h2 className="text-xl font-black tracking-tight leading-tight">
              {careCase.immediateNeed.title}
            </h2>
          </div>
          <div>{getStatusBadge(careCase.status)}</div>
        </div>

        {/* Quick Meta Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-emerald-100 border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-300" />
            <span>{careCase.personContext.fullName} {careCase.personContext.age ? `(${careCase.personContext.age}y)` : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span className="truncate max-w-[150px]">{careCase.address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-300" />
            <span>{new Date(careCase.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* WHO & RISK CARDS (2-COL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* WHO: PERSON CONTEXT */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005448]">
              <User className="w-4 h-4" />
              Person Context
            </div>
            <span className="text-[11px] font-bold text-stone-500 capitalize">
              {careCase.personContext.livingSituation.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Mobility:</span>
              <span className="font-semibold text-stone-800 capitalize">
                {careCase.personContext.mobilityLevel.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Language:</span>
              <span className="font-semibold text-stone-800 uppercase">
                {careCase.personContext.primaryLanguage}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Vulnerability Index:</span>
              <span className="font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {careCase.personContext.vulnerabilityScore} / 100
              </span>
            </div>
            {careCase.personContext.emergencyContactPhone && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-stone-500">Family Alert:</span>
                <a
                  href={`tel:${careCase.personContext.emergencyContactPhone}`}
                  className="font-bold text-[#005448] flex items-center gap-1 text-[11px]"
                >
                  <Phone className="w-3 h-3" />
                  {careCase.personContext.emergencyContactName || 'Caregiver'}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* CLINICAL TRIAGE & RISK */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005448]">
              <Activity className="w-4 h-4" />
              Clinical Triage
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                careCase.healthContext.riskLevel === 'CRITICAL'
                  ? 'bg-red-600 text-white'
                  : careCase.healthContext.riskLevel === 'HIGH'
                  ? 'bg-amber-600 text-white'
                  : careCase.healthContext.riskLevel === 'MODERATE'
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {careCase.healthContext.riskLevel} RISK
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            {careCase.healthContext.knownConditions.length > 0 && (
              <div>
                <span className="text-stone-500 block text-[10px] font-bold uppercase">Chronic Conditions:</span>
                <p className="font-semibold text-stone-800">
                  {careCase.healthContext.knownConditions.join(', ')}
                </p>
              </div>
            )}
            {careCase.healthContext.currentMedications.length > 0 && (
              <div>
                <span className="text-stone-500 block text-[10px] font-bold uppercase">Medications:</span>
                <p className="font-semibold text-stone-800">
                  {careCase.healthContext.currentMedications.join(', ')}
                </p>
              </div>
            )}
            {careCase.healthContext.vitalSigns?.bloodPressure && (
              <div className="flex justify-between">
                <span className="text-stone-500">Baseline BP:</span>
                <span className="font-bold text-stone-900">{careCase.healthContext.vitalSigns.bloodPressure}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* WHAT: IMMEDIATE NEED & CONSTRAINTS */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005448]">
          <HeartPulse className="w-4 h-4" />
          Immediate Need & Constraints
        </div>
        <p className="text-xs text-stone-700 leading-relaxed font-medium">
          {careCase.immediateNeed.description}
        </p>

        {careCase.constraints.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {careCase.constraints.map((c, i) => (
              <span key={i} className="text-[10px] bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* RESPONSE ORCHESTRATION PLAN & LIVE ACTIONS */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005448]">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              4-Step Response Orchestration Plan
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Estimated Resolution: ~{careCase.responsePlan.estimatedResolutionMins} mins
            </p>
          </div>

          {/* Quick Action to Advance Status */}
          <div className="flex items-center gap-1.5">
            {careCase.status === 'ACTION_REQUIRED' && (
              <button
                type="button"
                onClick={handleTriggerMatching}
                disabled={isMatchingActive}
                className="bg-[#005448] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow hover:bg-[#004037] transition-all flex items-center gap-1"
              >
                {isMatchingActive ? 'Matching...' : 'Find Volunteer'}
              </button>
            )}

            {careCase.status === 'ASSIGNED' && (
              <button
                type="button"
                onClick={() => handleStateAdvance('IN_PROGRESS', 'Volunteer dispatched and en-route to patient location.')}
                className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow hover:bg-emerald-700 transition-all flex items-center gap-1"
              >
                <Car className="w-3.5 h-3.5" />
                Start En Route
              </button>
            )}

            {careCase.status === 'IN_PROGRESS' && (
              <button
                type="button"
                onClick={() => handleStateAdvance('COMPLETED', 'Volunteer arrived, handed over medicines, verified patient vitals.')}
                className="bg-green-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow hover:bg-green-800 transition-all flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mark Delivered
              </button>
            )}
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {careCase.responsePlan.steps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-colors ${
                step.status === 'completed'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : step.status === 'in_progress'
                  ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/30'
                  : 'bg-stone-50 border-stone-200 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 bg-white border border-stone-200 shadow-sm">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      idx + 1
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-stone-900 leading-snug">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                    {step.actorName && (
                      <p className="text-[11px] font-semibold text-[#005448] mt-1 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Assigned: {step.actorName} {step.actorPhone ? `(${step.actorPhone})` : ''}
                      </p>
                    )}
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                    step.status === 'completed'
                      ? 'bg-emerald-200 text-emerald-900'
                      : step.status === 'in_progress'
                      ? 'bg-amber-200 text-amber-900 animate-pulse'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {step.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ASSIGNED VOLUNTEER & "WHY THIS MATCH?" */}
      {careCase.assignedVolunteer && (
        <div className="bg-white border-2 border-emerald-500/40 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#005448]">
              <Shield className="w-4 h-4 text-emerald-600" />
              Assigned First Responder
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {careCase.assignedVolunteer.matchScore}/100 Match Score
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={careCase.assignedVolunteer.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
              alt={careCase.assignedVolunteer.fullName}
              className="w-12 h-12 rounded-xl object-cover border border-stone-200"
            />
            <div className="flex-1">
              <h4 className="text-sm font-black text-stone-900">
                {careCase.assignedVolunteer.fullName}
              </h4>
              <p className="text-[11px] text-stone-500 font-medium">
                {careCase.assignedVolunteer.verificationBadge} • {careCase.assignedVolunteer.tasksCompleted} tasks completed
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-amber-600">
                  ★ {careCase.assignedVolunteer.rating}
                </span>
                <span className="text-xs text-stone-400">•</span>
                <span className="text-xs font-semibold text-stone-600">
                  {careCase.assignedVolunteer.distanceKm} km away
                </span>
              </div>
            </div>
            <a
              href={`tel:${careCase.assignedVolunteer.phone}`}
              className="w-10 h-10 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-[#005448] flex items-center justify-center transition-colors shadow-sm shrink-0"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Explainability Card */}
          <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-xl text-xs text-[#004037] leading-relaxed">
            <span className="font-bold block text-[10px] uppercase text-emerald-800 mb-0.5">Why this match:</span>
            {careCase.assignedVolunteer.matchExplanation}
          </div>
        </div>
      )}

      {/* POST-CARE FOLLOW-UP VERIFICATION */}
      {(careCase.status === 'COMPLETED' || careCase.status === 'FOLLOW_UP' || careCase.status === 'RESOLVED') && (
        <div className="bg-white border-2 border-teal-600/30 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005448]">
              <CheckSquare className="w-4 h-4 text-teal-600" />
              Post-Care Health & Satisfaction Verification
            </div>
            {careCase.status === 'RESOLVED' && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Archived & Closed
              </span>
            )}
          </div>

          {careCase.status !== 'RESOLVED' ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                Please complete the follow-up checklist to verify patient safety and conclude the care case:
              </p>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={followUpSymptoms}
                    onChange={(e) => setFollowUpSymptoms(e.target.checked)}
                    className="w-4 h-4 rounded text-[#005448] focus:ring-[#005448]"
                  />
                  <span className="font-semibold text-stone-800">Patient reports dizziness/symptoms improved</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={followUpMeds}
                    onChange={(e) => setFollowUpMeds(e.target.checked)}
                    className="w-4 h-4 rounded text-[#005448] focus:ring-[#005448]"
                  />
                  <span className="font-semibold text-stone-800">Correct prescription/aid physically received</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={followUpComfort}
                    onChange={(e) => setFollowUpComfort(e.target.checked)}
                    className="w-4 h-4 rounded text-[#005448] focus:ring-[#005448]"
                  />
                  <span className="font-semibold text-stone-800">Patient is in a safe and comfortable condition</span>
                </label>
              </div>

              <input
                type="text"
                value={followUpNotes}
                onChange={(e) => setFollowUpNotes(e.target.value)}
                placeholder="Optional closing observation notes..."
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#005448]"
              />

              <button
                type="button"
                onClick={handleCompleteFollowUp}
                className="w-full py-2.5 bg-[#005448] hover:bg-[#004037] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Verification & Archive Case
              </button>
            </div>
          ) : (
            <div className="text-xs space-y-1 text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200">
              <p className="font-bold text-emerald-800">✓ Follow-Up Verification Confirmed</p>
              <p className="text-[11px] text-stone-500">
                Symptoms resolved, medication delivery verified, audit log filed. Case successfully completed.
              </p>
            </div>
          )}
        </div>
      )}

      {/* UNIFIED LIVE TIMELINE */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005448]">
            <Clock className="w-4 h-4" />
            Unified Real-Time Audit Log
          </div>
          <span className="text-[11px] font-bold text-stone-500">
            {careCase.events.length} events
          </span>
        </div>

        <div className="space-y-3 relative pl-3 border-l-2 border-stone-200 ml-2">
          {careCase.events.map((evt) => (
            <div key={evt.id} className="relative group">
              <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-[#005448] border-2 border-white ring-2 ring-stone-200" />
              <div>
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-stone-900">{evt.title}</h5>
                  <span className="text-[10px] text-stone-400">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                  {evt.description}
                </p>
                <span className="text-[9px] uppercase font-bold text-stone-400 mt-0.5 inline-block">
                  Actor: {evt.actorRole} {evt.actorName ? `(${evt.actorName})` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
