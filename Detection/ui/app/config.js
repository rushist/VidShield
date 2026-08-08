export const DEFAULT_BACKEND_URL = 'https://vidshield-2.onrender.com';

export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('vidshield_api_url');
    if (stored) return stored.replace(/\/$/, '');
  }
  
  if (process.env.NEXT_PUBLIC_VIDSHIELD_API_URL) {
    return process.env.NEXT_PUBLIC_VIDSHIELD_API_URL.replace(/\/$/, '');
  }

  return DEFAULT_BACKEND_URL;
}
