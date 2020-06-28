import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getChannelFeed, getChannelFeedVariables } from './__generated__/getChannelFeed';
import { FEED_PAYLOAD_FRAGMENT } from '../../fragments/FeedPayload';

export const GET_FEED_CHANNEL_QUERY = gql`
  query getChannelFeed($id: String!){
    getChannelFeed(id: $id){
      ...FEED_PAYLOAD_FRAGMENT
    }
  },
  ${FEED_PAYLOAD_FRAGMENT}
`;

export const useGetChannelFeedQuery = (options?: QueryHookOptions<getChannelFeed, getChannelFeedVariables>) => useQuery(GET_FEED_CHANNEL_QUERY, options);
