import React from 'react';
import { View, Text } from 'react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';

const Profile = () => {
  const { data: { getSelf } } = useGetSelfQuery();

  return (
    <View>
      <Text>{getSelf.name}</Text>
      <Text>{getSelf.email}</Text>

      <AsyncImage
        splashUrl={getSelf?.profilePicture?.url?.splash}
        fullUrl={getSelf?.profilePicture?.url?.full}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icon.jpg')}
        containerProps={{
          style: {
            width: 250,
            height: 250,
          },
        }}
      />
    </View>
  );
};

export default Profile;
