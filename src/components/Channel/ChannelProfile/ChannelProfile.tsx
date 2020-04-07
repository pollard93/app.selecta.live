import React from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useGetChannelProfileQuery } from '../../../API/query/getChannelProfile/getChannelProfile';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';

interface ChannelProfileProps {
  id: string;
}

const ChannelProfile = (props: ChannelProfileProps) => {
  /**
   * Query
   */
  const queryResult = useGetChannelProfileQuery({
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


  const { data: { getChannelProfile } } = queryResult;
  return (
    <View>
      <Text>{getChannelProfile.name}</Text>
      <AsyncImage
        splashUrl={getChannelProfile.profileImage?.url?.splash}
        fullUrl={getChannelProfile.profileImage?.url?.full}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icon.jpg')}
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

export default ChannelProfile;
