import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, Image } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { Gift } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SLIDE_COUNT = 2;

const SlideGif = () => (
  <View style={styles.slide}>
    <Image 
      source={require('@/assets/images/rakhi_promo.gif')} 
      style={styles.gifBanner}
      resizeMode="cover"
    />
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
          <Text style={styles.couponDesc}>15% off</Text>
        </View>
        
        <Pressable style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View>
      <View style={styles.imagePlaceholder}>
        <Gift color="#E63946" size={64} strokeWidth={1.5} />
      </View>
    </View>
  </View>
);

const slides = [
  <SlideGif key="slide-0" />,
  <SlideBanner key="slide-1" />
];

const infiniteSlides = [
  <SlideBanner key="clone-last" />, // Clone of last slide
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
    paddingHorizontal: Spacing.lg,
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
