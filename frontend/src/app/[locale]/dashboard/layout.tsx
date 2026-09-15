'use client';

import React from 'react';
import { useLocale } from 'next-intl';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      {children}
      {/* Any dashboard content is hidden in the immigration-only UI */}
    </div>
  );
}

