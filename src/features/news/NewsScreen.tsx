import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Newspaper, Calendar, ShieldCheck, HeartPulse, ExternalLink } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { getTranslation } from '@/i18n/translations';
import { NewsService, type NewsItem } from '@/services/news/news.service';

export const NewsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const t = getTranslation(profile?.language);
  const [newsList, setNewsList] = React.useState<NewsItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    NewsService.getHealthNews()
      .then((items) => {
        setNewsList(items);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="pb-36 px-4 pt-[calc(1.5rem+env(safe-area-inset-top,0px))] max-w-lg mx-auto space-y-6 text-stone-900 dark:text-stone-100 transition-colors">
      {/* Header */}
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
          <h1 className="text-2xl font-black text-[#121E1C] dark:text-white tracking-tight">{t.news_title}</h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.news_subtitle}</p>
        </div>
      </div>

      {/* Featured Bulletin Card */}
      <div className="bg-gradient-to-br from-[#E68A00] to-[#C66900] text-white p-5 rounded-3xl shadow-lg shadow-amber-600/20 space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
          {t.news_verified_bulletin}
        </span>
        <h2 className="text-lg font-black leading-snug">
          {t.news_bulletin_title}
        </h2>
        <p className="text-xs text-amber-100 font-medium leading-relaxed">
          {t.news_bulletin_desc}
        </p>
      </div>

      {/* News Articles List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-stone-400">Loading verified health bulletins...</div>
        ) : newsList.map((item) => (
          <article
            key={item.id}
            className="bg-white dark:bg-[#14211F] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden hover:border-[#005448] dark:hover:border-emerald-600 transition-colors"
          >
            <div className="relative h-44 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80';
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 text-[11px] font-bold text-[#005448] dark:text-emerald-300 bg-white dark:bg-stone-900 px-3 py-1 rounded-full shadow-xs border border-stone-200 dark:border-stone-800">
                {item.category}
              </span>
            </div>

            <div className="p-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
                <span>{item.readTime}</span>
              </div>

              <h3 className="text-base font-black text-stone-900 dark:text-white leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
                <span className="font-semibold text-stone-700 dark:text-stone-300 truncate max-w-[70%]">
                  {item.authority}
                </span>
                <span className="text-[#005448] dark:text-emerald-400 font-bold">{t.news_read_more}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
