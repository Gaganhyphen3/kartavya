import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function LeaderboardScreen() {
  const topUsers = [
    { rank: 1, name: 'Priya Sharma', points: 1250, badge: '🏆' },
    { rank: 2, name: 'Rajesh Kumar', points: 980, badge: '🥈' },
    { rank: 3, name: 'Anita Patel', points: 875, badge: '🥉' },
    { rank: 4, name: 'Vikram Singh', points: 720, badge: '⭐' },
    { rank: 5, name: 'Meera Joshi', points: 650, badge: '⭐' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Community Leaders</Text>
        <Text style={styles.subtitle}>Top contributors this month</Text>
      </View>
      
      {topUsers.map((user) => (
        <View key={user.rank} style={[
          styles.userCard,
          user.rank <= 3 && styles.topThree
        ]}>
          <Text style={styles.badge}>{user.badge}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userPoints}>{user.points} points</Text>
          </View>
          <Text style={styles.rank}>#{user.rank}</Text>
        </View>
      ))}
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Keep contributing to climb the leaderboard!</Text>
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
    backgroundColor: '#E17055',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
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
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topThree: {
    backgroundColor: '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: '#E17055',
  },
  badge: {
    fontSize: 24,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  userPoints: {
    fontSize: 14,
    color: '#636E72',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E17055',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#636E72',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});