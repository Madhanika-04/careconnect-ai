import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { useHealthStore } from '../../store/healthStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { SectionHeader } from '../../components/SectionHeader';
import { HealthCard } from '../../components/HealthCard';
import { MetricCard } from '../../components/MetricCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Heart, Moon, Footprints, RefreshCw, CheckCircle2, TrendingUp } from 'lucide-react-native';

export default function HealthMonitoringScreen() {
  const {
    heartRate,
    steps,
    sleep,
    healthConnectSynced,
    lastSyncTime,
    triggerSync,
    historicalHeartRate,
    historicalSteps,
  } = useHealthStore();

  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await triggerSync();
    setSyncing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={syncing} onRefresh={handleSync} colors={[colors.primary]} />
      }
    >
      {/* Health Connect Integration Status Panel */}
      <View style={styles.syncPanel}>
        <View style={styles.syncLeft}>
          <CheckCircle2 color={colors.success} size={24} />
          <View style={styles.syncTextCol}>
            <Text style={styles.syncTitle}>Android Health Connect</Text>
            <Text style={styles.syncSub}>Last Sync: {lastSyncTime}</Text>
          </View>
        </View>
        <PrimaryButton
          title="Sync Now"
          mode="outlined"
          loading={syncing}
          onPress={handleSync}
          color={colors.primary}
        />
      </View>

      <SectionHeader title="Current Vitals" />

      {/* Main Metrics list */}
      <MetricCard
        title="Resting Heart Rate"
        value={heartRate.value}
        unit={heartRate.unit}
        icon={<Heart color={colors.danger} size={24} />}
        subtitle={`Vitals status: ${heartRate.status.toUpperCase()}`}
        trend={{ value: 'Within healthy bounds', direction: 'neutral' }}
      />

      <MetricCard
        title="Physical Activity"
        value={steps.value}
        unit={steps.unit}
        icon={<Footprints color={colors.primary} size={24} />}
        subtitle={`Active goal: ${steps.goal} steps`}
        trend={{ value: `${steps.goal - steps.value} remaining`, direction: 'down' }}
      />

      <MetricCard
        title="Sleep Tracking"
        value={sleep.value}
        unit={sleep.unit}
        icon={<Moon color={colors.accent} size={24} />}
        subtitle="Sufficient restorative sleep cycle"
        trend={{ value: 'Stable', direction: 'neutral' }}
      />

      {/* Historical Trend Graphs / Lists */}
      <SectionHeader title="Clinical Vitals Trends" />

      <HealthCard
        title="Heart Rate History"
        subtitle="Diurnal heart rate changes (BPM)"
        icon={<TrendingUp color={colors.primary} size={22} />}
      >
        <View style={styles.historyList}>
          {historicalHeartRate.map((hr, index) => (
            <View key={index} style={styles.historyRow}>
              <Text style={styles.historyTime}>{hr.time}</Text>
              <View style={styles.historyLineWrapper}>
                <View style={[styles.historyBar, { width: hr.value * 1.5 }]} />
              </View>
              <Text style={styles.historyVal}>{hr.value} BPM</Text>
            </View>
          ))}
        </View>
      </HealthCard>

      <HealthCard
        title="Daily Step History"
        subtitle="Aggregated daily target monitoring"
        icon={<Footprints color={colors.primary} size={22} />}
      >
        <View style={styles.historyList}>
          {historicalSteps.map((s, index) => (
            <View key={index} style={styles.historyRow}>
              <Text style={styles.historyTime}>{s.date}</Text>
              <View style={styles.historyLineWrapper}>
                <View
                  style={[
                    styles.historyBar,
                    {
                      width: (s.value / 8000) * 150,
                      backgroundColor: s.value >= 7000 ? colors.success : colors.warning,
                    },
                  ]}
                />
              </View>
              <Text style={styles.historyVal}>{s.value}</Text>
            </View>
          ))}
        </View>
      </HealthCard>
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
  syncPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    ...shadows.sm,
  },
  syncLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  syncTextCol: {
    marginLeft: 12,
  },
  syncTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  syncSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  historyList: {
    marginTop: 8,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  historyTime: {
    width: 50,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  historyLineWrapper: {
    flex: 1,
    height: 12,
    backgroundColor: colors.background,
    borderRadius: radius.full,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  historyBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  historyVal: {
    width: 65,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    color: colors.text,
  },
});
