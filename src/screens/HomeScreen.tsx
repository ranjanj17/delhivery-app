import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FlashList } from '@shopify/flash-list';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import HomeHeader from '@/components/HomeHeader';
import HomeBannerCarousel from '@/components/HomeBannerCarousel';
import HomeServiceGrid from '@/components/HomeServiceGrid';
import HomeAnimatedBackground from '@/components/HomeAnimatedBackground';

import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { CheckCircle2, Clock } from 'lucide-react-native';

const DATA = [
  { type: 'carousel' },
  { type: 'home_services' },
  { type: 'stories' },
];

const mockStories = [
  { id: '1', title: 'Deliveries Made Easy', isSpecial: true },
  { id: '2', title: 'Pan India', image: require('@/assets/images/story_pan_india.jpg') },
  { id: '3', title: 'Extreme Reach', image: require('@/assets/images/story_snow.jpg') },
  { id: '4', title: 'B2B Logistics', image: require('@/assets/images/story_boxes.jpg') },
  { id: '5', title: 'Celebrating India', image: require('@/assets/images/story_celebrate.jpg') },
];

const StoryItem = ({ item, index }: { item: any; index: number }) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15, delay: 300 + index * 100 }}
      style={{ marginRight: Spacing.md, alignItems: 'center', width: 78 }}
    >
      <MotiPressable
        animate={({ hovered, pressed }) => {
          'worklet';
          return {
            scale: pressed ? 0.9 : hovered ? 0.96 : 1,
          };
        }}
        transition={{ type: 'spring', damping: 12, mass: 1, stiffness: 250 }}
      >
        <MotiView 
          style={styles.storyOuterCircle}
          animate={{
            borderColor: ['#EA2C3E', '#FCA5A5', '#EA2C3E'],
          }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}
        >
          <View style={styles.storyWhiteBorder}>
            <View style={[
              styles.storyInnerCircle, 
              item.isSpecial ? {backgroundColor: '#EA2C3E'} : {backgroundColor: 'transparent'}
            ]}>
               {item.isSpecial && (
                 <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                   <Text style={{color: 'white', fontSize: 7, fontWeight: '800', marginBottom: 1, letterSpacing: 0.5}}>DELIVERIES</Text>
                   <MotiView
                     from={{ scale: 1 }}
                     animate={{ scale: 1.15 }}
                     transition={{
                       type: 'timing',
                       duration: 1200,
                       loop: true,
                       repeatReverse: true,
                     }}
                     style={{ alignItems: 'center' }}
                   >
                     <Text style={{color: 'white', fontSize: 14, fontWeight: '900', lineHeight: 14}}>MADE</Text>
                     <Text style={{color: 'white', fontSize: 14, fontWeight: '900', lineHeight: 14}}>EASY</Text>
                   </MotiView>
                 </View>
               )}
               {item.image && (
                 <MotiView
                   from={{ scale: 1 }}
                   animate={{ scale: 1.2 }}
                   transition={{
                     type: 'timing',
                     duration: 6000,
                     loop: true,
                     repeatReverse: true,
                   }}
                   style={{ width: '100%', height: '100%' }}
                 >
                   <Image source={item.image} style={{ width: 66, height: 66, borderRadius: 33 }} resizeMode="cover" />
                 </MotiView>
               )}
            </View>
          </View>
        </MotiView>
      </MotiPressable>
      <Text style={styles.storyTitle} numberOfLines={1}>{item.title === 'Deliveries Made Easy' ? 'New Features' : item.title}</Text>
    </MotiView>
  );
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Render tracking details inside bottom sheet (kept for future use)
  const renderTrackingDetails = () => (
    <View style={styles.sheetContent}>
      <Text style={styles.sheetTitle}>Shipment Details</Text>
      <Text style={styles.sheetSubtitle}>AWB 8472910384</Text>
      
      <View style={styles.timeline}>
        <View style={styles.timelineItem}>
          <CheckCircle2 color={Colors.success} size={20} />
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineTitle}>Out for Delivery</Text>
            <Text style={styles.timelineTime}>Today, 09:15 AM</Text>
          </View>
        </View>
        <View style={styles.timelineLine} />
        <View style={styles.timelineItem}>
          <CheckCircle2 color={Colors.success} size={20} />
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineTitle}>Reached Destination Hub</Text>
            <Text style={styles.timelineTime}>Yesterday, 11:30 PM</Text>
          </View>
        </View>
        <View style={styles.timelineLine} />
        <View style={styles.timelineItem}>
          <CheckCircle2 color={Colors.success} size={20} />
          <View style={styles.timelineTextContainer}>
            <Text style={styles.timelineTitle}>Picked Up</Text>
            <Text style={styles.timelineTime}>Aug 14, 10:00 AM</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item, index }: any) => {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: index * 100 }}
      >
        {item.type === 'carousel' && <HomeBannerCarousel />}
        {item.type === 'home_services' && <HomeServiceGrid />}
        {item.type === 'stories' && (
          <View style={styles.storiesSection}>
            <Text style={styles.sectionTitle}>Delhivery Stories</Text>
            <FlashList
              data={mockStories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: Spacing.lg }}
              renderItem={({ item, index }) => <StoryItem item={item} index={index} />}
            />
          </View>
        )}
      </MotiView>
    );
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <HomeAnimatedBackground />
      <StatusBar style="dark" />
      <HomeHeader />
      
      <View style={styles.content}>
        <FlashList
          data={DATA}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.xxl * 3 }}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%', '80%']}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetIndicator}
      >
        <BottomSheetView style={styles.sheetContainer}>
          {renderTrackingDetails()}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF0F6', // Fallback background
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent', // Let animated background show through
  },
  storiesSection: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxl,
    backgroundColor: '#FEFCE8', // Ultra-light yellow background
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#343A40',
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  storyOuterCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#EA2C3E', // The exact red border
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyWhiteBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FFFFFF', // The white gap border
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  storyInnerCircle: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#D1D5DB', // Placeholder grey image
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  storyTitle: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
    width: '100%',
  },
  sheetBackground: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
  },
  sheetIndicator: {
    backgroundColor: Colors.border,
    width: 40,
  },
  sheetContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  sheetContent: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textDark,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: Spacing.xl,
  },
  timeline: {
    paddingLeft: Spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineTextContainer: {
    marginLeft: Spacing.md,
    marginTop: -2,
  },
  timelineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
  },
  timelineTime: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    height: 32,
    backgroundColor: Colors.success,
    marginLeft: 9,
    marginVertical: 4,
  },
});
