import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Report Issue</Text>
        <Text style={styles.subtitle}>Help improve your community</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>Take a photo of the issue</Text>
        </View>
        
        <View style={styles.step}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>Add description and category</Text>
        </View>
        
        <View style={styles.step}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>Confirm location and submit</Text>
        </View>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📸 Start Reporting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#00B894',
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00B894',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
    marginRight: 15,
  },
  stepText: {
    fontSize: 16,
    color: '#636E72',
    flex: 1,
  },
  button: {
    backgroundColor: '#00B894',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});