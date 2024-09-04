import '@testing-library/react-native/extend-expect';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  let platform = {
    OS: 'ios',
  };
  const select = jest.fn().mockImplementation((obj) => {
    const value = obj[platform.OS];
    return !value ? obj.default : value;
  });
  platform.select = select;
  return platform;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native', () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});
