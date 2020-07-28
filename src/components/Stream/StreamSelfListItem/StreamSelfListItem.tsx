import React, { FC } from 'react';
import { View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import Styles from './StreamSelfListItem.style';
import Body from '../../UI/Typography/components/Body';
import Button from '../../UI/Button/Button';
import H3 from '../../UI/Typography/components/H3';
import { formatForTimezone } from '../../../utils/functions';
import H4 from '../../UI/Typography/components/H4';
import Icon, { ICON } from '../../UI/Icon/Icon';
import { pushScreen } from '../../../screens/utils';
import { STACK } from '../../../screens/utils/interfaces';
import StreamProfileScreen from '../../../screens/StreamProfileScreen/StreamProfileScreen';

interface StreamListItemProps {
  data: STREAM_SELF_FRAGMENT;
}

const StreamListItem: FC<StreamListItemProps> = ({ data }) => (
  <View>
    <View style={Styles.banner}>
      <Body style={Styles.bannerHeader}>
        Live On: {formatForTimezone(data.timeFrom, 'DD/MM/Y H:m')}
        &nbsp; {formatForTimezone(data.timeFrom, 'z')}
        {new Date(data.timeFrom) > new Date() && ' (Upcoming)'}
      </Body>

      {new Date(data.timeFrom) >= new Date() && (
        <Button
          title="Edit"
          type="LIGHT"
          onPress={console.log}
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
          {data.name}
        </H3>
        <AsyncImage
          containerProps={{
            style: Styles.image,
          }}
          fullUrl={data.image.url.full}
          splashUrl={data.image.url.splash}
        />
      </View>

      <View style={Styles.details}>
        <View style={Styles.detail}>
          <Body>{data.tags.map(({ title }) => `#${title} `)}</Body>
          <Body>Ticket Price: {data.cost}&copy;</Body>
          <Body>Stream Duration: </Body>
        </View>
        <View style={[Styles.detail, Styles.meta]}>
          <Body>Streams: 0</Body>
          <Body>Purchases: 0</Body>
        </View>
      </View>

      <Body>{data.info}</Body>

      {new Date(data.timeFrom) >= new Date() ? (
        <>
          <Button
            type="PRIMARY"
            title="View Stream Live"
            onPress={() => pushScreen(STACK.HOME, StreamProfileScreen, { id: data.id })}
            style={Styles.streamButton}
          />

          <View style={Styles.authKeys}>
            <View style={Styles.authKey}>
              <H4>Stream Key: </H4>
              <Body>{data.streamKey}</Body>
            </View>
            <View style={Styles.authKey}>
              <H4>Password: </H4>
              <Body>{data.password}</Body>
            </View>
          </View>
        </>
      ) : (
        <View style={Styles.metrics}>
          <TouchableOpacity onPress={() => pushScreen(STACK.HOME, StreamProfileScreen, { id: data.id })}>
            <View style={Styles.metric}>
              <Icon name={ICON.CHAT} size="small" />
              <Body style={Styles.metricBody}>7231 Comments</Body>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => pushScreen(STACK.HOME, StreamProfileScreen, { id: data.id })}>
            <View style={Styles.metric}>
              <Icon name={ICON.PLAY} size="small" />
              <Body style={Styles.metricBody}>View Stream</Body>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  </View>
);

export default StreamListItem;
