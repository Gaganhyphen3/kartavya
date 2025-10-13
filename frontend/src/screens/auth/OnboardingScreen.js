import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../../theme/colors';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Welcome to Kartavya',
    description: 'Your civic duty made simple. Report issues, track progress, and build a better community together.',
    icon: 'home',
    color: colors.primary,
  },
  {
    id: 2,
    title: 'Report Issues Instantly',
    description: 'Snap a photo, add details, and report civic issues like potholes, garbage, or broken streetlights in seconds.',
    icon: 'camera',
    color: colors.accent,
  },
  {
    id: 3,
    title: 'Connect with Community',
    description: 'Vote on issues, comment, and collaborate with neighbors and local authorities to solve problems.',
    icon: 'people',
    color: colors.warning,
  },
  {
    id: 4,
    title: 'Together for Tomorrow',
    description: 'Track your impact, earn credits, and see real change happen in your neighborhood. Every report matters.',
    icon: 'trophy',
    color: colors.resolved,
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const renderSlide = (item, index) => (
    <View key={item.id} style={[styles.slide, { width }]}>
      <Animatable.View 
        animation="fadeInUp" 
        delay={300}
        style={styles.iconContainer}
      >
        <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={60} color={colors.background} />
        </View>
      </Animatable.View>

      <Animatable.View 
        animation="fadeInUp" 
        delay={500}
        style={styles.textContainer}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animatable.View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => renderSlide(item, index))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Page Indicators */}
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentIndex ? colors.primary : colors.border,
                  width: index === currentIndex ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.nextButton}
          labelStyle={styles.nextButtonLabel}
          contentStyle={styles.nextButtonContent}
        >
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: spacing.lg,
    zIndex: 1,
    padding: spacing.sm,
  },
  skipText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.xxl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.text,
  },
  description: {
    ...typography.body1,
    textAlign: 'center',
    lineHeight: 24,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
  },
  bottomContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    transition: 'all 0.3s ease',
  },
  nextButton: {
    backgroundColor: colors.primary,
    ...shadows.small,
  },
  nextButtonContent: {
    paddingVertical: spacing.sm,
  },
  nextButtonLabel: {
    ...typography.button,
    color: colors.background,
  },
});

export default OnboardingScreen;