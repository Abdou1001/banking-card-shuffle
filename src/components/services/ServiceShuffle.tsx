import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { RotateCcw, Play, FileText, SlidersHorizontal, PlayingCards, PlayingCardsFan } from 'lucide-react-native';
import { Service } from '@/types/service';
import { ServiceDeck } from '@/components/cards/ServiceDeck';
import { ShuffleDeck } from '@/components/shuffle/ShuffleDeck';
import { AppButton } from '@/components/common/AppButton';
import { ServiceDetailsModal } from '@/components/services/ServiceDetailsModal';
import { useServiceShuffle } from '@/hooks/useServiceShuffle';
import { CARD_DIMENSIONS, RADIUS, SPACING } from '@/constants/spacing';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { formatDurationArabic } from '@/utils/format';

interface ServiceShuffleProps {
  services: Service[];
  onStartTimer: (selectedService: Service) => void;
  title?: string;
  subtitle?: string;
}

export function ServiceShuffle({
  services,
  onStartTimer,
  title = 'خدمات بن دوّل باي',
  subtitle = 'مرر لاستعراض الخدمات أو اضغط على خلط البطاقات لاختيار عشوائي',
}: ServiceShuffleProps) {
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [previewSelectedService, setPreviewSelectedService] = useState<Service | null>(null);

  const {
    isShuffling,
    isCompleted,
    selectedCard,
    selectedIndex,
    startShuffle,
    resetShuffle,
    cardMotions,
  } = useServiceShuffle<Service>({
    items: services,
  });

  const activeService = selectedCard || previewSelectedService;

  const handleShufflePress = () => {
    setPreviewSelectedService(null);
    startShuffle();
  };

  const handleCardPressInBrowseMode = (service: Service) => {
    // Allows user to click a card while browsing to inspect its details
    setPreviewSelectedService(service);
    setDetailsModalVisible(true);
  };

  const handleStartTimer = () => {
    if (activeService) {
      onStartTimer(activeService);
    }
  };

  const handleResetToBrowse = () => {
    resetShuffle();
    setPreviewSelectedService(null);
  };

  return (
    <View style={styles.container}>
      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <PlayingCards size={12} color={COLORS.primaryRed} />
          <Text style={styles.brandBadgeText}>10 خدمات مصرفية متاحة</Text>
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>
          {isShuffling
            ? 'جاري خلط الأوراق واختيار الخدمة...'
            : isCompleted
              ? 'تم اختيار الخدمة المصرفية بنجاح'
              : subtitle}
        </Text>
      </View>

      {/* ── MAIN CARD AREA ── */}
      <View style={styles.arenaContainer}>
        {!isShuffling && !isCompleted ? (
          /* Initial State: Horizontal scrollable FlatList showing all 10 cards */
          <Animated.View entering={FadeIn.duration(300)} style={styles.deckView}>
            <ServiceDeck
              services={services}
              onServicePress={handleCardPressInBrowseMode}
              scrollEnabled={!isShuffling}
            />
          </Animated.View>
        ) : (
          /* Shuffling / Selected State: Stacked shuffle arena using existing animation */
          <View style={styles.shuffleArena}>
            <ShuffleDeck
              cards={services}
              cardValues={cardMotions}
              isShuffling={isShuffling}
              isCompleted={isCompleted}
              selectedIndex={selectedIndex}
              onCardPress={handleCardPressInBrowseMode}
            />
          </View>
        )}
      </View>

      {/* ── BOTTOM ACTIONS ── */}
      <View style={styles.bottomSection}>
        {isCompleted && activeService ? (
          /* Result Summary & Actions */
          <Animated.View entering={FadeInUp.duration(350)} style={styles.resultBox}>
            {/* Service Title & Duration */}
            <View style={styles.resultHeader}>
              <View style={styles.serviceNumberTag}>
                <Text style={styles.serviceNumberTagText}>{activeService.number}</Text>
              </View>
              <View style={styles.resultTitleCol}>
                <Text style={styles.resultName}>{activeService.name}</Text>
                <Text style={styles.resultDuration}>
                  المدة المقدرة: {formatDurationArabic(activeService.duration)}
                </Text>
              </View>
            </View>

            {/* Primary & Secondary Actions */}
            <View style={styles.actionsContainer}>
              {/* Primary: Start Timer (dominant) */}
              <AppButton
                title="ابدأ العداد"
                variant="primary"
                size="md"
                onPress={handleStartTimer}
                icon={<Play size={18} color="#FFFFFF" style={{transform: [{ rotate: '180deg' }]}} />}
                iconPosition="left"
                style={styles.primaryActionBtn}
              />

              {/* Secondary Row: Re-shuffle + Details */}
              <View style={styles.secondaryActionsRow}>
                <AppButton
                  title="تفاصيل"
                  variant="outline"
                  size="sm"
                  onPress={() => setDetailsModalVisible(true)}
                  icon={<FileText size={16} color={COLORS.primaryBlue} />}
                  iconPosition="right"
                  style={styles.secondaryBtn}
                />

                <AppButton
                  title="إعادة الخلط"
                  variant="secondary"
                  size="sm"
                  onPress={handleShufflePress}
                  disabled={isShuffling}
                  icon={<RotateCcw size={16} color={"#FFF"} />}
                  iconPosition="right"
                  style={styles.secondaryBtn}
                />
              </View>

              {/* Optional: Return to browsing cards */}
              <TouchableOpacity
                onPress={handleResetToBrowse}
                style={styles.returnToBrowse}
                activeOpacity={0.7}
              >
                <SlidersHorizontal size={14} color={COLORS.secondaryText} />
                <Text style={styles.returnToBrowseText}>عرض جميع البطاقات</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : (
          /* Initial Browse State: Shuffle Button */
          <Animated.View entering={FadeIn.duration(200)} style={styles.startButtonBox}>
            <AppButton
              title={isShuffling ? 'جاري الخلط...' : 'اخلط الورق وافتح خدمة'}
              variant="primary"
              size="lg"
              onPress={handleShufflePress}
              disabled={isShuffling}
              loading={isShuffling}
              icon={
                isShuffling ? undefined : (
                  <PlayingCardsFan size={20} color="#FFFFFF" />
                )
              }
              iconPosition="left"
              accessibilityLabel="اخلط الورق"
              style={styles.startBtn}
            />
          </Animated.View>
        )}
      </View>

      {/* ── DETAILS MODAL ── */}
      <ServiceDetailsModal
        visible={detailsModalVisible}
        service={activeService}
        onClose={() => setDetailsModalVisible(false)}
        onStartTimer={handleStartTimer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: SPACING.md,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.lg,
  },
  brandBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    marginBottom: 6,
  },
  brandBadgeText: {
    fontFamily: FONTS.semiBold,
    fontSize: 12,
    color: COLORS.primaryBlue,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.darkNavy,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: SPACING.md,
    lineHeight: 18,
  },
  arenaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: CARD_DIMENSIONS.height + 20,
  },
  deckView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shuffleArena: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bottomSection: {
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
    width: '100%',
  },
  startButtonBox: {
    width: '100%',
    alignItems: 'center',
  },
  startBtn: {
    width: '100%',
    maxWidth: 320,
  },
  resultBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: COLORS.primaryBlue,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 6,
    textAlign: 'right',
    direction: 'ltr',
  },
  serviceNumberTag: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  serviceNumberTagText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.primaryBlue,
  },
  resultTitleCol: {
    flex: 1,
    alignItems: 'flex-end',
  },
  resultName: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.darkNavy,
  },
  resultDuration: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primaryRed,
  },
  actionsContainer: {
    width: '100%',
    gap: SPACING.xs,
    marginTop: SPACING.lg
  },
  primaryActionBtn: {
    width: '100%',
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: SPACING.xs,
    width: '100%',
    marginTop: 4,
  },
  secondaryBtn: {
    flex: 1,
    textAlign: 'right',
    direction: 'ltr',
  },
  returnToBrowse: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    marginTop: 2,
  },
  returnToBrowseText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.secondaryText,

  },
});