import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing, Radii, Motion } from '@/theme/tokens';
import { Home, ClipboardList, User } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withTiming, 
  withDelay, 
  withSpring,
  Easing,
  withRepeat,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import { MotiPressable } from 'moti/interactions';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export interface AnimatedBottomTabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Separate component for each tab to manage its own complex animation state
const AnimatedTab = ({ 
  id, 
  label, 
  IconComponent, 
  isActive, 
  onPress, 
  showBadge 
}: { 
  id: string, 
  label: string, 
  IconComponent: any, 
  isActive: boolean, 
  onPress: () => void,
  showBadge: boolean 
}) => {
  const color = isActive ? Colors.primary : Colors.textMuted;
  
  // Animation Values
  const sparkY = useSharedValue(-40);
  const sparkOpacity = useSharedValue(0);
  const glowScale = useSharedValue(0.5);
  const glowOpacity = useSharedValue(0);
  const iconScale = useSharedValue(1);

  // Badge continuous ripple
  const rippleScale = useSharedValue(1);
  const rippleOpacity = useSharedValue(0.8);

  useEffect(() => {
    if (showBadge) {
      rippleScale.value = withRepeat(
        withTiming(2, { duration: 1500, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
      rippleOpacity.value = withRepeat(
        withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    }
  }, [showBadge]);

  // Trigger impact animation when this tab becomes active
  useEffect(() => {
    if (isActive) {
      // 1. Spark drops from top
      sparkOpacity.value = withSequence(
        withTiming(1, { duration: 100 }),
        withDelay(150, withTiming(0, { duration: 100 }))
      );
      sparkY.value = withSequence(
        withTiming(-40, { duration: 0 }),
        withTiming(0, { duration: 250, easing: Easing.in(Easing.exp) })
      );

      // 2. Icon squishes on impact, then springs back
      iconScale.value = withDelay(
        230,
        withSequence(
          withTiming(0.7, { duration: 100 }),
          withSpring(1.2, { damping: 12, stiffness: 300 }),
          withSpring(1, { damping: 10, stiffness: 200 })
        )
      );

      // 3. Glow bursts outward on impact
      glowScale.value = withDelay(
        250,
        withSequence(
          withTiming(0.5, { duration: 0 }),
          withTiming(2, { duration: 400, easing: Easing.out(Easing.ease) })
        )
      );
      glowOpacity.value = withDelay(
        250,
        withSequence(
          withTiming(0.4, { duration: 0 }),
          withTiming(0, { duration: 400 })
        )
      );
    }
  }, [isActive]);

  const animatedSpark = useAnimatedStyle(() => ({
    opacity: sparkOpacity.value,
    transform: [{ translateY: sparkY.value }, { scaleY: interpolate(sparkY.value, [-40, 0], [1.5, 1], Extrapolation.CLAMP) }]
  }));

  const animatedGlow = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }]
  }));

  const animatedIcon = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }]
  }));

  const animatedRipple = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value
  }));

  return (
    <MotiPressable
      onPress={onPress}
      animate={({ hovered, pressed }) => {
        'worklet'
        return {
          scale: pressed ? 0.9 : hovered ? 0.95 : 1,
        }
      }}
      transition={Motion.spring.snappy}
      style={styles.tab}
    >
      <View style={styles.iconContainer}>
        {/* Glow Burst */}
        <Animated.View style={[styles.glow, animatedGlow]} />
        
        {/* Falling Spark */}
        <Animated.View style={[styles.spark, animatedSpark]} />
        
        {/* Main Icon */}
        <Animated.View style={animatedIcon}>
          <IconComponent color={color} size={24} strokeWidth={isActive ? 2.5 : 2} />
        </Animated.View>
        
        {/* Notification Badge with Ripple */}
        {showBadge && (
          <View style={styles.badgeWrapper}>
            <Animated.View style={[styles.badgeRipple, animatedRipple]} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        )}
      </View>
      <Text style={[styles.label, isActive && styles.activeLabel, { color }]}>{label}</Text>
    </MotiPressable>
  );
};

export default function AnimatedBottomTabBar({ activeTab, onTabChange }: AnimatedBottomTabBarProps) {
  
  const handlePress = (tab: string) => {
    if (activeTab === tab) return; 
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Heavy haptic exactly when the spark hits (approx 250ms)
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 250);
    onTabChange(tab);
  };

  return (
    <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.container}>
      <AnimatedTab 
        id="home" 
        label="Home" 
        IconComponent={Home} 
        isActive={activeTab === 'home'} 
        onPress={() => handlePress('home')} 
        showBadge={false} 
      />
      <AnimatedTab 
        id="orders" 
        label="Orders" 
        IconComponent={ClipboardList} 
        isActive={activeTab === 'orders'} 
        onPress={() => handlePress('orders')} 
        showBadge={true} 
      />
      <AnimatedTab 
        id="profile" 
        label="Profile" 
        IconComponent={User} 
        isActive={activeTab === 'profile'} 
        onPress={() => handlePress('profile')} 
        showBadge={false} 
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: Spacing.xl, 
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    borderTopLeftRadius: Radii.md,
    borderTopRightRadius: Radii.md,
    justifyContent: 'space-around',
    elevation: 24,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Spacing.sm,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: 40,
    height: 32,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  activeLabel: {
    fontWeight: '800',
  },
  spark: {
    position: 'absolute',
    width: 4,
    height: 12,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    zIndex: 10,
    top: 4,
  },
  glow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    zIndex: -1,
  },
  badgeWrapper: {
    position: 'absolute',
    top: -6,
    right: -2,
    zIndex: 2,
  },
  badge: {
    backgroundColor: Colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.surface,
    zIndex: 2,
  },
  badgeRipple: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 9,
    backgroundColor: Colors.primary,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  }
});
