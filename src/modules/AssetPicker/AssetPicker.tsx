import React, { FC } from 'react';
import AssetPickerModule, { AssetPickerProps, AssetPickerItemProps, MultiSelectComponentProps } from 'mbp-components-rn-assetpicker';
import { View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { Navigation } from 'react-native-navigation';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';
import Styles from './AssetPicker.style';
import Button from '../../components/UI/Button/Button';
import Icon, { ICON } from '../../components/UI/Icon/Icon';
import { openModalScreen } from '../../screens/utils';
import usePermissions from '../../components/UI/Permission/usePermissions';
import useSafeArea from '../SafeAreaInsets/SafeAreaInsets';
import PermissionsError from '../../components/UI/Permission/PermissionsError';

/**
 * Create an AssetPickerItem component and pass it to the Provider
 */
export const AssetPickerItem: FC<AssetPickerItemProps> = (props) => (
  <View style={Styles.imageWrap}>
    <AsyncImage
      fullUrl={props.asset.node.image.uri}
      containerProps={{
        style: Styles.image,
      }}
    />
    {props.isSelected && (
      <View style={Styles.iconWrap}>
        <Icon
          name={ICON.SEARCH} // TODO - update icon
          size="xsmall"
          style={Styles.icon}
        />
      </View>
    )}
  </View>
);


/**
 * Create an MultiSelectComponent and pass it to the Provider
 */
export const MultiSelectComponent: FC<MultiSelectComponentProps> = (props) => {
  const safeAreaInsets = useSafeArea();

  return (
    <View style={[Styles.multiSelectWrap, { paddingBottom: safeAreaInsets.bottom }]}>
      <Button
        title={props.selectedAssets.length ? `Add Selected (${props.selectedAssets.length})` : 'Select Images'}
        onPress={props.onDoneMultiSelect}
        disabled={!props.selectedAssets.length}
      />
    </View>
  );
};


export const openAssetPickerModalScreen = (props: AssetPickerProps) => {
  openModalScreen({
    component: (
      <AssetPicker {...props} />
    ),
  }, 'ASSET_PICKER_MODAL');
};


export const closeAssetPickerModal = () => Navigation.dismissModal('ASSET_PICKER_MODAL');


const AssetPicker: FC<AssetPickerProps> = (props) => {
  /**
   * Check permissions and wait until granted
   */
  const { permissionStatus } = usePermissions({
    iosPermission: PERMISSIONS.IOS.PHOTO_LIBRARY,
    androidPermission: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  });

  /**
   * Permission error
   */
  if (permissionStatus && permissionStatus !== RESULTS.GRANTED) {
    return (
      <PermissionsError
        state={permissionStatus}
        errorMessage="We require permission to access your camera roll."
        onDismiss={closeAssetPickerModal}
      />
    );
  }


  return (
    <AssetPickerModule
      {...props}
      config={{
        AssetPickerItem,
        MultiSelectComponent,
        numColumns: 2,
        shroudStyles: Styles.shroudStyles,
      }}
    />
  );
};


export default AssetPicker;
