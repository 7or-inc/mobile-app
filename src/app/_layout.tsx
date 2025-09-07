import { Stack } from 'expo-router';

import { Providers } from '@/components';
import { useAuthStore } from '@/stores';
import { useEffect } from 'react';

export default () => {
  const { isLoggedIn, isPending, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return (
    <Providers>
      <Stack>
        <Stack.Protected guard={isPending}>
          <Stack.Screen name="splash-screen" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/select-auth" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/log-in" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/verify-otp" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="index" />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
};
