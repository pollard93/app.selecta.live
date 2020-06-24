import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getFeed } from './__generated__/getFeed';

export const GET_FEED_QUERY = gql`
  query getFeed {
    getFeed {
      items {
        heading
        type
        background
        query
        accessor
        variables
      }
    }
  }
`;

export const useGetFeedQuery = (options?: QueryHookOptions<getFeed>) => useQuery(GET_FEED_QUERY, options);
