import React, { useEffect, FC, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useApolloClient } from 'react-apollo';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useGetStreamUrlLazyQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import StreamVideoView from './StreamVideoView';
import { getStreamProfile_getStreamProfile } from '../../../API/query/getStreamProfile/__generated__/getStreamProfile';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/StreamProfile';
import { STREAM_PROFILE_FRAGMENT as STREAM_PROFILE_FRAGMENT_TYPE } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { STREAM_SELF_FRAGMENT as STREAM_SELF_FRAGMENT_TYPE } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import { UPDATE_STREAM_POSITION_MUTATION } from '../../../API/mutation/updateStreamPosition/updateStreamPosition';
import FullScreenWrap from './components/FullScreenWrap/FullScreenWrap';
import { getStreamSelf_getStreamSelf } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/StreamSelf';
import { canGoLive } from '../../../utils/streamFunctions';
import H4 from '../../UI/Typography/components/H4';
import Styles from './StreamVideo.styles';
import LoadingIcon from '../../UI/LoadingIcon/LoadingIcon';

export interface StreamVideoProps {
  data: getStreamProfile_getStreamProfile | getStreamSelf_getStreamSelf;
  disableFullScreen?: boolean;
  isChannelPreview?: boolean; // Will not display 'about go live' for a channels go live preview
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


  /**
   * getStreamUrl on mount
   */
  useEffect(() => {
    query();


    /**
     * On unmount
     * Send the last position to server
     */
    return async () => {
      try {
        const data = (() => {
          // eslint-disable-next-line no-underscore-dangle
          switch (props.data.__typename) {
            case 'StreamProfile':
              return client.readFragment<STREAM_PROFILE_FRAGMENT_TYPE>({
                fragmentName: 'STREAM_PROFILE_FRAGMENT',
                // eslint-disable-next-line no-underscore-dangle
                id: `${props.data.__typename}:${props.data.id}`,
                fragment: STREAM_PROFILE_FRAGMENT,
              });

            case 'StreamSelf':
              return client.readFragment<STREAM_SELF_FRAGMENT_TYPE>({
                fragmentName: 'STREAM_SELF_FRAGMENT',
                // eslint-disable-next-line no-underscore-dangle
                id: `${props.data.__typename}:${props.data.id}`,
                fragment: STREAM_SELF_FRAGMENT,
              });

            default:
              return null;
          }
        })();

        if (data && data.position) {
          await client.mutate({
            mutation: UPDATE_STREAM_POSITION_MUTATION,
            variables: {
              id: props.data.id,
              position: data.position,
            },
          });
        } else {
          /**
           * Update stream position with 0 to remove live consumer
           */
          await client.mutate({
            mutation: UPDATE_STREAM_POSITION_MUTATION,
            variables: {
              id: props.data.id,
              position: 0,
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
   * When stream becomes live (from poll)
   * And there is an error already on getStreamUrl (prevent refetching if live)
   * Then refetch the stream url
   */
  useEffect(() => {
    if (queryResult.error && props.data.timeFromLive) {
      query();
    }
  }, [props.data.timeFromLive]);


  /**
   * Listen for network changes to the ip or cellular
   * If they change, request a new url
   */
  const netInfoState = useRef<NetInfoState>();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (netInfoState.current && state.isConnected) {
        if (
          netInfoState.current.type !== state.type
          || netInfoState.current.details.ipAddress !== state.details.ipAddress
        ) {
          query();
        }
      }

      netInfoState.current = state;
    });

    // Unsubscribe
    return () => unsubscribe();
  }, []);


  /**
   * Disable full screen
   */
  if (props.disableFullScreen) {
    /**
     * Handle about to go live
     */
    // eslint-disable-next-line no-underscore-dangle
    if (!props.isChannelPreview && !props.data.timeFromLive && canGoLive(props.data)) {
      return (
        <View style={[StyleSheet.absoluteFillObject, Styles.goLive]}>
          <H4 forceLight style={Styles.goLiveText}>About to go live!</H4>
          <LoadingIcon size="small" />
        </View>
      );
    }


    /**
     * Loading | Error
     */
    if (!queryResult.called || queryResult.loading || queryResult.error) {
      return null;
    }


    return (
      <StreamVideoView
        url={queryResult.data.getStreamUrl}
        data={props.data}
        query={query}
      />
    );
  }


  return (
    <FullScreenWrap {...props}>
      {({ toggleFullScreen, isFullScreen }) => {
        /**
         * Handle about to go live
         */
        // eslint-disable-next-line no-underscore-dangle
        if (!props.isChannelPreview && !props.data.timeFromLive && canGoLive(props.data)) {
          return (
            <View style={[StyleSheet.absoluteFillObject, Styles.goLive]}>
              <H4 forceLight style={Styles.goLiveText}>About to go live!</H4>
              <LoadingIcon size="small" />
            </View>
          );
        }


        /**
         * Loading | Error
         */
        if (!queryResult.called || queryResult.loading || queryResult.error) {
          return null;
        }


        return (
          <StreamVideoView
            url={queryResult.data.getStreamUrl}
            data={props.data}
            query={query}
            toggleFullScreen={toggleFullScreen}
            isFullScreen={isFullScreen}
          />
        );
      }}
    </FullScreenWrap>
  );
};

export default StreamVideo;
