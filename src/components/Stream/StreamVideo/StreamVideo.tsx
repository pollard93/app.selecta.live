import React, { useEffect, FC } from 'react';
import { useApolloClient } from 'react-apollo';
import { useGetStreamUrlLazyQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import StreamVideoView from './StreamVideoView';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/StreamProfile';
import { STREAM_PROFILE_FRAGMENT as STREAM_PROFILE_FRAGMENT_TYPE } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { UPDATE_STREAM_POSITION_MUTATION } from '../../../API/mutation/updateStreamPosition/updateStreamPosition';

interface StreamVideoProps {
  data: getStreamProfile_getStreamProfile;
}

const StreamVideo: FC<StreamVideoProps> = (props) => {
  const client = useApolloClient();

  /**
   * Get stream url lazy query
   * Lazy as a new url may be required to be retrieved if:
   * The users ip address changes (network change)
   * The current stream url expires
   */
  const [query, queryResult] = useGetStreamUrlLazyQuery({
    variables: {
      id: props.data.id,
    },
    fetchPolicy: 'network-only',
  });


  useEffect(() => {
    /**
     * getStreamUrl on mount
     */
    query();


    /**
     * On unmount
     * Send the last position to server
     */
    return async () => {
      try {
        const data = client.readFragment<STREAM_PROFILE_FRAGMENT_TYPE>({
          fragmentName: 'STREAM_PROFILE_FRAGMENT',
          // eslint-disable-next-line no-underscore-dangle
          id: `${props.data.__typename}:${props.data.id}`,
          fragment: STREAM_PROFILE_FRAGMENT,
        });

        if (data.position) {
          await client.mutate({
            mutation: UPDATE_STREAM_POSITION_MUTATION,
            variables: {
              id: props.data.id,
              position: data.position,
            },
          });
        }
      // eslint-disable-next-line no-empty
      } catch (e) {}
    };
  }, []);


  /**
   * Expired url handling
   * When the url changes extract the expiry
   * setTimeout to 1 minute before the expiry to get a new url
   * This is an edge case, users are given ample time with one url and this should rarely be used in production
   */
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') return undefined;

    /**
     * Use the audio url as is always returned
     */
    const url = queryResult.data?.getStreamUrl?.video || queryResult.data?.getStreamUrl?.audio;
    if (url) {
      /**
       * Get the expiry
       */
      const parts = url.split('/');
      const expiry = parseInt(parts[parts.length - 2], 10);
      const expiryDate = new Date(expiry * 1000);

      /**
       * Get how long until expiry - 1 minute
       */
      const now = new Date();
      const timeToExpiry = expiryDate.getTime() - now.getTime() - 60000;

      /**
       * setTimeout to refetch stream url
       */
      const id = setTimeout(() => {
        query();
      }, timeToExpiry);

      /**
       * Clear timeout on cleanup
       */
      return () => {
        clearTimeout(id);
      };
    }

    return undefined;
  }, [queryResult.data?.getStreamUrl?.audio]);


  /**
   * Loading | Error
   * TODO - handle error messages
   */
  if (!queryResult.called || queryResult.loading || queryResult.error) {
    return (
      <LoadRetry {...queryResult} />
    );
  }


  return (
    <StreamVideoView
      url={queryResult.data.getStreamUrl}
      data={props.data}
      query={query}
    />
  );
};

export default StreamVideo;
