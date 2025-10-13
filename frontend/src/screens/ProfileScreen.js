import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>Citizen User</Text>
        <Text style={styles.location}>📍 Mumbai, 400001</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>450</Text>
          <Text style={styles.statLabel}>Credits</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Reports</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>8</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>
      
      <View style={styles.badges}>
        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🌟</Text>
            <Text style={styles.badgeText}>First Report</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🎯</Text>
            <Text style={styles.badgeText}>Problem Solver</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>👥</Text>
            <Text style={styles.badgeText}>Community Helper</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>⚙️ Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>📊 My Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>ℹ️ About Kartavya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>🚪 Logout</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
  },
  badges: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 15,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  badge: {
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    padding: 15,
    borderRadius: 12,
    minWidth: 80,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    color: '#636E72',
    textAlign: 'center',
  },
  menu: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    color: '#2D3436',
  },
});