import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useHealthStore } from '../../store/healthStore';
import { useAlertStore } from '../../store/alertStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { RiskBadge } from '../../components/RiskBadge';
import { MetricCard } from '../../components/MetricCard';
import { AlertCard } from '../../components/AlertCard';
import { HealthCard } from '../../components/HealthCard';
import { SectionHeader } from '../../components/SectionHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Heart, Footprints, Moon, MessageSquareText, ShieldAlert, AlertTriangle } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { healthScore, riskLevel, heartRate, steps, sleep } = useHealthStore();
  const { alerts } = useAlertStore();

  const activeAlert = alerts[0]; // Fetch the most critical alert

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* 1. Greeting Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.sosAlertHeaderButton}
          onPress={() => router.push('/emergency-sos')}
        >
          <Text style={styles.sosAlertHeaderText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Health Score Card & Risk Level Badge */}
      <HealthCard title="Daily Health Index" subtitle="Overall wellness score computed by AI">
        <View style={styles.scoreRow}>
          <View style={styles.scoreGauge}>
            <Text style={styles.scoreText}>{healthScore}</Text>
            <Text style={styles.scoreLabel}>/100</Text>
          </View>
          <View style={styles.statusBlock}>
            <Text style={styles.statusTitle}>Health Assessment</Text>
            <View style={styles.badgeContainer}>
              <RiskBadge level={riskLevel} />
            </View>
            <Text style={styles.statusDescription}>
              Your vitals are steady. Resting metrics show normal cardiovascular baseline variance.
            </Text>
          </View>
        </View>
      </HealthCard>

      {/* 3. Community Health Alert Banner */}
      {activeAlert && (
        <View style={styles.alertWrapper}>
          <SectionHeader 
            title="Local Health Intelligence" 
            onPressAction={() => router.push('/(tabs)/alerts')} 
            actionTitle="View Map" 
          />
          <AlertCard
            title={activeAlert.title}
            description={activeAlert.description}
            type={activeAlert.type}
            date={activeAlert.date}
            icon={<AlertTriangle color={colors.warning} size={20} />}
            onPress={() => router.push('/(tabs)/alerts')}
          />
        </View>
      )}

      {/* 4. Vitals & Metrics Grid */}
      <SectionHeader title="Your Health Metrics" />
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          <MetricCard
            title="Heart Rate"
            value={heartRate.value}
            unit={heartRate.unit}
            icon={<Heart color={colors.danger} size={20} />}
            subtitle={heartRate.timestamp}
            trend={{ value: '2 bpm slower', direction: 'down' }}
          />
          <MetricCard
            title="Steps Today"
            value={steps.value}
            unit=""
            icon={<Footprints color={colors.primary} size={20} />}
            subtitle={`Goal: ${steps.goal}`}
            trend={{ value: '80% of goal', direction: 'up' }}
          />
        </View>
        <View style={styles.metricRow}>
          <MetricCard
            title="Sleep Quality"
            value={sleep.value}
            unit={sleep.unit}
            icon={<Moon color={colors.accent} size={20} />}
            subtitle="Last Night"
            trend={{ value: 'Stable', direction: 'neutral' }}
          />
        </View>
      </View>

      {/* 5. AI Assistant Shortcut */}
      <TouchableOpacity
        style={styles.assistantShortcut}
        activeOpacity={0.9}
        onPress={() => router.push('/(tabs)/assistant')}
      >
        <View style={styles.assistantShortcutContent}>
          <View style={styles.assistantIconContainer}>
            <MessageSquareText color={colors.card} size={24} />
          </View>
          <View style={styles.assistantTextContainer}>
            <Text style={styles.assistantTitle}>Ask CareConnect AI</Text>
            <Text style={styles.assistantDesc}>
              "Check symptoms" or "Explain my risk score"
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 6. Big Actionable Emergency Button for Accessibilty */}
      <View style={styles.sosSection}>
        <PrimaryButton
          title="OPEN EMERGENCY CENTER"
          color={colors.danger}
          onPress={() => router.push('/emergency-sos')}
          icon="shield-alert"
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
  },
  sosAlertHeaderButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.md,
    ...shadows.sm,
  },
  sosAlertHeaderText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  scoreGauge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: -2,
  },
  statusBlock: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  badgeContainer: {
    marginVertical: 4,
  },
  statusDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 4,
  },
  alertWrapper: {
    marginVertical: 8,
  },
  metricsGrid: {
    marginVertical: 4,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assistantShortcut: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: 16,
    marginVertical: 16,
    ...shadows.md,
  },
  assistantShortcutContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assistantIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: radius.full,
    marginRight: 16,
  },
  assistantTextContainer: {
    flex: 1,
  },
  assistantTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
  assistantDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  sosSection: {
    marginVertical: 8,
  },
});
