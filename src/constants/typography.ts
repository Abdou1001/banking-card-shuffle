import { TextStyle } from 'react-native';

export const FONTS = {
  regular: 'Cairo_400Regular',
  medium: 'Cairo_500Medium',
  semiBold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
  black: 'Cairo_900Black',
};

export const TYPOGRAPHY: Record<string, TextStyle> = {
  h1: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 38,
    textAlign: 'right',
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'right',
  },
  h3: {
    fontFamily: FONTS.semiBold,
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'right',
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
  },
  bodyMedium: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'right',
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
  },
  timerNumber: {
    fontFamily: FONTS.black,
    fontSize: 54,
    lineHeight: 64,
    textAlign: 'center',
    letterSpacing: 2,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
};
