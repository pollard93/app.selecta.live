import React, { useState, useEffect } from 'react';
import { View, Button, TextInput } from 'react-native';
import AsyncImage, { AsyncImageProps } from 'mbp-components-rn-asyncimage';
import { useAssetPicker } from 'mbp-components-rn-assetpicker';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { ReactNativeFile } from 'apollo-upload-client';


export interface EditableImageProps {
  setRef: any;
  asyncImageProps: AsyncImageProps;
  onChange: (file: ReactNativeFile) => Promise<any>;
}

const EditableImage = (props: EditableImageProps) => {
  const assetPicker = useAssetPicker();
  const [selectedAsset, setSelectedAsset] = useState<PhotoIdentifier['node']>();
  const [fullUrl, setFullUrl] = useState(props.asyncImageProps.fullUrl);


  /**
   * When the image is updated outside of the component, possibly by a request
   * If the fullUrl has changed, clear selectedAsset and setFullUrl
   */
  useEffect(() => {
    if (fullUrl !== props.asyncImageProps.fullUrl) {
      setFullUrl(props.asyncImageProps.fullUrl);
      setSelectedAsset(null);
    }
  }, [props.asyncImageProps.fullUrl]);


  /**
   * Open the picker and set type and onSelectAsset callback
   */
  const openPicker = () => {
    assetPicker.updateProps({
      assetType: 'All',
      open: true,
      isMulti: false,
      onSelectAssets: (assets) => {
        /**
         * On select asset
         * Set asset in selectedAsset
         * Execute props.onChange with ReactNativeFile
         */

        setSelectedAsset(assets[0]);

        props.onChange(new ReactNativeFile({
          uri: assets[0].image.uri,
          name: assets[0].image.filename,
          type: assets[0].type,
        }));

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
   * On cancel - null selectedAsset and execute onChange
   */
  const onCancel = () => {
    setSelectedAsset(null);
    props.onChange(null);
  };


  return (
    <View>
      <TextInput ref={props.setRef} />

      <AsyncImage
        {...props.asyncImageProps}
        fullUrl={selectedAsset?.image?.uri || fullUrl}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icon.jpg')}
      />

      <Button
        title="Change"
        onPress={openPicker}
      />

      <Button
        title="Cancel"
        disabled={!selectedAsset}
        onPress={onCancel}
      />
    </View>
  );
};

export default EditableImage;
