import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles, Activity, Clock, User, ChevronRight, Filter,
  ShieldCheck, AlertTriangle, ArrowRight, HeartPulse, CheckCircle2
} from 'lucide-react';
import { ResponseOrchestrator } from '@/services/orchestration/orchestrator.service';
import type { CareCase, CareCaseStatus } from '@/types/careCase.types';
import { CareCaseIntakeModal } from './CareCaseIntakeModal';

export const CareCaseListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CareCase[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'critical' | 'resolved'>('all');
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = () => {
    const list = ResponseOrchestrator.getCareCases();
    setCases(list);
  };

  const filtered = cases.filter((c) => {
    if (filter === 'active') return ['ACTION_REQUIRED', 'MATCHING', 'ASSIGNED', 'IN_PROGRESS', 'FOLLOW_UP'].includes(c.status);
    if (filter === 'critical') return c.healthContext.riskLevel === 'CRITICAL' || c.status === 'ESCALATED';
    if (filter === 'resolved') return c.status === 'RESOLVED';
    return true;
  });

  const getStatusBadge = (status: CareCaseStatus) => {
    switch (status) {
      case 'IN_PROGRESS':
        return <span className="bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">IN PROGRESS</span>;
      case 'ACTION_REQUIRED':
        return <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">ACTION REQUIRED</span>;
      case 'ASSIGNED':
        return <span className="bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">ASSIGNED</span>;
      case 'RESOLVED':
        return <span className="bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">RESOLVED</span>;
      case 'ESCALATED':
        return <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">EMERGENCY</span>;
      default:
        return <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="pb-36 px-4 pt-3 max-w-xl mx-auto space-y-5 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7A5B] dark:text-emerald-400">
            Coordinated Action
          </span>
          <h2 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            Care Network Cases
          </h2>
        </div>
        
        <button
          type="button"
          onClick={() => setIsIntakeOpen(true)}
          className="bg-[#005448] dark:bg-emerald-600 hover:bg-[#004037] dark:hover:bg-emerald-700 text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          New Case
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {(['all', 'active', 'critical', 'resolved'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-[#005448] dark:bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {tab} {tab === 'all' ? `(${cases.length})` : ''}
          </button>
        ))}
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/care-cases/${item.id}`)}
            className="bg-white dark:bg-[#14211F] border border-stone-200 dark:border-[#223733] hover:border-[#005448] dark:hover:border-emerald-500 p-4 rounded-2xl shadow-sm cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                    {item.trackingNumber}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                    {item.personContext.fullName} {item.personContext.age ? `(${item.personContext.age}y)` : ''}
                  </span>
                </div>
                <h3 className="text-sm font-black text-stone-900 dark:text-white leading-snug">
                  {item.immediateNeed.title}
                </h3>
              </div>
              <div>{getStatusBadge(item.status)}</div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
              {item.immediateNeed.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-[#1E302C] text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-3">
                <span
                  className={`font-black uppercase text-[10px] px-2 py-0.5 rounded ${
                    item.healthContext.riskLevel === 'CRITICAL'
                      ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                      : item.healthContext.riskLevel === 'HIGH'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      : 'bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300'
                  }`}
                >
                  {item.healthContext.riskLevel}
                </span>

                {item.assignedVolunteer && (
                  <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#005448] dark:text-emerald-400" />
                    {item.assignedVolunteer.fullName}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[#005448] dark:text-emerald-400 font-bold text-[11px]">
                Mission Control
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-[#14211F] rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 space-y-2">
            <HeartPulse className="w-8 h-8 text-stone-400 dark:text-stone-500 mx-auto" />
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300">No cases found matching filter</p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">Try switching tabs or creating a new Care Case.</p>
          </div>
        )}
      </div>

      <CareCaseIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => {
          setIsIntakeOpen(false);
          loadCases();
        }}
      />
    </div>
  );
};
