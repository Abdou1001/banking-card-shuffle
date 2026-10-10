import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Clock, Play, RotateCcw, ArrowRight } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { SelectedCard } from '@/components/cards/SelectedCard';
import { AppButton } from '@/components/common/AppButton';
import { useServiceContext } from '@/context/ServiceContext';
import { services } from '@/data/services';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING, RADIUS } from '@/constants/spacing';
import { formatDurationArabic } from '@/utils/format';

export default function ServiceResultScreen() {
  const router = useRouter();
  const {
    selectedService,
    selectedMainService,
    selectedSubService,
  } = useServiceContext();

  // Fallbacks if user lands directly on this route
  const activeService = selectedService || selectedSubService || selectedMainService || services[0];
  const subService = activeService;
  const mainService = activeService;

  const handleStartOperation = () => {
    router.push('/timer');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScreenContainer>
      <AppHeader
        showBack
        onBack={handleBack}
        showLogo
      />

      <View style={styles.container}>
        {/* Header context */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={styles.headerSection}
        >
          <Text style={styles.categoryTitle}>{mainService.name}</Text>
          <Text style={styles.title}>العملية المحددة للبدء</Text>
        </Animated.View>

        {/* Selected Hero Playing Card */}
        <Animated.View
          entering={FadeInDown.duration(500).delay(150)}
          style={styles.cardContainer}
        >
          <SelectedCard card={subService} />
        </Animated.View>

        {/* Duration & Details Panel */}
        <Animated.View
          entering={FadeInUp.duration(500).delay(250)}
          style={styles.detailsPanel}
        >
          <View style={styles.durationCard}>
            <View style={styles.durationIconBox}>
              <Clock size={24} color={COLORS.primaryRed} />
            </View>
            <View style={styles.durationInfo}>
              <Text style={styles.durationTitle}>مدة العملية المحددة</Text>
              <Text style={styles.durationValue}>
                {formatDurationArabic(subService.duration)}
              </Text>
            </View>
          </View>

          {subService.description && (
            <Text style={styles.descriptionText}>
              {subService.description}
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <AppButton
              title="بدء العملية"
              variant="primary"
              size="lg"
              onPress={handleStartOperation}
              icon={<Play size={20} color="#FFFFFF" />}
              iconPosition="right"
              style={styles.startBtn}
            />

            <AppButton
              title="رجوع"
              variant="outline"
              size="md"
              onPress={handleBack}
              icon={<ArrowRight size={18} color={COLORS.primaryBlue} />}
              iconPosition="right"
              style={styles.backBtn}
            />
          </View>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: SPACING.xs,
  },
  categoryTitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 2,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primaryBlue,
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.md,
  },
  detailsPanel: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
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
    width: 44,
    height: 44,
    borderRadius: 22,
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
    fontSize: 18,
    color: COLORS.primaryRed,
  },
  descriptionText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  actionContainer: {
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
