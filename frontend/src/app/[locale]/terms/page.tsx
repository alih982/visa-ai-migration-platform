'use client';

import React from 'react';
import { useLocale } from 'next-intl';

export default function TermsPage() {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div className="min-h-screen bg-slate-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {isRTL ? 'قوانین و مقررات' : 'Terms & Conditions'}
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            {isRTL
              ? 'با استفاده از این سایت، قوانین و مقررات مربوط به خدمات مهاجرتی را می‌پذیرید.'
              : 'By using this site, you agree to our terms related to immigration services.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/40">
            <div className="space-y-10">
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۱) پذیرش قوانین' : '1) Acceptance of Terms'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'با ثبت درخواست/مشاوره، شرایط این سایت را می‌پذیرید.'
                    : 'When you submit a request/consultation, you agree to these terms.'}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۲) محدوده خدمات' : '2) Scope of Services'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'این سایت برای راهنمایی مهاجرت، تهیه چک‌لیست و آماده‌سازی مدارک استفاده می‌شود.'
                    : 'This site provides immigration guidance, checklists, and document preparation support.'}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۳) مسئولیت اطلاعات' : '3) Accuracy of Information'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'شما مسئول صحت اطلاعاتی هستید که ارائه می‌کنید.'
                    : 'You are responsible for the accuracy of the information you provide.'}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۴) ارتباط و پیگیری' : '4) Communication & Follow-up'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'ما طبق نیاز پرونده با شما در ارتباط هستیم و روند را پیگیری می‌کنیم.'
                    : 'We communicate as needed and follow up on the progress of your case.'}
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <a
                href={`/${locale}`}
                className="inline-flex items-center gap-2 text-indigo-600 font-black hover:gap-4 transition-all"
              >
                {isRTL ? 'بازگشت به صفحه اصلی' : 'Back to Home'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

