import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { Navigation, Search, MessageSquare, ChevronDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable 
          style={styles.locationContainer}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <Navigation color="#E63946" size={20} strokeWidth={2.5} style={{ transform: [{ rotate: '0deg' }] }} />
          <View style={styles.textContainer}>
            <View style={styles.locationRow}>
              <Text style={styles.locationLabel}>Pickup From</Text>
              <ChevronDown color="#333" size={16} strokeWidth={2.5} style={styles.dropdownIcon} />
            </View>
            <Text style={styles.locationAddress} numberOfLines={1}>
              Bhavya pristine, Bhoganhalli
            </Text>
          </View>
        </Pressable>

        <View style={styles.actions}>
          <Pressable 
            style={styles.iconButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Search color={Colors.textDark} size={22} strokeWidth={2} />
          </Pressable>
          <Pressable 
            style={styles.helpButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <MessageSquare color={Colors.textDark} size={16} strokeWidth={2.5} />
            <Text style={styles.helpText}>Help</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xl + 20, // Account for safe area
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: 'transparent', // Make header transparent
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
    marginRight: Spacing.md,
  },
  textContainer: {
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '800',
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    padding: Spacing.sm,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
    gap: 6,
  },
  helpText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  }
});
