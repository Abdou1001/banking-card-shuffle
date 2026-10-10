import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Service } from '@/types/service';
import { CARD_DIMENSIONS } from '@/constants/spacing';

interface ShuffleDeckProps {
  cards: Service[];
  cardValues: any[];
  isShuffling: boolean;
  isCompleted: boolean;
  selectedIndex: number | null;
  onCardPress?: (card: Service, index: number) => void;
  style?: StyleProp<ViewStyle>;
}

export function ShuffleDeck({
  cards,
  cardValues,
  isShuffling,
  isCompleted,
  selectedIndex,
  onCardPress,
  style,
}: ShuffleDeckProps) {
  const total = cards.length;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.deckWrapper}>
        {cards.map((card, index) => {
          const cv = cardValues[index];
          const isSelected = isCompleted && selectedIndex === index;
          const isOtherCompleted = isCompleted && selectedIndex !== index;

          let cardState: 'normal' | 'selected' | 'shuffling' | 'disabled' = 'normal';
          let showBack = false;

          if (isShuffling) {
            cardState = 'shuffling';
            showBack = true;
          } else if (isSelected) {
            cardState = 'selected';
            showBack = false;
          } else if (isOtherCompleted) {
            cardState = 'disabled';
            showBack = true; // non-selected cards remain face down in the deck
          }

          return (
            <View
              key={card.id || `shuffle-card-${index}`}
              style={styles.cardAbsolutePositioner}
              pointerEvents={isCompleted && selectedIndex === index ? 'auto' : 'none'}
            >
              <ServiceCard
                card={card}
                index={index}
                totalCards={total}
                state={cardState}
                isBack={showBack}
                onPress={onCardPress ? () => onCardPress(card, index) : undefined}
                animatedTranslateX={cv?.translateX}
                animatedTranslateY={cv?.translateY}
                animatedRotateZ={cv?.rotateZ}
                animatedScale={cv?.scale}
                animatedOpacity={cv?.opacity}
                animatedZIndex={cv?.zIndex}
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
    minHeight: CARD_DIMENSIONS.height + 40,
    marginVertical: 10,
  },
  deckWrapper: {
    width: CARD_DIMENSIONS.width,
    height: CARD_DIMENSIONS.height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardAbsolutePositioner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
