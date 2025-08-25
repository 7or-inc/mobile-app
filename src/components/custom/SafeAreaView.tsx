import { createRestyleComponent, layout, type LayoutProps } from '@shopify/restyle';
import {
  SafeAreaView as ReactSafeAreaView,
  type SafeAreaViewProps as ReactSafeAreaViewProps,
} from 'react-native-safe-area-context';

import { base, type BaseProps, type Theme } from '@/theme';

export type SafeAreaViewProps = ReactSafeAreaViewProps & BaseProps & LayoutProps<Theme>;

const RestyleSafeAreaView = createRestyleComponent<SafeAreaViewProps, Theme>([...base, layout], ReactSafeAreaView);

export const SafeAreaView = (props: SafeAreaViewProps) => <RestyleSafeAreaView flex={1} {...props} />;
