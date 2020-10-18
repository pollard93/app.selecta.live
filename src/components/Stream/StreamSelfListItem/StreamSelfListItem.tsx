import React, { FC } from 'react';
import { View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Styles, { DynamicStyles } from './StreamSelfListItem.style';
import Body from '../../UI/Typography/components/Body';
import H4 from '../../UI/Typography/components/H4';
import StreamSelfListItemControls from './components/StreamSelfListItemControls/StreamSelfListItemControls';
import { getStreamDurationPretty } from '../../../utils/streamFunctions';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Icon, { ICON } from '../../UI/Icon/Icon';

export interface StreamSelfListItemProps {
  data: STREAM_SELF_FRAGMENT;
}

const StreamSelfListItem: FC<StreamSelfListItemProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);


  return (
    <View style={[Styles.wrap, dynamicStyles.wrap]}>
      <View style={Styles.imageWrap}>
        <AsyncImage
          splashUrl={props.data.image?.url.splash}
          fullUrl={props.data.image?.url.large}
          containerProps={{
            style: Styles.image,
          }}
        />

        <StreamSelfListItemControls {...props} />
      </View>

      <View style={Styles.item}>
        <H4
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {props.data.name}
        </H4>
      </View>

      {props.data.tags.length > 0 && (
        <View style={Styles.item}>
          <Body numberOfLines={1} ellipsizeMode="tail">#{props.data.tags.map((t) => t.title).join(' #')}</Body>
        </View>
      )}

      <View style={Styles.item}>
        <View style={GlobalStyles.CostText}>
          <Body>Ticket Price: </Body>
          <Icon name={ICON.CREDIT} size="xsmall" />
          <Body bold> {props.data.cost}</Body>
        </View>

        <Body>Stream Duration: <Body bold>{getStreamDurationPretty(props.data)}</Body></Body>
        <Body>Streams: <Body bold>{props.data.viewCount}</Body></Body>
        <Body>Purchases: <Body bold>{props.data.consumersEdge}</Body></Body>
      </View>
    </View>
  );
};

export default StreamSelfListItem;
