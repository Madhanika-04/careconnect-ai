import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';
import { shadows } from '../theme/shadows';

export type AlertType = 'info' | 'warning' | 'danger' | 'success';

interface AlertCardProps {
  title: string;
  description: string;
  type: AlertType;
  date?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  type,
  date,
  onPress,
  icon,
}) => {
  const getTheme = () => {
    switch (type) {
      case 'info':
        return {
          bg: colors.primaryLight,
          border: colors.secondary,
          titleColor: colors.primary,
          iconBg: 'rgba(20, 184, 166, 0.15)',
        };
      case 'warning':
        return {
          bg: colors.warningLight,
          border: colors.warning,
          titleColor: '#B45309', // Darker Amber
          iconBg: 'rgba(245, 158, 11, 0.15)',
        };
      case 'danger':
        return {
          bg: colors.dangerLight,
          border: colors.danger,
          titleColor: colors.danger,
          iconBg: 'rgba(220, 38, 38, 0.15)',
        };
      case 'success':
        return {
          bg: colors.successLight,
          border: colors.success,
          titleColor: colors.success,
          iconBg: 'rgba(16, 185, 129, 0.15)',
        };
    }
  };

  const alertTheme = getTheme();

  return (
    <TouchableOpacity activeOpacity={onPress ? 0.85 : 1} onPress={onPress}>
      <Card
        style={[
          styles.card,
          {
            backgroundColor: alertTheme.bg,
            borderColor: alertTheme.border,
          },
        ]}
      >
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleWrapper}>
              {icon && (
                <View style={[styles.iconWrapper, { backgroundColor: alertTheme.iconBg }]}>
                  {icon}
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: alertTheme.titleColor }]}>
                  {title}
                </Text>
                {date && <Text style={styles.date}>{date}</Text>}
              </View>
            </View>
          </View>

          <Text style={styles.description}>{description}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    marginVertical: 8,
    ...shadows.sm,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: radius.sm,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  date: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
