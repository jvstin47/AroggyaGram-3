import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, Bot, Pill, AlertOctagon, HelpingHand } from 'lucide-react';
import { useRequestsQuery } from '@/hooks/useRequestsQuery';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';
import { useAuth } from '@/contexts/AuthContext';

interface TimelineEvent {
  time: string;
  type: 'med' | 'ai' | 'request' | 'sos';
  title: string;
  description: string;
  badge: string;
}

export const UnifiedTimelineScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requests } = useRequestsQuery();
  const { medications } = useMedicationsQuery(user?.id || 'dev-patient-1');

  // Unified mock and real events
  const events: TimelineEvent[] = [
    {
      time: '08:30 AM',
      type: 'med',
      title: 'Medication Taken',
      description: 'Metformin 500mg marked taken after breakfast.',
      badge: 'Adherence'
    },
    {
      time: '10:15 AM',
      type: 'ai',
      title: 'Asked Aroggya Consultation',
      description: 'Reported symptoms of mild headache and dehydration. AI recommended fluids and rest.',
      badge: 'LOW RISK'
    },
    ...requests.map((r) => ({
      time: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'request' as const,
      title: r.title,
      description: `Task status: ${r.status.toUpperCase()} · ${r.description}`,
      badge: r.urgency.toUpperCase()
    }))
  ];

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-[#121E1C] tracking-tight">Health & Care Timeline</h1>
          <p className="text-xs text-stone-500 font-medium">Chronological record of health events and assistance</p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 border-l-2 border-stone-200 space-y-6 ml-2">
        {events.map((ev, i) => (
          <div key={i} className="relative space-y-1">
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-4 border-[#005448]" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#005448]">{ev.time}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                {ev.badge}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <h4 className="text-sm font-bold text-stone-900">{ev.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{ev.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
