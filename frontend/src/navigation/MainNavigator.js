import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// Screens
import HomeFeedScreen from '../screens/main/HomeFeedScreen';
import ReportIssueScreen from '../screens/main/ReportIssueScreen';
import LeaderboardScreen from '../screens/main/LeaderboardScreen';
import MyReportsScreen from '../screens/main/MyReportsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import IssueDetailScreen from '../screens/main/IssueDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeFeed" component={HomeFeedScreen} />
    <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
  </Stack.Navigator>
);

const ReportsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MyReportsList" component={MyReportsScreen} />
    <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'MyReports') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{ tabBarLabel: 'Feed' }}
      />
      <Tab.Screen 
        name="Report" 
        component={ReportIssueScreen}
        options={{ tabBarLabel: 'Report' }}
      />
      <Tab.Screen 
        name="Leaderboard" 
        component={LeaderboardScreen}
        options={{ tabBarLabel: 'Rankings' }}
      />
      <Tab.Screen 
        name="MyReports" 
        component={ReportsStack}
        options={{ tabBarLabel: 'My Reports' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;