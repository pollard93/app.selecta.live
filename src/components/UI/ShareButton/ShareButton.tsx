import React, { FC } from 'react';
import { TouchableOpacity, Share, ShareOptions } from 'react-native';
import Config from 'react-native-config';
import Icon, { ICON, IconProps } from '../Icon/Icon';

interface ShareButtonIconProps {
  size?: IconProps['size'],
  style?: IconProps['style'],
  forceLight?: IconProps['forceLight']
}

interface ShareButtonProps {
  title: string;
  uri: string;
  dialogProps?: ShareOptions
  iconProps?: ShareButtonIconProps;
}

const ShareButton: FC<ShareButtonProps> = ({ title, uri, dialogProps = {}, iconProps = {} }) => {
  const onShare = () => {
    const url = `${Config.REACT_APP_API_URL_BASE}/${uri}`;
    Share.share({ title, url }, dialogProps);
  };

  return (
    <TouchableOpacity onPress={onShare}>
      <Icon name={ICON.SHARE} size="regular" animated {...iconProps} />
    </TouchableOpacity>
  );
};

export default ShareButton;
