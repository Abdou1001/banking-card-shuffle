import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, ImageStyle } from 'react-native';
import { Image } from "expo-image";

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const SIZE_MAP = {
  sm: { width: 50, height: 50 },
  md: { width: 80, height: 80 },
  lg: { width: 110, height: 110 },
  xl: { width: 140, height: 140 },
};

export function AppLogo({ size = 'md', style, imageStyle }: AppLogoProps) {
  const dimensions = SIZE_MAP[size];

  return (
    <View style={[styles.container, style]}>
      <Image
      source={require("../../../assets/logo.png")}
      style={[
        styles.image,
        { width: dimensions.width, height: dimensions.height },
        imageStyle,
      ]}
      contentFit="contain"
      cachePolicy="memory-disk"
      priority="high"
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    direction: 'ltr',
  },
  image: {
    direction: 'ltr',
  },
});
