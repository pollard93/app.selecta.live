import React, { FC, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Clipboard from '@react-native-community/clipboard';
import { Navigation } from 'react-native-navigation';
import Styles, { DynamicStyles } from './GoLive.style';
import Body from '../../../UI/Typography/components/Body';
import H1 from '../../../UI/Typography/components/H1';
import { useGetStreamSelfQuery } from '../../../../API/query/getStreamSelf/getStreamSelf';
import LoadRetry from '../../../UI/LoadRetry/LoadRetry';
import { pushToast } from '../../../../modules/Toast';
import Toast from '../../../UI/Toast/Toast';
import Icon, { ICON } from '../../../UI/Icon/Icon';
import { useGetStreamUrlQuery } from '../../../../API/query/getStreamUrl/getStreamUrl';
import GlobalStyles from '../../../../styles/stylesheets/GlobalStyles';
import H4 from '../../../UI/Typography/components/H4';
import Button from '../../../UI/Button/Button';
import { useScreenProps } from '../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import StreamVideo from '../../StreamVideo/StreamVideo';
import { useGoLiveMutation } from '../../../../API/mutation/goLive/goLive';
import { getGQLErrorMessage } from '../../../../utils/functions';
import { useEndLiveMutation } from '../../../../API/mutation/endLive/endLive';
import { pushScreen } from '../../../../screens/utils';
import StreamSelfScreen from '../../../../screens/StreamSelfScreen/StreamSelfScreen';

export interface GoLiveProps {
  id: string;
}

const GoLive: FC<GoLiveProps> = (props) => {
  /**
   * Get stream and url
   */
  const streamSelfQueryResult = useGetStreamSelfQuery({
    variables: { id: props.id },
  });
  const streamUrlQueryResult = useGetStreamUrlQuery({
    variables: { id: props.id },
  });


  /**
   * Misc
   */
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const screenProps = useScreenProps();


  /**
   * State
   */
  const [state, setState] = useState<'WAITING' | 'CONNECTED' | 'LIVE' | 'ENDED'>('WAITING');


  /**
   * Go Live Mutation
   */
  const [goLiveMutation] = useGoLiveMutation({
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
        dismissible: false,
      });
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * End Live Mutation
   */
  const [endLiveMutation] = useEndLiveMutation({
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
            content="Stream hs now ended"
          />
        ),
        dismissible: false,
      });
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
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
   * Load retry
   */
  if (streamSelfQueryResult.loading || streamSelfQueryResult.error) {
    return (
      <LoadRetry {...streamSelfQueryResult} />
    );
  }
  if (streamUrlQueryResult.loading || streamUrlQueryResult.error) {
    return (
      <LoadRetry {...streamUrlQueryResult} />
    );
  }


  /**
   * Set text in clipboard and toast success
   */
  const onCopy = (text: string) => {
    Clipboard.setString(text);

    pushToast({
      duration: 1000,
      component: (
        <Toast content='Copied!' />
      ),
      dismissible: false,
    });
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Button title="back" onPress={() => Navigation.pop(screenProps.componentId)} />
      <H1>Connect Stream</H1>
      <View style={Styles.authKeys}>
        <View style={Styles.authKey}>
          <Body bold>Stream Url: </Body>
          <Body
            style={[Styles.authKeyBody, dynamicStyles.authKeyBody]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {streamSelfQueryResult.data.getStreamSelf.streamUrl}
          </Body>

          <TouchableOpacity onPress={() => onCopy(streamSelfQueryResult.data.getStreamSelf.streamUrl)}>
            <Icon name={ICON.COPY} size="small" />
          </TouchableOpacity>
        </View>

        <View style={Styles.authKey}>
          <Body bold>Stream Key: </Body>
          <TextInput
            editable={false}
            secureTextEntry={true}
            value={streamSelfQueryResult.data.getStreamSelf.streamKey}
            style={[Styles.authKeyBody, dynamicStyles.authKeyBody]}
          />

          <TouchableOpacity onPress={() => onCopy(streamSelfQueryResult.data.getStreamSelf.streamKey)}>
            <Icon name={ICON.COPY} size="small" />
          </TouchableOpacity>
        </View>
      </View>

      <H4>STATE: {state}</H4>

      {state !== 'WAITING' && (
        <View>
          <StreamVideo data={streamSelfQueryResult.data.getStreamSelf} />
        </View>
      )}

      {state === 'CONNECTED' && (
        <Button title="GO LIVE" onPress={() => goLiveMutation()} />
      )}

      {state === 'LIVE' && (
        <View>
          <Button title="END LIVE" onPress={() => endLiveMutation()} />
          <Button title="VIEW STREAM" onPress={() => { pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.id }); }} />
        </View>
      )}
    </View>
  );
};

export default GoLive;
