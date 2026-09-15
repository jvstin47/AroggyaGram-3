import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Send, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/i18n/translations';

export const FeedbackScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const t = getTranslation(profile?.language);

  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<string>('General Experience');
  const [comments, setComments] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    // Save locally
    const feedbackList = JSON.parse(localStorage.getItem('aroggya_feedback') || '[]');
    feedbackList.push({
      id: Date.now().toString(),
      rating,
      category,
      comments: comments.trim(),
      date: new Date().toISOString()
    });
    localStorage.setItem('aroggya_feedback', JSON.stringify(feedbackList));

    setSubmitted(true);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 5: return t.feedback_rating_5;
      case 4: return t.feedback_rating_4;
      case 3: return t.feedback_rating_3;
      default: return t.feedback_rating_low;
    }
  };

  const categories = [
    { id: 'General Experience', label: t.feedback_cat_general },
    { id: 'AI Triage Quality', label: t.feedback_cat_ai },
    { id: 'Medication Schedule', label: t.feedback_cat_meds },
    { id: 'Volunteer Dispatch', label: t.feedback_cat_volunteer },
    { id: 'Language / Translation', label: t.feedback_cat_language },
    { id: 'App Bug / Glitch', label: t.feedback_cat_bug }
  ];

  return (
    <div className="pb-36 px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100 transition-colors">
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
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">{t.feedback_title}</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.feedback_subtitle}</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white dark:bg-[#14211F] p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-stone-900 dark:text-white">{t.feedback_thank_you}</h2>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-xs mx-auto">
              {t.feedback_recorded}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full py-3.5 bg-[#005448] hover:bg-[#004239] text-white rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            {t.feedback_return_home}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Rating Card */}
          <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
              {t.feedback_rating_label}
            </label>
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-2 transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-bold text-[#005448] dark:text-emerald-400">
              {getRatingText(rating)}
            </p>
          </div>

          {/* Feedback Category */}
          <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
              {t.feedback_topic_label}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-colors text-left cursor-pointer ${
                    category === cat.id
                      ? 'bg-[#005448] text-white border-[#005448]'
                      : 'bg-stone-50 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comments Textarea */}
          <div className="bg-white dark:bg-[#14211F] p-5 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
            <label className="text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider block">
              {t.feedback_comments_label}
            </label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={t.feedback_comments_placeholder}
              className="w-full border border-stone-300 dark:border-stone-700 rounded-2xl p-3.5 text-xs font-medium bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-white focus:border-[#005448] focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!comments.trim()}
            className="w-full py-4 bg-[#005448] hover:bg-[#004239] disabled:opacity-50 text-white rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{t.feedback_submit}</span>
          </button>
        </form>
      )}
    </div>
  );
};
