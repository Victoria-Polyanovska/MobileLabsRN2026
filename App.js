import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeProvider } from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { GameProvider, GameContext } from './src/context/GameContext';
import { lightTheme, darkTheme } from './src/theme/theme';

import MainScreen from './src/screens/MainScreen';
import ChallengesScreen from './src/screens/ChallengesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. Створюємо нижню навігацію (Tabs)
const TabNavigator = () => {
  const { theme } = useContext(GameContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Прибираємо стандартний хедер, бо ми малюємо свій
        tabBarStyle: { 
          backgroundColor: currentTheme.card,
          borderTopColor: currentTheme.border,
          height: 60,
          paddingBottom: 10
        },
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.text + '80',
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Клікер') iconName = 'game-controller-outline';
          else if (route.name === 'Завдання') iconName = 'list-outline';
          else if (route.name === 'Налаштування') iconName = 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Клікер" component={MainScreen} />
      <Tab.Screen name="Завдання" component={ChallengesScreen} />
      <Tab.Screen name="Налаштування" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// 2. Створюємо бокову навігацію (Drawer), яка містить у собі Tabs
const AppNavigator = () => {
  const { theme } = useContext(GameContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: { backgroundColor: currentTheme.background, width: 280 },
            drawerActiveTintColor: currentTheme.primary,
            drawerInactiveTintColor: currentTheme.text,
          }}
        >
          {/* Drawer показує TabNavigator як основний контент */}
          <Drawer.Screen 
            name="Головна" 
            component={TabNavigator} 
            options={{ 
                drawerLabel: 'Мій Додаток',
                drawerIcon: ({color}) => <Ionicons name="home-outline" size={22} color={color} /> 
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </GestureHandlerRootView>
  );
}