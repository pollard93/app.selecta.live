import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_MESSAGE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_MESSAGE_FRAGMENT';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import Styles from './StreamMessageListItem.styles';
import Body from '../../UI/Typography/components/Body';
import Gradient from '../../UI/Gradient/Gradient';
import Icon, { ICON } from '../../UI/Icon/Icon';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { formatTime } from '../../../utils/functions';
import Small from '../../UI/Typography/components/Small';

interface StreamMessageListItemProps {
  data: STREAM_MESSAGE_FRAGMENT;
  streamData: STREAM_PROFILE_FRAGMENT;
}

const StreamMessageListItem: FC<StreamMessageListItemProps> = (props) => {
  const self = useGetSelf();
  const isSelf = props.data.user?.id === self.id;

  /**
   * If no user is assigned in the data
   * The message was created by the channel
   */
  const imageUrl = {
    splash: props.data.user ? props.data.user.profilePicture?.url.splash : props.streamData.channel.profileImage.url.splash,
    small: props.data.user ? props.data.user.profilePicture?.url.small : props.streamData.channel.profileImage.url.small,
  };

  // Get relative time the message was created, relative to stream.timeFrom
  const relativeTime = formatTime((new Date(props.data.createdAt).getTime() - new Date(props.streamData.timeFrom).getTime()) / 1000);

  return (
    <View style={Styles.wrap}>
      <View style={Styles.profilePictureWrap}>
        <AsyncImage
          splashUrl={imageUrl.splash}
          fullUrl={imageUrl.small}
          // eslint-disable-next-line global-require
          placeholderImageProps={{
            source: require('../../../../icons/icon.jpg'),
            style: {
              width: '100%',
              height: '100%',
            },
          }}
          containerProps={{
            style: Styles.profilePicture,
          }}
        />

        {!props.data.user && (
          <View style={Styles.channelTick}>
            <Gradient style={StyleSheet.absoluteFillObject} />
            <Icon name={ICON.TICK} size={'xxsmall'} forceLight />
          </View>
        )}
      </View>

      <View style={Styles.messageOuter}>
        <View style={Styles.messageWrap}>
          {isSelf && <Gradient style={StyleSheet.absoluteFillObject} />}
          <Body style={[Styles.message, isSelf && Styles.messageSelf]}>{props.data.message}</Body>
        </View>

        <Small style={Styles.time}>{relativeTime}</Small>
      </View>
    </View>
  );
};

export default memo(StreamMessageListItem);
