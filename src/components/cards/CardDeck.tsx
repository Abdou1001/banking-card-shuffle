import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ServiceCard, ServiceCardData } from '@/components/cards/ServiceCard';
import { CARD_DIMENSIONS } from '@/constants/spacing';

interface CardDeckProps {
  cards: ServiceCardData[];
  selectedIndex?: number | null;
  onCardPress?: (card: ServiceCardData, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

export function CardDeck({
  cards,
  selectedIndex = null,
  onCardPress,
  style,
}: CardDeckProps) {
  const total = cards.length;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.deckWrapper}>
        {cards.map((card, index) => {
          const isSelected = selectedIndex === index;
          const offsetFromCenter = index - (total - 1) / 2;

          // Static fanned offset
          const translateX = offsetFromCenter * 16;
          const translateY = Math.abs(offsetFromCenter) * 5;
          const rotate = `${offsetFromCenter * 3}deg`;

          return (
            <View
              key={card.id || `static-card-${index}`}
              style={[
                styles.cardPositioner,
                {
                  transform: [
                    { translateX },
                    { translateY },
                    { rotate },
                  ],
                  zIndex: isSelected ? 99 : index + 1,
                },
              ]}
            >
              <ServiceCard
                card={card}
                index={index}
                totalCards={total}
                state={isSelected ? 'selected' : 'normal'}
                onPress={onCardPress ? () => onCardPress(card, index) : undefined}
                isHero={isSelected}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: CARD_DIMENSIONS.height + 30,
    marginVertical: 10,
  },
  deckWrapper: {
    width: CARD_DIMENSIONS.width,
    height: CARD_DIMENSIONS.height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardPositioner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
