import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useAlertStore, HealthAlert } from '../../store/alertStore';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { SectionHeader } from '../../components/SectionHeader';
import { AlertCard } from '../../components/AlertCard';
import { ShieldAlert, MapPin, Eye, AlertTriangle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function CommunityIntelligenceScreen() {
  const { alerts, dismissAlert } = useAlertStore();
  const [selectedAlert, setSelectedAlert] = useState<HealthAlert | null>(alerts[0]);

  // Define colors matching requirements
  const zoneColors = {
    green: { color: colors.success, bg: colors.successLight, label: 'Safe Zone' },
    yellow: { color: colors.warning, bg: colors.warningLight, label: 'Watch Zone' },
    orange: { color: '#EA580C', bg: '#FFF7ED', label: 'Elevated Zone' },
    red: { color: colors.danger, bg: colors.dangerLight, label: 'High Risk Zone' },
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Interactive Map Visual Simulator */}
      <SectionHeader title="Outbreak Hotspot Map" />
      <View style={styles.mapSimulator}>
        {/* We present a visually striking modern vector graphic layout representing coordinates, keeping layout clean */}
        <View style={styles.mapGridBackground}>
          {alerts.map((alert) => {
            const zColor = zoneColors[alert.zone];
            // Mock placement coordinates for layout simulation
            const offset = alert.id === 'a1' ? { top: '35%', left: '25%' } : alert.id === 'a2' ? { top: '65%', left: '55%' } : { top: '20%', left: '70%' };
            
            return (
              <TouchableOpacity
                key={alert.id}
                style={[
                  styles.mapNode,
                  {
                    top: offset.top,
                    left: offset.left,
                    backgroundColor: zColor.color,
                    shadowColor: zColor.color,
                  },
                ]}
                onPress={() => setSelectedAlert(alert)}
              >
                <MapPin color="#FFFFFF" size={16} />
              </TouchableOpacity>
            );
          })}
          <View style={styles.legendTray}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={styles.legendText}>Safe</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
              <Text style={styles.legendText}>Watch</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EA580C' }]} />
              <Text style={styles.legendText}>Elevated</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
              <Text style={styles.legendText}>High Risk</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Selected Node Details */}
      {selectedAlert && (
        <View style={styles.selectedDetailsCard}>
          <View style={styles.selectedDetailsHeader}>
            <Text style={styles.selectedDetailsTitle}>{selectedAlert.title}</Text>
            <View
              style={[
                styles.zoneBadge,
                { backgroundColor: zoneColors[selectedAlert.zone].bg, borderColor: zoneColors[selectedAlert.zone].color },
              ]}
            >
              <Text style={[styles.zoneBadgeText, { color: zoneColors[selectedAlert.zone].color }]}>
                {zoneColors[selectedAlert.zone].label}
              </Text>
            </View>
          </View>
          <Text style={styles.selectedDetailsDesc}>{selectedAlert.description}</Text>
          <View style={styles.selectedDetailsFooter}>
            <Eye size={16} color={colors.textSecondary} />
            <Text style={styles.selectedDetailsTime}>Updated {selectedAlert.date}</Text>
          </View>
        </View>
      )}

      {/* Neighboring Alerts List */}
      <SectionHeader title="Active Regional Alerts" />
      {alerts.length === 0 ? (
        <Text style={styles.emptyAlerts}>No regional active alerts recorded.</Text>
      ) : (
        alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            description={alert.description}
            type={alert.type}
            date={alert.date}
            icon={<ShieldAlert color={zoneColors[alert.zone].color} size={20} />}
            onPress={() => setSelectedAlert(alert)}
          />
        ))
      )}

      {/* Public Health Trends */}
      <SectionHeader title="Community Infection Trends" />
      <View style={styles.trendMetricCard}>
        <View style={styles.trendHeader}>
          <Text style={styles.trendTitle}>Influenza Spread Vector</Text>
          <Text style={[styles.trendDelta, { color: colors.danger }]}>+4.8% this week</Text>
        </View>
        <Text style={styles.trendSub}>
          Transmission rates are higher in low-ventilated common spaces. Social distance when inside public transit hubs.
        </Text>
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
  mapSimulator: {
    height: 240,
    backgroundColor: '#E2E8F0', // Slate 200 Map base
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: 16,
    ...shadows.md,
  },
  mapGridBackground: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  mapNode: {
    position: 'absolute',
    padding: 8,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...shadows.md,
  },
  legendTray: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: radius.sm,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  selectedDetailsCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginBottom: 20,
    ...shadows.md,
  },
  selectedDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDetailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  zoneBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  zoneBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  selectedDetailsDesc: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  selectedDetailsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedDetailsTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
  emptyAlerts: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 12,
  },
  trendMetricCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 8,
    ...shadows.sm,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  trendDelta: {
    fontSize: 14,
    fontWeight: '800',
  },
  trendSub: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
