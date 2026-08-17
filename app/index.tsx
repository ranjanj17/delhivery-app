import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import AnimatedBottomTabBar from '@/components/AnimatedBottomTabBar';
import { useNavigationStore } from '@/store/useNavigationStore';

export default function Index() {
  const activeTab = useNavigationStore((state) => state.activeTab);
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'orders' && <OrdersScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
      </View>
      <View style={styles.tabBarContainer}>
        <AnimatedBottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
