import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_COMMENT_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_COMMENT_FRAGMENT';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import Styles from './StreamCommentListItem.styles';
import Body from '../../UI/Typography/components/Body';
import Gradient from '../../UI/Gradient/Gradient';

interface StreamCommentListItemProps {
  data: STREAM_COMMENT_FRAGMENT;
}

const StreamCommentListItem: FC<StreamCommentListItemProps> = (props) => {
  const self = useGetSelf();
  const isSelf = props.data.user.id === self.id;

  return (
    <View style={Styles.wrap}>
      <AsyncImage
        splashUrl={props.data.user.profilePicture?.url.splash}
        fullUrl={props.data.user.profilePicture?.url.small}
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

export default StreamCommentListItem;
