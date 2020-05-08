import gql from 'graphql-tag';

export const PUT_CHANNEL_ACCESS_TOKEN_MUTATION = gql`
  mutation putChannelAccessToken($token: String!) {
    putChannelAccessToken(token: $token) @client
  }
`;
