import React, { FC } from 'react';
import { View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { STREAM_PROFILE_FRAGMENT_SHORT } from '../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT_SHORT';
import Body from '../../Typography/components/Body';
import H4 from '../../Typography/components/H4';
import Chip from '../../Chip/Chip';
import Styles from './StreamCard.style';
import { formatForTimezone } from '../../../../utils/functions';

interface StreamCardProps {
  data: STREAM_PROFILE_FRAGMENT_SHORT;
}

const StreamCard: FC<StreamCardProps> = (props) => (
  <View style={Styles.wrap}>
    <AsyncImage
      splashUrl={props.data.image?.url.splash}
      fullUrl={props.data.image?.url.large}
      containerProps={{
        style: Styles.image,
      }}
    />
    <View style={Styles.item}>
      <H4>{props.data.name}</H4>
    </View>

    {props.data.tags.length > 0 && (
      <View style={Styles.item}>
        <Body numberOfLines={1} ellipsizeMode="tail">#{props.data.tags.map((t) => t.title).join(' #')}</Body>
      </View>
    )}

    <View style={[Styles.item, Styles.lower]}>
      <Chip type="SECONDARY" style={Styles.channelNameChip}>{props.data.channel.name}</Chip>

      <View style={Styles.chips}>
        <Chip bold style={Styles.chipLeft}>{formatForTimezone(props.data.timeFrom, 'calendar')}</Chip>
        <Chip bold>{formatForTimezone(props.data.timeFrom, 'HH:mm')} {formatForTimezone(props.data.timeFrom, 'z')}</Chip>
      </View>
    </View>
  </View>
);

export default StreamCard;
