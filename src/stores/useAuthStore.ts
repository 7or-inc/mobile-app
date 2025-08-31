import { create } from 'zustand';

import { getAccessToken, removeAccessToken, setAccessToken, verifyUserToken } from '@/api';

interface AuthStates {
  token: string | null;
  isLoggedIn: boolean;
  isPending: boolean;
}

interface AuthActions {
  loadToken: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStates & AuthActions>((set) => ({
  token: null,
  isLoggedIn: false,
  isPending: true,
  login: async (token) => {
    set({ isPending: true });

    await setAccessToken(token);
    set({ token, isLoggedIn: true, isPending: false });
  },
  logout: async () => {
    set({ isPending: true });

    await removeAccessToken();
    set({ token: null, isLoggedIn: false, isPending: false });
  },
  loadToken: async () => {
    set({ isPending: true });

    const token = await getAccessToken();
    if (!token) return set({ token: null, isLoggedIn: false, isPending: false });

    const isTokenValid = await verifyUserToken(token);
    return set({ token, isLoggedIn: isTokenValid, isPending: false });
  },
}));
