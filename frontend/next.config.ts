import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Production mode settings
  productionBrowserSourceMaps: false,
  
  // Remove the Next.js "N" icon indicator in production
  poweredByHeader: false,
  
  // Production optimizations
  output: 'standalone',
  
  // Enable production optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Performance optimizations
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize turbopack
    optimizePackageImports: ['lucide-react', 'react', 'react-dom'],
  },
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  
  // Enable compression
  compress: true,
  
  // Disable x-powered-by header
  reactStrictMode: true,
  
  // Rewrites for API proxy - forwards /api/* to backend
  async rewrites() {
    const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST || 'magicai.runflare.run';
    const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || '';
    const backendUrl = backendPort ? `http://${backendHost}:${backendPort}` : `http://${backendHost}`;

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/ws/:path*',
        destination: `${backendUrl}/ws/:path*`,
      },
    ];
  },
  
  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
