import React, { useRef } from 'react';
import { StyleSheet, Pressable, Text, Animated, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius } from '../theme/radius';

interface SOSButtonProps {
  onPress: () => void;
  size?: number;
}

export const SOSButton: React.FC<SOSButtonProps> = ({ onPress, size = 160 }) => {
  const holdAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    // Start circular fill animation
    Animated.timing(holdAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Scale down slightly on press
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Trigger action after 3 seconds
    timeoutRef.current = setTimeout(() => {
      onPress();
      handlePressOut();
    }, 3000);
  };

  const handlePressOut = () => {
    // Clear timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Reset hold indicator
    Animated.timing(holdAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    // Scale back to normal
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate width of progress indicator
  const progressWidth = holdAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.buttonWrapper,
          {
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
          }
        ]}
      >
        <Animated.View
          style={[
            styles.button,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.text}>SOS</Text>
          <Text style={styles.subText}>HOLD 3S</Text>
          
          {/* Circular progress simulated by bottom bar fill inside button */}
          <Animated.View 
            style={[
              styles.progressBar,
              {
                width: progressWidth,
              }
            ]} 
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(186, 26, 26, 0.2)',
  },
  button: {
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  text: {
    color: colors.card,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 8,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
  },
});
