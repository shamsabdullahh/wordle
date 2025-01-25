import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import { GameProvider } from './GameContext'; 
import GameScreen from './GameScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen'; 
import GameScreenwAccount from './GameScreenwAccount'; 


const Stack = createStackNavigator();

const App = () => {
  return (
    <GameProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={{
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: '',
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: '',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: '',
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="GameScreenwAccount"
          component={GameScreenwAccount}
          options={{
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
            },
            title: '',
          }}
        />
      </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
};

export default App;
