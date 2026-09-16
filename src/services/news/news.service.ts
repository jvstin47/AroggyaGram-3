import { supabase, isSupabaseConfigured } from '@/services/supabase/client';

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  authority: string;
  readTime: string;
  imageUrl: string;
}

export const LOCAL_HEALTH_NEWS: NewsItem[] = [
  {
    id: 'n-1',
    title: 'Monsoon Dengue & Viral Fever Alert: Free PHC Diagnostic Camps in Kottayam & Idukki',
    category: 'Public Health Alert',
    summary: 'The Kerala Health Department has deployed mobile fever clinics across rural panchayats. Free NS1 antigen tests and platelet monitoring available at all primary health centers.',
    date: 'September 14, 2026',
    authority: 'Directorate of Health Services (DHS)',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n-2',
    title: 'Jan Aushadhi Scheme: 40+ Essential Cardiovascular Medicines Now at 80% Subsidy',
    category: 'Medication Access',
    summary: 'Senior citizens registered under Karunya Arogya Suraksha Padhathi (KASP) can now obtain monthly refills of Amlodipine, Telmisartan, and Atorvastatin directly via verified community volunteers.',
    date: 'September 12, 2026',
    authority: 'Ministry of Health & Family Welfare',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n-3',
    title: 'Boiled Water Advisory Issued for Low-Lying Riverine Panchayats',
    category: 'Sanitation & Prevention',
    summary: 'Health inspectors recommend chlorination and boiling drinking water for at least 10 minutes to prevent waterborne diarrheal illness following seasonal water table shifts.',
    date: 'September 10, 2026',
    authority: 'Community Health Mission',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'n-4',
    title: 'Community Mental Health & Elderly Companionship Circles Launched',
    category: 'Mental Wellbeing',
    summary: 'Trained ASHA health volunteers begin weekly home visits to monitor vital signs and provide companionship for elderly residents living independently.',
    date: 'September 8, 2026',
    authority: 'Kerala State Mental Health Authority',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'
  }
];

export const normalizeNewsImageUrl = (url?: string): string => {
  if (!url || url.includes('photo-1548839140') || url.includes('photo-1581244277943')) {
    return 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80';
  }
  return url;
};

export class NewsService {
  public static async getHealthNews(): Promise<NewsItem[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            summary: item.summary,
            date: item.date,
            authority: item.authority,
            readTime: item.read_time || item.readTime || '2 min read',
            imageUrl: normalizeNewsImageUrl(item.image_url || item.imageUrl)
          }));
        }
      } catch (err) {
        console.warn('Supabase news fetch fallback to local:', err);
      }
    }
    return LOCAL_HEALTH_NEWS.map(item => ({
      ...item,
      imageUrl: normalizeNewsImageUrl(item.imageUrl)
    }));
  }
}
