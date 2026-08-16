import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors, Spacing, Radii, Motion } from '@/theme/tokens';
import { Package, ChevronRight, Truck, ScanLine } from 'lucide-react-native';
import { MotiView, MotiPressable } from 'moti/interactions';
import * as Haptics from 'expo-haptics';

export default function SmartTrackingSection() {
  return (
    <View style={styles.container}>
      {/* Active Shipment Widget */}
      <MotiPressable
        onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        animate={({ hovered, pressed }) => {
          'worklet'
          return {
            scale: pressed ? 0.97 : hovered ? 0.99 : 1,
          }
        }}
        transition={Motion.spring.snappy}
        style={styles.activeCard}
      >
        <View style={styles.cardHeader}>
          <View style={styles.badge}>
            <View style={styles.liveDot} />
            <Text style={styles.badgeText}>IN TRANSIT</Text>
          </View>
          <Text style={styles.trackingId}>AWB 8472910384</Text>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.iconContainer}>
            <Package color={Colors.primary} size={24} />
          </View>
          <View style={styles.progressLine}>
            <View style={styles.progressFill} />
          </View>
          <View style={[styles.iconContainer, styles.iconContainerDest]}>
            <Truck color={Colors.textMuted} size={20} />
          </View>
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.etaText}>Arriving Today, 8 PM</Text>
          <ChevronRight color={Colors.textMuted} size={20} />
        </View>
      </MotiPressable>

      {/* Premium Tracking Input */}
      <View style={styles.inputContainer}>
        <SearchIcon />
        <TextInput 
          placeholder="Enter AWB / Tracking ID"
          placeholderTextColor={Colors.textMuted}
          style={styles.input}
          onFocus={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        />
        <MotiPressable 
          onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          style={styles.scanBtn}
        >
          <ScanLine color={Colors.surface} size={18} />
        </MotiPressable>
      </View>
    </View>
  );
}

const SearchIcon = () => (
  <View style={styles.searchIconWrap}>
    <Package color={Colors.textMuted} size={18} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.lg,
  },
  activeCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 24,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.pill,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  badgeText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  trackingId: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(230, 57, 70, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerDest: {
    backgroundColor: Colors.background,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.sm,
    borderRadius: 1,
  },
  progressFill: {
    width: '60%',
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  etaText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  searchIconWrap: {
    paddingHorizontal: Spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: Colors.textDark,
    fontWeight: '500',
  },
  scanBtn: {
    width: 44,
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.textDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
