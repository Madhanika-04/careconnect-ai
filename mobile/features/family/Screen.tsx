import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { radius } from '../../theme/radius';
import { shadows } from '../../theme/shadows';
import { User, Heart, Activity, Moon, Footprints, Sparkles, ChevronRight, Phone } from 'lucide-react-native';

const FAMILY_DATA = [
  {
    id: 'dad',
    name: 'Robert Carter (Dad)',
    relation: 'Father • Age 72',
    riskLevel: 'Watch',
    riskColor: '#D97706',
    riskBg: '#FEF3C7',
    heartRate: '68 bpm',
    heartRateTrend: '-4 bpm from yesterday (Normal)',
    steps: '2,100 / 5,000',
    sleep: '5h 30m',
    sleepStatus: 'Disrupted',
  },
  {
    id: 'mom',
    name: 'Sarah Carter (Mom)',
    relation: 'Mother • Age 68',
    riskLevel: 'Low',
    riskColor: '#059669',
    riskBg: '#D1FAE5',
    heartRate: '72 bpm',
    heartRateTrend: 'Stable',
    steps: '6,200 / 6,000',
    sleep: '7h 45m',
    sleepStatus: 'Optimal',
  },
  {
    id: 'son',
    name: 'Jimmy Carter (Son)',
    relation: 'Son • Age 12',
    riskLevel: 'Low',
    riskColor: '#059669',
    riskBg: '#D1FAE5',
    heartRate: '64 bpm',
    heartRateTrend: 'Stable',
    steps: '9,400 / 10,000',
    sleep: '8h 15m',
    sleepStatus: 'Excellent',
  }
];

export default function FamilyScreen() {
  const handleCall = (name: string) => {
    Alert.alert('Calling Contact', `Initiating cellular voice call to ${name}...`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* 1. Care Insight Banner */}
      <View style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Sparkles color="#0F766E" size={20} />
          <Text style={styles.insightTitle}>AI Family Care Insight</Text>
        </View>
        <Text style={styles.insightBody}>
          Dad's sleep quality dropped 20% compared to his 14-day baseline. Suggest checking in on his morning hydration levels.
        </Text>
      </View>

      {/* 2. Family Members List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Family Vitals Overview</Text>
      </View>

      {FAMILY_DATA.map((member) => (
        <View key={member.id} style={styles.memberCard}>
          {/* Card Top */}
          <View style={styles.cardTop}>
            <View style={styles.avatarCol}>
              <View style={styles.avatarWrapper}>
                <User size={24} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRelation}>{member.relation}</Text>
              </View>
            </View>
            <View style={[styles.riskBadge, { backgroundColor: member.riskBg }]}>
              <Text style={[styles.riskText, { color: member.riskColor }]}>{member.riskLevel} Risk</Text>
            </View>
          </View>

          {/* Vitals Grid */}
          <View style={styles.vitalsGrid}>
            {/* Heart Rate */}
            <View style={styles.vitalBox}>
              <View style={styles.vitalLabelRow}>
                <Heart size={16} color={colors.danger} />
                <Text style={styles.vitalLabel}>HEART RATE</Text>
              </View>
              <Text style={styles.vitalValue}>{member.heartRate}</Text>
              <Text style={styles.vitalTrend}>{member.heartRateTrend}</Text>
            </View>

            {/* Steps */}
            <View style={styles.vitalBox}>
              <View style={styles.vitalLabelRow}>
                <Footprints size={16} color={colors.primary} />
                <Text style={styles.vitalLabel}>STEPS</Text>
              </View>
              <Text style={styles.vitalValue}>{member.steps}</Text>
            </View>

            {/* Sleep */}
            <View style={styles.vitalBox}>
              <View style={styles.vitalLabelRow}>
                <Moon size={16} color={colors.accent} />
                <Text style={styles.vitalLabel}>SLEEP</Text>
              </View>
              <Text style={styles.vitalValue}>{member.sleep}</Text>
              <Text style={styles.vitalTrend}>Status: {member.sleepStatus}</Text>
            </View>
          </View>

          {/* Card Footer Actions */}
          <View style={styles.cardActions}>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => handleCall(member.name)}
            >
              <Phone size={16} color={colors.primary} />
              <Text style={styles.actionBtnText}>Call Member</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.primaryActionBtn]}
              onPress={() => Alert.alert('Clinical Analysis', `Loading detailed SHAP factors for ${member.name}...`)}
            >
              <Text style={styles.primaryActionText}>Full Vitals Details</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  insightCard: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1.5,
    borderColor: '#5EEAD4',
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
    fontSize: 15,
    fontWeight: '700',
    color: '#0F766E',
    marginLeft: 8,
  },
  insightBody: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 16,
    ...shadows.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F4EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: '#0F766E',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  memberRelation: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  riskText: {
    fontSize: 11,
    fontWeight: '700',
  },
  vitalsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    paddingVertical: 12,
    marginBottom: 12,
  },
  vitalBox: {
    flex: 1,
    paddingHorizontal: 4,
  },
  vitalLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  vitalLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  vitalTrend: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 12,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 6,
  },
  primaryActionBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  primaryActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 4,
  },
});
