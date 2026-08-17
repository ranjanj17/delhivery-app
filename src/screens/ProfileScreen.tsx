import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Colors, Spacing, Radii } from '@/theme/tokens';
import { 
  ChevronDown, 
  Pencil, 
  Wallet, 
  MapPin, 
  Users, 
  Gift, 
  HelpCircle, 
  FileText, 
  Settings, 
  Bell, 
  ChevronRight 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { MotiView } from 'moti';

const MenuItem = ({ 
  icon: Icon, 
  title, 
  isLast = false, 
  isAnimated = false 
}: { 
  icon: any, 
  title: string, 
  isLast?: boolean,
  isAnimated?: boolean
}) => {
  const content = (
    <View style={[styles.menuItem, !isLast && styles.menuItemBorder]}>
      <View style={styles.menuItemLeft}>
        <Icon color={Colors.textMuted} size={20} strokeWidth={2} />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <ChevronRight color={Colors.textMuted} size={20} strokeWidth={2} />
    </View>
  );

  return (
    <Pressable 
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={({ pressed }) => [
        styles.menuItemContainer,
        pressed && styles.menuItemPressed
      ]}
    >
      {isAnimated ? (
        <MotiView
          from={{ backgroundColor: 'rgba(255, 230, 230, 0)' }}
          animate={{ backgroundColor: ['rgba(255, 230, 230, 0)', 'rgba(255, 230, 230, 0.5)', 'rgba(255, 230, 230, 0)'] }}
          transition={{
            type: 'timing',
            duration: 3000,
            loop: true,
          }}
          style={styles.animatedRow}
        >
          <View style={[styles.menuItem, !isLast && styles.menuItemBorder]}>
            <View style={styles.menuItemLeft}>
              <MotiView
                from={{ scale: 1, rotateZ: '0deg' }}
                animate={{ scale: [1, 1.2, 1], rotateZ: ['0deg', '-10deg', '10deg', '0deg'] }}
                transition={{ type: 'timing', duration: 2500, loop: true }}
              >
                <Icon color={Colors.primary} size={20} strokeWidth={2.5} />
              </MotiView>
              <Text style={[styles.menuItemText, { fontWeight: '700', color: Colors.primary }]}>{title}</Text>
            </View>
            <MotiView
              from={{ translateX: 0 }}
              animate={{ translateX: [0, 5, 0] }}
              transition={{ type: 'timing', duration: 1500, loop: true }}
            >
              <ChevronRight color={Colors.primary} size={20} strokeWidth={2.5} />
            </MotiView>
          </View>
        </MotiView>
      ) : (
        content
      )}
    </Pressable>
  );
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {/* Background Gradient for Top */}
      <View style={styles.headerBackground}>
        <LinearGradient
          colors={['#f8f9fa', '#ffffff']}
          style={StyleSheet.absoluteFillObject}
        />
        {/* Subtle decorative curves to mimic topography vibe loosely */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
      </View>

      {/* Header Profile Info */}
      <MotiView 
        from={{ scale: 0.85, opacity: 0, translateY: 15 }}
        animate={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 100 }}
        style={styles.profileHeader}
      >
        <View style={styles.avatarPill}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>RK</Text>
          </View>
          <ChevronDown color={Colors.textMuted} size={16} strokeWidth={2.5} style={styles.avatarChevron} />
        </View>
        
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>Hi Ranjan !</Text>
          <Pencil color="#E63946" size={16} strokeWidth={2.5} />
        </View>
        <Text style={styles.phoneText}>XXXXXX4196</Text>
      </MotiView>

      {/* Menu Groups */}
      <View style={styles.menuContainer}>
        
        <MotiView 
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 250 }}
          style={styles.menuGroup}
        >
          <MenuItem icon={Wallet} title="Delhivery Wallet" />
          <MenuItem icon={MapPin} title="Saved Addresses" isLast />
        </MotiView>

        <MotiView 
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 350 }}
          style={styles.menuGroup}
        >
          <MenuItem icon={Users} title="Refer & Earn" isAnimated />
          <MenuItem icon={Gift} title="Special Rewards" isLast />
        </MotiView>

        <MotiView 
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 450 }}
          style={styles.menuGroup}
        >
          <MenuItem icon={HelpCircle} title="Help & Support" />
          <MenuItem icon={FileText} title="T&Cs" isLast />
        </MotiView>

        <MotiView 
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 220, delay: 550 }}
          style={styles.menuGroup}
        >
          <MenuItem icon={Settings} title="Account Settings" />
          <MenuItem icon={Bell} title="Notifications & Privacy" isLast />
        </MotiView>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 120, // Extra padding for bottom tabs
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  decorativeCircle2: {
    position: 'absolute',
    top: -50,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: Spacing.xl,
  },
  avatarPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE8E8',
    borderRadius: Radii.pill,
    paddingRight: Spacing.sm,
    paddingLeft: 4,
    paddingVertical: 4,
    marginBottom: Spacing.md,
  },
  avatarCircle: {
    backgroundColor: '#E63946',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  avatarChevron: {
    marginLeft: Spacing.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 4,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textDark,
  },
  phoneText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  menuContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  menuGroup: {
    backgroundColor: '#FFF',
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuItemContainer: {
    backgroundColor: '#FFF',
  },
  menuItemPressed: {
    backgroundColor: '#F8F9FA',
  },
  animatedRow: {
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.textDark,
  },
});
