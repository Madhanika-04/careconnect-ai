import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../theme/colors';

interface SectionHeaderProps {
  title: string;
  onPressAction?: () => void;
  actionTitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onPressAction,
  actionTitle = 'See All',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onPressAction && (
        <Button
          mode="text"
          onPress={onPressAction}
          compact
          labelStyle={styles.actionLabel}
        >
          {actionTitle}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});
