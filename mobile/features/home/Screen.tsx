import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import { useHealthStore } from '../../store/healthStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { Menu, Radio, MapPin, AlertTriangle, Activity, Moon, Footprints, TrendingUp, Sparkles } from 'lucide-react-native';
import MapView from '../../components/MapView';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { healthScore, heartRate, steps, sleep } = useHealthStore();

  return (
    <View style={styles.screenContainer}>
      {/* 1. Custom Header matching the design */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.menuButton}>
          <Menu color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CareConnect AI</Text>
        <TouchableOpacity 
          style={styles.headerSosButton}
          onPress={() => router.push('/emergency-sos')}
        >
          <Text style={styles.headerSosButtonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* 2. Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Good morning, Arthur</Text>
          <Text style={styles.greetingSubText}>Your AI health vitals are looking stable today.</Text>
        </View>

        {/* 3. Redesigned Health Score Card */}
        <View style={styles.healthScoreCard}>
          <View style={styles.scoreCardHeader}>
            <Text style={styles.scoreCardTitle}>Health Score</Text>
            <View style={styles.lowRiskBadge}>
              <Text style={styles.lowRiskBadgeText}>Low Risk</Text>
            </View>
          </View>
          
          <Text style={styles.scoreCardDescription}>
            Based on your activity, sleep patterns, and cardiac data over the last 24 hours.
          </Text>

          <View style={styles.scoreCardButtonsRow}>
            <TouchableOpacity 
              style={styles.fullReportBtn}
              onPress={() => router.push('/prediction')}
            >
              <Text style={styles.fullReportBtnText}>Full Report</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.compareBtn}
              onPress={() => router.push('/family')}
            >
              <Text style={styles.compareBtnText}>Family Check</Text>
            </TouchableOpacity>
          </View>

          {/* Circle Gauge Indicator */}
          <View style={styles.gaugeContainer}>
            <View style={styles.outerGaugeCircle}>
              <Text style={styles.gaugeScoreNumber}>85</Text>
              <Text style={styles.gaugeScoreLabel}>OPTIMAL</Text>
            </View>
          </View>
        </View>

        {/* 4. Action Shortcuts Row (AI Assistant & SOS Hub) */}
        <View style={styles.shortcutsRow}>
          <TouchableOpacity 
            style={[styles.shortcutCard, styles.aiShortcutBg]}
            onPress={() => router.push('/(tabs)/assistant')}
          >
            <View style={styles.shortcutTextCol}>
              <Text style={styles.shortcutLabel}>Talk to</Text>
              <Text style={styles.shortcutTitle}>AI Assistant</Text>
            </View>
            <Sparkles color="#FFFFFF" size={28} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.shortcutCard, styles.sosShortcutBg]}
            onPress={() => router.push('/emergency-sos')}
          >
            <View style={styles.shortcutTextCol}>
              <Text style={[styles.shortcutLabel, { color: '#E11D48' }]}>Emergency</Text>
              <Text style={[styles.shortcutTitle, { color: '#BE123C' }]}>SOS Hub</Text>
            </View>
            <Radio color="#E11D48" size={28} />
          </TouchableOpacity>
        </View>

        {/* 5. Community Health Alert Card */}
        <View style={styles.communityAlertCard}>
          <View style={styles.communityAlertIconsRow}>
            <View style={styles.mapPinIconWrapper}>
              <MapPin color="#0F766E" size={20} />
            </View>
            <AlertTriangle color="#E2E8F0" size={56} style={styles.warningVectorBg} />
          </View>
          
          <Text style={styles.communityAlertTitle}>Community Health Alert</Text>
          <Text style={styles.communityAlertDescription}>
            Increased fever-related cases reported within 2 km radius of your location. Stay hydrated and monitor temperature.
          </Text>
          
          <TouchableOpacity 
            style={styles.viewDetailsBtn}
            onPress={() => router.push('/(tabs)/alerts')}
          >
            <Text style={styles.viewDetailsBtnText}>View Details</Text>
          </TouchableOpacity>
        </View>
        {/* Leaflet Map Section */}
        <View style={styles.mapSection}>
          <MapView />
        </View>

        {/* Extra Shortcuts Row for Hackathon judging */}
        <View style={styles.shortcutsRow}>
          <TouchableOpacity 
            style={[styles.shortcutCard, { backgroundColor: '#F0FDFA', borderWidth: 1, borderColor: '#CCFBF1' }]}
            onPress={() => router.push('/health-center')}
          >
            <View style={styles.shortcutTextCol}>
              <Text style={[styles.shortcutLabel, { color: '#0F766E' }]}>Epidemiology</Text>
              <Text style={[styles.shortcutTitle, { color: '#0F766E' }]}>Health Center</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 6. List Vitals Cards */}
        <View style={styles.vitalsListSection}>
          {/* Heart Rate */}
          <View style={styles.vitalListItem}>
            <View style={styles.vitalLeftRow}>
              <View style={[styles.vitalIconWrapper, { backgroundColor: '#FEF2F2' }]}>
                <Activity color={colors.danger} size={20} />
              </View>
              <View style={styles.vitalTextCol}>
                <Text style={styles.vitalLabel}>HEART RATE</Text>
                <Text style={styles.vitalValue}>72 <Text style={styles.vitalUnit}>bpm</Text></Text>
              </View>
            </View>
            <View style={styles.stableBadge}>
              <Text style={styles.stableBadgeText}>Stable</Text>
            </View>
          </View>

          {/* Sleep */}
          <View style={styles.vitalListItem}>
            <View style={styles.vitalLeftRow}>
              <View style={[styles.vitalIconWrapper, { backgroundColor: '#F0F9FF' }]}>
                <Moon color={colors.accent} size={20} />
              </View>
              <View style={styles.vitalTextCol}>
                <Text style={styles.vitalLabel}>SLEEP</Text>
                <Text style={styles.vitalValue}>7h 20m</Text>
              </View>
            </View>
            <TrendingUp color="#10B981" size={20} />
          </View>

          {/* Steps */}
          <View style={styles.vitalListItem}>
            <View style={styles.vitalLeftRow}>
              <View style={[styles.vitalIconWrapper, { backgroundColor: '#F0FDFA' }]}>
                <Footprints color={colors.primary} size={20} />
              </View>
              <View style={styles.vitalTextCol}>
                <Text style={styles.vitalLabel}>STEPS</Text>
                <Text style={styles.vitalValue}>4,500 <Text style={styles.vitalUnit}>/ 8k</Text></Text>
              </View>
            </View>
            <View style={styles.progressCircleMock} />
          </View>
        </View>

        {/* 7. AI Insight & Weekly Activity Trend */}
        <View style={styles.aiInsightCard}>
          {/* Weekly Activity Trend Block */}
          <View style={styles.chartBlockContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Weekly Activity Trend</Text>
            </View>
            {/* Mock Vector Chart */}
            <View style={styles.vectorChartIllustration}>
              <View style={[styles.chartBarMock, { height: 30 }]} />
              <View style={[styles.chartBarMock, { height: 45 }]} />
              <View style={[styles.chartBarMock, { height: 60 }]} />
              <View style={[styles.chartBarMock, { height: 75 }]} />
              <View style={[styles.chartBarMock, { height: 50 }]} />
              <View style={[styles.chartBarMock, { height: 90 }]} />
              <View style={[styles.chartBarMock, { height: 70 }]} />
            </View>
          </View>

          {/* AI Insight Paragraph */}
          <View style={styles.insightTextSection}>
            <View style={styles.insightHeaderRow}>
              <Sparkles color="#0F766E" size={18} />
              <Text style={styles.insightHeaderTitle}>AI Insight</Text>
            </View>
            <Text style={styles.insightBodyText}>
              "Your active recovery minutes are 15% higher this week. Arthur, keep this pace to improve your cardiovascular endurance by the end of the month."
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    height: 64,
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F766E',
    flex: 1,
    textAlign: 'center',
  },
  headerSosButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  headerSosButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  greetingSection: {
    marginVertical: 12,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
  },
  greetingSubText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  healthScoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 12,
    ...shadows.sm,
  },
  scoreCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scoreCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  lowRiskBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  lowRiskBadgeText: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 11,
  },
  scoreCardDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
  },
  scoreCardButtonsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  fullReportBtn: {
    backgroundColor: '#0F766E',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.md,
    marginRight: 12,
  },
  fullReportBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  compareBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  compareBtnText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 13,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  outerGaugeCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 8,
    borderColor: '#0F766E',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#E2E8F0',
  },
  gaugeScoreNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F172A',
  },
  gaugeScoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  shortcutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  shortcutCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: radius.md,
    marginHorizontal: 6,
    ...shadows.sm,
  },
  aiShortcutBg: {
    backgroundColor: '#0F766E',
  },
  sosShortcutBg: {
    backgroundColor: '#FFE4E6',
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  shortcutTextCol: {
    flexDirection: 'column',
  },
  shortcutLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F0FDFA',
    textTransform: 'uppercase',
  },
  shortcutTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  communityAlertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#0891B2',
    marginVertical: 12,
    ...shadows.sm,
  },
  communityAlertIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mapPinIconWrapper: {
    backgroundColor: '#F0FDFA',
    padding: 8,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  warningVectorBg: {
    marginTop: -10,
    marginRight: -10,
    opacity: 0.3,
  },
  communityAlertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F766E',
    marginBottom: 6,
  },
  communityAlertDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 16,
  },
  viewDetailsBtn: {
    backgroundColor: '#0F766E',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  viewDetailsBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  vitalsListSection: {
    marginVertical: 12,
  },
  vitalListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 6,
    ...shadows.sm,
  },
  vitalLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vitalIconWrapper: {
    padding: 10,
    borderRadius: radius.sm,
    marginRight: 16,
  },
  vitalTextCol: {
    flexDirection: 'column',
  },
  vitalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  vitalUnit: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  stableBadge: {
    backgroundColor: '#E6F4EA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  stableBadgeText: {
    color: '#137333',
    fontWeight: '700',
    fontSize: 12,
  },
  progressCircleMock: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#0F766E',
    borderLeftColor: '#E2E8F0',
  },
  aiInsightCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: radius.lg,
    padding: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chartBlockContainer: {
    backgroundColor: '#0F172A',
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 16,
  },
  chartHeader: {
    marginBottom: 12,
  },
  chartTitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  vectorChartIllustration: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartBarMock: {
    width: 14,
    backgroundColor: '#0EA5E9',
    borderRadius: radius.xs,
  },
  insightTextSection: {
    flexDirection: 'column',
  },
  insightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  insightHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F766E',
    marginLeft: 6,
  },
  insightBodyText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  mapSection: {
    marginVertical: 12,
    // height is controlled inside MapView component
  },
});
