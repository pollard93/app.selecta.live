import React, { FC, memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_COMMENT_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_COMMENT_FRAGMENT';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import Styles from './StreamCommentListItem.styles';
import Body from '../../UI/Typography/components/Body';
import Gradient from '../../UI/Gradient/Gradient';
import { STREAM_PROFILE_FRAGMENT_channel } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';

interface StreamCommentListItemProps {
  data: STREAM_COMMENT_FRAGMENT;
  channelData: STREAM_PROFILE_FRAGMENT_channel;
}

const StreamCommentListItem: FC<StreamCommentListItemProps> = (props) => {
  const self = useGetSelf();
  const isSelf = props.data.user?.id === self.id;

  /**
   * If no user is assigned in the data
   * The comment was created by the channel
   */
  const imageUrl = {
    splash: props.data.user ? props.data.user.profilePicture?.url.splash : props.channelData.profileImage.url.splash,
    small: props.data.user ? props.data.user.profilePicture?.url.small : props.channelData.profileImage.url.small,
  };

  return (
    <View style={Styles.wrap}>
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

      <View style={Styles.commentOuter}>
        <View style={Styles.commentWrap}>
          {isSelf && <Gradient style={StyleSheet.absoluteFillObject} />}
          <Body light={isSelf} style={Styles.comment}>{props.data.comment}</Body>
        </View>
      </View>
    </View>
  );
};

export default memo(StreamCommentListItem);
