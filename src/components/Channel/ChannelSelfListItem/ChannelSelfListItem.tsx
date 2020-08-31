import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { CHANNEL_SELF_FRAGMENT } from '../../../API/fragments/__generated__/CHANNEL_SELF_FRAGMENT';
import Styles from './ChannelSelfListItem.style';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import H2 from '../../UI/Typography/components/H2';

interface ChannelSelfListItemProps {
  data: CHANNEL_SELF_FRAGMENT;
}

const ChannelSelfListItem = (props: ChannelSelfListItemProps) => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  return (
    <View style={Styles.wrap}>
      <AsyncImage
        splashUrl={props.data?.coverImage?.url?.splash}
        fullUrl={props.data?.coverImage?.url?.full}
        containerProps={{
          style: StyleSheet.absoluteFill,
        }}
      />

      <View style={Styles.cover} />

      <View style={Styles.image}>
        <AsyncImage
          splashUrl={props.data?.profileImage?.url?.splash}
          fullUrl={props.data?.profileImage?.url?.full}
          containerProps={{
            style: [GlobalStyles.ImageCircleBorderInner, globalDynamicStyles.ImageCircleBorderInner],
          }}
        />
      </View>

      <H2
        forceLight
        style={Styles.name}
        ellipsizeMode="tail"
        numberOfLines={2}
      >
        {props.data.name}
      </H2>
    </View>
  );
};

export default ChannelSelfListItem;
