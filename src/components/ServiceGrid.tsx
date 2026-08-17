import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Radii, Motion } from '@/theme/tokens';
import { MotiPressable } from 'moti/interactions';
import * as Haptics from 'expo-haptics';
import { Bike, Box, Truck, Package } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.lg * 2 - Spacing.md) / 2;

const services = [
  { id: '1', title: 'Book Bike', subtitle: 'Fast Pick-up', icon: Bike },
  { id: '2', title: 'Courier', subtitle: 'Price Drop', icon: Box },
  { id: '3', title: 'B2B Truck', subtitle: 'Heavy Load', icon: Truck },
  { id: '4', title: 'Packers', subtitle: 'Home Shift', icon: Package },
];

export default function ServiceGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Book a Service</Text>
      <View style={styles.grid}>
        {services.map((service) => (
          <MotiPressable
            key={service.id}
            onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            animate={({ hovered, pressed }) => {
              'worklet'
              return {
                scale: pressed ? 0.95 : hovered ? 0.98 : 1,
              }
            }}
            transition={Motion.spring.snappy}
            style={styles.card}
          >
            <View style={styles.iconWrapper}>
              <service.icon color={Colors.textDark} size={22} strokeWidth={2} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.title}>{service.title}</Text>
              <Text style={styles.subtitle}>{service.subtitle}</Text>
            </View>
          </MotiPressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  card: {
    width: cardWidth,
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.xl,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  placeholderCard: {
    width: cardWidth,
    height: 140, // Match typical card height
    backgroundColor: 'transparent',
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  }
});
