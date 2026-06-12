import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { AlertTriangle, Info, CheckCircle2, Droplets, Bedtime, Activity, Phone } from 'lucide-react-native';

export default function PredictionScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* 1. Header Risk Badge */}
      <View style={styles.riskHeaderCard}>
        <View>
          <Text style={styles.riskTitle}>Mild Dehydration</Text>
          <Text style={styles.riskTime}>Generated today • 10:45 AM</Text>
        </View>
        <View style={styles.riskBadge}>
          <AlertTriangle size={16} color="#D97706" />
          <Text style={styles.riskBadgeText}>Moderate Risk</Text>
        </View>
      </View>

      {/* 2. Confidence & Biometrics Split Panel */}
      <View style={styles.splitRow}>
        {/* Gauge Card */}
        <View style={[styles.card, styles.gaugeCard]}>
          <View style={styles.outerCircle}>
            <Text style={styles.scoreText}>75%</Text>
            <Text style={styles.scoreLabel}>Confidence</Text>
          </View>
          <Text style={styles.gaugeSubText}>High clinical correlation based on biometric sync.</Text>
        </View>

        {/* Contributing Factors */}
        <View style={[styles.card, styles.factorsCard]}>
          <Text style={styles.cardTitle}>Factors Detected</Text>
          
          <View style={styles.factorItem}>
            <CheckCircle2 size={16} color={colors.primary} />
            <View style={styles.factorTextCol}>
              <Text style={styles.factorLabel}>Elevated Heart Rate</Text>
              <Text style={styles.factorSub}>Resting: 88 BPM (+12%)</Text>
            </View>
          </View>

          <View style={styles.factorItem}>
            <CheckCircle2 size={16} color={colors.primary} />
            <View style={styles.factorTextCol}>
              <Text style={styles.factorLabel}>Disrupted Sleep</Text>
              <Text style={styles.factorSub}>Last night: 4h 22m (-30%)</Text>
            </View>
          </View>

          <View style={styles.factorItem}>
            <CheckCircle2 size={16} color={colors.primary} />
            <View style={styles.factorTextCol}>
              <Text style={styles.factorLabel}>Low Step Count</Text>
              <Text style={styles.factorSub}>Today: 1,420 Steps (-75%)</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 3. AI Explanation Panel */}
      <View style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Info size={18} color={colors.primary} />
          <Text style={styles.insightTitle}>Why this result?</Text>
        </View>
        <Text style={styles.insightText}>
          Our AI detected a pattern of rising heart rate variability combined with significantly lower step counts and disrupted sleep cycles. These biometric trends, when analyzed alongside your regional weather data (current heatwave), strongly suggest mild dehydration and physical fatigue rather than infectious illness.
        </Text>
      </View>

      {/* 4. Action Recommendation Tray */}
      <Text style={styles.sectionTitle}>Recommended Actions</Text>
      <View style={styles.actionTray}>
        {/* Drink Water */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Action Logged', 'Logged 500ml water intake in your health records.')}
        >
          <View style={[styles.actionIconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <Droplets size={24} color="#0284C7" />
          </View>
          <Text style={styles.actionButtonText}>Drink Water</Text>
          <Text style={styles.actionSubText}>500ml target</Text>
        </TouchableOpacity>

        {/* Rest */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Action Logged', 'Rest period registered.')}
        >
          <View style={[styles.actionIconWrapper, { backgroundColor: '#F1F5F9' }]}>
            <Activity size={24} color="#64748B" />
          </View>
          <Text style={styles.actionButtonText}>Rest</Text>
          <Text style={styles.actionSubText}>Avoid strain</Text>
        </TouchableOpacity>

        {/* Consult */}
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Consultation Dispatch', 'Connecting you to a virtual practitioner via CareConnect tele-health...')}
        >
          <View style={[styles.actionIconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <Phone size={24} color={colors.primary} />
          </View>
          <Text style={styles.actionButtonText}>Consult Doctor</Text>
          <Text style={styles.actionSubText}>Schedule visit</Text>
        </TouchableOpacity>
      </View>

      {/* 5. Danger Call Box */}
      <View style={styles.dangerCallBox}>
        <View style={styles.dangerTextCol}>
          <Text style={styles.dangerTitle}>Condition Worsening?</Text>
          <Text style={styles.dangerDesc}>If you experience fainting, severe headache, or chest pain, seek immediate help.</Text>
        </View>
        <TouchableOpacity 
          style={styles.dangerBtn}
          onPress={() => Linking.openURL('tel:911')}
        >
          <Text style={styles.dangerBtnText}>CALL 911</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  riskHeaderCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    ...shadows.sm,
  },
  riskTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  riskTime: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  riskBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 6,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 16,
    ...shadows.sm,
  },
  gaugeCard: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#E2E8F0',
    marginBottom: 10,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  scoreLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  gaugeSubText: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 14,
  },
  factorsCard: {
    width: '48%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  factorItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  factorTextCol: {
    marginLeft: 8,
    flex: 1,
  },
  factorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  factorSub: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 20,
    ...shadows.sm,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
  insightText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  actionTray: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 12,
    width: '31%',
    alignItems: 'center',
    ...shadows.sm,
  },
  actionIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '750',
    color: '#0F172A',
    textAlign: 'center',
  },
  actionSubText: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 2,
    textAlign: 'center',
  },
  dangerCallBox: {
    backgroundColor: '#FFE4E6',
    borderWidth: 1,
    borderColor: '#FECDD3',
    borderRadius: radius.lg,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.sm,
  },
  dangerTextCol: {
    flex: 1,
    marginRight: 12,
  },
  dangerTitle: {
    fontSize: 15,
    fontWeight: '850',
    color: '#BE123C',
  },
  dangerDesc: {
    fontSize: 12,
    color: '#9F1239',
    marginTop: 2,
    lineHeight: 16,
  },
  dangerBtn: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  dangerBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
});
