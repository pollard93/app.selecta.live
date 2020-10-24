import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment-timezone';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { STREAM_COMMENT_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_COMMENT_FRAGMENT';
import Styles from './StreamCommentListItem.styles';
import Body from '../../UI/Typography/components/Body';
import Gradient from '../../UI/Gradient/Gradient';
import Icon, { ICON } from '../../UI/Icon/Icon';
import { useGetChannelSelfQuery } from '../../../API/query/getChannelSelf/getChannelSelf';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import GlobalStyles, { GlobalDynamicStyles } from '../../../styles/stylesheets/GlobalStyles';
import color from '../../../styles/definitions/color';

interface StreamCommentListItemProps {
  data: STREAM_COMMENT_FRAGMENT;
  streamData: STREAM_PROFILE_FRAGMENT | STREAM_SELF_FRAGMENT;
}

const StreamCommentListItem: FC<StreamCommentListItemProps> = (props) => {
  const globalDynamicStyles = useDynamicValue(GlobalDynamicStyles);

  /**
   * Check if message has been created by this user
   * If there user data on the message, then check if the user matches getSelf
   * If there's no user data, try and get channelSelf from cache only and see if ids match
   */
  const channel = useGetChannelSelfQuery({ fetchPolicy: 'cache-only' });

  /**
   * If no user is assigned in the data
   * The comment was created by the channel
   */
  const imageUrl = {
    splash: props.data.user ? props.data.user.profilePicture?.url.splash : props.streamData.channel.profileImage.url.splash,
    small: props.data.user ? props.data.user.profilePicture?.url.small : props.streamData.channel.profileImage.url.small,
  };

  return (
    <View style={Styles.wrap}>
      <View style={Styles.profilePictureWrap}>
        <AsyncImage
          splashUrl={imageUrl.splash}
          fullUrl={imageUrl.small}
          // eslint-disable-next-line global-require
          placeholderImageProps={{
            source: require('../../../assets/images/icons/profile.png'),
            style: {
              width: '100%',
              height: '100%',
              tintColor: color.mono.pale.dark,
            },
          }}
          containerProps={{
            style: [GlobalStyles.ImageCircleBorderInner, globalDynamicStyles.ImageCircleBorderInner],
          }}
        />

        {!props.data.user && (
          <View style={Styles.channelTick}>
            <Gradient style={StyleSheet.absoluteFillObject} />
            <Icon name={ICON.TICK} size={'xxsmall'} forceLight />
          </View>
        )}
      </View>

      <View style={Styles.commentOuter}>
        <View style={Styles.lower}>
          <Body bold>{props.data.user?.username || channel.data.getChannelSelf.name}</Body>
          <Body style={Styles.time}>{moment(props.data.createdAt).fromNow()}</Body>
        </View>

        <View style={Styles.commentWrap}>
          <Body style={Styles.comment}>{props.data.comment}</Body>
        </View>
      </View>
    </View>
  );
};

export default memo(StreamCommentListItem);
