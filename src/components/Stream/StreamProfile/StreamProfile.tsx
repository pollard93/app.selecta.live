import React from 'react';
import { View, Text } from 'react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import { useGetStreamProfileQuery } from '../../../API/query/getStreamProfile/getStreamProfile';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';

interface StreamProfileProps {
  id: string;
}

const StreamProfile = (props: StreamProfileProps) => {
  /**
   * Query
   */
  const queryResult = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
  });


  /**
   * Load | Retry
   */
  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }


  const { data: { getStreamProfile } } = queryResult;
  return (
    <View>
      <Text>{getStreamProfile.name}</Text>
      <AsyncImage
        splashUrl={getStreamProfile.image?.url?.splash}
        fullUrl={getStreamProfile.image?.url?.full}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icons/icon.jpg')}
        containerProps={{
          style: {
            width: 100,
            height: 100,
          },
        }}
      />
    </View>
  );
};

export default StreamProfile;
