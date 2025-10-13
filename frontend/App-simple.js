import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏛️ Kartavya</Text>
      <Text style={styles.subtitle}>Civic-Tech Community App</Text>
      <Text style={styles.description}>
        A clean, safe city isn't a privilege;{'\n'}it's a shared Kartavya.
      </Text>
      <Text style={styles.status}>✅ App is loading successfully!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0077B6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    opacity: 0.8,
  },
  status: {
    fontSize: 16,
    color: '#00B894',
    fontWeight: 'bold',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
  },
});