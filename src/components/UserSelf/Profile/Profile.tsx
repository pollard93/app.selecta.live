import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import { useAssetPicker } from 'mbp-components-rn-assetpicker';
import { useGetSelfQuery } from '../../../API/query/getSelf/getSelf';

const Profile = () => {
  const { data: { getSelf } } = useGetSelfQuery();
  const assetPicker = useAssetPicker();

  return (
    <View>
      <Text>{getSelf.name}</Text>
      <Text>{getSelf.email}</Text>
      {getSelf.profilePicture && (
        <AsyncImage
          splashUrl={getSelf.profilePicture.url.splash}
          fullUrl={getSelf.profilePicture.url.full}
          containerProps={{
            style: {
              width: 250,
              height: 250,
            },
          }}
        />
      )}
      <Button
        title="Change Profile Picture"
        onPress={() => {
          /**
           * Open the picker and set type and onSelectAsset callback
           */
          assetPicker.updateProps({
            assetType: 'All',
            open: true,
            isMulti: false,
            onSelectAssets: (assets) => {
              // eslint-disable-next-line no-console
              console.log('TestComponent -> assets', assets);
              /**
               * Do something with assets
               * Close picker
               */
              assetPicker.updateProps({
                open: false,
              });
            },
          });
        }}
      />
    </View>
  );
};

export default Profile;
