import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Heart } from 'lucide-react-native';

export default function SignupScreen() {
  const { register, loading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  // Extended User Profile details
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  
  // Emergency Contact details
  const [contactName, setContactName] = useState('');
  const [contactRelation, setContactRelation] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSignup = async () => {
    if (
      !name.trim() || 
      !email.trim() || 
      !password.trim() || 
      !phone.trim() || 
      !age.trim() || 
      !gender.trim() ||
      !bloodGroup.trim() ||
      !contactName.trim() ||
      !contactPhone.trim()
    ) {
      Alert.alert('Required fields', 'Please complete all details, including at least one emergency contact.');
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum)) {
      Alert.alert('Invalid Age', 'Please enter a valid number for age.');
      return;
    }

    const profileData = {
      name: name.trim(),
      age: ageNum,
      gender: gender.trim(),
      bloodGroup: bloodGroup.trim(),
      medicalHistory: medicalHistory.trim(),
      phone: phone.trim(),
      emergencyContacts: [
        {
          id: `c_${Date.now()}`,
          name: contactName.trim(),
          relationship: contactRelation.trim() || 'Emergency Contact',
          phone: contactPhone.trim(),
        }
      ]
    };

    try {
      await register(email.trim(), password.trim(), profileData);
      router.replace('/(tabs)/home');
    } catch (e: any) {
      Alert.alert('Registration Failed', e.message || 'Check connection.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Heart color={colors.card} size={32} fill={colors.card} />
          </View>
          <Text style={styles.appName}>CareConnect AI</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Account</Text>
          <Text style={styles.cardDesc}>Establish your personal secure health profile</Text>

          {/* Account Credentials */}
          <Text style={styles.sectionHeader}>1. Credentials</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="robert.carter@healthmail.com"
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
              placeholder="Choose a strong password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Personal Info */}
          <Text style={styles.sectionHeader}>2. Personal Details</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Robert Carter"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 (555) 019-2831"
              placeholderTextColor={colors.textSecondary}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputContainer, { width: '48%' }]}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="72"
                placeholderTextColor={colors.textSecondary}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputContainer, { width: '48%' }]}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                placeholder="Male"
                placeholderTextColor={colors.textSecondary}
                value={gender}
                onChangeText={setGender}
              />
            </View>
          </View>

          {/* Medical Info */}
          <Text style={styles.sectionHeader}>3. Clinical Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Blood Group</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. O Positive (O+)"
              placeholderTextColor={colors.textSecondary}
              value={bloodGroup}
              onChangeText={bloodGroup => setBloodGroup(bloodGroup)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Medical History (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Hypertension, Penicillin Allergy"
              placeholderTextColor={colors.textSecondary}
              value={medicalHistory}
              onChangeText={setMedicalHistory}
            />
          </View>

          {/* Primary Emergency Contact */}
          <Text style={styles.sectionHeader}>4. Primary Emergency Contact</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Sarah Carter"
              placeholderTextColor={colors.textSecondary}
              value={contactName}
              onChangeText={setContactName}
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={[styles.inputContainer, { width: '48%' }]}>
              <Text style={styles.label}>Relationship</Text>
              <TextInput
                style={styles.input}
                placeholder="Daughter"
                placeholderTextColor={colors.textSecondary}
                value={contactRelation}
                onChangeText={setContactRelation}
              />
            </View>

            <View style={[styles.inputContainer, { width: '48%' }]}>
              <Text style={styles.label}>Contact Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 (555) 987-6543"
                placeholderTextColor={colors.textSecondary}
                value={contactPhone}
                onChangeText={setContactPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <PrimaryButton
            title="REGISTER PROFILE"
            loading={loading}
            onPress={handleSignup}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Text style={styles.footerLink} onPress={() => router.push('/login')}>
              Log In
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    paddingTop: 48,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    ...shadows.sm,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 14,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    fontSize: 15,
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
