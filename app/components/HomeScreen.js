import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaderboardScreen from './LeaderboardScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

// Main Home Content Component
const MainHomeContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/confetti.json')}
        autoPlay
        loop
        style={styles.confetti}
      />

      <Text style={styles.title}>مرحبًا بكم في الصفحة الرئيسية</Text>

      <TouchableOpacity
        style={styles.gameButton}
        onPress={() => navigation.navigate('GameScreenwAccount')}
      >
        <Text style={styles.gameButtonText}>ألعب الأن</Text>
      </TouchableOpacity>
    </View>
  );
};

// Home Screen Component
const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../assets/load.json')}
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#234c34',
          height: 60,
          paddingBottom: 5
        },
        tabBarActiveTintColor: '#00ff6a',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainHomeContent}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? 
                require('../assets/home-active.png') : 
                require('../assets/home-inactive.png')}
              style={styles.tabIcon}
            />
          )
        }}
      />

      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'جدول النقاط',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? 
                require('../assets/trophy-active.png') : 
                require('../assets/trophy-inactive.png')}
              style={styles.tabIcon}
            />
          )
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'الحساب',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? 
                require('../assets/account-active.png') : 
                require('../assets/account-inactive.png')}
              style={styles.tabIcon}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e6',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e6',
  },
  confetti: {
    position: 'absolute',
    width: width * 1.2,
    height: height * 1.2,
    zIndex: -1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#234C34',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  gameButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFA500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  gameButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginTop: 5,
  },
});

export default HomeScreen;