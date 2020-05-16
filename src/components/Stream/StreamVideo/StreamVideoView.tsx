import React, { useEffect, useState, useRef } from 'react';
import Video from 'selecta.components.react-native-video';
import { SafeAreaView, Platform, Text, View, Button } from 'react-native';
import MusicControl from 'react-native-music-control';
import { Command } from 'react-native-music-control/lib/types';
import styles from './StreamVideo.styles';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';

interface StreamVideoViewProps {
  url: string;
  data: getStreamProfile_getStreamProfile;
}


/**
 * MusicControl is only used for android
 * nowPlayingInfo is handled natively in selecta.components.react-native-video
 */
const StreamVideoView = (props: StreamVideoViewProps) => {
  const [rate, setRate] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [paused, setPaused] = useState(false);
  const player = useRef(null);

  // Live is determined from the url given, initial state null
  const [live, setLive] = useState<boolean>(null);


  useEffect(() => {
    if (live === null) return undefined;

    /**
     * Android now playing controls
     */
    if (Platform.OS === 'android') {
      // Basic Controls
      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);
      MusicControl.enableControl('stop', false);
      MusicControl.enableControl('nextTrack', false);
      MusicControl.enableControl('previousTrack', false);

      // Changing track position on lockscreen
      MusicControl.enableControl('changePlaybackPosition', !live);

      // Seeking
      MusicControl.enableControl('seek', !live); // Android only
      MusicControl.enableControl('skipForward', !live);
      MusicControl.enableControl('skipBackward', !live);

      // Android Specific Options
      MusicControl.enableControl('setRating', false);
      MusicControl.enableControl('volume', true); // Only affected when remoteVolume is enabled
      MusicControl.enableControl('remoteVolume', true);

      /**
       * Handle events
       */
      MusicControl.on(Command.play, () => {
        setRate(1);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
        });
      });

      MusicControl.on(Command.pause, () => {
        setRate(0);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PAUSED,
        });
      });
    }

    return () => {
      if (Platform.OS === 'android') {
        MusicControl.stopControl();
      }
    };
  }, [live]);


  /**
   * Dynamic controls
   */
  useEffect(() => {
    if (Platform.OS === 'android') {
      MusicControl.on(Command.skipForward, () => {
        player.current.seek(progress + 15);
      });

      MusicControl.on(Command.skipBackward, () => {
        player.current.seek(progress - 15);
      });

      MusicControl.on(Command.seek, (pos) => {
        player.current.seek(pos);
      });
    }
  }, [progress]);


  return (
    <SafeAreaView style={[GlobalStyles.PageFill, { paddingVertical: 50 }]}>
      <Video
        source={{ uri: props.url }}
        ref={player}
        onBuffer={console.log} // Callback when remote video is buffering
        onError={console.log} // Callback when video cannot be loaded
        style={styles.wrap}
        ignoreSilentSwitch={'ignore'}
        playWhenInactive={true}
        playInBackground={true}
        resizeMode="contain"
        rate={rate}

        /**
         * IOS PROPS
         * */
        nowPlayingInfo={{
          title: `${props.data.name}${live ? ' (LIVE)' : ''}`,
          artist: props.data.channel.name,
          artwork: props.data.image.url.small,
        }}

        /**
         * ANDROID PROPS
         * */
        onLoad={(data) => {
          /**
           * Set duration and live
           */
          if (data.duration <= 0) {
            setLive(true);
          } else {
            setLive(false);
            setDuration(data.duration);
          }

          /**
           * On Load (ANDROID)
           * Set now playing info
           */
          if (Platform.OS === 'android') {
            MusicControl.setNowPlaying({
              title: `${props.data.name}${live ? ' (LIVE)' : ''}`,
              artwork: props.data.image.url.small,
              artist: props.data.channel.name,
              // album: 'Thriller',
              // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
              duration: data.duration, // (Seconds)
              // description: '', // Android Only
              // color: '0x000000', // Notification Color - Android Only
              // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
              // rating: 84, // Android Only (Boolean or Number depending on the type)
              // notificationIcon: 'icon', // Android Only (String), Android Drawable resource name for a custom notification icon
            });

            // Changes the state to playing
            MusicControl.updatePlayback({
              state: MusicControl.STATE_PLAYING,
              elapsedTime: data.duration >= 0 ? data.currentTime : undefined,
            });
          }
        }}
        onProgress={!live ? (({ currentTime }) => {
          /**
           * Set progress if not live
           */
          setProgress(currentTime);

          /**
           * On Video Progress (ANDROID)
           * Update now playing info
           */

          if (Platform.OS === 'android') {
            MusicControl.updatePlayback({
              elapsedTime: currentTime,
            });
          }
        }) : undefined}
        onPlaybackRateChangeFromNowPlaying={Platform.OS === 'ios' ? (({ playbackRate }) => {
          /**
           * Set playback rate on ios to allow the control from lock screen
           */
          setRate(playbackRate);
        }) : undefined}
        onVideoEnd={() => {
          /**
           * Seek to the beginning and stop
           */
          setRate(0);
          player.current.seek(0);

          if (Platform.OS === 'android') {
            MusicControl.updatePlayback({
              state: MusicControl.STATE_STOPPED,
              elapsedTime: 0,
            });
          }
        }}
      />

      {
        live === null
          ? <Text>LOADING</Text>
          : (
            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
              {
                live === false && (
                  <>
                    <Text>Progress: {progress.toFixed(2)}</Text>
                    <Text>Duration: {duration.toFixed(2)}</Text>
                  </>
                )
              }
              {
                rate === 0
                  ? (
                    <Button
                      title='Play'
                      onPress={() => {
                        setRate(1);
                      }}
                    />
                  )
                  : (
                    <Button
                      title={live ? 'Stop' : 'Pause'}
                      onPress={() => {
                        setRate(0);
                      }}
                    />
                  )
              }
            </View>
          )
      }
    </SafeAreaView>
  );
};

export default StreamVideoView;
