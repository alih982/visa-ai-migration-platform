'use client';

import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

// Mock data for services (works without backend)
const MOCK_SERVICES = [
    {
        id: 1,
        slug: 'study',
        title_en: 'Study Immigration',
        title_fa: 'تحصیلی',
        description_en: 'University matching + document prep for a strong application.',
        description_fa: 'انتخاب دانشگاه + آماده‌سازی مدارک برای یک پرونده قوی.',
        icon_name: 'GraduationCap',
        color_class: 'bg-indigo-100 text-indigo-600',
        image: 'http://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
    },
    {
        id: 2,
        slug: 'work',
        title_en: 'Work Immigration',
        title_fa: 'کاری',
        description_en: 'Resume review + action plan to secure your work visa path.',
        description_fa: 'بازبینی رزومه + برنامه اقدام برای مسیر ویزای کاری.',
        icon_name: 'Briefcase',
        color_class: 'bg-cyan-100 text-cyan-600',
        image: 'http://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800'
    },
    {
        id: 3,
        slug: 'investment',
        title_en: 'Investment Immigration',
        title_fa: 'سرمایه‌گذاری',
        description_en: 'Investment path planning + document checklist for compliance.',
        description_fa: 'برنامه مسیر سرمایه‌گذاری + چک‌لیست مدارک برای انطباق.',
        icon_name: 'Building2',
        color_class: 'bg-emerald-100 text-emerald-600',
        image: 'http://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800'
    },
    {
        id: 4,
        slug: 'family',
        title_en: 'Family Immigration',
        title_fa: 'خانوادگی',
        description_en: 'Detailed dossier plan for you and your family members.',
        description_fa: 'طرح دقیق پرونده برای شما و اعضای خانواده.',
        icon_name: 'Users',
        color_class: 'bg-fuchsia-100 text-fuchsia-600',
        image: 'http://images.unsplash.com/photo-1520975916090-3105956dac38?w=800'
    },
    {
        id: 5,
        slug: 'legal',
        title_en: 'Legal & Docs',
        title_fa: 'حقوقی/مدارک',
        description_en: 'Templates + legal preparation support for smoother submissions.',
        description_fa: 'قالب‌ها + پشتیبانی حقوقی برای ارسال بدون دردسر.',
        icon_name: 'ShieldCheck',
        color_class: 'bg-amber-100 text-amber-600',
        image: 'http://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800'
    },
];

export default function ServicesPage() {
    const t = useTranslations('services');
    const locale = useLocale();
    const isRTL = locale === 'fa';
    const [services] = useState(MOCK_SERVICES);

    const renderIcon = (name: string, size = 32) => {
        const Icon = (LucideIcons as any)[name] || LucideIcons.Activity;
        return <Icon size={size} />;
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-12 pt-32" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <span className="px-5 py-2 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-6 inline-block">
                        {isRTL ? 'برتری در مراقبت‌های بهداشتی' : 'HEALTHCARE EXCELLENCE'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                        {isRTL ? 'تخصص‌های مهاجرتی' : 'Expert Medical'} <span className="text-blue-600">{isRTL ? 'برتر' : 'Specialties'}</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        {isRTL
                            ? 'طیف گسترده‌ای از بخش‌های مهاجرتی تخصصی را بررسی کنید، جایی که فناوری روز با مراقبت دلسوزانه ترکیب می‌شود.'
                            : 'Explore our comprehensive range of specialized medical departments, where cutting-edge technology meets expert compassionate care.'
                        }
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={`/services/${service.slug}`}
                            className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-transparent hover:border-blue-100 flex flex-col items-center text-center"
                        >
                            <div className={`w-20 h-20 rounded-[1.5rem] ${service.color_class} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
                                {renderIcon(service.icon_name, 36)}
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                                {isRTL ? service.title_fa : service.title_en}
                            </h3>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm mb-6 flex-grow">
                                {isRTL ? service.description_fa : service.description_en}
                            </p>
                            <div className="pt-6 border-t border-slate-50 w-full flex justify-center">
                                <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 text-white text-sm font-bold rounded-xl group-hover:gap-3 transition-all shadow-lg shadow-blue-500/20">
                                    {isRTL ? 'کشف کنید' : 'DISCOVER'}
                                    <LucideIcons.ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-32 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[4rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-3xl group">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black leading-tight max-w-2xl mx-auto">
                            {isRTL ? 'آماده تجربه مراقبت‌های بهداشتی درجه یک هستید؟' : 'Ready to experience world-class healthcare?'}
                        </h2>
                        <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium leading-relaxed">
                            {isRTL
                                ? 'تیم متخصصان ما آماده ارائه مراقبت‌های شخصی‌سازی شده به شماست. امروز با ما تماس بگیرید.'
                                : 'Our team of experts is ready to provide you with the personalized care you deserve. Connect with us today for a consultation.'
                            }
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 pt-6">
                            <Link href={`/doctors`} className="bg-blue-600 text-white px-10 py-5 rounded-luxury font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:scale-105">
                                {isRTL ? 'رزرو نوبت' : 'Book Appointment'}
                            </Link>
                            <button className="bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all border border-white/10">
                                {isRTL ? 'تماس با ما' : 'Contact Us'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

