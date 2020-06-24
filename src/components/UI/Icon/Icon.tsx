/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { Image, ImageStyle, ImageProps, StyleProp } from 'react-native';
import Styles from './Icon.style';

export enum ICON {
  SEARCH = 'SEARCH',
}

interface IconProps {
  name: ICON;
  size: 'xxsmall' | 'xsmall' | 'small' | 'regular' | 'large' | 'xlarge';
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageProps['resizeMode'];
}

const Icon = (props: IconProps) => {
  const source = (() => {
    switch (props.name) {
      case ICON.SEARCH:
        return require('../../../assets/images/icons/search.png');

      default:
        return null;
    }
  })();

  return (
    <Image
      source={source}
      resizeMode={props.resizeMode || 'contain'}
      style={[Styles.base, Styles[props.name], Styles[props.size], props.style]}
    />
  );
};

export default Icon;
