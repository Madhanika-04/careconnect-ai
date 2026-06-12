import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

interface RiskInfo {
  name: string;
  score: number; // 0-1
  reasons: string[];
}

interface Props {
  risk: RiskInfo;
}

export const RiskCard: React.FC<Props> = ({ risk }) => {
  const size = 120;
  const strokeWidth = 12;
  const radiusCircle = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radiusCircle;
  const progress = Math.min(Math.max(risk.score, 0), 1);
  const strokeDashoffset = circumference * (1 - progress);

  const riskColor = progress > 0.7 ? colors.danger : progress > 0.4 ? colors.warning : colors.success;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" originX={size / 2} originY={size / 2}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radiusCircle}
            stroke={colors.border}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radiusCircle}
            stroke={riskColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      <View style={styles.textOverlay}>
        <Text style={styles.riskLabel}>{risk.name}</Text>
        <Text style={styles.riskScore}>{Math.round(risk.score * 100)}%</Text>
      </View>
      <View style={styles.reasonsContainer}>
        {risk.reasons.map((r, i) => (
          <Text key={i} style={styles.reason}>✓ {r}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textOverlay: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  riskScore: {
    fontSize: 22,
    color: colors.text,
    fontWeight: '700',
  },
  reasonsContainer: {
    marginTop: 12,
    alignSelf: 'stretch',
  },
  reason: {
    fontSize: 13,
    color: colors.text,
    marginVertical: 2,
  },
});
