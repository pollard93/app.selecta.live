import React from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';

const ChannelSelf = () => {
  /**
   * Get channel self query
   * Network only to get latest data
   */
  const queryResult = useGetChannelSelfQuery({
    fetchPolicy: 'network-only',
  });


  /**
   * Loading || error
   */
  if (queryResult.loading || queryResult.error) {
    return (
      <LoadRetry {...queryResult} />
    );
  }


  const { data: { getChannelSelf } } = queryResult;
  return (
    <View>
      <Text>{getChannelSelf.name}</Text>
      <Text>{getChannelSelf.description}</Text>

      <AsyncImage
        splashUrl={getChannelSelf.coverImage?.url?.splash}
        fullUrl={getChannelSelf.coverImage?.url?.full}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icons/icon.jpg')}
        containerProps={{
          style: {
            width: 100,
            height: 100,
          },
        }}
      />

      <AsyncImage
        splashUrl={getChannelSelf.profileImage?.url?.splash}
        fullUrl={getChannelSelf.profileImage?.url?.full}
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

export default ChannelSelf;
