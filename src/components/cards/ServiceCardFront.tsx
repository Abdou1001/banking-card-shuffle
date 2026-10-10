import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { Clock } from 'lucide-react-native';
import { Service } from '@/types/service';
import { COLORS } from '@/constants/colors';
import { CARD_DIMENSIONS, RADIUS, SPACING } from '@/constants/spacing';
import { FONTS } from '@/constants/typography';
import { formatDurationArabic } from '@/utils/format';

interface ServiceCardFrontProps {
  service: Service;
  style?: StyleProp<ViewStyle>;
  compact?: boolean;
  showDuration?: boolean;
}

export function ServiceCardFront({
  service,
  style,
  compact = false,
  showDuration = true,
}: ServiceCardFrontProps) {
  const cardWidth = compact ? CARD_DIMENSIONS.miniWidth : CARD_DIMENSIONS.width;
  const cardHeight = compact ? CARD_DIMENSIONS.miniHeight : CARD_DIMENSIONS.height;

  const renderIcon = () => {
    const iconSize = compact ? 42 : 58;
    if (service.iconSource) {
      return (
        <Image
          source={service.iconSource}
          style={{ width: iconSize, height: iconSize }}
          contentFit="contain"
        />
      );
    }

    return null;
  };

  return (
    <View
      style={[
        styles.cardSurface,
        { width: cardWidth, height: cardHeight },
        style,
      ]}
    >
      {/* ── TOP-LEFT CORNER INDEX (Emblem + Number) ── */}
      <View style={styles.cornerTL}>
        <Image
          source={require('../../../assets/cornerLogo.png')}
          style={styles.cornerLogo}
          contentFit="contain"
        />
        <Text style={styles.cornerNumber}>{service.number}</Text>
      </View>

      {/* ── MAIN CENTER CONTENT ── */}
      <View style={styles.centerContainer}>
        {/* Service Icon */}
        <View style={styles.iconMedallion}>
          {renderIcon()}
        </View>

        {/* Service Name */}
        <Text
          style={[styles.serviceName, compact && styles.serviceNameCompact]}
          numberOfLines={2}
        >
          {service.name}
        </Text>

        {/* Duration badge */}
        {showDuration && service.duration && (
          <View style={styles.durationBadge}>
            <Clock size={12} color={COLORS.primaryBlue} />
            <Text style={styles.durationText}>
              {formatDurationArabic(service.duration)}
            </Text>
          </View>
        )}
      </View>

      {/* ── BOTTOM-RIGHT CORNER INDEX ── */}
      <View style={styles.cornerBR}>
        <Text style={[styles.cornerNumber, styles.inverted]}>
          {service.number}
        </Text>
        <Image
          source={require('../../../assets/cornerLogo.png')}
          style={styles.cornerLogo}
          contentFit="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardSurface: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.card,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerTL: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'center',
    zIndex: 2,
    direction: 'ltr',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    zIndex: 2,
    direction: 'ltr',
  },
  cornerLogo: {
    width: 15,
    height: 15,
    direction: 'ltr',
  },
  cornerNumber: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.primaryRed,
    marginBottom: 1,
  },
  inverted: {
    transform: [{ rotate: '180deg' }],
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    width: '100%',
  },
  iconMedallion: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    direction: 'ltr',
  },
  serviceName: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    lineHeight: 26,
    color: '#090D1C',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  serviceNameCompact: {
    fontSize: 14,
    lineHeight: 20,
  },
  durationBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    marginTop: 2,
  },
  durationText: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    color: COLORS.primaryBlue,
  },
});
