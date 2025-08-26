import * as SystemUI from 'expo-system-ui';

import { useTheme } from '@/theme';

import { SafeAreaView } from './custom';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { colors } = useTheme();

  SystemUI.setBackgroundColorAsync(colors['background']);

  return (
    <SafeAreaView bg="background" alignItems="center" py="2" px="5">
      {children}
    </SafeAreaView>
  );
};
