import React, { FC } from 'react';
import { TouchableOpacity, Share, ShareOptions } from 'react-native';
import Icon, { ICON, IconProps } from '../Icon/Icon';

interface ShareButtonIconProps {
  size?: IconProps['size'],
  style?: IconProps['style'],
  forceLight?: IconProps['forceLight']
}

interface ShareButtonProps {
  title: string;
  url: string;
  dialogProps?: ShareOptions
  iconProps?: ShareButtonIconProps;
}

const ShareButton: FC<ShareButtonProps> = ({ title, url, dialogProps = {}, iconProps = {} }) => {
  const onShare = () => {
    Share.share({ title, url }, dialogProps);
  };

  return (
    <TouchableOpacity onPress={onShare}>
      <Icon name={ICON.SHARE} size="regular" animated {...iconProps} />
    </TouchableOpacity>
  );
};

export default ShareButton;
