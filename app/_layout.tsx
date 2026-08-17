import 'react-native-gesture-handler';
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { store } from '@/store';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
