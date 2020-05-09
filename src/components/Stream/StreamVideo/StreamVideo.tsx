import React from 'react';
// import Video from 'react-native-video';
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


  return null;
};

export default StreamVideo;
