import { Stack } from 'expo-router';
import { useEffect } from 'react';

import { Providers } from '@/components';
import { useAuthStore } from '@/stores';

const isOnboarded = false; // TODO: Replace with real logic

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
          <Stack.Screen name="(auth)/forgot-password" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/verify-otp" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={!isOnboarded}>
          <Stack.Screen name="(onboarding)/select-type" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)/categories" options={{ headerShown: false }} />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="index" />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
};
