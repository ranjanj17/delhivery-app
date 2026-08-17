import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { ArrowLeft, MapPin, Crosshair, History, Heart } from 'lucide-react-native';
import { Stack, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LocationSearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<'recent' | 'saved'>('recent');

  // Auto-focus keyboard on mount for premium UX
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 400); // Wait for transition animation to finish before popping keyboard
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        style={[styles.container, { paddingTop: insets.top }]} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable 
            style={styles.backButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
          >
            <ArrowLeft color={Colors.textDark} size={24} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={styles.content}>
          {/* Main Input Area */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{
              opacity: 1,
              translateY: 0,
              borderColor: isFocused ? Colors.primary : '#E5E5E5',
              shadowOpacity: isFocused ? 0.08 : 0,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 100 }}
            style={styles.inputContainer}
          >
            <View style={styles.inputLeftIcon}>
              <MapPin color="#E63946" size={20} strokeWidth={2} />
            </View>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder="Enter location name"
              placeholderTextColor={Colors.textMuted}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              selectionColor={Colors.primary}
            />
          </MotiView>

          {/* Select via map Button */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 200 }}
          >
            <MotiPressable
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              animate={({ pressed }) => {
                'worklet'
                return {
                  scale: pressed ? 0.96 : 1,
                  opacity: pressed ? 0.8 : 1,
                }
              }}
              style={styles.mapButton}
            >
              <Crosshair color={Colors.textDark} size={18} strokeWidth={2} />
              <Text style={styles.mapButtonText}>Select via map</Text>
            </MotiPressable>
          </MotiView>

          {/* Tabs Container */}
          <MotiView 
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 300 }}
            style={styles.tabsWrapper}
          >
            <View style={styles.tabsContainer}>
              {/* Animated Tab Background Indicator */}
              <MotiView
                animate={{
                  translateX: activeTab === 'recent' ? 0 : 100, // 100 is approx width of a tab
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                style={styles.tabIndicator}
              />

              <Pressable
                style={styles.tab}
                onPress={() => {
                  if(activeTab !== 'recent') {
                    Haptics.selectionAsync();
                    setActiveTab('recent');
                  }
                }}
              >
                <History color={activeTab === 'recent' ? '#FFF' : Colors.textMuted} size={16} strokeWidth={2.5} />
                <Text style={[styles.tabText, activeTab === 'recent' && styles.tabTextActive]}>Recent</Text>
              </Pressable>

              <Pressable
                style={[styles.tab, { marginLeft: 8 }]}
                onPress={() => {
                  if(activeTab !== 'saved') {
                    Haptics.selectionAsync();
                    setActiveTab('saved');
                  }
                }}
              >
                <Heart color={activeTab === 'saved' ? '#FFF' : Colors.textMuted} size={16} strokeWidth={2.5} />
                <Text style={[styles.tabText, activeTab === 'saved' && styles.tabTextActive]}>Saved</Text>
              </Pressable>
            </View>
          </MotiView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    padding: 4,
    marginLeft: -4, // Align optically
    alignSelf: 'flex-start',
  },
  content: {
    paddingHorizontal: Spacing.lg,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    height: 56,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
  },
  inputLeftIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
    height: '100%',
    fontWeight: '500',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // Fit to content width
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: Radii.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    marginTop: Spacing.lg,
    gap: 8,
  },
  mapButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textDark,
  },
  tabsWrapper: {
    marginTop: Spacing.xl,
    flexDirection: 'row',
  },
  tabsContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  tabIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100, // Fixed width for indicator matching tab width
    height: '100%',
    backgroundColor: Colors.textDark,
    borderRadius: Radii.pill,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 36,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 6,
    // The indicator provides the active background color, so we rely on transparency here
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: '#FFF',
  },
});
