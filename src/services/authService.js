import { STORAGE_KEYS } from '../utils/constants';
import { demoCredentials } from '../data/mockUsers';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const authService = {
  async login({ email, password }) {
    await delay(600);
    const match =
      (email === demoCredentials.user.email && password === demoCredentials.user.password) ||
      (email === demoCredentials.admin.email && password === demoCredentials.admin.password);

    if (!match) throw new Error('Invalid email or password');

    const isAdmin = email === demoCredentials.admin.email;
    const user = isAdmin ? demoCredentials.admin : demoCredentials.user;
    const token = `mock-jwt-${user.role}-${Date.now()}`;

    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user, token };
  },

  async register({ name, email }) {
    await delay(600);
    const user = { name, email, role: 'user' };
    const token = `mock-jwt-user-${Date.now()}`;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { user, token };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getStoredUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};
