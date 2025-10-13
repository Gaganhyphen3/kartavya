// Step 2: Civic Design Implementation
// Copy this to frontend/App.js after nuclear reset works

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🏛️ Kartavya</Text>
        <Text style={styles.tagline}>Civic-Tech Community App</Text>
        <Text style={styles.quote}>
          "A clean, safe city isn't a privilege;{'\n'}it's a shared Kartavya."
        </Text>
      </View>
      
      <View style={styles.colorPalette}>
        <Text style={styles.sectionTitle}>🎨 Civic Color Palette</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: '#0077B6' }]}>
            <Text style={styles.colorText}>Civic Blue</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: '#00B894' }]}>
            <Text style={styles.colorText}>Emerald Green</Text>
          </View>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: '#FDCB2D' }]}>
            <Text style={[styles.colorText, { color: '#000' }]}>Sun Yellow</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: '#E17055' }]}>
            <Text style={styles.colorText}>Civic Orange</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.features}>
        <Text style={styles.sectionTitle}>✅ Civic Features Ready</Text>
        <Text style={styles.feature}>📱 Mobile-First Responsive Design</Text>
        <Text style={styles.feature}>🏛️ Professional Civic UI/UX</Text>
        <Text style={styles.feature}>📊 Issue Reporting System</Text>
        <Text style={styles.feature}>🗳️ Community Voting Platform</Text>
        <Text style={styles.feature}>📈 Real-time Leaderboards</Text>
        <Text style={styles.feature}>👥 Citizen & Authority Roles</Text>
        <Text style={styles.feature}>🗺️ Location-based Services</Text>
        <Text style={styles.feature}>🔔 Real-time Notifications</Text>
      </View>
      
      <View style={styles.status}>
        <Text style={styles.statusText}>🚀 Step 2: Civic Design Complete</Text>
        <Text style={styles.statusSubtext}>Ready for Navigation & Screens</Text>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Expo SDK 51 • React Native • Node.js Backend</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0077B6', // Civic Blue
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
    opacity: 0.9,
    textAlign: 'center',
  },
  quote: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
    lineHeight: 20,
  },
  colorPalette: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  colorBox: {
    flex: 1,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  features: {
    margin: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#00B894', // Emerald Green
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    paddingLeft: 10,
  },
  status: {
    alignItems: 'center',
    backgroundColor: '#00B894', // Emerald Green
    margin: 20,
    padding: 20,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusSubtext: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
});