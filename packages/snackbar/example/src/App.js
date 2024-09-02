import * as React from 'react';

import { SnackbarProvider } from 'react-native-flix-snackbar';
import SnackbarExample from './SnackbarExample';

export default function App() {
  return (
    <SnackbarProvider>
      <SnackbarExample />
    </SnackbarProvider>
  );
}
