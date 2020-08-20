import React, { useState, useMemo, FC } from 'react';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { View, TouchableOpacity } from 'react-native';
import { AsyncImage, AsyncImageProps } from 'mbp-components-rn-asyncimage';
import { openAssetPickerModalScreen, closeAssetPickerModal } from '../../../modules/AssetPicker/AssetPicker';
import Icon, { ICON } from '../Icon/Icon';
import Styles from './EditableAsyncImage.style';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import FadeInView from '../FadeInView/FadeInView';

export interface EditableAsyncImageProps {
  asyncImageProps: AsyncImageProps;
  onChange: (asset: PhotoIdentifier['node']) => void;
  iconPosition?: 'center' | 'bottomRight'; // Default center
  resetRef?: React.MutableRefObject<() => void>; // Pass a ref to be assigned to reset the component
  loading?: boolean;
}

export interface EditableAsyncImageControlsProps extends EditableAsyncImageProps {
  selectedAsset: PhotoIdentifier['node'];
  onCancel: () => void;
  openPicker: () => void;
}


/**
 * Controls
 */
const Controls: FC<EditableAsyncImageControlsProps> = (props) => {
  if (props.loading) {
    return (
      <FadeInView style={[Styles.controls, Styles[props.iconPosition || 'center'], Styles.loadingWrap]}>
        <LoadingIcon size="regular" />
      </FadeInView>
    );
  }

  return props.selectedAsset
    ? (
      <View style={[Styles.controls, Styles[props.iconPosition || 'center']]}>
        <TouchableOpacity
          onPress={props.onCancel}
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
          onPress={props.openPicker}
        >
          <View style={Styles.icon}>
            <Icon
              name={ICON.CAMERA}
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
        onPress={props.openPicker}
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

export const EditableAsyncImage: FC<EditableAsyncImageProps> = (props) => {
  const [selectedAsset, setSelectedAsset] = useState<PhotoIdentifier['node']>();


  /**
   * If props.resetRef is supplied, assign a function to it to reset selectedAsset state
   */
  useMemo(() => {
    if (props.resetRef) {
      // eslint-disable-next-line no-param-reassign
      props.resetRef.current = () => {
        setSelectedAsset(null);
      };
    }
  }, [props.resetRef]);


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
    // eslint-disable-next-line no-unused-expressions
    props.onChange(null);
  };


  return (
    <View style={props.asyncImageProps?.containerProps?.style}>
      <AsyncImage
        {...props.asyncImageProps}
        editable
        fullUrl={selectedAsset?.image?.uri || props.asyncImageProps?.fullUrl}
      />

      <Controls
        {...props}
        selectedAsset={selectedAsset}
        onCancel={onCancel}
        openPicker={openPicker}
      />
    </View>
  );
};
