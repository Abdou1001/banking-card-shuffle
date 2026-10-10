import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Image} from "expo-image";
import { SvgXml } from 'react-native-svg';
import { X, Clock, CheckCircle2, ShieldCheck, Tag, Info } from 'lucide-react-native';
import { Service } from '@/types/service';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/typography';
import { RADIUS, SPACING } from '@/constants/spacing';
import { formatDurationArabic } from '@/utils/format';
import { AppButton } from '@/components/common/AppButton';

interface ServiceDetailsModalProps {
  visible: boolean;
  service: Service | null;
  onClose: () => void;
  onStartTimer?: () => void;
}

export function ServiceDetailsModal({
  visible,
  service,
  onClose,
  onStartTimer,
}: ServiceDetailsModalProps) {
  if (!service) return null;

  const renderIcon = () => {
    if (service.iconType === 'svg' && service.svgXml) {
      return <SvgXml xml={service.svgXml} width={50} height={50} />;
    }
    if (service.iconSource) {
      return (
        <Image
          source={service.iconSource}
          style={{ width: 50, height: 50 }}
          contentFit="contain"
        />
      );
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheetContainer}>
          {/* Header Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
              accessibilityLabel="إغلاق"
            >
              <X size={20} color={COLORS.secondaryText} />
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerSubtitle}>تفاصيل الخدمة</Text>
              <Text style={styles.headerTitle}>{service.name}</Text>
            </View>

            <View style={styles.serviceNumberBadge}>
              <Text style={styles.serviceNumberText}>{service.number}</Text>
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Top Identity Card */}
            <View style={styles.identityCard}>
              <View style={styles.iconBox}>
                {renderIcon()}
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <Clock size={13} color={COLORS.primaryBlue} />
                  <Text style={styles.metaPillText}>
                    المدة: {formatDurationArabic(service.duration)}
                  </Text>
                </View>

                {service.details?.category && (
                  <View style={styles.metaPill}>
                    <Tag size={13} color={COLORS.primaryBlue} />
                    <Text style={styles.metaPillText}>
                      {service.details.category}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Description Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Info size={16} color={COLORS.primaryBlue} />
                <Text style={styles.sectionTitle}>عن الخدمة</Text>
              </View>
              <Text style={styles.sectionBody}>{service.description}</Text>
            </View>

            {/* Instructions */}
            {service.details?.instructions && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <ShieldCheck size={16} color={COLORS.primaryBlue} />
                  <Text style={styles.sectionTitle}>طريقة الاستخدام</Text>
                </View>
                <Text style={styles.sectionBody}>
                  {service.details.instructions}
                </Text>
              </View>
            )}

            {/* Features list */}
            {service.details?.features && service.details.features.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>المميزات والضمانات</Text>
                <View style={styles.featuresList}>
                  {service.details.features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                      <CheckCircle2 size={16} color={COLORS.success} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Fees */}
            {service.details?.fees && (
              <View style={styles.feesBox}>
                <Text style={styles.feesLabel}>الرسوم والعمولة:</Text>
                <Text style={styles.feesValue}>{service.details.fees}</Text>
              </View>
            )}
          </ScrollView>

          {/* Bottom Action Footer */}
          <View style={styles.footer}>
            {onStartTimer && (
              <AppButton
                title="ابدأ العداد"
                variant="primary"
                size="md"
                onPress={() => {
                  onClose();
                  onStartTimer();
                }}
                style={styles.actionButton}
              />
            )}
            <AppButton
              title="إغلاق"
              variant="outline"
              size="md"
              onPress={onClose}
              style={styles.actionButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 13, 28, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  sheetContainer: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '82%',
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: COLORS.darkNavy,
  },
  serviceNumberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  serviceNumberText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.primaryBlue,
  },
  scrollArea: {
    flexGrow: 0,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  identityCard: {
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    direction: 'ltr',
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  metaPillText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primaryBlue,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.darkNavy,
    textAlign:"right",
    direction: 'ltr',
  },
  sectionBody: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 21,
    color: COLORS.secondaryText,
    textAlign: 'right',
    direction: 'ltr',
  },
  featuresList: {
    marginTop: 6,
    gap: 6,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    textAlign: 'right',
    direction: 'ltr',
  },
  featureText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: '#334155',
    flex: 1,
    textAlign: 'right',
  },
  feesBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  feesLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.primaryRed,
  },
  feesValue: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.primaryRed,
    flexShrink: 1,
    lineHeight: 18,
    textAlign: "right"
  },
  footer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F6',
    backgroundColor: '#FFFFFF',
  },
  actionButton: {
    flex: 1,
  },
});
