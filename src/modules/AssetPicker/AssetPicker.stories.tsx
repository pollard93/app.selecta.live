/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button } from 'react-native';
import AssetPicker, { openAssetPickerModalScreen, closeAssetPickerModal } from './AssetPicker';
import CenterView from '../../../storybook/Decorators/CenterView/CenterView';

storiesOf('UI/AssetPicker', module)
  .add('AssetPicker - single', () => (
    <AssetPicker
      assetType="All"
      onSelectAssets={console.log}
      onDismiss={console.log}
    />
  ))
  .add('AssetPicker - multi', () => (
    <AssetPicker
      assetType="All"
      isMulti
      onSelectAssets={console.log}
      onDismiss={console.log}
    />
  ))
  .add('AssetPicker - modal', () => (
    <CenterView>
      <Button
        title="Open"
        onPress={() => {
          openAssetPickerModalScreen({
            assetType: 'All',
            onSelectAssets: () => closeAssetPickerModal(),
            onDismiss: () => closeAssetPickerModal(),
          });
        }}
      />
    </CenterView>
  ));
