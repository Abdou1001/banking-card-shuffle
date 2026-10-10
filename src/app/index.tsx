import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ArrowLeft, Gauge } from 'lucide-react-native';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppLogo } from '@/components/common/AppLogo';
import { AppButton } from '@/components/common/AppButton';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING, RADIUS } from '@/constants/spacing';
import { useServiceContext } from '@/context/ServiceContext';

export default function StartScreen() {
  const router = useRouter();
  const { resetAll } = useServiceContext();

  const handleStart = () => {
    resetAll();
    router.push('/services');
  };

  return (
    <ScreenContainer backgroundColor={COLORS.background}>
      <View style={styles.container}>
        {/* Top Decorative Accent */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.logoSection}
        >
          <AppLogo size="xl" />
          <View style={styles.badgeContainer}>
            <Gauge size={14} color={COLORS.primaryRed} />
            <Text style={styles.badgeText}>محاكي العمليات المصرفية</Text>
          </View>
        </Animated.View>

        {/* Center Title and Description */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(250)}
          style={styles.textSection}
        >
          <Text style={styles.bankName}>بن دول باي</Text>
          <Text style={styles.title}>اختيار وتدريب العمليات المصرفية</Text>
          <Text style={styles.description}>
            تجربة تفاعلية سلسة بنظام أوراق اللعب لخلط واختيار الخدمات المصرفية
            الرئيسية والفرعية بدقة وتحديد زمني منظم.
          </Text>
        </Animated.View>

        {/* Bottom Action Section */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(400)}
          style={styles.actionSection}
        >
          <AppButton
            title="ابدأ الآن"
            onPress={handleStart}
            size="lg"
            variant="primary"
            icon={<ArrowLeft size={22} color="#FFFFFF" />}
            iconPosition="left"
            style={styles.startButton}
          />
          <Text style={styles.footerNote}>
            اضغط للبدء واختيار الخدمة المصرفية عبر خلط البطاقات
          </Text>
        </Animated.View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  badgeContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginTop: SPACING.md,
  },
  badgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primaryRed,
  },
  textSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
  },
  bankName: {
    fontFamily: FONTS.black,
    fontSize: 32,
    lineHeight: 44,
    color: COLORS.primaryBlue,
    textAlign: 'center',
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    lineHeight: 30,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: SPACING.md,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 25,
    color: COLORS.secondaryText,
    textAlign: 'center',
    maxWidth: 320,
  },
  actionSection: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    width: '100%',
  },
  startButton: {
    width: '100%',
    maxWidth: 300,
  },
  footerNote: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.mutedText,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});
