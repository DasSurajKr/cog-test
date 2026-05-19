import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService';
import AUTH_CONFIG from '../auth/authConfig';
import { OidcAuthProvider, useOidcAuth } from '../auth/OidcAuthProvider';
import { setAuthTokenProvider } from '../services/api';

const AuthContext = createContext(null);

// Internal provider used when OIDC is enabled: maps react-oidc-context into
// the app's existing AuthContext shape so the rest of the app can remain
// unchanged. If OIDC is not configured, the app falls back to the demo
// `authService` implementation.
function OidcMappedProvider({ children }) {
  const oidc = useOidcAuth();

  const user = oidc?.user?.profile || null;
  const loading = !!oidc?.isLoading;

  // expose familiar APIs used across the app
  const login = useCallback(() => oidc.signinRedirect(), [oidc]);
  const logout = useCallback(() => oidc.signoutRedirect(), [oidc]);
  const register = useCallback(async (data) => {
    // For now delegate register to demo service; in production this should
    // call your backend or Cognito signup flow if enabled.
    return authService.register(data);
  }, []);

  // Ensure axios will request tokens from OIDC when available
  useEffect(() => {
    setAuthTokenProvider(() => oidc?.user?.access_token || localStorage.getItem('token'));
  }, [oidc?.user]);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isAdmin, isAuthenticated: !!oidc?.isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  // OIDC enabled when both authority and client_id are configured via env.
  const oidcEnabled = !!(AUTH_CONFIG.authority && AUTH_CONFIG.client_id);

  if (oidcEnabled) {
    return (
      <OidcAuthProvider>
        <OidcMappedProvider>{children}</OidcMappedProvider>
      </OidcAuthProvider>
    );
  }

  // Fallback: existing demo auth implementation
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getStoredUser());
    setLoading(false);
    setAuthTokenProvider(() => localStorage.getItem('token'));
  }, []);

  const login = useCallback(async (credentials) => {
    const { user: u } = await authService.login(credentials);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (data) => {
    const { user: u } = await authService.register(data);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
