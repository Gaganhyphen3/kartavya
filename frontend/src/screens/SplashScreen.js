import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors, typography } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Animatable.View 
        animation="fadeInUp" 
        duration={1000}
        style={styles.logoContainer}
      >
        <Animatable.Text 
          animation="pulse" 
          iterationCount="infinite"
          style={styles.logo}
        >
          Kartavya
        </Animatable.Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            "A clean, safe city isn't a privilege;{'\n'}it's a shared Kartavya."
          </Text>
        </View>
      </Animatable.View>
      
      <Animatable.View 
        animation="fadeIn" 
        delay={500}
        style={styles.loadingContainer}
      >
        <View style={styles.loadingDots}>
          <Animatable.View 
            animation="bounce" 
            iterationCount="infinite"
            delay={0}
            style={[styles.dot, { backgroundColor: colors.accent }]} 
          />
          <Animatable.View 
            animation="bounce" 
            iterationCount="infinite"
            delay={200}
            style={[styles.dot, { backgroundColor: colors.warning }]} 
          />
          <Animatable.View 
            animation="bounce" 
            iterationCount="infinite"
            delay={400}
            style={[styles.dot, { backgroundColor: colors.resolved }]} 
          />
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    ...typography.h1,
    fontSize: 48,
    color: colors.background,
    fontFamily: 'Poppins-Bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  taglineContainer: {
    paddingHorizontal: 16,
  },
  tagline: {
    ...typography.body1,
    color: colors.background,
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
  },
});

export default SplashScreen;