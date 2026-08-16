import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { Box, ScanLine } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function AWBSearchBar() {
  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <Box color={Colors.textMuted} size={20} strokeWidth={2} style={styles.icon} />
        <TextInput 
          style={styles.input}
          placeholder="Enter AWB / Tracking ID"
          placeholderTextColor={Colors.textMuted}
        />
      </View>
      <Pressable 
        style={styles.scanButton}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      >
        <ScanLine color={Colors.surface} size={20} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xl,
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
    paddingVertical: Spacing.xs,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textDark,
  },
  scanButton: {
    width: 48,
    height: 48,
    borderRadius: Radii.md,
    backgroundColor: '#1E1E1E', // Very dark grey/black
    alignItems: 'center',
    justifyContent: 'center',
  }
});
