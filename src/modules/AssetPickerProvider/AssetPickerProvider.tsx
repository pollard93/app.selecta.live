import React, { ReactNode } from 'react';
import { AssetPickerProvider as AssetPickerProviderModule, AssetPickerItemProps, ListFooterComponentProps, MultiSelectComponentProps } from 'mbp-components-rn-assetpicker';
import { View, Image, Text, Button } from 'react-native';

/**
 * Create an AssetPickerItem component and pass it to the Provider
 */
const AssetPickerItem = (props: AssetPickerItemProps) => (
  <View style={{ width: '100%', height: '100%' }}>
    <Image
      style={{ width: '100%', height: '100%' }}
      source={{ uri: props.asset.node.image.uri }}
      resizeMode='cover'
    />
  </View>
);


/**
 * Create an ListFooterComponent and pass it to the Provider
 */
const ListFooterComponent = (props: ListFooterComponentProps) => {
  if (props.noMoreAssets) {
    return <Text>No More Images</Text>;
  }

  return <Text>Loading</Text>;
};


/**
 * Create an MultiSelectComponent and pass it to the Provider
 */
const MultiSelectComponent = (props: MultiSelectComponentProps) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 100 }}>
    <Text>Selected: {props.selectedAssets.length}</Text>
    <Button
      title='Add Selected'
      onPress={props.onDoneMultiSelect}
      disabled={!props.selectedAssets.length}
    />
  </View>
);


const AssetPickerProvider = ({ children }: { children?: ReactNode }) => (
  <AssetPickerProviderModule
    config={{
      AssetPickerItem,
      ListFooterComponent,
      MultiSelectComponent,
    }}
  >
    {children}
  </AssetPickerProviderModule>
);


export default AssetPickerProvider;
