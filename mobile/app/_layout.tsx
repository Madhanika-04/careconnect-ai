import React from 'react';
import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.card,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="emergency-sos"
          options={{
            title: 'EMERGENCY DISPATCH',
            headerStyle: { backgroundColor: colors.danger },
            headerTintColor: '#FFFFFF',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="family"
          options={{
            title: 'Family Monitoring',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: '#FFFFFF',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="prediction"
          options={{
            title: 'Risk Assessment Details',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: '#FFFFFF',
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="health-center"
          options={{
            title: 'Health Center Dashboard',
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: '#FFFFFF',
            headerShown: true,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
