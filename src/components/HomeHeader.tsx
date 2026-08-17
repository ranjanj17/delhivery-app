import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { Navigation, Search, MessageSquare, ChevronDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';

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
          <View style={{ width: 38, height: 38, alignItems: 'flex-end' }}>
            <Pressable 
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              style={{ position: 'absolute', right: 0, zIndex: 10 }}
            >
              <MotiView
                from={{ width: 38, borderRadius: 19 }}
                animate={{ 
                  width: [38, 85, 85, 38, 38],
                  borderRadius: [19, 10, 10, 19, 19]
                }}
                transition={{
                  type: 'timing',
                  duration: 4500,
                  loop: true,
                  repeatReverse: false,
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  height: 38,
                  paddingLeft: 10,
                  overflow: 'hidden',
                }}
              >
                <MotiView
                  animate={{ rotateZ: ['0deg', '0deg', '0deg', '0deg', '0deg', '0deg', '-20deg', '20deg', '0deg'] }}
                  transition={{
                    type: 'timing',
                    duration: 4500,
                    loop: true,
                    repeatReverse: false,
                  }}
                >
                  <Search color={Colors.textDark} size={18} strokeWidth={2.5} style={{ minWidth: 18 }} />
                </MotiView>
                <MotiView
                  from={{ opacity: 0, translateX: -5 }}
                  animate={{ opacity: [0, 1, 1, 1, 0], translateX: [-5, 0, 0, 0, -5] }}
                  transition={{
                    type: 'timing',
                    duration: 4500,
                    loop: true,
                    repeatReverse: false,
                  }}
                  style={{ position: 'absolute', left: 34, width: 50 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: '700', color: Colors.textDark }} numberOfLines={1}>Track</Text>
                </MotiView>
              </MotiView>
            </Pressable>
          </View>
          <Pressable 
            style={styles.helpButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <MotiView
              from={{ rotateZ: '0deg', translateY: 0 }}
              animate={{
                rotateZ: ['0deg', '-15deg', '15deg', '-8deg', '8deg', '0deg', '0deg', '0deg'],
                translateY: [0, -3, 0, -1.5, 0, 0, 0, 0]
              }}
              transition={{
                type: 'timing',
                duration: 4000,
                loop: true,
              }}
            >
              <MessageSquare color={Colors.textDark} size={16} strokeWidth={2.5} />
            </MotiView>
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
    marginRight: Spacing.md + 40,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '800',
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  locationAddress: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
    marginTop: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    padding: Spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: Radii.pill,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
