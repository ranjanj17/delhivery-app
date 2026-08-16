import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { Package, Truck, ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function ActiveTrackingCard() {
  return (
    <Pressable 
      style={styles.card}
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      {/* Top Row: Status and AWB */}
      <View style={styles.topRow}>
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>IN TRANSIT</Text>
        </View>
        <Text style={styles.awbText}>AWB 8472910384</Text>
      </View>

      {/* Middle Row: Progress */}
      <View style={styles.progressRow}>
        <View style={styles.boxIconContainer}>
          <Package color={Colors.primary} size={24} strokeWidth={2} />
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
        </View>
        
        <View style={styles.truckIconContainer}>
          <Truck color={Colors.textMuted} size={20} strokeWidth={2} />
        </View>
      </View>

      {/* Bottom Row: ETA */}
      <View style={styles.bottomRow}>
        <Text style={styles.etaText}>Arriving Today, 8 PM</Text>
        <ChevronRight color={Colors.textMuted} size={20} strokeWidth={2} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EF', // Light green background
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
    marginRight: 6,
  },
  statusText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  awbText: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  boxIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFEBF0', // Light pink
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  progressBarContainer: {
    flex: 1,
    height: 20,
    justifyContent: 'center',
    marginHorizontal: Spacing.sm,
    zIndex: 1,
  },
  progressBarTrack: {
    height: 2,
    backgroundColor: '#E5E7EB', // Light grey line
    width: '100%',
  },
  progressBarFill: {
    height: 2,
    backgroundColor: Colors.primary, // Red fill
  },
  truckIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6', // Light grey
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
  }
});
