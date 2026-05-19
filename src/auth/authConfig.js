// Centralized auth configuration reading from environment variables.
// Supports Vite (`import.meta.env`) and Node `process.env` fallbacks.
const getEnv = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) return import.meta.env[key];
  if (typeof process !== 'undefined' && process.env && process.env[key]) return process.env[key];
  return undefined;
};

export const AUTH_CONFIG = {
  authority:
    getEnv('VITE_REACT_APP_COGNITO_AUTHORITY') || getEnv('REACT_APP_COGNITO_AUTHORITY') || '',
  client_id:
    getEnv('VITE_REACT_APP_CLIENT_ID') || getEnv('REACT_APP_CLIENT_ID') || '',
  redirect_uri:
    getEnv('VITE_REACT_APP_REDIRECT_URI') || getEnv('REACT_APP_REDIRECT_URI') || window.location.origin,
  post_logout_redirect_uri:
    getEnv('VITE_REACT_APP_LOGOUT_URI') || getEnv('REACT_APP_LOGOUT_URI') || window.location.origin,
  scope: getEnv('VITE_REACT_APP_OAUTH_SCOPES') || getEnv('REACT_APP_OAUTH_SCOPES') || 'openid email phone',
  response_type: 'code',
};

export default AUTH_CONFIG;
