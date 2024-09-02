import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

let handleTimeout;

/**
 * @typedef {object} SnackbarData
 * @prop {string} message - The message to be displayed in the snackbar.
 * @prop {import('react-native').TextProps} [textStyle] - custom style for message text (optional).
 * @prop {string} [label] - The label for the action button (optional).
 * @prop {import('react-native').TextProps} [labelStyle] - custom style for label button text (optional).
 * @prop {function} [onPress] - The callback function for the action button (optional).
 * @prop {number} [duration] - The duration in milliseconds for which the snackbar should be visible (default: 2000).
 * @prop {string} [backgroundColor] - The background color of the snackbar (default: '#424940').
 * @prop {string} [color] - The text color of the snackbar (default: '#dee5d8').
 * @prop {string} id - The unique identifier for the snackbar.
 * @prop {function} hide - The function to hide the snackbar.
 */

/**
 * @file Snackbar.js
 * @brief This is a React Native component used for displaying snackbars.
 *
 * @param {SnackbarData} Props
 *
 * @returns {JSX.Element} The snackbar component.
 */
const Snackbar = ({
  message,
  textStyle = {},
  label,
  labelStyle = {},
  onPress,
  duration = 2000,
  backgroundColor = '#424940',
  color = '#dee5d8',
  id,
  hide,
  ...props
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

  const runAnimated = (toValue) => {
    return Animated.timing(animation, {
      toValue,
      useNativeDriver: true,
      duration: 400,
    });
  };

  useEffect(() => {
    if (handleTimeout) clearTimeout(handleTimeout);
    runAnimated(1).start();
    if (handleDuration !== 0)
      handleTimeout = setTimeout(onHide, handleDuration);
  }, [handleDuration]);

  const onHide = (cb) => {
    runAnimated(0).start(() => {
      cb?.();
      hide();
    });
    clearTimeout(handleTimeout);
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
        styleAnimation,
      ]}
    >
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
  SnackbarText: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: { padding: 8, justifyContent: 'center' },
});

export default Snackbar;
