# Features ✨

- Pure JS. No Native code required
- Zero-dependencies
- Easy-to-use
- Context API without child re-rendering (based on [wdyr](https://github.com/welldone-software/why-did-you-render))

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [SnackbarProvider](#snackbarprovider)
- [useSnackbar](#usesnackbar)
  - [show method](#show-method)
  - [hide method](#hide-method)

## Installation

```bash
npm install react-native-flix-snackbar
# or
yarn add react-native-flix-snackbar
```

## Usage

Wrap your root component in `SnackbarProvider` from `react-native-flix-snackbar`. This will usually be in the `index.js` or `App.js` file. If you have an Expo project, you can do this inside the exported component in the `App.js` file.

Example:

```js
import { SnackbarProvider } from 'react-native-flix-snackbar';

export default function App() {
  return (
    <SnackbarProvider>
      <MainApp />
    </SnackbarProvider>
  );
}
```

> After wrapping `SnackbarProvider` in root component, you can show snackbar in all of it's children components using [`useSnackbar`](#usesnackbar) hooks without declaring `ref` and import JSX in every component.

`useSnackbar` Example:

```js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSnackbar } from 'react-native-flix-snackbar';

export default MainApp = (props) => {
  const { show } = useSnackbar();

  return (
    <View style={{ flex: 1 }}>
      // showing snackbar
      <TouchableOpacity onPress={() => show('Hi snackbar!')}>
        <Text>Open Snackbar</Text>
      </TouchableOpacity>
      ;
    </View>
  );
};
```

## Example

```js
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SnackbarProvider, useSnackbar } from 'react-native-flix-snackbar';

const Example = (props) => {
  const { show } = useSnackbar();

  const listButton = [
    {
      title: 'Snackbar Simple',
      onPress: () => show('Simple Snackbar'),
    },
    {
      title: 'Snackbar Success',
      style: { backgroundColor: '#94f99080' },
      onPress: () => show('Item added to cart', { backgroundColor: '#006e1c' }),
    },
    {
      title: 'Snackbar Error',
      style: { backgroundColor: '#ba1a1a80' },
      onPress: () =>
        show('Failed add item to cart', { backgroundColor: '#ba1a1a' }),
    },
    {
      title: 'Snackbar with action',
      onPress: () =>
        show('Failed add item to cart', {
          backgroundColor: '#ba1a1a',
          label: 'Try Again',
          onPress: () =>
            show('Item added to cart', { backgroundColor: '#006e1c' }),
        }),
    },
  ];

  return (
    <View
      style={{ flex: 1, backgroundColor: '#fff', padding: 24, borderRadius: 4 }}
    >
      <Text style={{ textAlign: 'center', fontSize: 36, marginBottom: 24 }}>
        Press Us
      </Text>
      {listButton.map((x, i) => (
        <TouchableOpacity
          onPress={x.onPress}
          key={x.title + i}
          style={[
            {
              marginBottom: 8,
              padding: 14,
              borderRadius: 4,
              backgroundColor: 'rgba(145, 159, 207, 0.2)',
            },
            x.style,
          ]}
        >
          <Text>{x.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function App() {
  return (
    <SnackbarProvider>
      <Example />
    </SnackbarProvider>
  );
}
```

## SnackbarProvider

```js
import { SnackbarProvider } from 'react-native-flix-snackbar';
```

The `<SnackbarProvider>` component makes [`useSnackbar`](#usesnackbar) hook available to any nested component that need to show snackbar.

> `<SnackbarProvider>` doesn't need any props to passed, so you can easily use it in root component like this:

```js
import { SnackbarProvider } from 'react-native-flix-snackbar';

export default function App() {
  return (
    <SnackbarProvider>
      <MainApp />
    </SnackbarProvider>
  );
}
```

## useSnackbar

```js
import { useSnackbar } from 'react-native-flix-snackbar';
```

`useSnackbar` is a hook to automatically handle Snackbar component either to show or hide, it return [`show`](#show-method) and [`hide`](#hide-method) function

### Example usage

```js
// other import
import { useSnackbar } from 'react-native-flix-snackbar';

export default MainApp = (props) => {
  const { show } = useSnackbar();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => show('Hi snackbar!')}>
        <Text>Open Snackbar</Text>
      </TouchableOpacity>
      ;
    </View>
  );
};
```

### show method

a method to show snackbar, it accept below prop as parameter

| Prop                    | Type                                                       | Required   | Description                                   |
| ----------------------- | ---------------------------------------------------------- | ---------- | --------------------------------------------- |
| message                 | string                                                     | `required` | The message to be displayed in the snackbar   |
| options                 | object                                                     |            | Additional options for the snackbar           |
| options.label           | string                                                     |            | The label for the snackbar action             |
| options.onPress         | function                                                   |            | The callback function for the snackbar action |
| options.duration        | number                                                     |            | The duration of the snackbar in milliseconds  |
| options.textStyle       | [TextProps](https://reactnative.dev/docs/text-style-props) |            | custom style for message text                 |
| options.labelStyle      | [TextProps](https://reactnative.dev/docs/text-style-props) |            | custom style for label button text            |
| options.color           | string                                                     |            | The color of the snackbar text                |
| options.backgroundColor | string                                                     |            | The background color of the snackbar          |

### hide method

a method to hide snackbar.
