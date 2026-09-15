import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Plus, CheckCircle2, Circle, Clock, ArrowLeft, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';

export const MedicationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { medications, addMedication, toggleTaken } = useMedicationsQuery(user?.id || 'dev-patient-1');

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00 AM');

  const takenCount = medications.filter((m) => m.taken).length;
  const adherencePercent = medications.length ? Math.round((takenCount / medications.length) * 100) : 0;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addMedication({ name, dosage, time: scheduleTime });
    setName('');
    setDosage('');
    setShowAddModal(false);
  };

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            <h1 className="text-2xl font-black text-[#121E1C] tracking-tight">Medications</h1>
            <p className="text-xs text-stone-500 font-medium">Daily adherence & reminders</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-[#005448] text-white p-2.5 rounded-2xl shadow-md hover:bg-[#004239] transition-colors flex items-center gap-1 text-xs font-bold px-3"
        >
          <Plus className="w-4 h-4" />
          <span>Add Med</span>
        </button>
      </div>

      {/* Daily Progress Tracker Card */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0D6B5D] text-white p-5 rounded-3xl shadow-lg shadow-[#005448]/20 space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
              Today's Schedule
            </span>
            <h2 className="text-3xl font-black tracking-tight">{adherencePercent}% Completed</h2>
          </div>
          <span className="text-sm font-bold text-emerald-100">
            {takenCount} of {medications.length} taken
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
          <div
            className="bg-emerald-300 h-full rounded-full transition-all duration-500"
            style={{ width: `${adherencePercent}%` }}
          />
        </div>
      </div>

      {/* AI Health Adherence Insight */}
      <div className="bg-white border border-[#E8E6DF] p-4 rounded-3xl flex items-start gap-3 shadow-sm">
        <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            AI Adherence Insight
          </span>
          <p className="text-xs text-stone-700 mt-0.5 leading-relaxed font-medium">
            Excellent consistency with your morning Metformin dose. Maintaining regular timing keeps your blood sugar levels balanced throughout the afternoon.
          </p>
        </div>
      </div>

      {/* Medication Checklist */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 px-1">Scheduled Prescriptions</h3>
        {medications.map((med) => (
          <div
            key={med.id}
            onClick={() => toggleTaken({ id: med.id, taken: !med.taken })}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              med.taken
                ? 'bg-emerald-50/70 border-emerald-300 opacity-90'
                : 'bg-white border-stone-200 hover:border-[#005448] shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                  med.taken ? 'bg-emerald-600 text-white' : 'bg-[#E0F2EE] text-[#005448]'
                }`}
              >
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`text-base font-bold ${med.taken ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                  {med.name}
                </h4>
                <p className="text-xs text-stone-500">{med.dosage}</p>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 font-semibold mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{med.schedule_time}</span>
                </div>
              </div>
            </div>

            {med.taken ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-600" />
            ) : (
              <Circle className="w-7 h-7 text-stone-300" />
            )}
          </div>
        ))}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <h3 className="text-xl font-black text-stone-900">Add New Medication</h3>
            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amlodipine 5mg"
                  className="w-full border border-stone-300 rounded-xl p-3 text-sm focus:border-[#005448] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                  Dosage / Instructions
                </label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 1 tablet after food"
                  className="w-full border border-stone-300 rounded-xl p-3 text-sm focus:border-[#005448] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                  Schedule Time
                </label>
                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  placeholder="e.g. 08:30 AM"
                  className="w-full border border-stone-300 rounded-xl p-3 text-sm focus:border-[#005448] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-stone-200 rounded-xl font-bold text-sm text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#005448] hover:bg-[#004239] text-white rounded-xl font-bold text-sm"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
