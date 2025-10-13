import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useAuth } from '../../context/AuthContext';
import { colors, typography, spacing, shadows } from '../../theme/colors';

const LoginScreen = ({ navigation }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('citizen');
  
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // email or phone
    pincode: '',
    authorityRole: 'Municipal Corporation',
  });

  const authorityRoles = [
    { label: 'Municipal Corporation', value: 'Municipal Corporation' },
    { label: 'Police', value: 'Police' },
    { label: 'Fire Department', value: 'Fire Department' },
    { label: 'Water Board', value: 'Water Board' },
    { label: 'Electricity Board', value: 'Electricity Board' },
    { label: 'Other', value: 'Other' },
  ];

  const handleSubmit = async () => {
    if (!formData.identifier || !formData.pincode || (!isLogin && !formData.name)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      let result;
      
      if (isLogin) {
        result = await login({
          identifier: formData.identifier,
          pincode: formData.pincode,
        });
      } else {
        result = await register({
          name: formData.name,
          email: formData.identifier.includes('@') ? formData.identifier : undefined,
          phone: !formData.identifier.includes('@') ? formData.identifier : undefined,
          pincode: formData.pincode,
          role: userType,
          authorityRole: userType === 'authority' ? formData.authorityRole : undefined,
        });
      }

      if (!result.success) {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View animation="fadeInUp" duration={800} style={styles.header}>
          <Text style={styles.logo}>Kartavya</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back!' : 'Join the community'}
          </Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={200} style={styles.formContainer}>
          {/* Login/Register Toggle */}
          <SegmentedButtons
            value={isLogin ? 'login' : 'register'}
            onValueChange={(value) => setIsLogin(value === 'login')}
            buttons={[
              { value: 'login', label: 'Login' },
              { value: 'register', label: 'Sign Up' },
            ]}
            style={styles.toggleButtons}
          />

          {/* User Type Selection (Register only) */}
          {!isLogin && (
            <View style={styles.userTypeContainer}>
              <Text style={styles.sectionLabel}>I am a:</Text>
              <SegmentedButtons
                value={userType}
                onValueChange={setUserType}
                buttons={[
                  { value: 'citizen', label: 'Citizen' },
                  { value: 'authority', label: 'Authority' },
                ]}
                style={styles.userTypeButtons}
              />
            </View>
          )}

          {/* Form Fields */}
          {!isLogin && (
            <TextInput
              label="Full Name"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              mode="outlined"
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
            />
          )}

          <TextInput
            label="Email or Phone Number"
            value={formData.identifier}
            onChangeText={(text) => updateFormData('identifier', text)}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            label="Pincode"
            value={formData.pincode}
            onChangeText={(text) => updateFormData('pincode', text)}
            mode="outlined"
            style={styles.input}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
            keyboardType="numeric"
            maxLength={10}
          />

          {/* Authority Role Selection */}
          {!isLogin && userType === 'authority' && (
            <View style={styles.authorityRoleContainer}>
              <Text style={styles.sectionLabel}>Authority Role:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.roleButtons}>
                  {authorityRoles.map((role) => (
                    <Button
                      key={role.value}
                      mode={formData.authorityRole === role.value ? 'contained' : 'outlined'}
                      onPress={() => updateFormData('authorityRole', role.value)}
                      style={[
                        styles.roleButton,
                        formData.authorityRole === role.value && styles.selectedRoleButton
                      ]}
                      labelStyle={[
                        styles.roleButtonLabel,
                        formData.authorityRole === role.value && styles.selectedRoleButtonLabel
                      ]}
                    >
                      {role.label}
                    </Button>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
            labelStyle={styles.submitButtonLabel}
          >
            {isLogin ? 'Login' : 'Create Account'}
          </Button>

          {/* Switch Mode */}
          <View style={styles.switchModeContainer}>
            <Text style={styles.switchModeText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <Button
              mode="text"
              onPress={() => setIsLogin(!isLogin)}
              labelStyle={styles.switchModeButton}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Button>
          </View>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.h1,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
  },
  toggleButtons: {
    marginBottom: spacing.lg,
  },
  userTypeContainer: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.body2,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  userTypeButtons: {
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.background,
  },
  authorityRoleContainer: {
    marginBottom: spacing.lg,
  },
  roleButtons: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },
  roleButton: {
    marginRight: spacing.sm,
    borderColor: colors.primary,
  },
  selectedRoleButton: {
    backgroundColor: colors.primary,
  },
  roleButtonLabel: {
    ...typography.caption,
    color: colors.primary,
  },
  selectedRoleButtonLabel: {
    color: colors.background,
  },
  submitButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.primary,
    ...shadows.small,
  },
  submitButtonLabel: {
    ...typography.button,
    color: colors.background,
    paddingVertical: spacing.sm,
  },
  switchModeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  switchModeText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  switchModeButton: {
    ...typography.body2,
    color: colors.primary,
  },
});

export default LoginScreen;