import { Stack } from 'expo-router';

import { Providers } from '@/components';

const isLoggedIn = false;

export default () => (
  <Providers>
    <Stack>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)/select-auth" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/log-in" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  </Providers>
);
