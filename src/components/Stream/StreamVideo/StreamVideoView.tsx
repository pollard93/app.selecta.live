import React, { useEffect, useState, useRef, FC } from 'react';
import Video from 'selecta.components.react-native-video';
import { Platform, View } from 'react-native';
import MusicControl from 'react-native-music-control';
import { Command } from 'react-native-music-control/lib/types';
import { QueryHookOptions } from 'react-apollo';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import { getStreamUrl_getStreamUrl, getStreamUrlVariables } from '../../../API/query/getStreamUrl/__generated__/getStreamUrl';
import StreamControls from './components/StreamControls/StreamControls';


interface StreamVideoViewProps {
  url: getStreamUrl_getStreamUrl;
  data: getStreamProfile_getStreamProfile;
  query: (options?: QueryHookOptions<getStreamUrlVariables>) => void;
  updatePosition: (position: number) => void;
}


/**
 * MusicControl is only used for android
 * nowPlayingInfo is handled natively in selecta.components.react-native-video
*/
const StreamVideoView: FC<StreamVideoViewProps> = (props) => {
  const [rate, setRate] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [playableDuration, setPlayableDuration] = useState(0);
  const [buffering, setBuffering] = useState(true);
  const [error, setError] = useState(false);
  const player = useRef(null);

  // Live is determined from the url given, initial state null
  const [live, setLive] = useState<boolean>(null);

  // Determin url based on disableVideo
  const [disableVideo, setDisableVideo] = useState<boolean>(false);
  const url = disableVideo ? props.url.audio : props.url.video;


  /**
   * Now playing controls for android
   */
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
   * Dynamic controls for android
   */
  useEffect(() => {
    if (Platform.OS === 'android') {
      MusicControl.on(Command.skipForward, () => {
        player.current.seek(props.data.position + 15);
      });

      MusicControl.on(Command.skipBackward, () => {
        player.current.seek(props.data.position - 15);
      });

      MusicControl.on(Command.seek, (pos) => {
        player.current.seek(pos);
      });
    }
  }, [props.data.position]);


  /**
   * On unmount
   * If the video is not live
   * updatePosition
   */
  const currentPosition = useRef(0);
  useEffect(() => {
    if (!live) return undefined;
    return () => {
      if (currentPosition.current) {
        props.updatePosition(currentPosition.current);
      }
    };
  }, [live]);


  return (
    <View style={{ position: 'absolute', width: '100%', aspectRatio: 1.777777777777778 }}>
      <Video
        source={{ uri: url }}
        automaticallyWaitsToMinimizeStalling
        ref={player}
        onBuffer={({ isBuffering }) => {
          if (!isBuffering && buffering) {
            setBuffering(false);
            return;
          }
          if (isBuffering && !buffering) {
            setBuffering(true);
          }
        }}
        onError={(...args) => {
          console.log('StreamVideoView -> args', args);
          setError(true);
        }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
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
         * ALL OS PROPS
         * */
        onLoad={(data) => {
          /**
           * If there is a position on load then try and seek to it
           */
          if (props.data.position) {
            player.current.seek(props.data.position);
          }


          /**
           * Set rate to 1 now video is ready to play
           * Uncomment to autoPlay
           */
          // setRate(1);


          /**
           * Set duration and live
           */
          if (data.duration <= 0) {
            setLive(true);
          } else {
            setLive(false);
            setDuration(Math.floor(data.duration));
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
        onReadyForDisplay={() => {
          setLoading(false);
        }}
        onProgress={((args) => {
          if (live === false) {
            const { currentTime } = args;
            currentPosition.current = currentTime;
            setPlayableDuration(args.playableDuration);


            /**
             * On Video Progress (ANDROID)
             * Update now playing info
             */
            if (Platform.OS === 'android') {
              MusicControl.updatePlayback({
                elapsedTime: currentTime,
              });
            }
          }
        })}
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
          currentPosition.current = 0;
          props.updatePosition(0);

          if (Platform.OS === 'android') {
            MusicControl.updatePlayback({
              state: MusicControl.STATE_STOPPED,
              elapsedTime: 0,
            });
          }

          /**
           * If live, get a new url to reset the view as VOD
           */
          if (live) {
            props.query();
          }
        }}
      />


      <StreamControls
        isPlaying={rate === 1}
        onPlayPause={() => setRate(rate === 1 ? 0 : 1)}
        duration={duration}
        onSeek={(position) => {
          player.current.seek(position);
        }}
        playableDuration={playableDuration}
        initialPosition={props.data.position}
        isLoading={loading}
        isBuffering={buffering}
        isError={error}
        isLive={live}
      />


      {/* <Button
        title={disableVideo ? 'Enable video' : 'Disable video'}
        onPress={() => {
          setDisableVideo(!disableVideo);
        }}
      /> */}
    </View>
  );
};

export default StreamVideoView;
