import { create } from 'zustand';

import { getAccessToken, removeAccessToken, setAccessToken, verifyUserToken } from '@/api';

interface AuthStates {
  token: string | null;
  isLoggedIn: boolean;
}

interface AuthActions {
  loadToken: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStates & AuthActions>((set) => ({
  token: null,
  isLoggedIn: false,
  login: async (token) => {
    await setAccessToken(token);
    set({ token, isLoggedIn: true });
  },
  logout: async () => {
    await removeAccessToken();
    set({ token: null, isLoggedIn: false });
  },
  loadToken: async () => {
    const token = await getAccessToken();
    if (!token) return set({ token: null, isLoggedIn: false });

    const isTokenValid = await verifyUserToken(token);
    return set({ token, isLoggedIn: isTokenValid });
  },
}));
