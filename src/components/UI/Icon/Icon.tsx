/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import { Image, ImageStyle, ImageProps, StyleProp, Animated } from 'react-native';
import Styles from './Icon.style';

export enum ICON {
  SEARCH = 'SEARCH',
  ARROW_FORWARD = 'ARROW_FORWARD',
  ARROW_BACKWARD = 'ARROW_BACKWARD',
}

interface IconProps {
  name: ICON;
  size: 'xxsmall' | 'xsmall' | 'small' | 'regular' | 'large' | 'xlarge';
  style?: Animated.WithAnimatedValue<StyleProp<ImageStyle>>;
  resizeMode?: ImageProps['resizeMode'];
  animated?: boolean;
}

const Icon = (props: IconProps) => {
  const source = (() => {
    switch (props.name) {
      case ICON.SEARCH:
        return require('../../../assets/images/icons/search.png');

      case ICON.ARROW_FORWARD:
        return require('../../../assets/images/icons/arrow-forward.png');

      case ICON.ARROW_BACKWARD:
        return require('../../../assets/images/icons/arrow-backward.png');

      default:
        return null;
    }
  })();

  if (props.animated) {
    return (
      <Animated.Image
        source={source}
        resizeMode={props.resizeMode || 'contain'}
        style={[Styles.base, Styles[props.name], Styles[props.size], props.style]}
      />
    );
  }

  return (
    <Image
      source={source}
      resizeMode={props.resizeMode || 'contain'}
      style={[Styles.base, Styles[props.name], Styles[props.size], props.style]}
    />
  );
};

export default Icon;
