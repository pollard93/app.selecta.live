/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { STREAM_MESSAGE_FRAGMENT } from '../../fragments/StreamMessage';
import { getStreamMessagesVariables, getStreamMessages } from './__generated__/getStreamMessages';

export const GET_STREAM_MESSAGES_QUERY = gql`
  query getStreamMessages($id: String!, $first: Int, $after: String){
    getStreamMessages(id: $id, first: $first, after: $after){
      messages {
        ...STREAM_MESSAGE_FRAGMENT,
      }
      count
    }
  },
  ${STREAM_MESSAGE_FRAGMENT}
`;

export const useGetStreamMessagesQuery = (options?: QueryHookOptions<getStreamMessages, getStreamMessagesVariables>) => useQuery(GET_STREAM_MESSAGES_QUERY, options);
