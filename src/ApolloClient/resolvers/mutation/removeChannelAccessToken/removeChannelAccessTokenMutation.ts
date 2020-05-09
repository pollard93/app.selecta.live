import gql from 'graphql-tag';

export const REMOVE_CHANNEL_ACCESS_TOKEN_MUTATION = gql`
  mutation removeChannelAccessToken {
    removeChannelAccessToken @client
  }
`;
