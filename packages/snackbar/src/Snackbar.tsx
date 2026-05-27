import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

let handleTimeout: NodeJS.Timeout;

export interface SnackbarData {
  /** The message to be displayed in the snackbar. */
  message: string;
  /** custom style for message text (optional). */
  textStyle?: TextStyle;
  /** The label for the action button (optional). */
  label?: string;
  /** custom style for label button text (optional). */
  labelStyle?: TextStyle;
  /** The callback function for the action button (optional). */
  onPress?: () => void;
  /** The duration in milliseconds for which the snackbar should be visible (default: 2000). */
  duration?: number;
  /** The background color of the snackbar (default: '#424940'). */
  backgroundColor?: string;
  /** The text color of the snackbar (default: '#dee5d8'). */
  color?: string;
  /** The unique identifier for the snackbar. */
  id: string;
  /** The function to hide the snackbar. */
  hide: () => void;
  /** Custom element to display on the left of the message (optional) */
  icon?: React.ReactNode
  /** Custom style for the container (optional) */
  containerStyle?: ViewStyle
}

/**
 * @file Snackbar.tsx
 * @brief This is a React Native component used for displaying snackbars.
 *
 * @param {SnackbarData} props
 *
 * @returns {JSX.Element} The snackbar component.
 */
const Snackbar: React.FC<SnackbarData> = ({
  message,
  textStyle = {},
  label,
  labelStyle = {},
  onPress,
  duration = 2000,
  backgroundColor = '#424940',
  color = '#dee5d8',
  icon,
  id,
  hide,
  containerStyle
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  const handleDuration = label ? 7000 : duration;

  const styleAnimation = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const runAnimated = (toValue: number) => {
    return Animated.timing(animation, {
      toValue,
      useNativeDriver: true,
      duration: 400,
    });
  };

  useEffect(() => {
    if (handleTimeout) clearTimeout(handleTimeout);
    runAnimated(1).start();
    if (handleDuration !== 0) {
      handleTimeout = setTimeout(onHide, handleDuration);
    }
    return () => {
      if (handleTimeout) clearTimeout(handleTimeout);
    };
  }, [handleDuration]);

  const onHide = (cb?: () => void) => {
    runAnimated(0).start(() => {
      cb?.();
      hide();
    });
    if (handleTimeout) clearTimeout(handleTimeout);
  };

  return (
    <Animated.View
      key={id}
      style={[
        {
          backgroundColor,
          flexDirection: label ? 'row' : 'column',
          borderRadius: 4,
        },
        containerStyle,
        styleAnimation as any,
      ]}
    >
      <View style={styles.messageContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text
          style={[
            styles.SnackbarText,
            {
              color,
              paddingRight: label ? 0 : 16,
            },
            textStyle,
          ]}
        >
          {message}
        </Text>
      </View>
      {label && (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onHide(onPress)}
        >
          <Text style={[{ color, fontWeight: '500' }, labelStyle]}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    paddingLeft: 16,
  },
  SnackbarText: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: { padding: 8, justifyContent: 'center' },
});

export default Snackbar;
