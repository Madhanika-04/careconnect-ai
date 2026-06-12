import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { Info, TrendingUp, AlertTriangle, Users, History, Activity } from 'lucide-react-native';

export default function HealthCenterScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* 1. Statistics Cards Row */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Reported Cases</Text>
          <View style={styles.kpiValueRow}>
            <Text style={styles.kpiValue}>1,284</Text>
            <View style={styles.badgeDanger}>
              <TrendingUp size={12} color="#DC2626" />
              <Text style={styles.badgeDangerText}>+12%</Text>
            </View>
          </View>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Notifications Sent</Text>
          <View style={styles.kpiValueRow}>
            <Text style={styles.kpiValue}>45.9k</Text>
            <Text style={styles.kpiSub}>Reach: 98%</Text>
          </View>
        </View>
      </View>

      <View style={styles.kpiGrid}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Active Sites</Text>
          <View style={styles.kpiValueRow}>
            <Text style={styles.kpiValue}>312</Text>
            <Text style={styles.kpiSub}>Stable</Text>
          </View>
        </View>

        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>Community Immunity</Text>
          <View style={styles.kpiValueRow}>
            <Text style={styles.kpiValue}>68.2%</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBarFill, { width: '68%' }]} />
            </View>
          </View>
        </View>
      </View>

      {/* 2. Anomaly chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Potential Disease Clusters</Text>
        <Text style={styles.cardSubTitle}>7 Days epidemiological anomaly tracking</Text>
        
        {/* Mock Vector Chart */}
        <View style={styles.chartIllustration}>
          <View style={[styles.bar, { height: 35 }]} />
          <View style={[styles.bar, { height: 48 }]} />
          <View style={[styles.bar, { height: 40 }]} />
          <View style={[styles.bar, { height: 75, backgroundColor: '#EF4444' }]}>
            <View style={styles.alertPoint} />
          </View>
          <View style={[styles.bar, { height: 55 }]} />
          <View style={[styles.bar, { height: 30 }]} />
          <View style={[styles.bar, { height: 25 }]} />
        </View>
        <View style={styles.chartLabels}>
          <Text style={styles.chartLabelText}>Mon</Text>
          <Text style={styles.chartLabelText}>Tue</Text>
          <Text style={styles.chartLabelText}>Wed</Text>
          <Text style={[styles.chartLabelText, { color: '#EF4444', fontWeight: '700' }]}>Thu</Text>
          <Text style={styles.chartLabelText}>Fri</Text>
          <Text style={styles.chartLabelText}>Sat</Text>
          <Text style={styles.chartLabelText}>Sun</Text>
        </View>
      </View>

      {/* 3. Transmission Dynamics */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Transmission Dynamics</Text>
        
        {/* R0 Factor */}
        <View style={styles.dynamicsRow}>
          <View style={styles.dynamicsLabelRow}>
            <Text style={styles.dynamicsName}>R0 Factor</Text>
            <Text style={styles.dynamicsVal}>1.24 (Accelerating)</Text>
          </View>
          <View style={styles.dynamicsProgress}>
            <View style={[styles.dynamicsFill, { width: '55%', backgroundColor: '#DC2626' }]} />
          </View>
        </View>

        {/* Mobility */}
        <View style={styles.dynamicsRow}>
          <View style={styles.dynamicsLabelRow}>
            <Text style={styles.dynamicsName}>Community Mobility</Text>
            <Text style={styles.dynamicsVal}>82%</Text>
          </View>
          <View style={styles.dynamicsProgress}>
            <View style={[styles.dynamicsFill, { width: '82%', backgroundColor: colors.primary }]} />
          </View>
        </View>

        {/* Symptoms search */}
        <View style={styles.dynamicsRow}>
          <View style={styles.dynamicsLabelRow}>
            <Text style={styles.dynamicsName}>Symptom Search Trends</Text>
            <Text style={styles.dynamicsVal}>+14%</Text>
          </View>
          <View style={styles.dynamicsProgress}>
            <View style={[styles.dynamicsFill, { width: '65%', backgroundColor: '#F59E0B' }]} />
          </View>
        </View>
      </View>

      {/* 4. Recent Alerts */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <History size={18} color="#64748B" />
          <Text style={[styles.cardTitle, { marginLeft: 8, marginBottom: 0 }]}>Recent Community Alerts</Text>
        </View>

        <View style={styles.alertItem}>
          <View style={styles.alertLeftBorder} />
          <View style={styles.alertBody}>
            <View style={styles.alertTitleRow}>
              <Text style={styles.alertHeading}>High Priority Alert</Text>
              <Text style={styles.alertTime}>2h ago</Text>
            </View>
            <Text style={styles.alertContent}>
              Influenza-like illness cluster detected in Sector 7 schools. Enhanced monitoring initiated.
            </Text>
          </View>
        </View>
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
  kpiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  kpiCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.md,
    padding: 14,
    width: '48%',
    ...shadows.sm,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  kpiValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  badgeDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeDangerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DC2626',
    marginLeft: 3,
  },
  kpiSub: {
    fontSize: 11,
    color: '#0F766E',
    fontWeight: '600',
  },
  progressContainer: {
    width: 50,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0F766E',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 16,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '750',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardSubTitle: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 16,
  },
  chartIllustration: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    paddingBottom: 4,
  },
  bar: {
    width: 16,
    backgroundColor: 'rgba(15, 118, 110, 0.25)',
    borderRadius: radius.xs,
    position: 'relative',
  },
  alertPoint: {
    position: 'absolute',
    top: -8,
    left: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 6,
  },
  chartLabelText: {
    fontSize: 10,
    color: '#64748B',
    width: 24,
    textAlign: 'center',
  },
  dynamicsRow: {
    marginVertical: 8,
  },
  dynamicsLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dynamicsName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  dynamicsVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  dynamicsProgress: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  dynamicsFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  alertLeftBorder: {
    width: 4,
    backgroundColor: '#EF4444',
  },
  alertBody: {
    padding: 12,
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 10,
    color: '#991B1B',
    fontWeight: '500',
  },
  alertHeading: {
    fontSize: 12,
    fontWeight: '700',
    color: '#991B1B',
  },
  alertContent: {
    fontSize: 12,
    color: '#7F1D1D',
    lineHeight: 16,
  },
});
