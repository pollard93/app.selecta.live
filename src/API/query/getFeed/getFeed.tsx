import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getFeed } from './__generated__/getFeed';
import { FEED_PAYLOAD_FRAGMENT } from '../../fragments/FeedPayload';

export const GET_FEED_QUERY = gql`
  query getFeed {
    getFeed {
      ...FEED_PAYLOAD_FRAGMENT
    }
  },
  ${FEED_PAYLOAD_FRAGMENT}
`;

export const useGetFeedQuery = (options?: QueryHookOptions<getFeed>) => useQuery(GET_FEED_QUERY, options);
