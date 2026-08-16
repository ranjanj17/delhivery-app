import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { MapPin, Search, Bell } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function OrdersHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <MapPin color={Colors.primary} size={20} strokeWidth={2.5} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>PICKUP FROM</Text>
          <Text style={styles.location}>Bhavya pristine, Bhoganhalli</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <Pressable 
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          style={styles.actionIcon}
        >
          <Search color={Colors.textDark} size={24} strokeWidth={2} />
        </Pressable>
        <Pressable 
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          style={styles.actionIcon}
        >
          <Bell color={Colors.textDark} size={24} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEBF0', // Very light pink
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  location: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: Spacing.lg,
    padding: 4, // Hit area
  }
});
