import React from 'react';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamVideoView from './StreamVideoView';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';

interface StreamVideoProps {
  data: getStreamProfile_getStreamProfile;
}

const StreamVideo = (props: StreamVideoProps) => {
  const queryResult = useGetStreamUrlQuery({
    variables: {
      id: props.data.id,
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
    <StreamVideoView
      // url={queryResult.data.getStreamUrl}
      url="http://192.168.1.19:8080/live/ck9fhvccj001e0712yfzebofu/fZA1SiuYll0FCIzvmJw2Ig/1588169981/test-id.m3u8"
      data={props.data}
    />
  );
};

export default StreamVideo;
