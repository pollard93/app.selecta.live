/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { STREAM_MESSAGE_FRAGMENT } from '../../fragments/StreamMessage';

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
