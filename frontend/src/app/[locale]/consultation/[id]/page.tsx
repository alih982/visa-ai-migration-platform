'use client';

import React from 'react';
import { useLocale } from 'next-intl';

export default function ConsultationRoom() {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl w-full rounded-[3rem] bg-white shadow-xl border border-slate-200 p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 text-center">
          {isRTL ? 'مشاوره مهاجرتی' : 'Immigration Consultation'}
        </h1>
        <p className="mt-4 text-center text-slate-600 font-medium leading-relaxed">
          {isRTL
            ? 'برای دریافت برنامه دقیق، فرم «مشاوره» را تکمیل کنید.'
            : 'Complete the Consultation form to receive your action plan.'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
          >
            {isRTL ? 'مشاوره' : 'Consultation'}
          </a>
          <a
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-indigo-200 hover:text-indigo-700 transition"
          >
            {isRTL ? 'برنامه‌ها' : 'Programs'}
          </a>
        </div>
      </div>
    </div>
  );
}

