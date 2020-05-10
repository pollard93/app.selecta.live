import React, { useEffect, useState } from 'react';
import Video from 'selecta.components.react-native-video';
import { SafeAreaView, Platform } from 'react-native';
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
  /**
   * Paused is used for android only
   */
  const [paused, setPaused] = useState(false);


  useEffect(() => {
    if (Platform.OS === 'android') {
      // Basic Controls
      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);
      MusicControl.enableControl('stop', false);
      MusicControl.enableControl('nextTrack', false);
      MusicControl.enableControl('previousTrack', false);

      // Changing track position on lockscreen
      MusicControl.enableControl('changePlaybackPosition', false);

      // Seeking
      MusicControl.enableControl('seek', false); // Android only
      MusicControl.enableControl('skipForward', false);
      MusicControl.enableControl('skipBackward', false);

      // Android Specific Options
      MusicControl.enableControl('setRating', false);
      MusicControl.enableControl('volume', true); // Only affected when remoteVolume is enabled
      MusicControl.enableControl('remoteVolume', true);

      MusicControl.on(Command.play, () => {
        setPaused(false);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PLAYING,
        });
      });

      MusicControl.on(Command.pause, () => {
        setPaused(true);
        MusicControl.updatePlayback({
          state: MusicControl.STATE_STOPPED,
        });
      });
    }

    return () => {
      if (Platform.OS === 'android') {
        MusicControl.stopControl();
      }
    };
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.PageFill}>
      <Video
        source={{ uri: props.url }}
        // ref={(ref) => {
        //   this.player = ref;
        // }} // Store reference
        onBuffer={console.log} // Callback when remote video is buffering
        onError={console.log} // Callback when video cannot be loaded
        style={styles.wrap}
        onReadyForDisplay={() => {
          if (Platform.OS === 'android') {
            MusicControl.setNowPlaying({
              title: props.data.name,
              artwork: props.data.image.url.small,
              artist: props.data.channel.name,
              // album: 'Thriller',
              // genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
              // duration: 294, // (Seconds)
              // description: '', // Android Only
              // color: '0x000000', // Notification Color - Android Only
              // date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
              // rating: 84, // Android Only (Boolean or Number depending on the type)
              // notificationIcon: 'icon', // Android Only (String), Android Drawable resource name for a custom notification icon
            });

            // Changes the state to paused
            MusicControl.updatePlayback({
              state: MusicControl.STATE_PLAYING,
            });
          }
        }}
        // controls
        ignoreSilentSwitch={'ignore'}
        playWhenInactive={true}
        playInBackground={true}
        nowPlayingInfo={{
          title: props.data.name,
          artist: props.data.channel.name,
          artwork: props.data.image.url.small,
        }}
        rate={paused ? 0 : 1}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export default StreamVideoView;
