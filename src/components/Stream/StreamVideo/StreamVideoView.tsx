import React from 'react';
import Video from 'selecta.components.react-native-video';
import styles from './StreamVideo.styles';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';

interface StreamVideoViewProps {
  url: string;
  data: getStreamProfile_getStreamProfile;
}

const StreamVideoView = (props: StreamVideoViewProps) => (
  <Video
    source={{ uri: props.url }}
    // ref={(ref) => {
    //   this.player = ref;
    // }} // Store reference
    onBuffer={console.log} // Callback when remote video is buffering
    onError={console.log} // Callback when video cannot be loaded
    style={styles.wrap}
    controls
    ignoreSilentSwitch={'ignore'}
    playWhenInactive={true}
    playInBackground={true}
    nowPlayingInfo={{
      title: props.data.name,
      artist: props.data.channel.name,
      artwork: props.data.image.url.small,
    }}
  />
);

export default StreamVideoView;
