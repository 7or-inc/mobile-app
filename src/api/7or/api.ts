import axios from 'axios';

export const hor = axios.create({
  baseURL: 'https://dev-7or-inc.up.railway.app/api/v1',
  headers: {
    'api-key': process.env.EXPO_PUBLIC_7OR_BACKEND_TOKEN,
  },
});

export const verifyUserToken = async (token: string) =>
  hor
    .get<boolean>('/auth/token-verify', { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => res.data)
    .catch(() => false);
