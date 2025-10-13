import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MyReportsScreen() {
  const myReports = [
    { id: 1, title: 'Pothole on Main Street', status: 'Resolved', date: '2 days ago', color: '#A3CB38' },
    { id: 2, title: 'Broken streetlight', status: 'In Progress', date: '5 days ago', color: '#E17055' },
    { id: 3, title: 'Garbage collection issue', status: 'Pending', date: '1 week ago', color: '#FDCB2D' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 My Reports</Text>
        <Text style={styles.subtitle}>Track your civic contributions</Text>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>450</Text>
          <Text style={styles.statLabel}>Points Earned</Text>
        </View>
      </View>
      
      {myReports.map((report) => (
        <View key={report.id} style={styles.reportCard}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: report.color }]}>
              <Text style={styles.statusText}>{report.status}</Text>
            </View>
          </View>
          <Text style={styles.reportDate}>{report.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#636E72',
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
  stats: {
    flexDirection: 'row',
    padding: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077B6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    textAlign: 'center',
  },
  reportCard: {
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
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3436',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  reportDate: {
    fontSize: 12,
    color: '#636E72',
  },
});