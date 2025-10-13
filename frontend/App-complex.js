import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
// StatusBar will be handled by React Native Paper theme
// Font loading disabled for development

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { theme } from './src/theme/colors';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createStackNavigator();

const AppContent = () => {
  const { user, loading } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Skip font loading for now - use system fonts
    setFontsLoaded(true);
  }, []);

  if (loading || !fontsLoaded) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {/* StatusBar handled by theme */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PaperProvider>
  );
}