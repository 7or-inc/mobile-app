'use client';

import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { colors, fontSizes, type Color, type FontSizes } from '@/theme';
import { View, type ViewProps } from './View';

interface LoaderProps extends ViewProps {
  size?: keyof FontSizes;
  color?: Color;
}

export const Loader = ({ size = '2xl', color = 'white', ...props }: LoaderProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();

    return () => loop.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View justifyContent="center" alignItems="center" {...props}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="loading1" size={fontSizes[size]} color={colors[color]} />
      </Animated.View>
    </View>
  );
};
