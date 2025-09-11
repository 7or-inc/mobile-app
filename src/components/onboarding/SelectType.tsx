import { useRouter } from 'expo-router';

import { SelectTypeHero } from '@/assets/images';
import { useTranslate } from '@/i18n';

import { Button, Text, View } from '../custom';

export const SelectType = () => {
  const t = useTranslate();
  const router = useRouter();

  return (
    <View justifyContent="space-between" gap="2" py="3.5" px="2.5" flex={1} width="100%">
      <View flexDirection="column" justifyContent="center" gap="20">
        <Text variant="h1" textAlign="center" weight={400}>
          {t('onboarding.select-type.title')}
        </Text>

        <View alignItems="center">
          <SelectTypeHero />
        </View>
      </View>

      <View gap="4.5">
        <Button>{t('profile.type.client')}</Button>
        <Button onPress={() => router.push('/(onboarding)/categories')}>{t('profile.type.service-provider')}</Button>
        <Button>{t('profile.type.part-time-worker')}</Button>
      </View>
    </View>
  );
};
