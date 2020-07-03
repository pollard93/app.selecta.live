import React, { useState, useEffect } from 'react';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { AsyncImageProps, AsyncImage } from 'mbp-components-rn-asyncimage';
import { openAssetPickerModalScreen, closeAssetPickerModal } from '../../../modules/AssetPicker/AssetPicker';

export interface EditableAsyncImageProps {
  asyncImageProps: AsyncImageProps;
  onChange: (asset: PhotoIdentifier['node']) => void;
  children?: (args: {
    selectedAsset: PhotoIdentifier['node'];
    openPicker: () => void;
    onCancel: () => void;
  }) => JSX.Element;
}

export const EditableAsyncImage = (props: EditableAsyncImageProps) => {
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
    openAssetPickerModalScreen({
      assetType: 'All',
      onSelectAssets: (assets) => {
        /**
         * On select asset
         * Set asset in selectedAsset
         * Execute props.onChange with asset
         */
        setSelectedAsset(assets[0]);
        props.onChange(assets[0]);

        /**
         * Close picker
         */
        closeAssetPickerModal();
      },
      onDismiss: () => closeAssetPickerModal(),
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
    <>
      <AsyncImage
        {...props.asyncImageProps}
        fullUrl={(selectedAsset && selectedAsset.image.uri) || fullUrl}
      />

      {props.children({
        selectedAsset,
        openPicker,
        onCancel,
      })}
    </>
  );
};
