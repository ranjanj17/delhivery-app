import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, Image } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { Gift } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SLIDE_COUNT = 3;

const SlideGif = () => (
  <View style={styles.slide}>
    <Image 
      source={require('@/assets/images/promo_banner.gif')} 
      style={styles.gifBanner}
      resizeMode="cover"
    />
  </View>
);

const SlideGifOld = () => (
  <View style={styles.slide}>
    <Image 
      source={require('@/assets/images/rakhi_promo.gif')} 
      style={styles.gifBanner}
      resizeMode="cover"
    />
  </View>
);

import { MotiView, MotiText } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { Star } from 'lucide-react-native';

const AnimatedGiftBox = () => (
  <View style={{ width: 100, height: 120, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10 }}>
    {/* Background Glow */}
    <MotiView
      from={{ opacity: 0.2, scale: 0.8 }}
      animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
      transition={{ type: 'timing', duration: 1500, loop: true }}
      style={{ position: 'absolute', width: 60, height: 60, backgroundColor: '#FDE047', borderRadius: 30, bottom: 10, shadowColor: '#FDE047', shadowOpacity: 1, shadowRadius: 20, shadowOffset: {width: 0, height: 0} }}
    />

    {/* Surprise Gift Peeking Out */}
    <MotiView
      from={{ translateY: 10, opacity: 0, scale: 0.5 }}
      animate={{ translateY: [10, -40, -40, 10], opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.2, 0.5] }}
      transition={{ type: 'timing', duration: 1500, loop: true }}
      style={{ position: 'absolute', bottom: 30, zIndex: 1 }}
    >
      <View style={{ backgroundColor: '#FFF', padding: 8, borderRadius: 16, shadowColor: '#E63946', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.4, shadowRadius: 8 }}>
        <Gift color="#E63946" size={28} />
      </View>
    </MotiView>

    {/* Sparkles */}
    <MotiView
      from={{ opacity: 0, translateY: 10, scale: 0, rotateZ: '0deg' }}
      animate={{ opacity: [0, 1, 0], translateY: [10, -60, -70], scale: [0, 1.5, 0], rotateZ: ['0deg', '90deg', '180deg'] }}
      transition={{ type: 'timing', duration: 1500, loop: true, delay: 100 }}
      style={{ position: 'absolute', bottom: 40, zIndex: 3, left: 10 }}
    >
      <Star color="#F59E0B" size={18} fill="#F59E0B" />
    </MotiView>
    
    <MotiView
      from={{ opacity: 0, translateY: 10, scale: 0, rotateZ: '0deg' }}
      animate={{ opacity: [0, 1, 0], translateY: [10, -70, -80], scale: [0, 2, 0], rotateZ: ['0deg', '-90deg', '-180deg'] }}
      transition={{ type: 'timing', duration: 1500, loop: true, delay: 200 }}
      style={{ position: 'absolute', bottom: 40, zIndex: 3, right: 10 }}
    >
      <Star color="#FDE047" size={22} fill="#FDE047" />
    </MotiView>

    {/* Box Body */}
    <View style={{ width: 66, height: 54, backgroundColor: '#E63946', borderRadius: 8, position: 'absolute', bottom: 10, shadowColor: '#E63946', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 12, overflow: 'hidden' }}>
      {/* Highlight */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', backgroundColor: 'rgba(255,255,255,0.15)' }} />
      {/* Vertical ribbon */}
      <View style={{ width: 16, height: '100%', backgroundColor: '#FDE047', alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 4 }} />
      {/* Horizontal ribbon */}
      <View style={{ width: '100%', height: 16, backgroundColor: '#FDE047', position: 'absolute', top: '50%', marginTop: -8, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 4 }} />
      {/* Center badge */}
      <View style={{ position: 'absolute', top: '50%', left: '50%', width: 24, height: 24, backgroundColor: '#F59E0B', borderRadius: 12, transform: [{translateX: -12}, {translateY: -12}], borderWidth: 2, borderColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 2, shadowOffset: {width: 0, height: 2} }} />
    </View>

    {/* Box Lid & Bow Container */}
    <MotiView
      from={{ translateY: 0, rotateZ: '0deg', scale: 1 }}
      animate={{ translateY: [0, -45, -45, 0], rotateZ: ['0deg', '15deg', '15deg', '0deg'], scale: [1, 1.1, 1.1, 1] }}
      transition={{ type: 'timing', duration: 1500, loop: true }}
      style={{ position: 'absolute', bottom: 62, zIndex: 4, alignItems: 'center' }}
    >
      {/* Bow */}
      <View style={{ flexDirection: 'row', marginBottom: -4, zIndex: 1 }}>
        <View style={{ width: 24, height: 20, borderRadius: 12, borderWidth: 4, borderColor: '#FDE047', borderBottomWidth: 0, transform: [{ rotate: '-30deg'}], marginRight: -10, backgroundColor: 'rgba(253, 224, 71, 0.4)' }} />
        <View style={{ width: 24, height: 20, borderRadius: 12, borderWidth: 4, borderColor: '#FDE047', borderBottomWidth: 0, transform: [{ rotate: '30deg'}], marginLeft: -10, backgroundColor: 'rgba(253, 224, 71, 0.4)' }} />
      </View>
      {/* Lid */}
      <View style={{ width: 78, height: 20, backgroundColor: '#D90429', borderRadius: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', backgroundColor: 'rgba(255,255,255,0.2)' }} />
        {/* Lid ribbon */}
        <View style={{ width: 16, height: '100%', backgroundColor: '#FDE047', alignSelf: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 2 }} />
      </View>
    </MotiView>
  </View>
);

const SlideBanner = () => (
  <View style={styles.slide}>
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.title}>Doorstep pickup{'\n'}for your dor of trust.</Text>
        <Text style={styles.subtitle}>Send rakhis and gifts anywhere in India</Text>
        
        <View style={styles.coupon}>
          <Text style={styles.couponCode}>RAKHI15</Text>
          <MotiView
            from={{ backgroundColor: 'rgba(253, 224, 71, 0)' }}
            animate={{ backgroundColor: 'rgba(253, 224, 71, 0.4)' }}
            transition={{ type: 'timing', duration: 800, loop: true }}
            style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}
          >
            <MotiText
              from={{ scale: 1, color: '#EA2C3E' } as any}
              animate={{ scale: 1.1, color: '#E63946' } as any}
              transition={{ type: 'timing', duration: 800, loop: true }}
              style={styles.couponDesc}
            >
              15% off
            </MotiText>
          </MotiView>
        </View>
        
        <MotiPressable 
          animate={({ hovered, pressed }) => {
            'worklet'
            return {
              scale: pressed ? 0.95 : hovered ? 1.05 : 1,
            }
          }}
          transition={{ type: 'spring' }}
        >
          <MotiView
            from={{ shadowOpacity: 0, shadowRadius: 0, scale: 1 }}
            animate={{ shadowOpacity: 0.4, shadowRadius: 10, scale: 1.03 }}
            transition={{ type: 'timing', duration: 1000, loop: true }}
            style={[styles.bookButton, { shadowColor: '#000', shadowOffset: { width: 0, height: 4 } }]}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </MotiView>
        </MotiPressable>
      </View>
      <View style={styles.imagePlaceholder}>
        <AnimatedGiftBox />
      </View>
    </View>
  </View>
);

