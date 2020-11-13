import React, { FC, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Icon, { ICON } from '../Icon/Icon';
import Small from '../Typography/components/Small';
import Styles from './LiveConsumers.styles';

interface LiveConsumersProps {
  count: number;
  wrapStyle?: StyleProp<ViewStyle>;
}

const formatNumber = (count: number) => {
  if (count > 1000000) {
    return `${(count / 1000000).toFixed(2)}m`;
  }

  if (count > 500000) {
    return `${(count / 1000).toFixed(0)}k`;
  }

  if (count > 1000) {
    return `${(count / 1000).toFixed(2)}k`;
  }

  return count;
};

const LiveConsumers: FC<LiveConsumersProps> = (props) => (
  <View style={[Styles.liveConsumers, props.wrapStyle]}>
    <Icon forceLight name={ICON.PROFILE} size="xsmall" style={Styles.liveConsumersIcon} />
    <Small bold forceLight>{formatNumber(props.count)}</Small>
  </View>
);

export default memo(LiveConsumers);
