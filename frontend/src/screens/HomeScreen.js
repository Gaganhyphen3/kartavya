import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏠 Community Feed</Text>
        <Text style={styles.subtitle}>Latest civic issues in your area</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Issue Reporting</Text>
        <Text style={styles.cardText}>Report potholes, garbage, streetlights, and other civic issues</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🗳️ Community Voting</Text>
        <Text style={styles.cardText}>Vote on issues to prioritize community needs</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📈 Real-time Updates</Text>
        <Text style={styles.cardText}>Track issue resolution progress in real-time</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#0077B6',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
  },
});