import React, { useState } from 'react';
import { View, Button } from 'react-native';
import AsyncImage, { AsyncImageProps } from 'mbp-components-rn-asyncimage';
import { useAssetPicker } from 'mbp-components-rn-assetpicker';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { ReactNativeFile } from 'apollo-upload-client';


export interface EditableImageProps {
  asyncImageProps: AsyncImageProps;
  onSubmit?: (file: ReactNativeFile) => Promise<any>; // Renderes component uncontrollable
  onChange?: (file: ReactNativeFile) => Promise<any>; // Renders component controllable
}

const EditableImage = (props: EditableImageProps) => {
  const assetPicker = useAssetPicker();
  const [selectedAsset, setSelectedAsset] = useState<PhotoIdentifier['node']>();
  const [fullUrl] = useState(props.asyncImageProps.fullUrl);
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
        /**
         * On select asset
         * Contolled - execute props.onChange with ReactNativeFile
         * Uncontolled - set asset in selectedAsset
         */
        if (props.onChange) {
          props.onChange(new ReactNativeFile({
            uri: assets[0].image.uri,
            name: assets[0].image.filename,
            type: assets[0].type,
          }));
        } else {
          setSelectedAsset(assets[0]);
        }

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
   * On cancel
   * Contolled - execute props.onChange
   * Uncontolled - null selectedAsset
   */
  const onCancel = () => {
    if (props.onChange) {
      props.onChange(null);
    } else {
      setSelectedAsset(null);
    }
  };


  /**
   * On Submit execute props.onSubmit with selectedAsset as ReactNativeFile
   * null selectedAsset whether it fails or not
   * The submission should updated the cache and re render this component with the updated data
   * Should only be used on uncontrolled component
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


  /**
   * Can cancel
   * Contolled - fullUrl set initially in state is different from the current fullUrl in props
   * Uncontolled - selectedAsset is populated
   */
  const canCancel = () => {
    if (props.onChange) {
      return props.asyncImageProps.fullUrl !== fullUrl;
    }

    return !!selectedAsset;
  };


  return (
    <View>
      <AsyncImage
        {...props.asyncImageProps}
        fullUrl={selectedAsset?.image?.uri || props.asyncImageProps.fullUrl}
        // eslint-disable-next-line global-require
        placeholderImageSource={require('../../../../icon.jpg')}
      />

      <Button
        title="Change"
        disabled={loading}
        onPress={openPicker}
      />

      <Button
        title="Cancel"
        disabled={!canCancel() || loading}
        onPress={onCancel}
      />

      {props.onSubmit && (
        <Button
          title="Submit"
          disabled={!selectedAsset || loading}
          onPress={onSubmit}
        />
      )}
    </View>
  );
};

export default EditableImage;
