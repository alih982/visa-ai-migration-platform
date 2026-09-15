'use client';

import React from 'react';
import { useLocale } from 'next-intl';

export default function AboutPage() {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto">
        <div className="rounded-[3rem] bg-white shadow-xl border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 text-center">
            {isRTL ? 'درباره ما' : 'About Us'}
          </h1>
          <p className="mt-6 text-center text-slate-600 font-medium leading-relaxed">
            {isRTL
              ? 'ویزاکلینیک با تمرکز بر مهاجرت، مسیر شما را شفاف می‌کند: از بررسی اولیه تا آماده‌سازی مدارک و پیگیری نتیجه.'
              : 'VisaHub makes your immigration path clear: from initial assessment to document preparation and outcome follow-up.'}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                t: isRTL ? 'بررسی پرونده' : 'Case Review',
                d: isRTL ? 'ارزیابی مسیر و مدارک موردنیاز' : 'Assessing your path and required documents',
              },
              {
                t: isRTL ? 'چک‌لیست مدارک' : 'Document Checklist',
                d: isRTL ? 'تهیه و آماده‌سازی دقیق' : 'Accurate preparation and completion',
              },
              {
                t: isRTL ? 'پیگیری' : 'Follow-up',
                d: isRTL ? 'حمایت تا رسیدن به نتیجه' : 'Support until you reach the outcome',
              },
            ].map((x, i) => (
              <div key={i} className="bg-indigo-50/60 rounded-3xl p-6 border border-indigo-100">
                <div className="font-black text-slate-900">{x.t}</div>
                <div className="mt-2 text-slate-600 font-medium leading-relaxed">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
            >
              {isRTL ? 'شروع مشاوره' : 'Start Consultation'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

