import React, { FC } from 'react';
import { View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Styles from './StreamSelfListItem.style';
import Body from '../../UI/Typography/components/Body';
import Button from '../../UI/Button/Button';
import H3 from '../../UI/Typography/components/H3';
import { formatForTimezone } from '../../../utils/functions';
import { pushScreen } from '../../../screens/utils';
import { STACK } from '../../../screens/utils/interfaces';
import CreateUpdateStreamScreen from '../../../screens/CreateUpdateStreamScreen/CreateUpdateStreamScreen';
import { getStreamSelfsVariables } from '../../../API/query/getStreamSelfs/__generated__/getStreamSelfs';
import StreamSelfListItemControls from './components/StreamSelfListItemControls/StreamSelfListItemControls';
import { getStreamDuration } from '../../../utils/streamFunctions';

export interface StreamSelfListItemProps {
  data: STREAM_SELF_FRAGMENT;
  getStreamSelfsVariables: getStreamSelfsVariables;
}

const StreamSelfListItem: FC<StreamSelfListItemProps> = (props) => {
  /**
   * Push CreateUpdateStreamScreen
   */
  const onEdit = () => {
    pushScreen(STACK.PROFILE, CreateUpdateStreamScreen, {
      id: props.data.id,
    });
  };


  return (
    <View style={Styles.wrap}>
      <View style={Styles.banner}>
        <Body bold style={Styles.bannerHeader}>
          Live On: {formatForTimezone(props.data.timeFrom, 'DD/MM/Y HH:mm z')}
          {new Date(props.data.timeFrom) > new Date() && ' (Upcoming)'}
        </Body>

        {new Date(props.data.timeFrom) >= new Date() && (
          <Button
            title="Edit"
            type="LIGHT"
            onPress={onEdit}
            size="small"
          />
        )}
      </View>

      <View style={Styles.body}>
        <View style={Styles.header}>
          <H3
            numberOfLines={3}
            ellipsizeMode="tail"
            style={Styles.title}
          >
            {props.data.name}
          </H3>
          <AsyncImage
            containerProps={{
              style: Styles.image,
            }}
            fullUrl={props.data.image.url.full}
            splashUrl={props.data.image.url.splash}
          />
        </View>

        <View style={Styles.details}>
          <View style={Styles.detail}>
            <Body>{props.data.tags.map(({ title }) => `#${title} `)}</Body>
            <Body>Ticket Price: &copy;{props.data.cost}</Body>
            <Body>Stream Duration: {getStreamDuration(props.data, true)}</Body>
          </View>
          <View style={Styles.meta}>
            <Body>Streams: {props.data.viewCount}</Body>
            <Body>Purchases: {props.data.consumersEdge}</Body>
          </View>
        </View>

        <Body bold>{props.data.info}</Body>

        <View style={Styles.controls}>
          <StreamSelfListItemControls {...props} />
        </View>
      </View>
    </View>
  );
};

export default StreamSelfListItem;
