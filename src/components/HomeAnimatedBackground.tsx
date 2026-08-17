import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Cloud } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function HomeAnimatedBackground() {
  // Plane animation values
  const planeX = useSharedValue(-100);
  const planeY = useSharedValue(15);
  const planeRotate = useSharedValue(-10);

  // Star animation
  const starOpacity = useSharedValue(0.2);

  // Smoke animation
  const smokeOpacity = useSharedValue(0.8);
  const smokeScale = useSharedValue(1);

  // Cloud 1 animation values
  const cloud1X = useSharedValue(width + 50);
  
  // Cloud 2 animation values
  const cloud2X = useSharedValue(width + 150);

  useEffect(() => {
    // Plane flies slower
    planeX.value = withRepeat(
      withTiming(width + 150, { 
        duration: 10000, 
        easing: Easing.out(Easing.sin) 
      }),
      -1,
      false
    );

    // Plane arcs up from slightly below the header (stays in visual area)
    planeY.value = withRepeat(
      withSequence(
        withTiming(120, { duration: 0 }), // start higher up
        withTiming(-20, { duration: 10000, easing: Easing.out(Easing.cubic) })
      ),
      -1,
      false
    );

    // Plane tilts to match ascent
    planeRotate.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Twinkling stars
    starOpacity.value = withRepeat(withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1, true);

    // Dynamic Smoke Trails pulsing
    smokeOpacity.value = withRepeat(withTiming(0.2, { duration: 300 }), -1, true);
    smokeScale.value = withRepeat(withTiming(1.4, { duration: 300 }), -1, true);

    // Clouds move slowly in the opposite direction
    cloud1X.value = withRepeat(
      withTiming(-100, { duration: 15000, easing: Easing.linear }),
      -1,
      false
    );

    cloud2X.value = withRepeat(
      withTiming(-100, { duration: 22000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const planeStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: planeX.value },
        { translateY: planeY.value },
        { rotate: `${planeRotate.value}deg` }
      ],
    };
  });

  const cloud1Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cloud1X.value },
        { translateY: 20 }
      ],
    };
  });

  const cloud2Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cloud2X.value },
        { translateY: 80 }
      ],
    };
  });

  const starStyle = useAnimatedStyle(() => ({
    opacity: starOpacity.value
  }));

  const smokeStyle = useAnimatedStyle(() => ({
    opacity: smokeOpacity.value,
    transform: [{ scaleX: smokeScale.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Dynamic Vibrant Sky Gradient (Rich Red to Yellow above Carousel) */}
      <LinearGradient 
        colors={['#FFD1D6', '#FFF0F2', '#FEF3C7', 'transparent']} 
        locations={[0, 0.4, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Tiny Twinkling Stars */}
      <Animated.View style={[styles.star, { top: 30, left: 60 }, starStyle]} />
      <Animated.View style={[styles.star, { top: 80, left: 180, transform: [{scale: 0.7}] }, starStyle]} />
      <Animated.View style={[styles.star, { top: 50, right: 120 }, starStyle]} />
      <Animated.View style={[styles.star, { top: 40, right: 40, transform: [{scale: 0.5}] }, starStyle]} />

      {/* Merged Organic Clouds (Soft Fill) */}
      <Animated.View style={[styles.cloud, cloud1Style, { opacity: 0.85, flexDirection: 'row' }]}>
        <Cloud color="#FFBFC7" size={80} strokeWidth={0} fill="#FFBFC7" />
        <Cloud color="#FFBFC7" size={60} strokeWidth={0} fill="#FFBFC7" style={{ marginLeft: -25, marginTop: 15 }} />
      </Animated.View>
      
      <Animated.View style={[styles.cloud, cloud2Style, { opacity: 0.65, flexDirection: 'row' }]}>
        <Cloud color="#FFE3A8" size={120} strokeWidth={0} fill="#FFE3A8" />
        <Cloud color="#FFE3A8" size={80} strokeWidth={0} fill="#FFE3A8" style={{ marginLeft: -35, marginTop: 30 }} />
      </Animated.View>

      {/* Plane Group */}
      <Animated.View style={[styles.planeContainer, planeStyle]}>
        {/* Animated Smoke Trails */}
        <Animated.View style={[styles.smokeTrail, styles.smoke1, smokeStyle]} />
        <Animated.View style={[styles.smokeTrail, styles.smoke2, smokeStyle]} />
        <Animated.View style={[styles.smokeTrail, styles.smoke3, smokeStyle]} />

        <Image 
          source={require('@/assets/images/delhivery_plane_transparent.png')} 
          style={{ width: 80, height: 80 }} 
          resizeMode="contain" 
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 450, // Extends deep behind carousel
    overflow: 'hidden',
  },
  planeContainer: {
    position: 'absolute',
    top: 20, // Strict header region
    left: 0,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  smokeTrail: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#FF4B5C',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  smoke1: {
    width: 24,
    bottom: 8,
    left: 0,
  },
  smoke2: {
    width: 16,
    bottom: 16,
    left: 4,
  },
  smoke3: {
    width: 12,
    bottom: 2,
    left: 10,
  },
  cloud: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
});
