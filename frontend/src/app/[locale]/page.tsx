'use client';

import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Clock,
  FileText,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

const BRAND = {
  nameFa: 'موسسه مهاجرتی ویزا کلینیک',
  nameEn: 'VisaHub Immigration Institute',
};

export default function HomePage() {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  const programs = [
    {
      titleFa: 'مهاجرت تحصیلی',
      titleEn: 'Study Immigration',
      descFa: 'انتخاب دانشگاه و رشته + آماده‌سازی مدارک',
      descEn: 'University selection + document preparation',
      icon: GraduationCap,
      link: '/pharmacy',
    },
    {
      titleFa: 'مهاجرت کاری',
      titleEn: 'Work Immigration',
      descFa: 'ارزیابی رزومه + برنامه اقدام برای ویزای کار',
      descEn: 'Resume review + work visa action plan',
      icon: Briefcase,
      link: '/pharmacy'
    },
    {
      titleFa: 'مهاجرت سرمایه‌گذاری',
      titleEn: 'Investment Immigration',
      descFa: 'مسیر سرمایه‌گذاری + چک‌لیست مدارک',
      descEn: 'Investment path + document checklist',
      icon: Building2,
      link: '/pharmacy'
    },
    {
      titleFa: 'همراه و خانواده',
      titleEn: 'Family & Accompaniment',
      descFa: 'برنامه‌ریزی دقیق برای پرونده همراه',
      descEn: 'Detailed plan for your family dossier',
      icon: Users,
      link: '/pharmacy'
    },
  ];

  const trust = [
    {
      fa: 'مشاوره سریع‌تر، مسیر شفاف‌تر',
      en: 'Faster consult, clearer path',
      icon: Clock,
    },
    {
      fa: 'بررسی پرونده توسط تیم حقوقی',
      en: 'Case review by legal team',
      icon: ShieldCheck,
    },
    {
      fa: 'چک‌لیست مدارک + قالب‌های آماده',
      en: 'Document checklist + templates',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-50" />

        {/* Premium immigration-themed blobs */}
        <div className="absolute -top-32 -left-24 w-80 h-80 bg-gradient-to-br from-cyan-500/15 to-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-36 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/60 to-transparent opacity-70" />


        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-slate-200">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  {isRTL ? BRAND.nameFa : BRAND.nameEn}
                </span>
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl font-black leading-[1.05] text-slate-900">
                {isRTL ? 'مسیری مطمئن برای مهاجرت' : 'A secure path for your immigration'}
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                  {isRTL ? 'از ارزیابی تا نتیجه' : 'From assessment to outcome'}
                </span>
              </h1>

              <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
                {isRTL
                  ? 'با برنامه‌ریزی دقیق، پشتیبانی مستمر و چک‌لیست مدارک، مسیر پرونده‌تان را کوتاه‌تر و شفاف‌تر می‌کنیم.'
                  : 'We make your case faster and clearer with careful planning, continuous support, and document checklists.'}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  {isRTL ? 'دریافت مشاوره' : 'Get Consultation'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pharmacy"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold hover:border-indigo-200 hover:text-indigo-700 transition"
                >
                  {isRTL ? 'مشاهده برنامه‌ها' : 'View Programs'}
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {trust.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 p-4"
                    >
                      <Icon className="w-5 h-5 text-indigo-600" />
                      <div className="text-sm font-bold text-slate-900">
                        {isRTL ? t.fa : t.en}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-full lg:max-w-md">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5">
                <div className="text-sm font-bold text-slate-900">{isRTL ? 'برنامه‌های محبوب' : 'Popular Programs'}</div>
                <div className="mt-3 grid gap-3">
                  {programs.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.link + p.titleEn}
                        href={p.link}
                        className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-200 hover:border-indigo-200 transition"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-indigo-700" />
                        </div>
                        <div className="flex-1">
                          <div className="font-black text-slate-900 text-sm">
                            {isRTL ? p.titleFa : p.titleEn}
                          </div>
                          <div className="text-xs text-slate-600 mt-1">
                            {isRTL ? p.descFa : p.descEn}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 transition" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-white to-indigo-50 border border-indigo-100 rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-indigo-700 uppercase tracking-widest">
                {isRTL ? 'گام بعدی پرونده‌تان' : 'Your next case step'}
              </div>
              <div className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
                {isRTL ? 'همین امروز شروع کنید' : 'Start today'}
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              {isRTL ? 'مشاوره' : 'Consult'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

