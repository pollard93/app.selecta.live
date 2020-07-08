import React, { FC, useMemo, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { STREAM_PROFILE_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { useStreamStart } from '../../../../../utils/streamFunctions';
import StreamMessagesVod from '../../../../StreamMessage/StreamMessagesVod/StreamMessagesVod';
import StreamMessages from '../../../../StreamMessage/StreamMessages/StreamMessages';
import StreamComments from '../../../../StreamComment/StreamComments/StreamComments';

interface StreamCommunicationProps {
  data: STREAM_PROFILE_FRAGMENT;
}

const StreamCommunication: FC<StreamCommunicationProps> = (props) => {
  const window = useRef(Dimensions.get('window')).current;
  const [update, forceUpdate] = useState({});


  /**
   * Should load stream messsages if:
   * The stream has started or is vod
   * The user is a consumer
   * The stream is not cancelled
   */
  const now = useMemo(() => new Date(), [update]);
  const shouldLoadStreamMessages = useMemo(() => new Date(props.data.timeFrom) <= now && props.data.isConsumer && props.data.cancelled === null, [update]);


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
    return <StreamComments id={props.data.id} />;
  }


  return (
    <ScrollView
      horizontal
      pagingEnabled
    >
      <View style={{ width: window.width }}>
        {hasFinished && <StreamMessagesVod id={props.data.id} />}
        {isLive && <StreamMessages id={props.data.id} />}
      </View>
      <View style={{ width: window.width }}>
        <StreamComments id={props.data.id} />
      </View>
    </ScrollView>
  );
};

export default StreamCommunication;
