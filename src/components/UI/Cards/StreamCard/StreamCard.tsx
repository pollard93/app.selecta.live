import React, { FC, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AsyncImage } from 'mbp-components-rn-asyncimage';
import { useDynamicValue } from 'react-native-dynamic';
import { Navigation, OptionsModalTransitionStyle } from 'react-native-navigation';
import { STREAM_PROFILE_FRAGMENT_SHORT } from '../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT_SHORT';
import Body from '../../Typography/components/Body';
import H4 from '../../Typography/components/H4';
import Chip from '../../Chip/Chip';
import Styles, { DynamicStyles } from './StreamCard.style';
import ShareButton from '../../ShareButton/ShareButton';
import { STREAM_SELF_FRAGMENT } from '../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { getStreamDurationMs } from '../../../../utils/streamFunctions';
import Icon, { ICON } from '../../Icon/Icon';
import { openModalScreen } from '../../../../screens/utils';
import ReportStream from '../../../Stream/ReportStream/ReportStream';
import StreamCardTime from './components/StreamCardTime/StreamCardTime';

export interface StreamCardProps {
  data: STREAM_PROFILE_FRAGMENT_SHORT | STREAM_SELF_FRAGMENT;
  fillHeight?: boolean; // Sets flex: 1 on wrapper to fill the height, used for displaying in feed
  showPosition?: boolean;
}

const StreamCard: FC<StreamCardProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const width = useMemo(() => `${((props.data.position * 1000) / getStreamDurationMs(props.data)) * 100}%`, [props.data.position]);


  /**
   * On report stream
   */
  const onReportStream = () => {
    openModalScreen({
      component: (
        <ReportStream
          id={props.data.id}
          onClosed={() => {
            Navigation.dismissModal('REPORT_STREAM');
          }}
        />
      ),
    }, 'REPORT_STREAM', OptionsModalTransitionStyle.crossDissolve);
  };


  return (
    <View style={[Styles.wrap, dynamicStyles.wrap, props.fillHeight && Styles.fillHeight]}>
      <AsyncImage
        splashUrl={props.data.image?.url.splash}
        fullUrl={props.data.image?.url.large}
        containerProps={{
          style: Styles.image,
        }}
      />

      <View>
        {props.showPosition && props.data.position > 0 && (
          <>
            <View style={[Styles.position, Styles.positionBackground]} />
            <View style={[Styles.position, { width }]} />
          </>
        )}

        <View style={[Styles.item, Styles.header]}>
          <H4
            numberOfLines={2}
            ellipsizeMode="tail"
            style={Styles.name}
          >
            {props.data.name}
          </H4>

          <View style={Styles.icons}>
            {/* eslint-disable-next-line no-underscore-dangle */}
            {props.data.__typename === 'StreamProfile' && (
              <TouchableOpacity onPress={onReportStream}>
                <Icon name={ICON.FLAG} size="small" />
              </TouchableOpacity>
            )}

            <ShareButton
              title="Share Stream"
              uri={`share/stream/${props.data.id}`}
              iconProps={{
                size: 'small',
                style: Styles.shareIcon,
              }}
            />
          </View>
        </View>
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
          <StreamCardTime {...props} />
        </View>
      </View>
    </View>
  );
};

export default StreamCard;
