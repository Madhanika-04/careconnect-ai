import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Heart } from 'lucide-react-native';

export default function LoginScreen() {
  const { login, loading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required fields', 'Please enter both email and password.');
      return;
    }
    try {
      await login(email, password);
      router.replace('/(tabs)/home');
    } catch (e: any) {
      Alert.alert('Sign In Failed', e.message || 'Check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Mock Google Login dispatch - will fetch standard default profile
      await login('google.user@healthmail.com', 'google_mock_pass');
      router.replace('/(tabs)/home');
    } catch (e: any) {
      Alert.alert('Google Sign In Failed', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Heart color={colors.card} size={40} fill={colors.card} />
          </View>
          <Text style={styles.appName}>CareConnect AI</Text>
          <Text style={styles.appSub}>Proactive Health Intelligence</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign In</Text>
          <Text style={styles.cardDesc}>Access your health records and local health alerts</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. robert.carter@healthmail.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <PrimaryButton
            title="LOG IN"
            loading={loading}
            onPress={handleLogin}
          />

          <View style={{ marginVertical: 8 }} />

          <PrimaryButton
            title="SIGN IN WITH GOOGLE"
            mode="outlined"
            color={colors.primary}
            onPress={handleGoogleLogin}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>First time using the app?</Text>
            <Text style={styles.footerLink} onPress={() => router.push('/signup')}>
              Create an Account
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...shadows.md,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  appSub: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 6,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
});
