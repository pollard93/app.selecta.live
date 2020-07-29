import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { getChannelProfileFeed, getChannelProfileFeedVariables } from './__generated__/getChannelProfileFeed';
import { FEED_PAYLOAD_FRAGMENT } from '../../fragments/FeedPayload';

export const GET_FEED_CHANNEL_QUERY = gql`
  query getChannelProfileFeed($id: String!){
    getChannelProfileFeed(id: $id){
      ...FEED_PAYLOAD_FRAGMENT
    }
  },
  ${FEED_PAYLOAD_FRAGMENT}
`;

export const useGetChannelProfileFeedQuery = (options?: QueryHookOptions<getChannelProfileFeed, getChannelProfileFeedVariables>) => useQuery(GET_FEED_CHANNEL_QUERY, options);
