import { useCallback, useState } from 'react';

/**
 * @file InternalUseSnackbar.js
 * This is a React component used for managing and displaying snackbars.
 */
const InternalUseSnackbar = () => {
  const [SnackbarData, setSnackbarList] = useState(null);

  const hide = useCallback(() => {
    setSnackbarList(null);
  }, []);

  const show = useCallback((message, options) => {
    const id = Date.now().toString(36);
    requestAnimationFrame(() => {
      setSnackbarList({ message, id, hide, ...options });
    });
  }, []);

  return {
    /** @type {import("./Snackbar").SnackbarData} */
    SnackbarData,
    /**
     * A function to display a snackbar.
     *
     * @param {String} message
     * @param {import('./SnackbarProvider').OptionsType} options
     */
    show,
    /**
     * A function to hide a snackbar.
     *
     * @returns {void}
     */
    hide,
  };
};

export default InternalUseSnackbar;
