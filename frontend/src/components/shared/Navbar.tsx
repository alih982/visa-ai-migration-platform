'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationPanel from './NotificationPanel';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  MessageCircle,
  Bot,
  Sparkles,
  Calendar,
  Shield,
  Heart,
  FileText,
  User,
  Phone,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const store = useAuthStore();
  const { logout } = store;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [displayRole, setDisplayRole] = useState<string>('user');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (store.isAuthenticated && store.user) {
      setIsAuthenticated(true);
      setDisplayRole(store.user.role);
    } else {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('user_role');
      if (token && role) {
        setIsAuthenticated(true);
        setDisplayRole(role);
      }
    }
  }, [store.isAuthenticated, store.user]);

  useEffect(() => {
    const unsubscribe = useAuthStore.subscribe((state) => {
      setIsAuthenticated(state.isAuthenticated);
      if (state.user) setDisplayRole(state.user.role);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') || (isRTL ? 'خانه' : 'Home'), icon: Sparkles },
    { href: `/${locale}/services`, label: isRTL ? 'مسیرها' : 'Programs', icon: Calendar },
    { href: `/${locale}/contact`, label: isRTL ? 'مشاوره' : 'Consultation', icon: MessageCircle },
    { href: `/${locale}/about`, label: t('about') || 'About', icon: Sparkles },
    { href: `/${locale}/privacy`, label: isRTL ? 'حریم خصوصی' : 'Privacy', icon: Shield },
  ];

  const quickLinks = [
    {
      href: `/${locale}/contact`,
      label: isRTL ? 'شروع مشاوره' : 'Start Consultation',
      icon: MessageCircle,
      color: 'from-indigo-500 to-cyan-500',
    },
    {
      href: `/${locale}/services`,
      label: isRTL ? 'انتخاب مسیر' : 'Choose a Path',
      icon: Calendar,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      href: `/${locale}/`,
      label: isRTL ? 'چک‌لیست مهاجرت' : 'Immigration Checklist',
      icon: FileText,
      color: 'from-fuchsia-500 to-indigo-500',
    },
    {
      href: `/${locale}/about`,
      label: isRTL ? 'روش کار ما' : 'Our Process',
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user');
    window.location.href = `/${locale}`;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.user-menu')) setIsUserMenuOpen(false);
      if (!target.closest('.chat-menu')) setIsChatMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 rounded-2xl rotate-6 animate-pulse" />
                <div className="absolute inset-0.5 bg-white rounded-xl" />
                <div className="absolute inset-2 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                </div>
              </div>
              <span className="font-black text-2xl text-slate-800 tracking-tight">VisaHub</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'py-2 bg-white/95 backdrop-blur-2xl shadow-lg shadow-slate-200/50'
          : 'py-3 bg-white/80 backdrop-blur-xl'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative w-14 h-14">
              <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 via-cyan-400 to-emerald-400 rounded-2xl blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl shadow-slate-900/30 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '8px 8px' }}
                  />
                </div>
                <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500/90 via-cyan-500/90 to-emerald-500/90">
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-white drop-shadow-lg" />
                    <div className="absolute -top-1 -right-1 w-3 h-3">
                      <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                      <div className="absolute inset-0 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-800 tracking-tight leading-none group-hover:text-indigo-600 transition-colors">VisaHub</span>
              <span className="text-[9px] font-bold text-slate-400 tracking-[0.25em] uppercase mt-1 flex items-center gap-1">
                {isRTL ? 'موسسه تخصصی مهاجرت' : 'Specialized Immigration Institute'}
                <Sparkles size={10} className="text-cyan-400" />
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 backdrop-blur-md px-1 py-1.5 rounded-2xl">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-white rounded-xl transition-all duration-300 group relative overflow-hidden"
              >
                <link.icon size={16} className="relative z-10 transition-transform group-hover:scale-110" />
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 bg-slate-100/80 backdrop-blur-md p-1.5 rounded-2xl">
              <NotificationPanel />
              <div className="w-px h-6 bg-slate-200 mx-1" />
              <LanguageSwitcher />
            </div>
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
            </div>

            {/* Quick dropdown */}
            <div className="relative chat-menu">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChatMenuOpen(!isChatMenuOpen);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-2xl transition-all duration-300 ${
                  isChatMenuOpen
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-slate-100 text-slate-600 hover:bg-white hover:shadow-md border border-slate-200'
                }`}
              >
                <MessageCircle size={18} />
                <span className="hidden lg:block">{isRTL ? 'دسترسی سریع' : 'Quick Access'}</span>
                <ChevronDown size={14} className={`transition-transform duration-300 ${isChatMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isChatMenuOpen && (
                <div
                  className={`absolute top-full mt-3 w-80 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-100 p-3 transform origin-top-right transition-all animate-scale-in z-50 ${isRTL ? 'left-0' : 'right-0'}`}
                >
                  {quickLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      onClick={() => setIsChatMenuOpen(false)}
                      className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r transition-all duration-300"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <link.icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{link.label}</p>
                        <p className="text-xs text-slate-500 font-medium">{isRTL ? 'مشاهده و شروع' : 'View & Start'}</p>
                      </div>
                      <ChevronDown size={16} className={`opacity-0 group-hover:opacity-100 transition-all ${isRTL ? 'rotate-90' : '-rotate-90'} text-indigo-600`} />
                    </Link>
                  ))}

                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-3" />

                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setIsChatMenuOpen(false)}
                    className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                      <Bot size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{isRTL ? 'دسترسی به مشاور' : 'Consultation Access'}</p>
                      <p className="text-xs text-slate-500 font-medium">{isRTL ? 'پاسخ سریع و برنامه اقدام' : 'Fast reply & action plan'}</p>
                    </div>
                    <ChevronDown size={16} className={`opacity-0 group-hover:opacity-100 transition-all ${isRTL ? 'rotate-90' : '-rotate-90'} text-indigo-600`} />
                  </Link>

                  <a
                    href="tel:1900"
                    className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 transition-all duration-300 mt-1"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform">
                      <Phone size={22} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm group-hover:text-rose-600 transition-colors">{isRTL ? 'تماس' : 'Call'}</p>
                      <p className="text-xs font-bold text-rose-500 tracking-wider">1900</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative user-menu">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen);
                  }}
                  className="flex items-center gap-2 px-2 py-1.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl shadow-lg shadow-slate-900/20 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-inner">
                    {isRTL ? 'م' : 'U'}
                  </div>
                  <span className="hidden lg:block text-sm font-bold">
                    {isRTL ? 'پروفایل' : 'Profile'}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div
                    className={`absolute top-full mt-3 w-64 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-100 p-2 transform origin-top-right transition-all animate-scale-in z-50 ${isRTL ? 'left-0' : 'right-0'}`}
                  >
                    <Link
                      href={`/${locale}`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-cyan-50 rounded-2xl transition-colors group"
                    >
                      <LayoutDashboard size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{isRTL ? 'داشبورد مهاجرت' : 'Immigration Dashboard'}</span>
                    </Link>

                    <Link
                      href={`/${locale}/contact`}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-cyan-50 rounded-2xl transition-colors group"
                    >
                      <MessageCircle size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{isRTL ? 'مشاوره' : 'Consultation'}</span>
                    </Link>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 w-full text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 rounded-2xl transition-colors group"
                    >
                      <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="font-bold">{isRTL ? 'خروج' : 'Logout'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href={`/${locale}/login`}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                  {t('login')}
                </Link>
                <Link
                  href={`/${locale}/signup`}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all"
                >
                  {t('signup')}
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-100 hover:bg-white shadow-sm hover:shadow-md rounded-xl transition-all"
            >
              {isMobileMenuOpen ? <X size={20} className="text-slate-700" /> : <Menu size={20} className="text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-4 right-4 mt-4 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-100 p-4 transform origin-top animate-scale-in z-50">
            <div className="space-y-1">
              {navLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-colors"
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />

              <Link
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-5 py-3.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl font-bold transition-colors"
              >
                <Bot size={20} className="text-indigo-500" />
                {isRTL ? 'مشاوره سریع' : 'Quick Consultation'}
              </Link>

              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-3 pt-4 pb-2 px-2">
                  <Link href={`/${locale}/login`} className="px-4 py-3 text-center text-sm font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                    {t('login')}
                  </Link>
                  <Link href={`/${locale}/signup`} className="px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl hover:shadow-lg transition-all">
                    {t('signup')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

