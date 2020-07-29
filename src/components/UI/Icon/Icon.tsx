/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { memo } from 'react';
import { Image, ImageStyle, ImageProps, StyleProp, Animated } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './Icon.style';

export enum ICON {
  SEARCH = 'SEARCH',
  ARROW_FORWARD = 'ARROW_FORWARD',
  ARROW_BACKWARD = 'ARROW_BACKWARD',
  PROFILE = 'PROFILE',
  WALLET = 'WALLET',
  SHARE = 'SHARE',
  PLUS = 'PLUS',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  FULLSCREEN = 'FULLSCREEN',
  CLOSE_FULLSCREEN = 'CLOSE_FULLSCREEN',
  VIDEO_ENABLED = 'VIDEO_ENABLED',
  VIDEO_DISABLED = 'VIDEO_DISABLED',
  DRAWER_ARROW = 'DRAWER_ARROW',
  SEND = 'SEND',
  TICK = 'TICK',
  CHAT = 'CHAT',
  NOTES = 'NOTES',
  CROSS = 'CROSS',
  COG = 'COG',
  WEBSITE = 'WEBSITE',
  TWITTER = 'TWITTER',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  COPY = 'COPY',
}

export interface IconProps {
  name: ICON;
  size: 'xxsmall' | 'xsmall' | 'small' | 'regular' | 'large' | 'xlarge';
  forceLight?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ImageStyle>>;
  resizeMode?: ImageProps['resizeMode'];
  animated?: boolean;
}

const Icon = (props: IconProps) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  const source = (() => {
    switch (props.name) {
      case ICON.SEARCH:
        return require('../../../assets/images/icons/search.png');

      case ICON.ARROW_FORWARD:
        return require('../../../assets/images/icons/arrow-forward.png');

      case ICON.ARROW_BACKWARD:
        return require('../../../assets/images/icons/arrow-backward.png');

      case ICON.PROFILE:
        return require('../../../assets/images/icons/profile.png');

      case ICON.WALLET:
        return require('../../../assets/images/icons/wallet.png');

      case ICON.SHARE:
        return require('../../../assets/images/icons/share.png');

      case ICON.PLUS:
        return require('../../../assets/images/icons/plus.png');

      case ICON.PLAY:
        return require('../../../assets/images/icons/play.png');

      case ICON.PAUSE:
        return require('../../../assets/images/icons/pause.png');

      case ICON.FULLSCREEN:
        return require('../../../assets/images/icons/fullScreen.png');

      case ICON.CLOSE_FULLSCREEN:
        return require('../../../assets/images/icons/closeFullScreen.png');

      case ICON.VIDEO_ENABLED:
        return require('../../../assets/images/icons/videoEnabled.png');

      case ICON.VIDEO_DISABLED:
        return require('../../../assets/images/icons/videoDisabled.png');

      case ICON.DRAWER_ARROW:
        return require('../../../assets/images/icons/drawerArrow.png');

      case ICON.SEND:
        return require('../../../assets/images/icons/send.png');

      case ICON.TICK:
        return require('../../../assets/images/icons/tick.png');

      case ICON.CHAT:
        return require('../../../assets/images/icons/chat.png');

      case ICON.NOTES:
        return require('../../../assets/images/icons/notes.png');

      case ICON.CROSS:
        return require('../../../assets/images/icons/cross.png');

      case ICON.COG:
        return require('../../../assets/images/icons/cog.png');

      case ICON.WEBSITE:
        return require('../../../assets/images/icons/website.png');

      case ICON.TWITTER:
        return require('../../../assets/images/icons/twitter.png');

      case ICON.FACEBOOK:
        return require('../../../assets/images/icons/facebook.png');

      case ICON.INSTAGRAM:
        return require('../../../assets/images/icons/instagram.png');

      case ICON.COPY:
        return require('../../../assets/images/icons/copy.png');

      default:
        return null;
    }
  })();

  if (props.animated) {
    return (
      <Animated.Image
        source={source}
        resizeMode={props.resizeMode || 'contain'}
        style={[dynamicStyles.base, Styles[props.name], Styles[props.size], props.style, props.forceLight && Styles.forceLight]}
      />
    );
  }

  return (
    <Image
      source={source}
      resizeMode={props.resizeMode || 'contain'}
      style={[dynamicStyles.base, Styles[props.name], Styles[props.size], props.style, props.forceLight && Styles.forceLight]}
    />
  );
};

export default memo(Icon);
