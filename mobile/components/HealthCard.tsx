import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';
import { shadows } from '../theme/shadows';

interface HealthCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onPressAction?: () => void;
  actionTitle?: string;
  borderColor?: string;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  title,
  subtitle,
  icon,
  children,
  onPressAction,
  actionTitle,
  borderColor = colors.border,
}) => {
  return (
    <Card style={[styles.card, { borderColor }]}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            {icon && <View style={styles.iconWrapper}>{icon}</View>}
            <View>
              <Text style={styles.title}>{title}</Text>
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          </View>
        </View>

        <View style={styles.body}>{children}</View>

        {onPressAction && actionTitle && (
          <Button
            mode="text"
            onPress={onPressAction}
            style={styles.actionButton}
            labelStyle={styles.actionLabel}
          >
            {actionTitle}
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginVertical: 8,
    borderWidth: 1,
    ...shadows.md,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  body: {
    marginVertical: 4,
  },
  actionButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },
});
