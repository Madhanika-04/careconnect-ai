import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { HealthCard } from '../../components/HealthCard';
import { SectionHeader } from '../../components/SectionHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { User, Phone, Settings, LogOut, ShieldAlert, Languages } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout, updateLanguage } = useAuthStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <User size={48} color={colors.primary} />
        </View>
        <Text style={styles.profileName}>{user?.name || 'Robert Carter'}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
        <View style={styles.ageBadge}>
          <Text style={styles.ageBadgeText}>Age: {user?.age} (Senior Care Profile)</Text>
        </View>
      </View>

      {/* Clinical Profile Details */}
      <SectionHeader title="Clinical Profile Details" />
      <HealthCard title="Medical Records Info">
        <View style={styles.medicalInfoRow}>
          <View style={styles.medicalInfoCol}>
            <Text style={styles.medLabel}>Gender</Text>
            <Text style={styles.medVal}>{user?.gender || 'Male'}</Text>
          </View>
          <View style={styles.medicalInfoCol}>
            <Text style={styles.medLabel}>Blood Group</Text>
            <Text style={styles.medVal}>{user?.bloodGroup || 'O Positive (O+)'}</Text>
          </View>
        </View>
        <View style={[styles.medicalInfoRow, { marginTop: 12 }]}>
          <View style={styles.medicalInfoCol}>
            <Text style={styles.medLabel}>Medical History / Allergies</Text>
            <Text style={styles.medVal}>{user?.medicalHistory || 'Mild Hypertension, Penicillin Allergy'}</Text>
          </View>
        </View>
      </HealthCard>

      {/* Emergency Contact Summary */}
      <SectionHeader title="Registered Emergency Contacts" />
      {user?.emergencyContacts.map((contact) => (
        <View key={contact.id} style={styles.contactCard}>
          <View>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactRelation}>{contact.relationship}</Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
          <View style={styles.contactBadge}>
            <ShieldAlert size={16} color={colors.danger} />
            <Text style={styles.contactBadgeText}>SMS Alerts Enabled</Text>
          </View>
        </View>
      ))}

      {/* Language Settings */}
      <SectionHeader title="Application Preferences" />
      <HealthCard title="Language Interface" icon={<Languages size={20} color={colors.primary} />}>
        <Text style={styles.preferenceLabel}>Selected Language:</Text>
        <View style={styles.langGrid}>
          {(['en', 'es', 'hi', 'zh'] as const).map((langCode) => (
            <TouchableOpacity
              key={langCode}
              style={[
                styles.langBtn,
                user?.language === langCode && styles.langBtnActive,
              ]}
              onPress={() => updateLanguage(langCode)}
            >
              <Text
                style={[
                  styles.langBtnText,
                  user?.language === langCode && styles.langBtnTextActive,
                ]}
              >
                {langCode === 'en' ? 'English' : langCode === 'es' ? 'Español' : langCode === 'hi' ? 'हिन्दी' : '中文'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </HealthCard>

      {/* Log out Action */}
      <View style={styles.actionContainer}>
        <PrimaryButton
          title="LOG OUT FROM DEVICE"
          mode="outlined"
          color={colors.danger}
          textColor={colors.danger}
          onPress={logout}
          icon="logout"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    ...shadows.sm,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  ageBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: 12,
  },
  ageBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    ...shadows.sm,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  contactRelation: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 4,
  },
  contactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  contactBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.danger,
    marginLeft: 4,
  },
  preferenceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  langBtn: {
    width: '48%',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: colors.background,
  },
  langBtnActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  langBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  langBtnTextActive: {
    color: colors.primary,
  },
  actionContainer: {
    marginTop: 24,
  },
  medicalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  medicalInfoCol: {
    flex: 1,
  },
  medLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  medVal: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '700',
    marginTop: 2,
  },
});
