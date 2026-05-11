import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Каталог',
          tabBarIcon: ({ color }) => <TabBarIcon name="th-list" color={color} />,
          headerTitle: 'Магазин техніки',
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Кошик',
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
          headerTitle: 'Мій кошик',
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: 'Історія',
          tabBarIcon: ({ color }) => <TabBarIcon name="history" color={color} />,
          headerTitle: 'Історія замовлень',
        }}
      />

    </Tabs>
  );
}