import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Spacing } from '@/theme/tokens';
import OrdersHeader from '@/components/OrdersHeader';
import ActiveTrackingCard from '@/components/ActiveTrackingCard';
import AWBSearchBar from '@/components/AWBSearchBar';
import ServiceGrid from '@/components/ServiceGrid';

import { MotiView } from 'moti';

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      
      <MotiView 
        from={{ scale: 0.85, opacity: 0, translateY: 15 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 100 }}
      >
        <OrdersHeader />
      </MotiView>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 250 }}
        >
          <ActiveTrackingCard />
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 350 }}
        >
          <AWBSearchBar />
        </MotiView>
        
        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 450 }}
        >
          <ServiceGrid />
        </MotiView>
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
