import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { Map, MapPin, Sparkles, AlertTriangle, ShieldCheck, Activity } from 'lucide-react-native';

export default function CommunityScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* 1. Custom Vector Map View Mock */}
      <View style={styles.mapContainer}>
        {/* Simple grid lines and blobs simulation for offline vector layout */}
        <View style={styles.mapBackgroundMock}>
          <View style={styles.gridLineH} />
          <View style={[styles.gridLineH, { top: '50%' }]} />
          <View style={styles.gridLineV} />
          <View style={[styles.gridLineV, { left: '50%' }]} />
          
          {/* Blobs */}
          <View style={[styles.heatmapBlob, styles.redBlob, { top: '30%', left: '40%' }]} />
          <View style={[styles.heatmapBlob, styles.yellowBlob, { top: '60%', left: '70%' }]} />
          <View style={[styles.heatmapBlob, styles.greenBlob, { top: '70%', left: '20%' }]} />
        </View>

        {/* Legend */}
        <View style={styles.legendPanel}>
          <Text style={styles.legendTitle}>Surveillance Legend</Text>
          <View style={styles.legendRow}>
            <View style={[styles.legendIndicator, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>Safe Zone</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendIndicator, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Watch (Low Deviation)</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendIndicator, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>High Outbreak Cluster</Text>
          </View>
        </View>

        {/* Map Center Marker */}
        <TouchableOpacity 
          style={styles.hotspotMarker}
          onPress={() => Alert.alert('Cluster Info', 'Active cluster: 12 influenza-like symptoms reported in Sector 4 school zone.')}
        >
          <View style={styles.pulseRing} />
          <View style={styles.markerContent}>
            <MapPin size={16} color="#DC2626" />
            <Text style={styles.markerText}>Flu Cluster (12 Cases)</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 2. Forecast Section */}
      <View style={styles.forecastCard}>
        <View style={styles.forecastHeader}>
          <Sparkles size={18} color="#0F766E" />
          <Text style={styles.forecastTitle}>AI Outbreaks Forecast</Text>
        </View>
        <Text style={styles.forecastBody}>
          An increase in respiratory symptoms has been detected within a 2-mile radius. We recommend wearing a mask in crowded indoor spaces for the next 48 hours.
        </Text>
      </View>

      {/* 3. Outbreak Distributions */}
      <Text style={styles.sectionTitle}>Epidemiological Outbreak Proportions</Text>
      <View style={styles.distributionCard}>
        {/* Influenza */}
        <View style={styles.distRow}>
          <View style={styles.distLabelRow}>
            <Text style={styles.distName}>Influenza A</Text>
            <Text style={[styles.distStatus, { color: '#DC2626' }]}>High Deviation</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '85%', backgroundColor: '#DC2626' }]} />
          </View>
        </View>

        {/* Dengue */}
        <View style={styles.distRow}>
          <View style={styles.distLabelRow}>
            <Text style={styles.distName}>Dengue Fever</Text>
            <Text style={[styles.distStatus, { color: '#F59E0B' }]}>Watch</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '45%', backgroundColor: '#F59E0B' }]} />
          </View>
        </View>

        {/* Covid-19 */}
        <View style={styles.distRow}>
          <View style={styles.distLabelRow}>
            <Text style={styles.distName}>COVID-19 Omicron</Text>
            <Text style={[styles.distStatus, { color: '#10B981' }]}>Normal Bounds</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.barFill, { width: '15%', backgroundColor: '#10B981' }]} />
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
  mapContainer: {
    height: 300,
    backgroundColor: '#0F172A',
    borderRadius: radius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    ...shadows.md,
  },
  mapBackgroundMock: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#FFFFFF',
    top: '30%',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#FFFFFF',
    left: '30%',
  },
  heatmapBlob: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.4,
  },
  redBlob: {
    backgroundColor: '#EF4444',
  },
  yellowBlob: {
    backgroundColor: '#F59E0B',
  },
  greenBlob: {
    backgroundColor: '#10B981',
  },
  legendPanel: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: radius.md,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: 150,
  },
  legendTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '600',
  },
  hotspotMarker: {
    position: 'absolute',
    bottom: '30%',
    right: '15%',
    alignItems: 'center',
  },
  pulseRing: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(239, 68, 68, 0.4)',
    position: 'absolute',
  },
  markerContent: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  markerText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#DC2626',
    marginLeft: 4,
  },
  forecastCard: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#5EEAD4',
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 20,
    ...shadows.sm,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  forecastTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F766E',
    marginLeft: 8,
  },
  forecastBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  distributionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 16,
    ...shadows.sm,
  },
  distRow: {
    marginVertical: 8,
  },
  distLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  distName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  distStatus: {
    fontSize: 10,
    fontWeight: '700',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radius.full,
  },
});
