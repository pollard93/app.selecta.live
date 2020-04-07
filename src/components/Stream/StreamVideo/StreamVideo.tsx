import React from 'react';
import Video from 'react-native-video';
import Config from 'react-native-config';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import styles from './StreamVideo.styles';

interface StreamVideoProps {
  id: string;
}

const StreamVideo = (props: StreamVideoProps) => {
  const queryResult = useGetStreamUrlQuery({
    variables: {
      id: props.id,
    },
  });


  /**
   * Loading | Error
   * TODO - handle error messages
   */
  if (queryResult.loading || queryResult.error) {
    return (
      <LoadRetry {...queryResult} />
    );
  }


  return (
    <Video
      source={{ uri: Config.REACT_APP_APP_TEST_STREAM_URL }} // Can be a URL or a local file.
      // ref={(ref) => {
      //   this.player = ref;
      // }} // Store reference
      onBuffer={console.log} // Callback when remote video is buffering
      onError={console.log} // Callback when video cannot be loaded
      style={styles.wrap}
    />
  );
};

export default StreamVideo;
