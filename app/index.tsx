import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import OrdersScreen from '@/screens/OrdersScreen';
import AnimatedBottomTabBar from '@/components/AnimatedBottomTabBar';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'orders' && <OrdersScreen />}
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
