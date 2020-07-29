import React, { useState, useEffect } from 'react';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { AsyncImageProps, AsyncImage } from 'mbp-components-rn-asyncimage';
import { View, TouchableOpacity } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { useToast } from 'mbp-components-rn-toast';
import { openAssetPickerModalScreen, closeAssetPickerModal } from '../../../modules/AssetPicker/AssetPicker';
import Icon, { ICON } from '../Icon/Icon';
import Styles from './EditableAsyncImage.style';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Toast from '../Toast/Toast';

export interface EditableAsyncImageProps {
  asyncImageProps: AsyncImageProps;
  onConfirm: (asset: PhotoIdentifier['node']) => Promise<any>;
  onChange?: (asset: PhotoIdentifier['node']) => void;
  iconPosition?: 'center' | 'bottomRight'; // Default center
}

export const EditableAsyncImage = (props: EditableAsyncImageProps) => {
  const toast = useToast();
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


  /**
   * On confirm
   * Set loading state
   * Reduce image to max width and height and convert to jpeg
   */
  const onConfirm = async () => {
    setLoading(true);

    /**
     * Safely get image and toast if errors
     */
    const image = await (async () => {
      try {
        return await ImageResizer.createResizedImage(selectedAsset.image.uri, 800, 800, 'JPEG', 100);
      } catch {
        toast.push({
          duration: 1000,
          component: (
            <Toast type="ERROR" content='Something went wrong' />
          ),
          dismissible: false,
        });

        return null;
      }
    })();

    /**
     * If image is returned
     * execute props.onConfirm
     */
    if (image) {
      try {
        await props.onConfirm({
          ...selectedAsset,
          image: {
            ...selectedAsset.image,
            ...image,
          },
        });
        setSelectedAsset(null);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };


  const Controls = () => {
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
            onPress={onConfirm}
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

      <Controls />
    </View>
  );
};
