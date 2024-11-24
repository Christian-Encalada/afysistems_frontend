'use client';

export const getTenantId = (): string => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const subdomain = hostname.split('.')[0];
    return subdomain === 'www' ||
      subdomain === 'localhost' ||
      subdomain == '3' ||
      !subdomain
      ? 'raiz'
      : subdomain;
  }
  return 'raiz';
};
