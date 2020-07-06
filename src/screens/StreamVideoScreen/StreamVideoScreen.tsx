import React from 'react';
import { ScreenProps } from '../utils/interfaces';
import { useGetStreamProfileQuery } from '../../API/query/getStreamProfile/getStreamProfile';
import LoadRetry from '../../components/UI/LoadRetry/LoadRetry';
import StreamVideo from '../../components/Stream/StreamVideo/StreamVideo';

interface StreamVideoScreenPropsE extends ScreenProps {
  id: string;
}
export interface StreamVideoScreenProps extends StreamVideoScreenPropsE {}

const StreamVideoScreen = (props: StreamVideoScreenProps) => {
  const queryResult = useGetStreamProfileQuery({
    variables: {
      id: props.id,
    },
  });


  /**
   * Load | Retry
   */
  if (queryResult.loading || queryResult.error) {
    return <LoadRetry {...queryResult} />;
  }


  return (
    <StreamVideo data={queryResult.data.getStreamProfile} />
  );
};

export default StreamVideoScreen;

/**
 * Assign screen name as prototype so it's accessible by importing default
 */
StreamVideoScreen.prototype.ScreenName = 'StreamVideoScreen';

/**
 * Export as const so can be imported without the default
 */
export const StreamVideoScreenName = StreamVideoScreen.prototype.ScreenName;
