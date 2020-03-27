import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AsyncImage from 'mbp-components-rn-asyncimage';
import { useAssetPicker } from 'mbp-components-rn-assetpicker';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { ReactNativeFile } from 'apollo-upload-client';
import { AsyncImageProps } from 'mbp-components-rn-asyncimage/dist/components/AsyncImage/AsyncImage';

interface EditableImageProps {
  asyncImageProps: AsyncImageProps;
  onSubmit: (file: ReactNativeFile) => Promise<any>;
}

const EditableImage = (props: EditableImageProps) => {
  const assetPicker = useAssetPicker();
  const [selectedAsset, setSelectedAsset] = useState<PhotoIdentifier['node']>();
  const [loading, setLoading] = useState(false);


  /**
   * Open the picker and set type and onSelectAsset callback
   */
  const openPicker = () => {
    assetPicker.updateProps({
      assetType: 'All',
      open: true,
      isMulti: false,
      onSelectAssets: (assets) => {
        setSelectedAsset(assets[0]);

        /**
         * Close picker
         */
        assetPicker.updateProps({
          open: false,
        });
      },
    });
  };


  /**
   * On cancel null selectedAsset
   */
  const onCancel = () => {
    setSelectedAsset(null);
  };


  /**
   * On Submit execute props.onSubmit with selectedAsset as ReactNativeFile
   * null selectedAsset whether it fails or not
   * The submission should updated the cache and re render this component with the updated data
   */
  const onSubmit = async () => {
    try {
      setLoading(true);

      await props.onSubmit(new ReactNativeFile({
        uri: selectedAsset.image.uri,
        name: selectedAsset.image.filename,
        type: selectedAsset.type,
      }));

      setLoading(false);
      setSelectedAsset(null);
    } catch (e) {
      setLoading(false);
      setSelectedAsset(null);
    }
  };


  return (
    <View>
      <AsyncImage
        {...props.asyncImageProps}
        fullUrl={(selectedAsset && selectedAsset.image.uri) || props.asyncImageProps.fullUrl}
      />

      <Button
        title="Change Profile Picture"
        disabled={loading}
        onPress={openPicker}
      />

      <Button
        title="Cancel"
        disabled={!selectedAsset || loading}
        onPress={onCancel}
      />

      <Button
        title="Submit"
        disabled={!selectedAsset || loading}
        onPress={onSubmit}
      />
    </View>
  );
};

export default EditableImage;
