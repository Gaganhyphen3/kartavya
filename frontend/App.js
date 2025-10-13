import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import ReportScreen from './src/screens/ReportScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import MyReportsScreen from './src/screens/MyReportsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Rankings') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else if (route.name === 'My Reports') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0077B6', // Civic Blue
          tabBarInactiveTintColor: '#636E72', // Urban Gray
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E0E0E0',
            paddingBottom: 5,
            height: 60,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Feed" component={HomeScreen} />
        <Tab.Screen name="Report" component={ReportScreen} />
        <Tab.Screen name="Rankings" component={LeaderboardScreen} />
        <Tab.Screen name="My Reports" component={MyReportsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}