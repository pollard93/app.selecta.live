import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';

interface StreamUrlProps {
  data: STREAM_SELF_FRAGMENT;
}

const StreamUrl = (props: StreamUrlProps) => {
  const [showingKey, setShowingKey] = useState(false);

  return (
    <View style={{ width: '100%' }}>
      <Text>Url:</Text>
      <Text>{props.data.streamUrl}</Text>

      <Text>Key:</Text>
      <TextInput
        editable={false}
        secureTextEntry={!showingKey}
        value={props.data.streamKey}
      />

      <Button
        title={showingKey ? 'hide key' : 'show key'}
        onPress={() => setShowingKey(!showingKey)}
      />
    </View>
  );
};

export default StreamUrl;
