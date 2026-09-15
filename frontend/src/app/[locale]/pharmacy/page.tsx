'use client';

import React from 'react';
import { useLocale } from 'next-intl';

export default function PharmacyPage() {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-12 pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <div className="rounded-[3rem] bg-white shadow-xl border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 text-center">
            {isRTL ? 'بخش داروخانه در نسخه مهاجرتی فعال نیست' : 'Pharmacy section is not available in the immigration version'}
          </h1>
          <p className="mt-4 text-center text-slate-600 font-medium leading-relaxed">
            {isRTL ? 'برای شروع مسیر مهاجرتی، از «مشاوره» یا «مسیرها» استفاده کنید.' : 'To start your immigration journey, use Consultation or Programs.'}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`/${locale}`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
            >
              {isRTL ? 'خانه' : 'Home'}
            </a>
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-indigo-200 hover:text-indigo-700 transition"
            >
              {isRTL ? 'مشاوره' : 'Consultation'}
            </a>
            <a
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold hover:border-indigo-200 hover:text-indigo-700 transition"
            >
              {isRTL ? 'مسیرها' : 'Programs'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

