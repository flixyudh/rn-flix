import React from 'react';

import AutoImage from '@rn-flix/auto-image';
import { Text, View } from 'react-native';

export default function App() {
  const [source, setSource] = React.useState('https://picsum.photos/400/200');
  return (
    <View style={{ flex: 1 }}>
      <Text>{source}</Text>
      <AutoImage source={source} width={200} />
    </View>
  );
}
