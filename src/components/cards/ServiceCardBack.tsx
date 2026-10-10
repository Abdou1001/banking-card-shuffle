import React, { useId } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { CARD_DIMENSIONS, RADIUS } from '@/constants/spacing';
import { COLORS } from '@/constants/colors';
import { Image } from "expo-image";

interface ServiceCardBackProps {
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
}

export function ServiceCardBack({
  style,
  compact = false,
}: ServiceCardBackProps) {
  const cardWidth = compact ? CARD_DIMENSIONS.miniWidth : CARD_DIMENSIONS.width;
  const cardHeight = compact ? CARD_DIMENSIONS.miniHeight : CARD_DIMENSIONS.height;
  const rawId = useId();
  const gradId = `cardGrad_${rawId.replace(/[^a-zA-Z0-9]/g, '_')}`;

  return (
    <View
      style={[
        styles.cardSurface,
        { width: cardWidth, height: cardHeight },
        style,
      ]}
    >
      {/* Background SVG Gradient with unique ID */}
      <Svg
        width={cardWidth}
        height={cardHeight}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <LinearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#090D1C" stopOpacity="1" />
            <Stop offset="50%" stopColor="#1E2863" stopOpacity="1" />
            <Stop offset="100%" stopColor="#4057DA" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={cardWidth}
          height={cardHeight}
          rx={RADIUS.card}
          ry={RADIUS.card}
          fill={`url(#${gradId})`}
        />
      </Svg>

      {/* Decorative Inner Playing Card Border Frame */}
      <View style={styles.innerFrame}>
        {/* Subtle patterned corner dots */}
        <View style={[styles.cornerPill, styles.cornerTL]} />
        <View style={[styles.cornerPill, styles.cornerTR]} />
        <View style={[styles.cornerPill, styles.cornerBL]} />
        <View style={[styles.cornerPill, styles.cornerBR]} />

        {/* Center BinDowal Emblem */}
        <View style={styles.centerMedallion}>
          <Image
            source={require('../../../assets/sec_logo.png')}
            style={styles.logoImage}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardSurface: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: COLORS.darkNavy,
  },
  innerFrame: {
    ...StyleSheet.absoluteFillObject,
    margin: 8,
    borderRadius: RADIUS.card - 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerMedallion: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    direction: 'ltr',
  },
  logoImage: {
    width: 44,
    height: 44,
    direction: 'ltr',
  },
  cornerPill: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  cornerTL: { top: 8, left: 8 },
  cornerTR: { top: 8, right: 8 },
  cornerBL: { bottom: 8, left: 8 },
  cornerBR: { bottom: 8, right: 8 },
});
