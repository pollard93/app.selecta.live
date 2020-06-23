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

  const { data: { getStreamSelf } } = queryResult;
  return (
    <View>
      <Text>{getStreamSelf.name}</Text>
    </View>
  );
};

export default StreamSelf;
