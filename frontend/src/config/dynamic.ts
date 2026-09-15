/**
 * Unified Dynamic Configuration for Smart Health Platform
 * All configurations can be changed via environment variables!
 */

export interface AppConfig {
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
    retries: number;
  };
  websocket: {
    url: string;
    reconnectInterval: number;
    maxReconnectAttempts: number;
  };
  aiService: {
    url: string;
    wsUrl: string;
  };
  app: {
    name: string;
    url: string;
    defaultLocale: string;
    supportedLocales: string[];
  };
  features: {
    analytics: boolean;
    aiChat: boolean;
    realTimeNotifications: boolean;
  };
  security: {
    tokenKey: string;
    refreshTokenKey: string;
    csrfHeaderName: string;
  };
}

const getEnv = (key: string, fallback: string = ''): string => {
  if (typeof window !== 'undefined') {
    return process.env[key] || fallback;
  }
  return process.env[key] || fallback;
};

const getEnvBool = (key: string, fallback: boolean = false): boolean => {
  const value = getEnv(key, String(fallback));
  return value === 'true' || value === '1';
};

const getEnvInt = (key: string, fallback: number = 0): number => {
  const value = getEnv(key, String(fallback));
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

// Build API URL
const buildApiUrl = (): string => {
  const apiUrl = getEnv('NEXT_PUBLIC_API_URL', '');
  if (apiUrl) {
    return apiUrl.replace(/\/$/, '');
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https' : 'http';

  // Production frontend on maggicaihub.com -> backend on magicai.runflare.run
  if (hostname === 'maggicaihub.com' || hostname === 'www.maggicaihub.com') {
    return 'http://magicai.runflare.run/api';
  }

  // Runflare deployment detection (backend directly accessed)
  if (hostname.includes('runflare')) {
    return `${protocol}://${hostname}${port}/api`;
  }

  // Local development
  return `${protocol}://${hostname}:8000/api`;
};

export const buildApiEndpoint = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `/api/v1${cleanEndpoint}`;
};

// Build WebSocket URL
const buildWsUrl = (): string => {
  let wsUrl = getEnv('NEXT_PUBLIC_WS_URL', '');
  if (wsUrl) {
    return wsUrl.replace(/\/$/, '');
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss' : 'ws';

  // Production frontend on maggicaihub.com -> backend WS on magicai.runflare.run
  if (hostname === 'maggicaihub.com' || hostname === 'www.maggicaihub.com') {
    return 'wss://magicai.runflare.run/ws';
  }

  if (hostname.includes('runflare')) {
    return `${protocol}://${hostname}${port}/ws`;
  }

  return `${protocol}://${hostname}:8000/ws`;
};

// Build AI Service URL
const buildAiServiceUrl = (): string => {
  let aiServiceUrl = getEnv('NEXT_PUBLIC_AI_SERVICE_URL', '');
  if (aiServiceUrl) {
    return aiServiceUrl.replace(/\/$/, '');
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https' : 'http';

  // Production: AI service is on a dedicated Runflare domain
  if (hostname === 'maggicaihub.com' || hostname === 'www.maggicaihub.com') {
    return 'http://magggicai-magicai.runflare.run';
  }

  // Other runflare subdomains: derive from current host
  if (hostname.includes('runflare')) {
    return `${protocol}://${hostname}`;
  }

  // Local development
  return `${protocol}://${hostname}:8001`;
};

// Build AI Service WebSocket URL
const buildAiWsUrl = (): string => {
  const aiServiceUrl = buildAiServiceUrl();
  const wsProtocol = aiServiceUrl.startsWith('https') ? 'wss' : 'ws';
  const hostOnly = aiServiceUrl.replace(/^https?:\/\//, '');
  return `${wsProtocol}://${hostOnly}/ws/ai-chat`;
};

export const config: AppConfig = {
  api: {
    baseUrl: buildApiUrl(),
    version: getEnv('NEXT_PUBLIC_API_VERSION', 'v1'),
    timeout: getEnvInt('NEXT_PUBLIC_API_TIMEOUT', 10000),
    retries: getEnvInt('NEXT_PUBLIC_API_RETRIES', 3),
  },
  websocket: {
    url: buildWsUrl(),
    reconnectInterval: getEnvInt('NEXT_PUBLIC_WS_RECONNECT_INTERVAL', 5000),
    maxReconnectAttempts: getEnvInt('NEXT_PUBLIC_WS_MAX_RECONNECT', 5),
  },
  aiService: {
    url: buildAiServiceUrl(),
    wsUrl: buildAiWsUrl(),
  },
  app: {
    name: getEnv('NEXT_PUBLIC_APP_NAME', 'Smart Health'),
    url: getEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    defaultLocale: getEnv('NEXT_PUBLIC_DEFAULT_LOCALE', 'fa'),
    supportedLocales: getEnv('NEXT_PUBLIC_SUPPORTED_LOCALES', 'fa,en').split(','),
  },
  features: {
    analytics: getEnvBool('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
    aiChat: getEnvBool('NEXT_PUBLIC_ENABLE_AI_CHAT', true),
    realTimeNotifications: getEnvBool('NEXT_PUBLIC_ENABLE_REALTIME', true),
  },
  security: {
    tokenKey: getEnv('NEXT_PUBLIC_TOKEN_KEY', 'auth_token'),
    refreshTokenKey: getEnv('NEXT_PUBLIC_REFRESH_TOKEN_KEY', 'refresh_token'),
    csrfHeaderName: getEnv('NEXT_PUBLIC_CSRF_HEADER', 'X-CSRFToken'),
  },
};

export const API_BASE_URL = config.api.baseUrl;
export const API_VERSION = config.api.version;
export const WS_URL = config.websocket.url;
export const AI_SERVICE_URL = config.aiService.url;
export const AI_WS_URL = config.aiService.wsUrl;
export const APP_NAME = config.app.name;
export const APP_URL = config.app.url;

export const environment = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isServer: typeof window === 'undefined',
  isClient: typeof window !== 'undefined',
};

export default config;
