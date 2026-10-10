import React from 'react';
import { StyleSheet, View, ActivityIndicator, I18nManager } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Cairo_400Regular,
  Cairo_500Medium,
  Cairo_600SemiBold,
  Cairo_700Bold,
  Cairo_900Black,
} from '@expo-google-fonts/cairo';
import { ServiceProvider } from '@/context/ServiceContext';
import { COLORS } from '@/constants/colors';

// Force RTL layout orientation for Arabic
try {
  if (!I18nManager.isRTL) {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }
} catch {
  // Ignored
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_500Medium,
    Cairo_600SemiBold,
    Cairo_700Bold,
    Cairo_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryRed} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ServiceProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_left',
              contentStyle: { backgroundColor: COLORS.surface },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="services" />
            <Stack.Screen name="main-services" />
            <Stack.Screen name="service-result" />
            <Stack.Screen name="timer" />
            <Stack.Screen name="success" />
            <Stack.Screen name="timeout" />
          </Stack>
        </ServiceProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    direction: 'rtl',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
