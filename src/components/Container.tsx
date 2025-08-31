import * as SystemUI from 'expo-system-ui';

import { useTheme } from '@/theme';

import { SafeAreaView, type SafeAreaViewProps } from './custom';

interface ContainerProps extends SafeAreaViewProps {
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { colors } = useTheme();

  SystemUI.setBackgroundColorAsync(colors['background']);

  return <SafeAreaView bg="background" alignItems="center" py="2" px="5" {...props} />;
};
