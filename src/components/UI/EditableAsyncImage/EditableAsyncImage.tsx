import React, { useState, useEffect } from 'react';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { AsyncImageProps, AsyncImage } from 'mbp-components-rn-asyncimage';
import { View, TouchableOpacity } from 'react-native';
import { openAssetPickerModalScreen, closeAssetPickerModal } from '../../../modules/AssetPicker/AssetPicker';
import Icon, { ICON } from '../Icon/Icon';
import Styles from './EditableAsyncImage.style';
import LoadingIcon from '../LoadingIcon/LoadingIcon';

export interface EditableAsyncImageProps {
  asyncImageProps: AsyncImageProps;
  onConfirm: (asset: PhotoIdentifier['node']) => Promise<any>;
  onChange?: (asset: PhotoIdentifier['node']) => void;
  iconPosition?: 'center' | 'bottomRight'; // Default center
}

export const EditableAsyncImage = (props: EditableAsyncImageProps) => {
  const [selectedAsset, setSelectedAsset] = useState<PhotoIdentifier['node']>();
  const [fullUrl, setFullUrl] = useState(props.asyncImageProps.fullUrl);
  const [loading, setLoading] = useState(false);


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
        // eslint-disable-next-line no-unused-expressions
        props.onChange?.(assets[0]);

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
    // eslint-disable-next-line no-unused-expressions
    props.onChange?.(null);
  };


  const Inner = () => {
    if (loading) {
      return (
        <View style={[Styles.controls, Styles.loading, Styles[props.iconPosition || 'center']]}>
          <LoadingIcon />
        </View>
      );
    }

    return selectedAsset
      ? (
        <View style={[Styles.controls, Styles[props.iconPosition || 'center']]}>
          <TouchableOpacity
            onPress={onCancel}
          >
            <View style={Styles.icon}>
              <Icon
                name={ICON.CROSS}
                size="regular"
                forceLight
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              props.onConfirm(selectedAsset).finally(() => {
                setLoading(false);
              });
            }}
          >
            <View style={Styles.icon}>
              <Icon
                name={ICON.TICK}
                size="regular"
                forceLight
              />
            </View>
          </TouchableOpacity>
        </View>
      )
      : (
        <TouchableOpacity
          style={[Styles.controls, Styles[props.iconPosition || 'center']]}
          onPress={openPicker}
        >
          <View style={Styles.icon}>
            <Icon
              name={ICON.CAMERA}
              size="regular"
              forceLight
            />
          </View>
        </TouchableOpacity>
      );
  };


  return (
    <View style={props.asyncImageProps?.containerProps?.style}>
      <AsyncImage
        {...props.asyncImageProps}
        fullUrl={(selectedAsset && selectedAsset.image.uri) || fullUrl}
      />

      <Inner />
    </View>
  );
};
