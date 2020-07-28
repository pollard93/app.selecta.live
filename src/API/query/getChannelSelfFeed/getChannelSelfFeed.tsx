import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getChannelSelfFeed } from './__generated__/getChannelSelfFeed';
import { FEED_PAYLOAD_FRAGMENT } from '../../fragments/FeedPayload';

export const GET_FEED_CHANNEL_QUERY = gql`
  query getChannelSelfFeed {
    getChannelSelfFeed {
      ...FEED_PAYLOAD_FRAGMENT
    }
  },
  ${FEED_PAYLOAD_FRAGMENT}
`;

export const useGetChannelSelfFeedQuery = (options?: QueryHookOptions<getChannelSelfFeed>) => useQuery(GET_FEED_CHANNEL_QUERY, options);
