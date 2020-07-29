import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getHomeFeed } from './__generated__/getHomeFeed';
import { FEED_PAYLOAD_FRAGMENT } from '../../fragments/FeedPayload';

export const GET_HOME_FEED_QUERY = gql`
  query getHomeFeed {
    getHomeFeed {
      ...FEED_PAYLOAD_FRAGMENT
    }
  },
  ${FEED_PAYLOAD_FRAGMENT}
`;

export const useGetHomeFeedQuery = (options?: QueryHookOptions<getHomeFeed>) => useQuery(GET_HOME_FEED_QUERY, options);
