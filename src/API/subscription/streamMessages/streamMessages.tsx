/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { STREAM_MESSAGE_FRAGMENT } from '../../fragments/StreamMessage';

export const STREAM_MESSAGES_SUBSCRIPTION = gql`
  subscription streamMessages($id: String!){
    streamMessages(id: $id){
      mutation
      updatedFields
      node {
        ...STREAM_MESSAGE_FRAGMENT
      }
    }
  },
  ${STREAM_MESSAGE_FRAGMENT}
`;
