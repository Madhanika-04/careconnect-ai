import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

export type RiskLevel = 'safe' | 'watch' | 'elevated' | 'danger';

interface RiskBadgeProps {
  level: RiskLevel;
  label?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, label }) => {
  const getBadgeStyles = () => {
    switch (level) {
      case 'safe':
        return {
          bg: colors.successLight,
          border: colors.success,
          text: colors.success,
          defaultLabel: 'Safe Status',
        };
      case 'watch':
        return {
          bg: colors.warningLight,
          border: colors.warning,
          text: colors.warning,
          defaultLabel: 'Watch Level',
        };
      case 'elevated':
        return {
          bg: '#FFF7ED', // Light Orange
          border: '#EA580C', // Orange
          text: '#EA580C',
          defaultLabel: 'Elevated Risk',
        };
      case 'danger':
        return {
          bg: colors.dangerLight,
          border: colors.danger,
          text: colors.danger,
          defaultLabel: 'High Risk Alert',
        };
    }
  };

  const badgeConfig = getBadgeStyles();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeConfig.bg,
          borderColor: badgeConfig.border,
        },
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: badgeConfig.text,
          },
        ]}
      />
      <Text style={[styles.text, { color: badgeConfig.text }]}>
        {label || badgeConfig.defaultLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1.5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
