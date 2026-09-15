'use client';

import React from 'react';
import { useLocale } from 'next-intl';

export default function PrivacyPage() {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div className="min-h-screen bg-slate-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {isRTL ? 'سیاست حریم خصوصی' : 'Privacy Policy'}
          </h1>
          <p className="text-indigo-200 text-lg font-medium">
            {isRTL
              ? 'اطلاعات شما فقط برای مدیریت درخواست مهاجرت و پیگیری پرونده استفاده می‌شود.'
              : 'Your information is used only to manage your immigration request and follow up on your case.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-slate-200/40">
            <div className="space-y-10">
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۱) اطلاعاتی که جمع‌آوری می‌کنیم' : '1) Information We Collect'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'نام، شماره تماس، ایمیل و اطلاعات مربوط به مسیر مهاجرت شما.'
                    : 'Name, contact details, email, and immigration-related information.'}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۲) نحوه استفاده از اطلاعات' : '2) How We Use Your Information'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'برای بررسی پرونده، آماده‌سازی مدارک، پیگیری مراحل و ارتباط با شما.'
                    : 'To assess your case, prepare documents, follow up on progress, and communicate with you.'}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۳) اشتراک اطلاعات' : '3) Information Sharing'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'اطلاعات شما فقط با مشارکت‌کنندگان مرتبط با پرونده شما (طبق نیاز و قوانین) به اشتراک گذاشته می‌شود.'
                    : 'We share information only with relevant parties for your case (as needed and in accordance with applicable laws).'}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">{isRTL ? '۴) حقوق شما' : '4) Your Rights'}</h2>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isRTL
                    ? 'درخواست اصلاح، به‌روزرسانی یا حذف اطلاعات خود را می‌توانید ارسال کنید.'
                    : 'You can request corrections, updates, or deletion of your information.'}
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <a
                href="/${locale}"
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

