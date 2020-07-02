import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_MESSAGE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_MESSAGE_FRAGMENT';
import { useGetSelf } from '../../../API/query/getSelf/getSelf';
import Styles from './StreamMessageListItem.styles';
import Body from '../../UI/Typography/components/Body';
import Gradient from '../../UI/Gradient/Gradient';

interface StreamMessageListItemProps {
  data: STREAM_MESSAGE_FRAGMENT;
}

const StreamMessageListItem: FC<StreamMessageListItemProps> = (props) => {
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

      <View style={Styles.messageOuter}>
        <View style={Styles.messageWrap}>
          {isSelf && <Gradient style={StyleSheet.absoluteFillObject} />}
          <Body light={isSelf} style={Styles.message}>{props.data.message}</Body>
        </View>
      </View>
    </View>
  );
};

export default StreamMessageListItem;
