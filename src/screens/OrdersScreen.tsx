import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Spacing } from '@/theme/tokens';
import OrdersHeader from '@/components/OrdersHeader';
import ActiveTrackingCard from '@/components/ActiveTrackingCard';
import AWBSearchBar from '@/components/AWBSearchBar';
import ServiceGrid from '@/components/ServiceGrid';

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <OrdersHeader />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ActiveTrackingCard />
        <AWBSearchBar />
        <ServiceGrid />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FA', // Exact background color for Orders
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl * 3, // Space for bottom tab bar
  }
});
