import gql from 'graphql-tag';
import { QueryHookOptions, useQuery, useLazyQuery } from 'react-apollo';
import { CHANNEL_SELF_FRAGMENT } from '../../fragments/ChannelSelf';
import { getChannelSelf } from './__generated__/getChannelSelf';

export const GET_CHANNEL_SELF_QUERY = gql`
  query getChannelSelf {
    getChannelSelf {
      ...CHANNEL_SELF_FRAGMENT
    }
  },
  ${CHANNEL_SELF_FRAGMENT}
`;

export const useGetChannelSelfQuery = (options?: QueryHookOptions<getChannelSelf>) => useQuery(GET_CHANNEL_SELF_QUERY, options);
export const useGetChannelSelfLazyQuery = (options?: QueryHookOptions<getChannelSelf>) => useLazyQuery(GET_CHANNEL_SELF_QUERY, options);
