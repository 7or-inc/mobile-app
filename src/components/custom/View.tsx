import { border, createRestyleComponent, layout, type BorderProps, type LayoutProps } from '@shopify/restyle';
import { View as ReactView, ViewProps as ReactViewProps } from 'react-native';

import { base, type BaseProps, type Theme } from '@/theme';

export type ViewProps = ReactViewProps & BaseProps & LayoutProps<Theme> & BorderProps<Theme>;

export const View = createRestyleComponent<ViewProps, Theme>([...base, layout, border], ReactView);
