import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { SPACING } from '@/constants/spacing';
import { AppLogo } from '@/components/common/AppLogo';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  rightComponent?: React.ReactNode;
}

export function AppHeader({
  title,
  showBack = true,
  onBack,
  showLogo = true,
  rightComponent,
}: AppHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Right side in RTL (which is the back action in Arabic flow) */}
      <View style={styles.actionContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="رجوع"
            activeOpacity={0.7}
          >
            {/* In RTL, the back arrow points right (towards previous history) */}
            <Text style={styles.backText}>رجوع</Text>
            <ChevronRight size={26} color={COLORS.primaryBlue} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Center content: Logo or Title */}
      <View style={styles.centerContainer}>
        {showLogo ? (
          <AppLogo size="md" />
        ) : (
          title && (
            <Text style={styles.titleText} numberOfLines={1}>
              {title}
            </Text>
          )
        )}
      </View>

      {/* Left side in RTL (trailing side) */}
      <View style={styles.actionContainer}>
        {rightComponent ? rightComponent : <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row', // RTL flow
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: 'transparent',
  },
  actionContainer: {
    minWidth: 70,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  backText: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    color: COLORS.primaryBlue,
    marginRight: 2,
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.text,
    textAlign: 'center',
  },
  placeholder: {
    width: 24,
    height: 24,
  },
});
