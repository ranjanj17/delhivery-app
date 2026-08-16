import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Radii, Motion } from '@/theme/tokens';
import { MotiPressable } from 'moti/interactions';
import * as Haptics from 'expo-haptics';
import { Zap, ArrowDown, Truck, Package, Bike } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const cardWidth = (width - Spacing.md * 2 - Spacing.md) / 2;
const halfCardHeight = cardWidth * 0.9; // Adjusted so width is greater than height per feedback
const fullCardHeight = 110; // Exact fixed height for the horizontal layout

export default function HomeServiceGrid() {
  return (
    <View style={styles.container}>
      {/* White underlay to make the bottom radius curve visible against the white stories section */}
      <View style={styles.whiteUnderlay} />

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
             <Truck color="#111" size={44} strokeWidth={1.5} style={{ position: 'absolute', left: 16, top: 4 }} />
             <Bike color="#E63946" size={32} strokeWidth={1.5} style={{ position: 'absolute', right: 16, bottom: 4 }} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.textBlock}>
              <Text style={styles.title}>Book Bike/Truck</Text>
              <View style={styles.subtitleRow}>
                <Zap color={Colors.textMuted} size={14} />
                <Text style={styles.subtitle}>Fast Pick-up</Text>
              </View>
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
                <Package color="#FFF" size={32} strokeWidth={1.5} />
             </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.textBlock}>
              <Text style={styles.title}>National Courier</Text>
              <View style={styles.subtitleRow}>
                <ArrowDown color={Colors.textMuted} size={14} />
                <Text style={styles.subtitle}>Price Drop</Text>
              </View>
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
               <Truck color="#111" size={72} strokeWidth={1.5} style={{ position: 'absolute' }} />
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
    paddingHorizontal: Spacing.md, // 16px equal spacing
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    position: 'relative',
  },
  whiteUnderlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100, // covers the bottom portion behind the curve
    backgroundColor: '#FFFFFF',
    zIndex: -1,
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Stop at the end of the grid padding
    backgroundColor: '#EBF0F6', // The light blue/grey curve background
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24, // Matches top radius
    borderBottomRightRadius: 24, // Matches top radius
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
    height: halfCardHeight,
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl, // Perfect 24px Apple-like squircle radius matching crop
    padding: Spacing.md,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  fullCard: {
    width: width - Spacing.md * 2,
    height: fullCardHeight,
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl, // Perfect 24px Apple-like squircle radius matching crop
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
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
    height: '100%',
    gap: Spacing.md,
  },
  imageContainer: {
    height: '55%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  largeImageContainer: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  boxShape: {
    width: 68,
    height: 68,
    backgroundColor: '#404040',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 8,
    borderTopColor: '#EA2C3E', // The red tape
  },

  cardContent: {
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: {
    alignItems: 'flex-start',
  },
  fullCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    textAlign: 'left',
  },
  fullCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'left',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subtitle: {
    fontSize: 11,
    color: '#7C8798', // Muted slate color exactly from image
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#10B981', // Emerald green badge color from crop
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  }
});
