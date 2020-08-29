import React, { FC, useMemo, useState, useRef, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { STREAM_PROFILE_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { useStreamStart } from '../../../../../utils/streamFunctions';
import StreamMessagesVod from '../../../../StreamMessage/StreamMessagesVod/StreamMessagesVod';
import StreamMessages from '../../../../StreamMessage/StreamMessages/StreamMessages';
import StreamComments from '../../../../StreamComment/StreamComments/StreamComments';
import color from '../../../../../styles/definitions/color';
import Styles from './StreamCommunication.styles';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import Switch from '../../../../UI/Form/components/Switch/Switch';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';

interface StreamCommunicationProps {
  data: STREAM_PROFILE_FRAGMENT | STREAM_SELF_FRAGMENT;
}

const StreamCommunication: FC<StreamCommunicationProps> = (props) => {
  const window = useRef(Dimensions.get('window')).current;
  const [update, forceUpdate] = useState({});


  /**
   * When toggle changes, set the scrollview
   */
  const [viewingLiveMessages, setLiveMessages] = useState(true);
  const scrollViewRef = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    scrollViewRef.current?.scrollTo({ x: viewingLiveMessages ? 0 : window.width, y: 0, animated: true });
  }, [viewingLiveMessages]);


  /**
   * Should load stream messsages if:
   * The stream has started or is vod
   * The stream is not cancelled
   */
  const now = useMemo(() => new Date(), [update]);
  const shouldLoadStreamMessages = useMemo(() => new Date(props.data.timeFrom) <= now && props.data.cancelled === null, [update]);


  /**
   * If the stream has finished render <StreamMessagesVod />
   */
  const hasFinished = useMemo(() => new Date(props.data.timeTo) < now, [update]);


  /**
   * If the stream is live <StreamMessages />
   */
  const isLive = useMemo(() => new Date(props.data.timeFrom) <= now && new Date(props.data.timeTo) >= now, [update]);


  /**
   * When the stream starts, if it hasn't already, forceUpdate this view
   */
  useStreamStart(props.data.timeFrom, () => forceUpdate({}));


  /**
   * If shouldLoadStreamMessages is false
   * Render <StreamComments /> only
   * Always render <StreamComments />
   */
  if (!shouldLoadStreamMessages) {
    return <StreamComments data={props.data} />;
  }


  return (
    <View style={Styles.wrap}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        onMomentumScrollEnd={(e) => {
          if (e.nativeEvent.contentOffset.x === 0) {
            if (!viewingLiveMessages) {
              setLiveMessages(true);
            }
          } else if (viewingLiveMessages) {
            setLiveMessages(false);
          }
        }}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ width: window.width }}>
          {hasFinished && <StreamMessagesVod data={props.data} />}
          {isLive && <StreamMessages data={props.data} />}
        </View>
        <View style={{ width: window.width }}>
          <StreamComments data={props.data} />
        </View>
      </ScrollView>

      <View style={Styles.toggleWrap}>
        <Icon name={ICON.CHAT} size="small" animated style={viewingLiveMessages && { tintColor: color.accent.primary }} />
        <Switch
          value={viewingLiveMessages}
          onValueChange={setLiveMessages}
          style={Styles.toggle}
        />
        <Icon name={ICON.NOTES} size="small" animated style={!viewingLiveMessages && { tintColor: color.accent.primary }} />
      </View>
    </View>
  );
};

export default StreamCommunication;
