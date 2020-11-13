import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import { pushToast } from '../../../modules/Toast';
import Toast from '../../UI/Toast/Toast';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { useGoLiveMutation } from '../../../API/mutation/goLive/goLive';
import { getGQLErrorMessage } from '../../../utils/functions';
import { useEndLiveMutation } from '../../../API/mutation/endLive/endLive';
import GoLiveView from './GoLiveView';
import ChannelSelfHeader from '../../UI/Headers/ChannelSelfHeader/ChannelSelfHeader';
import { GoLiveState } from '../../../utils/streamFunctions';

export interface GoLiveProps {
  id: string;
}

const GoLive: FC<GoLiveProps> = (props) => {
  /**
   * Get stream and url
   */
  const streamSelfQueryResult = useGetStreamSelfQuery({
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  });
  const streamUrlQueryResult = useGetStreamUrlQuery({
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  });


  /**
   * Misc
   */
  const screenProps = useScreenProps();


  /**
   * State
   */
  const [state, setState] = useState<GoLiveState>('WAITING');


  /**
   * Go Live Mutation
   */
  const [goLiveMutation, { loading: goLiveLoading }] = useGoLiveMutation({
    variables: {
      id: props.id,
    },
    onCompleted: () => {
      setState('LIVE');

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Stream is now live"
          />
        ),
        dismissible: true,
      });
    },
    onError: (e) => {
      setState('CONNECTED');

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: true,
      });
    },
  });


  /**
   * End Live Mutation
   */
  const [endLiveMutation, { loading: endLiveLoading }] = useEndLiveMutation({
    variables: {
      id: props.id,
    },
    onCompleted: () => {
      setState('ENDED');

      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="SUCCESS"
            content="Stream has now ended"
          />
        ),
        dismissible: true,
      });
    },
    onError: (e) => {
      /**
       * Back to live
       */
      setState('LIVE');


      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: true,
      });
    },
  });


  /**
   * Poll the master playlist and setConnected when live
   */
  const interval = useRef<number>();
  useEffect(() => {
    /**
     * If timeFromLive is set, then the stream is already live
     */
    if (streamSelfQueryResult.data?.getStreamSelf.timeFromLive) {
      setState('LIVE');
      return undefined;
    }

    if (state === 'WAITING' && streamUrlQueryResult.data?.getStreamUrl) {
      const videoUrl = streamUrlQueryResult.data?.getStreamUrl.video || streamUrlQueryResult.data?.getStreamUrl.audio;
      interval.current = setInterval(async () => {
        try {
          /**
           * Handle video
           */
          const res = await fetch(videoUrl);
          if (res.status !== 200) throw new Error();

          /**
           * Get all files in master playlist and check they have been produced
           */
          const playlists = (await res.text()).match(/^(.*?).m3u8$/gm);
          const replace = videoUrl.split('/').pop();

          for (const playlist of playlists) {
            const playlistUrl = videoUrl.replace(replace, playlist);
            const playlistRes = await fetch(playlistUrl);
            if (playlistRes.status !== 200) throw new Error();
          }

          // If no errors have occured, clear interval and set state to connected
          clearInterval(interval.current);
          setState('CONNECTED');
        // eslint-disable-next-line no-empty
        } catch {}
      }, 1000);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [streamSelfQueryResult.data?.getStreamSelf, streamUrlQueryResult.data?.getStreamUrl]);


  /**
   * On go live confirm action
   */
  const onGoLive = () => {
    Alert.alert(
      'Are you sure you want to go live?',
      'Users will be notified and can access this stream.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => goLiveMutation() },
      ],
    );
  };


  /**
   * On end live
   */
  const onStartEndLive = () => {
    setState('END_CONFIRM');
  };


  /**
   * On end live
   */
  const onCancelEndLive = () => {
    setState('LIVE');
  };


  /**
   * On end live
   */
  const onEndLive = () => {
    endLiveMutation();
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <ChannelSelfHeader onPop={() => Navigation.pop(screenProps.componentId)} />
      <View style={GlobalStyles.PageFill}>
        <GoLiveView
          id={props.id}
          state={state}
          streamSelfQueryResult={streamSelfQueryResult}
          streamUrlQueryResult={streamUrlQueryResult}
          onGoLive={onGoLive}
          goLiveLoading={goLiveLoading}
          onStartEndLive={onStartEndLive}
          onCancelEndLive={onCancelEndLive}
          onEndLive={onEndLive}
          endLiveLoading={endLiveLoading}
        />
      </View>
    </View>
  );
};

export default GoLive;
