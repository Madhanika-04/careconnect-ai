import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

interface BackButtonProps {
  label?: string;
  onPress?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ label = 'Back', onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={handlePress} 
      style={styles.container}
    >
      <Text style={styles.arrow}>←</Text>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  arrow: {
    fontSize: 22,
    color: colors.primary,
    marginRight: spacing.xs,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});
