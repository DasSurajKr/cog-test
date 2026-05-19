import React from 'react';
import { AuthProvider as OidcProvider, useAuth as useOidc } from 'react-oidc-context';
import AUTH_CONFIG from './authConfig';

// Lightweight wrapper to centralize OIDC provider settings.
export function OidcAuthProvider({ children }) {
  const settings = {
    authority: AUTH_CONFIG.authority,
    client_id: AUTH_CONFIG.client_id,
    redirect_uri: AUTH_CONFIG.redirect_uri,
    post_logout_redirect_uri: AUTH_CONFIG.post_logout_redirect_uri,
    response_type: AUTH_CONFIG.response_type,
    scope: AUTH_CONFIG.scope,
    // recommended production settings
    automaticSilentRenew: true,
    loadUserInfo: true,
    // use the browser storage for the user session (default is sessionStorage)
    userStore: typeof window !== 'undefined' ? window.localStorage : undefined,
  };

  return <OidcProvider {...settings}>{children}</OidcProvider>;
}

// Hook re-export for convenience
export const useOidcAuth = () => useOidc();
