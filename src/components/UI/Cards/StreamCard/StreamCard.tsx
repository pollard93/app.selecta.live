import React, { FC } from 'react';
import { View } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { STREAM_PROFILE_FRAGMENT_SHORT } from '../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT_SHORT';
import Body from '../../Typography/components/Body';
import H4 from '../../Typography/components/H4';
import Chip from '../../Chip/Chip';
import Styles, { DynamicStyles } from './StreamCard.style';
import { formatForTimezone } from '../../../../utils/functions';
import ShareButton from '../../ShareButton/ShareButton';
import { STREAM_SELF_FRAGMENT } from '../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';

interface StreamCardProps {
  data: STREAM_PROFILE_FRAGMENT_SHORT | STREAM_SELF_FRAGMENT;
  fillHeight?: boolean; // Sets flex: 1 on wrapper to fill the height, used for displaying in feed
}

const StreamCard: FC<StreamCardProps> = (props) => {
  const now = new Date();
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <View style={[Styles.wrap, dynamicStyles.wrap, props.fillHeight && Styles.fillHeight]}>
      <AsyncImage
        splashUrl={props.data.image?.url.splash}
        fullUrl={props.data.image?.url.large}
        containerProps={{
          style: Styles.image,
        }}
      />
      <View style={[Styles.item, Styles.header]}>
        <H4>{props.data.name}</H4>
        <ShareButton
          title="Share Stream"
          uri={`share/stream/${props.data.id}`}
          iconProps={{
            size: 'small',
          }}
        />
      </View>

      {props.data.tags.length > 0
        ? (
          <View style={Styles.item}>
            <Body numberOfLines={1} ellipsizeMode="tail">#{props.data.tags.map((t) => t.title).join(' #')}</Body>
          </View>
        )
        : <View style={Styles.contentSpacer} />
      }

      <View style={[Styles.item, Styles.lower]}>
        <View style={Styles.channelNameChip}>
          <Chip type="SECONDARY">{props.data.channel.name}</Chip>
        </View>

        <View style={Styles.chips}>
          {
            new Date(props.data.timeFrom) <= now && new Date(props.data.timeTo) >= now
              ? (
                <Chip bold>Live</Chip>
              )
              : (
                <>
                  <Chip bold style={Styles.chipLeft}>{formatForTimezone(props.data.timeFrom, 'calendar')}</Chip>
                  <Chip bold>{formatForTimezone(props.data.timeFrom, 'HH:mm')} {formatForTimezone(props.data.timeFrom, 'z')}</Chip>
                </>
              )
          }
        </View>
      </View>
    </View>
  );
};

export default StreamCard;
