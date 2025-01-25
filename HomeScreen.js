import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LeaderboardScreen from './LeaderboardScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

const MainHomeContent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Confetti Animation */}
      <LottieView
        source={require('./assets/confetti.json')}
        autoPlay
        loop
        style={styles.confetti}
      />

      <Text style={styles.title}>مرحبًا بكم في الصفحة الرئيسية</Text>

      {/* Game Button */}
      <TouchableOpacity
        style={styles.gameButton}
        onPress={() => navigation.navigate('GameScreenwAccount')}
      >
        <Text style={styles.gameButtonText}>ألعب الأن</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('./assets/load.json')} // Replace with your load.json path
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
          backgroundColor: '#234c34', // Tab bar background color
        },
        tabBarActiveTintColor: '#ffffff', // Active tab text/icon color
        tabBarInactiveTintColor: '#cccccc', // Inactive tab text/icon color
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainHomeContent}
        options={{
          tabBarLabel: 'الرئيسية',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./assets/home-active.png') // Active icon
                  : require('./assets/home-inactive.png') // Inactive icon
              }
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'جدول النقاط',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./assets/trophey-active.png') // Active icon
                  : require('./assets/trophey-inactive.png') // Inactive icon
              }
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'الحساب',
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./assets/active.png') // Active icon
                  : require('./assets/inactive.png') // Inactive icon
              }
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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
  },
  confetti: {
    position: 'absolute',
    top: -990,
    left: -30,
    right: -30,
    bottom: -990,
    zIndex: -1, // Place behind other content
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#234C34',
  },
  gameButton: {
    backgroundColor: '#FF4500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFA500',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10, // Android shadow
  },
  gameButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
