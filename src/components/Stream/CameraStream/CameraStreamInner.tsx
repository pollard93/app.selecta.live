import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NodeCameraView } from 'react-native-nodemediaclient';
import Orientation from 'react-native-orientation';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { closeCameraOverlay } from '../../../screens/utils';
import { useGoLiveMutation } from '../../../API/mutation/goLive/goLive';
import { useEndLiveMutation } from '../../../API/mutation/endLive/endLive';
import { pushToast } from '../../../modules/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { GoLiveState, usePollSelfLive } from '../../../utils/streamFunctions';
import Toast from '../../UI/Toast/Toast';
import CameraStreamControls from './components/CameraStreamControls/CameraStreamControls';
import Button from '../../UI/Button/Button';
import Styles from './CameraStream.style';

export interface CameraStreamInnerProps {
  id: string;
  onComplete: () => void; // Called when stream is complete
}

const CameraStreamInner: FC<CameraStreamInnerProps> = (props) => {
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
   * Start polling liveConsumers
   */
  usePollSelfLive(props.id);


  /**
   * Streaming controls
   */
  const [streaming, ss] = useState(false);
  const st = useRef<any>();
  const setStreaming = (v: boolean) => {
    if (v) {
      st.current.start();
    } else {
      st.current.stop();
    }
    ss(v);
  };


  /**
   * Stop streaming on unmount
   */
  useEffect(() => () => {
    try {
      st.current.stop();
    // eslint-disable-next-line no-empty
    } catch {}
  }, []);


  /**
   * State
   */
  const [state, setState] = useState<GoLiveState>('WAITING');


  /**
   * On Cancel
   */
  const onCancel = (complete = false) => {
    Orientation.lockToPortrait();

    setTimeout(() => {
      closeCameraOverlay();

      if (complete) {
        props.onComplete();
      }
    }, 0);
  };


  /**
   * Go Live Mutation
   */
  const [goLiveMutation, { loading: goLiveLoading }] = useGoLiveMutation({
    variables: {
      id: props.id,
    },
    onCompleted: () => {
      setState('LIVE');
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
      onCancel(true);
    },
    onError: (e) => {
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
   * On go live
   */
  const onGoLive = () => {
    setState('LIVE_CONFIRM');
  };


  /**
   * On go live
   */
  const onGoLiveCancel = () => {
    setState('CONNECTED');
  };


  /**
   * On go live
   */
  const onGoLiveConfirm = () => {
    goLiveMutation();
  };


  /**
   * On end live
   */
  const onEndLive = () => {
    setState('END_CONFIRM');
  };


  /**
   * On end live
   */
  const onEndLiveCancel = () => {
    setState('LIVE');
  };


  /**
   * On end live
   */
  const onEndLiveConfirm = () => {
    endLiveMutation();
  };


  /**
   * Lock to landscape
   */
  useEffect(() => {
    Orientation.lockToLandscapeRight();

    return () => {
      Orientation.lockToPortrait();
    };
  }, []);


  /**
   * Load retry
   */
  if (streamSelfQueryResult.loading || streamSelfQueryResult.error) {
    return (
      <SafeAreaView style={GlobalStyles.PageFill}>
        <LoadRetry cover {...streamSelfQueryResult} />

        <View style={Styles.controls}>
          <Button
            title='Cancel'
            onPress={() => onCancel(false)}
            type="SECONDARY"
          />
        </View>
      </SafeAreaView>
    );
  }
  if (streamUrlQueryResult.loading || streamUrlQueryResult.error) {
    return (
      <SafeAreaView style={GlobalStyles.PageFill}>
        <LoadRetry cover {...streamUrlQueryResult} />

        <View style={Styles.controls}>
          <Button
            title='Cancel'
            onPress={() => onCancel(false)}
            type="SECONDARY"
          />
        </View>
      </SafeAreaView>
    );
  }


  return (
    <View style={GlobalStyles.PageFill}>
      <View style={GlobalStyles.PageFill}>
        <NodeCameraView
          style={StyleSheet.absoluteFillObject}
          ref={(vb) => { st.current = vb; }}
          outputUrl = {`${streamSelfQueryResult.data?.getStreamSelf.streamUrl}/${streamSelfQueryResult.data?.getStreamSelf.streamKey}`}
          camera={{ cameraId: 0, cameraFrontMirror: false }}
          audio={{ bitrate: 320000, profile: 0, samplerate: 44100 }}
          video={{ preset: 5, bitrate: 3500000, profile: 2, fps: 30, videoFrontMirror: false }}
          autopreview={true}
        />

        <CameraStreamControls
          endLiveLoading={endLiveLoading}
          goLiveLoading={goLiveLoading}
          onCancel={() => onCancel(false)}
          onEndLive={onEndLive}
          onEndLiveCancel={onEndLiveCancel}
          onEndLiveConfirm={onEndLiveConfirm}
          onGoLive={onGoLive}
          onGoLiveCancel={onGoLiveCancel}
          onGoLiveConfirm={onGoLiveConfirm}
          setStreaming={setStreaming}
          state={state}
          streaming={streaming}
          liveConsumers={streamSelfQueryResult.data?.getStreamSelf?.liveConsumersEdge || 0}
        />
      </View>
    </View>
  );
};

export default CameraStreamInner;
