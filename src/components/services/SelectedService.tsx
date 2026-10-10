import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Play, ArrowRight } from 'lucide-react-native';
import { ServiceCard, ServiceItemData } from '@/components/services/ServiceCard';
import { AppButton } from '@/components/common/AppButton';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING, RADIUS } from '@/constants/spacing';
import { formatDurationArabic } from '@/utils/format';

interface SelectedServiceProps {
  item: ServiceItemData;
  categoryTitle?: string;
  onStart: () => void;
  onBack: () => void;
}

export function SelectedService({
  item,
  categoryTitle,
  onStart,
  onBack,
}: SelectedServiceProps) {
  return (
    <View style={styles.container}>
      {categoryTitle && (
        <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      )}

      {/* Hero Card */}
      <View style={styles.cardContainer}>
        <ServiceCard item={item} state="selected" isHero />
      </View>

      {/* Details Box */}
      <View style={styles.detailsBox}>
        {item.duration !== undefined && (
          <View style={styles.durationCard}>
            <View style={styles.durationIconBox}>
              <Clock size={22} color={COLORS.primaryRed} />
            </View>
            <View style={styles.durationInfo}>
              <Text style={styles.durationTitle}>مدة العملية المحددة</Text>
              <Text style={styles.durationValue}>
                {formatDurationArabic(item.duration)}
              </Text>
            </View>
          </View>
        )}

        {item.description && (
          <Text style={styles.descriptionText}>{item.description}</Text>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <AppButton
            title="بدء العملية"
            variant="primary"
            size="lg"
            onPress={onStart}
            icon={<Play size={20} color="#FFFFFF" />}
            iconPosition="right"
            style={styles.startBtn}
          />

          <AppButton
            title="رجوع"
            variant="outline"
            size="md"
            onPress={onBack}
            icon={<ArrowRight size={18} color={COLORS.primaryBlue} />}
            iconPosition="right"
            style={styles.backBtn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  categoryTitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 6,
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.sm,
  },
  detailsBox: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginTop: SPACING.md,
  },
  durationCard: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: SPACING.md,
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: RADIUS.lg,
    width: '100%',
    marginBottom: SPACING.sm,
  },
  durationIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationInfo: {
    alignItems: 'flex-end',
  },
  durationTitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  durationValue: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.primaryRed,
  },
  descriptionText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  actions: {
    width: '100%',
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  startBtn: {
    width: '100%',
  },
  backBtn: {
    width: '100%',
  },
});
