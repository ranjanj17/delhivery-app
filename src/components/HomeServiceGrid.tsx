import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Colors, Spacing, Radii, Motion } from '@/theme/tokens';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, interpolate, Extrapolation } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Zap, ArrowDown, Truck, Package, Bike } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const cardWidth = (width - Spacing.md * 2 - Spacing.md) / 2;
const halfCardHeight = cardWidth * 0.9; // Adjusted so width is greater than height per feedback
const fullCardHeight = 110; // Exact fixed height for the horizontal layout

export default function HomeServiceGrid() {
  const [isCard1Pressed, setIsCard1Pressed] = React.useState(false);
  const [isCard2Pressed, setIsCard2Pressed] = React.useState(false);
  const [isCard3Pressed, setIsCard3Pressed] = React.useState(false);

  // Precise Reanimated Heartbeat State
  const pulseScale = useSharedValue(0.7); // Starts at medium size (10px)
  const dropY = useSharedValue(-3); // Price drop arrow

  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.5, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1, // Infinite loop
      true // Reverse (yoyo) perfectly back and forth
    );
    dropY.value = withRepeat(
      withTiming(3, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => {
    // Only shine when scale is approaching maximum
    const shineIntensity = interpolate(
      pulseScale.value,
      [1.2, 1.5], // starts glowing at scale 1.2, reaches max at 1.5
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale: pulseScale.value }],
      shadowOpacity: shineIntensity,
    };
  });

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dropY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* White underlay to make the bottom radius curve visible against the white stories section */}
      <View style={styles.whiteUnderlay} />

      {/* Rose Glass Gradient Background */}
      <View style={[styles.backgroundShape, { overflow: 'hidden' }]}>
        {/* Base elegant wavy color mix - Solid boundaries, light center */}
        <LinearGradient
          colors={['#FDA4AF', '#FFE4E6', '#FDA4AF']} // Solid rose edges, light center
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={styles.grid}>
        {/* Card 1: Book Bike/Truck */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120, delay: 100 }}
        >
          <MotiPressable
            onPressIn={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setIsCard1Pressed(true);
            }}
            onPressOut={() => setIsCard1Pressed(false)}
            animate={({ hovered, pressed }) => {
              'worklet'
              return { scale: pressed ? 0.96 : hovered ? 0.98 : 1 }
            }}
            transition={{ type: 'spring', damping: 12, mass: 1, stiffness: 250 }}
            style={styles.halfCard}
          >
            <View style={styles.imageContainer}>
              <MotiView
                style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                animate={{ scale: isCard1Pressed ? 1.05 : 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              >
                <Image
                  source={require('@/assets/images/book_bike_truck.png')}
                  style={{ width: '120%', height: '120%' }}
                  resizeMode="contain"
                />
              </MotiView>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>Book Bike/Truck</Text>
                {/* Fast Pick-up Star Shine Badge */}
                <View style={[styles.badgeRow, { backgroundColor: 'transparent' }]}>
                  
                  {/* Flawless Grow & Shine Zap Icon */}
                  <Animated.View style={[animatedIconStyle, { 
                    marginRight: 6, zIndex: 1,
                    shadowColor: '#FDE047', // Brilliant yellow for shine
                    shadowOffset: { width: 0, height: 0 }, 
                    shadowRadius: 10, 
                    elevation: 10 
                  }]}>
                    <Zap color="#F59E0B" size={14} fill="#F59E0B" />
                  </Animated.View>

                  {/* Clean text with slight glow */}
                  <Text style={[styles.badgeTextActive, { 
                    zIndex: 1,
                    color: '#D97706',
                    textShadowColor: 'rgba(245, 158, 11, 0.4)', 
                    textShadowOffset: { width: 0, height: 0 }, 
                    textShadowRadius: 4 
                  }]}>
                    Fast Pick-up
                  </Text>
                </View>
              </View>
            </View>
          </MotiPressable>
        </MotiView>

        {/* Card 2: National Courier */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120, delay: 200 }}
        >
          <MotiPressable
            onPressIn={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setIsCard2Pressed(true);
            }}
            onPressOut={() => setIsCard2Pressed(false)}
            animate={({ hovered, pressed }) => {
              'worklet'
              return { scale: pressed ? 0.96 : hovered ? 0.98 : 1 }
            }}
            transition={{ type: 'spring', damping: 12, mass: 1, stiffness: 250 }}
            style={styles.halfCard}
          >
             <View style={styles.imageContainer}>
               <MotiView
                 style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                 from={{ translateY: -2 }}
                 animate={{ 
                   translateY: isCard2Pressed ? -15 : [2, -2],
                   translateX: isCard2Pressed ? 15 : 0,
                   scale: isCard2Pressed ? 1.05 : 1,
                   rotateZ: isCard2Pressed ? '-15deg' : '0deg'
                 }}
                 transition={{ 
                   translateY: isCard2Pressed 
                     ? { type: 'spring', damping: 12, stiffness: 300 } 
                     : { type: 'timing', duration: 1500, loop: true, direction: 'alternate', easing: Easing.inOut(Easing.ease) },
                   default: { type: 'spring', damping: 12, stiffness: 300 } 
                 }}
               >
                 <Image
                   source={require('@/assets/images/national_courier_parcel.png')}
                   style={{ width: '120%', height: '120%' }}
                   resizeMode="contain"
                 />
               </MotiView>
             </View>
            <View style={styles.cardContent}>
              <View style={styles.textBlock}>
                <Text style={styles.title}>National Courier</Text>
                <View style={styles.subtitleRow}>
                  <Animated.View style={animatedArrowStyle}>
                    <ArrowDown color="#10B981" size={14} strokeWidth={3} />
                  </Animated.View>
                  <Text style={[styles.subtitle, { color: '#059669', fontWeight: '700' }]}>Price Drop</Text>
                </View>
              </View>
            </View>
          </MotiPressable>
        </MotiView>

        {/* Card 3: Multi-Box Shipping (Full Width) */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 120, delay: 300 }}
          style={{ width: '100%' }}
        >
          <MotiPressable
            onPressIn={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setIsCard3Pressed(true);
            }}
            onPressOut={() => setIsCard3Pressed(false)}
            animate={({ hovered, pressed }) => {
              'worklet'
              return { scale: pressed ? 0.96 : hovered ? 0.98 : 1 }
            }}
            transition={{ type: 'spring', damping: 12, mass: 1, stiffness: 250 }}
            style={styles.fullCard}
          >
            <MotiView
              from={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ type: 'timing', duration: 1200, loop: true }}
              style={styles.badge}
            >
              <Image
                source={require('@/assets/new_badge.gif')}
                style={{ width: 74, height: 50 }}
                resizeMode="contain"
              />
            </MotiView>

            <View style={styles.fullCardInner}>
              <View style={styles.largeImageContainer}>
                <MotiView
                  style={{ position: 'absolute' }}
                  animate={{ translateX: isCard3Pressed ? 8 : 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                >
                  <Image
                    source={require('@/assets/multibox_truck.gif')}
                    style={{ width: 170, height: 170, marginLeft: -15 }}
                    resizeMode="contain"
                  />
                </MotiView>
              </View>
              <View style={styles.fullCardContent}>
                <Text style={styles.fullCardTitle}>Multi-Box Shipping</Text>
                <Text style={styles.subtitle}>Part Truck Load | Pan-India</Text>
              </View>
            </View>
          </MotiPressable>
        </MotiView>

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
    backgroundColor: '#FECDD3', // Fallback soft rose background
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24, // Matches top radius
    borderBottomRightRadius: 24, // Matches top radius
    overflow: 'hidden', // Contain the animated gradient
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
    overflow: 'hidden',
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
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeTextActive: {
    fontSize: 11,
    color: '#E63946',
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 12,
    zIndex: 2,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  }
});
