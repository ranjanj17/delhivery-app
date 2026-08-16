import { Easing } from 'react-native-reanimated';

export const Colors = {
  primary: '#E63946', // Delhivery Red
  background: '#F8F9FA', // Off-white for clean Swiss Style
  surface: '#FFFFFF',
  textDark: '#1A1A1A',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981', // For active tracking states
  warning: '#F59E0B',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
};

export const Motion = {
  duration: {
    micro: 100, // 50-100ms for gesture responsive micro-interactions
    short: 300,
    medium: 500,
    ambient: 10000,
  },
  easing: {
    standard: Easing.bezier(0.4, 0.0, 0.2, 1),
    enter: Easing.out(Easing.back(1.5)),
  },
  spring: {
    snappy: { damping: 14, mass: 1, stiffness: 200 }, // For cards/buttons
    smooth: { damping: 20, mass: 1, stiffness: 100 }, // For layout shifts
  },
};
