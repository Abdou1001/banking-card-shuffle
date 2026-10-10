import React, { useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Service } from '@/types/service';
import { ServiceCard } from './ServiceCard';
import { CARD_DIMENSIONS, SPACING, SCREEN } from '@/constants/spacing';

interface ServiceDeckProps {
  services: Service[];
  selectedIndex?: number | null;
  onServicePress?: (service: Service, index: number) => void;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ServiceDeck({
  services,
  selectedIndex = null,
  onServicePress,
  scrollEnabled = true,
  style,
}: ServiceDeckProps) {
  const flatListRef = useRef<FlatList<Service>>(null);

  // Spacing between cards to show peek of next/previous cards
  const CARD_GAP = SPACING.md;
  const ITEM_WIDTH = CARD_DIMENSIONS.width + CARD_GAP;
  const SIDE_INSET = Math.max((SCREEN.width - CARD_DIMENSIONS.width) / 2, SPACING.md);

  const renderCard = ({ item, index }: { item: Service; index: number }) => {
    const isSelected = selectedIndex === index;

    return (
      <View style={[styles.cardItem, { marginRight: index === services.length - 1 ? 0 : CARD_GAP }]}>
        <ServiceCard
          card={item}
          index={index}
          totalCards={services.length}
          state={isSelected ? 'selected' : 'normal'}
          onPress={onServicePress ? () => onServicePress(item, index) : undefined}
          isHero={isSelected}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={services}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: SIDE_INSET },
        ]}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        snapToAlignment="center"
        initialNumToRender={5}
        maxToRenderPerBatch={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: CARD_DIMENSIONS.height + 20,
    marginVertical: SPACING.xs,
    direction: 'ltr',
  },
  listContent: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  cardItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
