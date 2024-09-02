//ts-check
import React, { createContext, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import InternalUseSnackbar from './InternalUseSnackbar';
import Snackbar from './Snackbar';

/**
 * @typedef {object} OptionsType
 * @prop {string} label - button text of snackbar
 * @prop {function} onPress - function to pass when snackbar button pressed
 * @prop {number} [duration=2000] - duration of showing snackbar before hide
 * @prop {string} backgroundColor - Snackbar background color container view
 * @prop {string} color - Snackbar color text
 * @prop {import('react-native').TextProps} [labelStyle] - custom style for label button text (optional).
 * @prop {import('react-native').TextProps} [textStyle] - custom style for message text (optional).
 */

/**
 * @callback show
 * @param {String} message
 * @param {OptionsType} options
 */

export const SnackbarContext = createContext({
  /**
   * A function to display a snackbar.
   *
   * @param {String} message
   * @param {OptionsType} options
   */
  show: (message, options) => null,
  /**
   * A function to hide a snackbar.
   *
   * @returns {void}
   */
  hide: () => null,
});

/**
 * @file SnackbarProvider.js
 * @brief This component is used as a provider for the SnackbarContext.
 *
 * @typedef SnackbarProviderProps
 * @type {Object}
 * @prop {React.FC} children - The children components.
 * @prop {import('react-native').ViewProps} style - The style object for the component.
 *
 * @param {SnackbarProviderProps} props
 * @returns {JSX.Element} The SnackbarProvider component.
 */
export default ({ children, style }) => {
  const { SnackbarData, show, hide } = InternalUseSnackbar();
  const contextValue = useMemo(() => ({ show, hide }), [show]);
  const behavior = useMemo(
    () => (Platform.OS === 'ios' ? 'position' : undefined),
    [Platform]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <KeyboardAvoidingView
        behavior={behavior}
        style={[styles.containerView, style]}
        pointerEvents="box-none"
      >
        {SnackbarData && <Snackbar key={SnackbarData?.id} {...SnackbarData} />}
      </KeyboardAvoidingView>
    </SnackbarContext.Provider>
  );
};

const styles = StyleSheet.create({
  containerView: {
    position: 'absolute',
    bottom: 20,
    zIndex: 999,
    left: 8,
    right: 8,
    // justifyContent: 'flex-end',
  },
});
