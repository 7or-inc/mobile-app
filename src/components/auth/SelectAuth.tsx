import { useRouter } from 'expo-router';

import { SelectAuthHero } from '@/assets/images';
import { useTranslate } from '@/i18n';

import { Button, Link, Text, View, br } from '../custom';

export const SelectAuth = () => {
  const t = useTranslate();
  const router = useRouter();

  return (
    <View justifyContent="space-between" gap="2" py="3.5" px="2.5" flex={1}>
      <View flexDirection="column" justifyContent="center" gap="20">
        <Text variant="h1" textAlign="center" weight={400}>
          {t('auth.select-auth.title')}
        </Text>

        <View alignItems="center">
          <SelectAuthHero />
        </View>
      </View>

      <View gap="6">
        <View gap="4.5">
          <Button onPress={() => router.push('/(auth)/sign-up')}>{t('auth.sign-up')}</Button>
          <Button variant="secondary" onPress={() => router.push('/(auth)/log-in')}>
            {t('auth.log-in')}
          </Button>
        </View>

        <Text size="xs" fontHeight="xs" textAlign="center">
          {t('app.policies', {
            br,
            Style: (chunks) => (
              <Link href="/" color="primary">
                {chunks}
              </Link>
            ),
          })}
        </Text>
      </View>
    </View>
  );
};
