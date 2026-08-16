import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Radii, Motion } from '@/theme/tokens';
import { MotiPressable } from 'moti/interactions';
import * as Haptics from 'expo-haptics';
import { Zap, ArrowDown, Truck, Package, Bike } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.lg * 2 - Spacing.md) / 2;

export default function HomeServiceGrid() {
  return (
    <View style={styles.container}>
      {/* Background shape */}
      <View style={styles.backgroundShape} />
      
      <View style={styles.grid}>
        {/* Card 1: Book Bike/Truck */}
        <MotiPressable
          onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          animate={({ hovered, pressed }) => {
            'worklet'
            return { scale: pressed ? 0.95 : hovered ? 0.98 : 1 }
          }}
          transition={Motion.spring.snappy}
          style={styles.halfCard}
        >
          <View style={styles.imageContainer}>
             <Truck color="#333" size={40} style={{ position: 'absolute', left: 10, top: 10 }} />
             <Bike color="#E63946" size={32} style={{ position: 'absolute', right: 10, bottom: 10 }} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.title}>Book Bike/Truck</Text>
            <View style={styles.subtitleRow}>
              <Zap color={Colors.textMuted} size={14} />
              <Text style={styles.subtitle}>Fast Pick-up</Text>
            </View>
          </View>
        </MotiPressable>

        {/* Card 2: National Courier */}
        <MotiPressable
          onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          animate={({ hovered, pressed }) => {
            'worklet'
            return { scale: pressed ? 0.95 : hovered ? 0.98 : 1 }
          }}
          transition={Motion.spring.snappy}
          style={styles.halfCard}
        >
          <View style={styles.imageContainer}>
             <View style={styles.boxShape}>
                <Package color="#FFF" size={32} />
             </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.title}>National Courier</Text>
            <View style={styles.subtitleRow}>
              <ArrowDown color={Colors.textMuted} size={14} />
              <Text style={styles.subtitle}>Price Drop</Text>
            </View>
          </View>
        </MotiPressable>

        {/* Card 3: Multi-Box Shipping (Full Width) */}
        <MotiPressable
          onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          animate={({ hovered, pressed }) => {
            'worklet'
            return { scale: pressed ? 0.95 : hovered ? 0.98 : 1 }
          }}
          transition={Motion.spring.snappy}
          style={styles.fullCard}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>New</Text>
          </View>
          
          <View style={styles.fullCardInner}>
            <View style={styles.largeImageContainer}>
               <Truck color="#333" size={60} strokeWidth={1.5} />
               <View style={styles.redContainerBadge} />
            </View>
            <View style={styles.fullCardContent}>
              <Text style={styles.fullCardTitle}>Multi-Box Shipping</Text>
              <Text style={styles.subtitle}>Part Truck Load | Pan-India</Text>
            </View>
          </View>
        </MotiPressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xxl,
    position: 'relative',
  },
  backgroundShape: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#EBF0F6', // The light blue/grey curve background
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
    zIndex: 1,
  },
  halfCard: {
    width: cardWidth,
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  fullCard: {
    width: width - Spacing.lg * 2, // Exact calculated width instead of '100%'
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    position: 'relative',
  },
  fullCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  imageContainer: {
    height: 80,
    marginBottom: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  largeImageContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  boxShape: {
    width: 60,
    height: 60,
    backgroundColor: '#4A4A4A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 8,
    borderTopColor: '#EA2C3E', // The red tape
  },
  redContainerBadge: {
    position: 'absolute',
    right: 0,
    top: 10,
    width: 30,
    height: 30,
    backgroundColor: '#EA2C3E',
    borderRadius: 4,
    zIndex: -1,
  },
  cardContent: {
    alignItems: 'center',
  },
  fullCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    textAlign: 'center',
  },
  fullCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    textAlign: 'left',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: '#059669', // Exact green badge color
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.md,
    zIndex: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  }
});
