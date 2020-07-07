/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { STREAM_MESSAGE_FRAGMENT } from '../../fragments/StreamMessage';
import { getStreamMessagesVodVariables, getStreamMessagesVod } from './__generated__/getStreamMessagesVod';

export const GET_STREAM_MESSAGES_VOD_QUERY = gql`
  query getStreamMessagesVod($id: String!, $from: DateTime!, $last: Int!, $before: String){
    getStreamMessagesVod(id: $id, from: $from, last: $last, before: $before){
      messages {
        ...STREAM_MESSAGE_FRAGMENT
      }
      count
    }
  },
  ${STREAM_MESSAGE_FRAGMENT}
`;

export const useGetStreamMessagesVodQuery = (options?: QueryHookOptions<getStreamMessagesVod, getStreamMessagesVodVariables>) => useQuery(GET_STREAM_MESSAGES_VOD_QUERY, options);
