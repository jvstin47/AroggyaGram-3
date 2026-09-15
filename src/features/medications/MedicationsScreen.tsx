import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pill, Plus, CheckCircle2, Circle, Clock, ArrowLeft,
  Sparkles, Trash2, X, AlertCircle, Utensils
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMedicationsQuery } from '@/hooks/useMedicationsQuery';
import { MedicationService } from '@/services/medications/medication.service';
import { getTranslation } from '@/i18n/translations';

export const MedicationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const t = getTranslation(profile?.language);
  const { medications, addMedication, toggleTaken } = useMedicationsQuery(user?.id || 'citizen-user');

  const [showAddModal, setShowAddModal] = useState(false);
  const [medName, setMedName] = useState('');
  const [medForm, setMedForm] = useState<'Tablet' | 'Capsule' | 'Syrup' | 'Drops' | 'Inhaler' | 'Injection'>('Tablet');
  const [quantity, setQuantity] = useState<number>(1);
  const [strength, setStrength] = useState('500mg');
  const [foodTiming, setFoodTiming] = useState<'After Food' | 'Before Food' | 'With Meal' | 'Bedtime'>('After Food');
  const [timeValue, setTimeValue] = useState('08:30');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const takenCount = medications.filter((m) => m.taken).length;
  const adherencePercent = medications.length ? Math.round((takenCount / medications.length) * 100) : 0;

  // Format 24-hour time to 12-hour AM/PM string
  const formatTimeDisplay = (time24: string): string => {
    if (!time24) return '08:30 AM';
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    return `${String(hour12).padStart(2, '0')}:${String(m || 0).padStart(2, '0')} ${period}`;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName.trim()) return;

    setIsSubmitting(true);
    const structuredDosage = `${quantity} ${medForm}${strength ? ` (${strength})` : ''} • ${foodTiming}`;
    const scheduleTimeFormatted = formatTimeDisplay(timeValue);

    await addMedication({
      name: medName.trim(),
      dosage: structuredDosage,
      time: scheduleTimeFormatted
    });

    setMedName('');
    setQuantity(1);
    setStrength('');
    setShowAddModal(false);
    setIsSubmitting(false);
  };

  const [medicineToDelete, setMedicineToDelete] = useState<{ id: string; name: string } | null>(null);

  const confirmDelete = async () => {
    if (!medicineToDelete) return;
    await MedicationService.deleteMedication(medicineToDelete.id);
    setMedicineToDelete(null);
    window.location.reload();
  };

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setMedicineToDelete({ id, name });
  };

  return (
    <div className="pb-36 px-4 pt-6 max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="p-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">{t.meds_title}</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.meds_subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-[#005448] dark:bg-emerald-600 text-white p-2.5 rounded-2xl shadow-md hover:bg-[#004239] dark:hover:bg-emerald-700 transition-all flex items-center gap-1.5 text-xs font-bold px-3.5"
        >
          <Plus className="w-4 h-4" />
          <span>{t.meds_add}</span>
        </button>
      </div>

      {/* Daily Progress Tracker Card */}
      <div className="bg-gradient-to-br from-[#005448] to-[#0D6B5D] dark:from-[#0B3D34] dark:to-[#042821] text-white p-5 rounded-3xl shadow-lg shadow-[#005448]/20 space-y-3 border border-white/10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-widest">
              {t.meds_today_schedule}
            </span>
            <h2 className="text-3xl font-black tracking-tight">{adherencePercent}% {t.meds_completed}</h2>
          </div>
          <span className="text-sm font-bold text-emerald-100">
            {takenCount} {t.meds_taken_of} {medications.length}
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
      <div className="bg-white dark:bg-[#14211F] border border-[#E8E6DF] dark:border-stone-800 p-4 rounded-3xl flex items-start gap-3 shadow-sm transition-colors">
        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
            {t.meds_ai_guidance}
          </span>
          <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5 leading-relaxed font-medium">
            {t.meds_ai_guidance_text}
          </p>
        </div>
      </div>

      {/* Medication Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {t.meds_scheduled} ({medications.length})
          </h3>
          <span className="text-[11px] text-stone-400">{t.meds_tap_to_mark}</span>
        </div>

        {medications.map((med) => (
          <div
            key={med.id}
            onClick={() => toggleTaken({ id: med.id, taken: !med.taken })}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
              med.taken
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700/50 opacity-90'
                : 'bg-white dark:bg-[#14211F] border-stone-200 dark:border-stone-800 hover:border-[#005448] dark:hover:border-emerald-600 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  med.taken
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#E0F2EE] dark:bg-emerald-950/60 text-[#005448] dark:text-emerald-400'
                }`}
              >
                <Pill className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`text-base font-bold leading-snug ${med.taken ? 'line-through text-stone-400 dark:text-stone-500' : 'text-stone-900 dark:text-white'}`}>
                  {med.name}
                </h4>
                <p className="text-xs font-medium text-stone-600 dark:text-stone-400">{med.dosage}</p>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">
                  <Clock className="w-3 h-3 text-[#005448] dark:text-emerald-400" />
                  <span>{med.schedule_time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => handleDelete(e, med.id, med.name)}
                title="Remove prescription"
                className="p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {med.taken ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Circle className="w-7 h-7 text-stone-300 dark:text-stone-600" />
              )}
            </div>
          </div>
        ))}

        {medications.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-[#14211F] rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 space-y-2">
            <Pill className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-xs font-bold text-stone-700 dark:text-stone-300">{t.meds_no_meds}</p>
            <p className="text-[11px] text-stone-500">{t.meds_no_meds_hint}</p>
          </div>
        )}
      </div>

      {/* Structured Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#14211F] text-stone-900 dark:text-stone-100 rounded-3xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-lg font-black text-stone-900 dark:text-white">{t.meds_add_title}</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Medicine Name */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                  {t.meds_name_label}
                </label>
                <input
                  type="text"
                  value={medName}
                  onChange={(e) => setMedName(e.target.value)}
                  placeholder={t.meds_name_placeholder}
                  className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-3 text-xs font-bold bg-stone-50 dark:bg-stone-800/80 focus:border-[#005448] focus:outline-none"
                  required
                />
              </div>

              {/* Form Selector */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                  {t.meds_form_label}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Tablet', 'Capsule', 'Syrup', 'Drops', 'Inhaler', 'Injection'] as const).map((form) => {
                    const formLabel =
                      form === 'Tablet' ? t.meds_form_tablet :
                      form === 'Capsule' ? t.meds_form_capsule :
                      form === 'Syrup' ? t.meds_form_syrup :
                      form === 'Drops' ? t.meds_form_drops :
                      form === 'Inhaler' ? t.meds_form_inhaler :
                      t.meds_form_injection;

                    return (
                      <button
                        key={form}
                        type="button"
                        onClick={() => setMedForm(form)}
                        className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                          medForm === form
                            ? 'bg-[#005448] text-white border-[#005448]'
                            : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        {formLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Strength */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                    {t.meds_quantity_label}
                  </label>
                  <div className="flex items-center gap-2">
                    {[0.5, 1, 2, 3].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          quantity === q
                            ? 'bg-[#005448] text-white border-[#005448]'
                            : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                    {t.meds_strength_label}
                  </label>
                  <input
                    type="text"
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                    placeholder={t.meds_strength_placeholder}
                    className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-xs font-bold bg-stone-50 dark:bg-stone-800/80 focus:border-[#005448] focus:outline-none"
                  />
                </div>
              </div>

              {/* Food Relation */}
              <div>
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block mb-1">
                  {t.meds_timing_label}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['After Food', 'Before Food', 'With Meal', 'Bedtime'] as const).map((food) => {
                    const foodLabel =
                      food === 'After Food' ? t.meds_timing_after :
                      food === 'Before Food' ? t.meds_timing_before :
                      food === 'With Meal' ? t.meds_timing_with :
                      t.meds_timing_bedtime;

                    return (
                      <button
                        key={food}
                        type="button"
                        onClick={() => setFoodTiming(food)}
                        className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 transition-colors ${
                          foodTiming === food
                            ? 'bg-[#005448] text-white border-[#005448]'
                            : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        <Utensils className="w-3 h-3" />
                        {foodLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consumption Time: Native Time Input + Quick Chips */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
                  {t.meds_schedule_time}
                </label>
                
                <input
                  type="time"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="w-full border border-stone-300 dark:border-stone-700 rounded-xl p-2.5 text-sm font-bold bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-white focus:border-[#005448] focus:outline-none"
                  required
                />

                {/* Fast time chips */}
                <div className="flex gap-1.5 pt-1">
                  {[
                    { label: t.meds_time_morning, time: '08:30' },
                    { label: t.meds_time_afternoon, time: '13:00' },
                    { label: t.meds_time_evening, time: '18:30' },
                    { label: t.meds_time_night, time: '21:30' }
                  ].map((chip) => (
                    <button
                      key={chip.time}
                      type="button"
                      onClick={() => setTimeValue(chip.time)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-colors ${
                        timeValue === chip.time
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-[#005448] dark:text-emerald-300 border-emerald-500'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  {t.btn_cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#005448] hover:bg-[#004239] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                >
                  {t.meds_save_schedule}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal */}
      {medicineToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#14211F] text-stone-900 dark:text-stone-100 rounded-3xl p-6 w-full max-w-sm space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                {t.meds_remove_title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.meds_remove_confirm} <strong className="text-stone-900 dark:text-stone-100">{medicineToDelete.name}</strong> {t.meds_remove_from_schedule}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMedicineToDelete(null)}
                className="flex-1 py-3 border border-stone-200 dark:border-stone-700 rounded-xl font-bold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {t.btn_keep}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                {t.btn_remove}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
