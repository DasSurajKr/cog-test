import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Token provider function — can be swapped at runtime by the auth layer so
// tokens coming from OIDC are used instead of legacy localStorage values.
let tokenProvider = () => localStorage.getItem(STORAGE_KEYS.TOKEN);
export function setAuthTokenProvider(fn) {
  if (typeof fn === 'function') tokenProvider = fn;
}

api.interceptors.request.use(async (config) => {
  try {
    const token = await tokenProvider();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // ignore token retrieval errors and proceed without auth header
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
    return Promise.reject(error);
  }
);

export default api;
