import React from 'react';
import { View, Text } from 'react-native';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';

interface StreamSelfProps {
  id: string;
}

const StreamSelf = (props: StreamSelfProps) => {
  const queryResult = useGetStreamSelfQuery({
    variables: {
      id: props.id,
    },
  });

  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }

  return (
    <View>
      <Text>{queryResult.data.getStreamSelf.name}</Text>
    </View>
  );
};

export default StreamSelf;
