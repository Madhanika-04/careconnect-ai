import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  mode?: 'contained' | 'outlined' | 'text';
  color?: string;
  textColor?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  title,
  loading = false,
  disabled = false,
  icon,
  mode = 'contained',
  color = colors.primary,
  textColor,
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      disabled={disabled || loading}
      icon={icon}
      loading={loading}
      style={[
        styles.button,
        mode === 'contained' && { backgroundColor: color },
        mode === 'outlined' && { borderColor: color, borderWidth: 1.5 },
      ]}
      labelStyle={[
        styles.label,
        mode === 'contained' && { color: textColor || colors.card },
        mode === 'outlined' && { color: textColor || color },
        mode === 'text' && { color: textColor || color },
      ]}
      contentStyle={styles.content}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    marginVertical: 8,
    width: '100%',
  },
  content: {
    height: 56, // Large touch targets for elderly accessibility
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