const slides = [
  <SlideGif key="slide-0" />,
  <SlideBanner key="slide-1" />,
  <SlideGifOld key="slide-2" />
];

const infiniteSlides = [
  <SlideGifOld key="clone-last" />, // Clone of last slide
  ...slides,
  <SlideGif key="clone-first" />    // Clone of first slide
];

export default function HomeBannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentIndexRef = useRef(1); // physical index starting at 1 (real first slide)

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current += 1;
      
      scrollViewRef.current?.scrollTo({
        x: currentIndexRef.current * width,
        animated: true,
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollEnd = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    let newIndex = Math.round(scrollPosition / width);
    
    // Infinite Loop magic: instantly jump to the real slide without animation
    if (newIndex === infiniteSlides.length - 1) {
      newIndex = 1; // Jump from first clone (end) to real first slide
      scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: false });
    } else if (newIndex === 0) {
      newIndex = infiniteSlides.length - 2; // Jump from last clone (start) to real last slide
      scrollViewRef.current?.scrollTo({ x: newIndex * width, animated: false });
    }
    
    currentIndexRef.current = newIndex;
    setActiveIndex(newIndex - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        contentOffset={{ x: width, y: 0 }} // Start at physical index 1
      >
        {infiniteSlides}
      </ScrollView>
      
      <View style={styles.pagination}>
        {[...Array(SLIDE_COUNT)].map((_, i) => (
          <View key={i} style={[styles.dot, activeIndex === i && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 6,
    paddingBottom: Spacing.xs,
    backgroundColor: 'transparent',
  },
  slide: {
    width: width,
    paddingHorizontal: Spacing.md,
  },
  gifBanner: {
    width: '100%',
    height: 180,
    borderRadius: Radii.xl,
  },
  banner: {
    backgroundColor: '#EA2C3E', // The exact red from screenshot
    borderRadius: Radii.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 180,
  },
  content: {
    flex: 2,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: Spacing.md,
  },
  coupon: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.sm,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  couponCode: {
    color: '#EA2C3E',
    fontWeight: '800',
    fontSize: 14,
  },
  couponDesc: {
    color: '#EA2C3E',
    fontWeight: '600',
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#000',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radii.md,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 13,
  },
  imagePlaceholder: {
    flex: 1.2,
    backgroundColor: '#F3E5D8', // Light cardboard color
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 60, // Adding some stylistic curve matching the box look
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C4C4C4',
  },
  activeDot: {
    width: 16,
    backgroundColor: '#8E94A8', // Darker active dot
  }
});
