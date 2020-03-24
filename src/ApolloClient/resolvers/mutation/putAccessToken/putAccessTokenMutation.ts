import gql from 'graphql-tag';

export const PUT_ACCESS_TOKEN_MUTATION = gql`
  mutation putAccessToken($token: String!) {
    putAccessToken(token: $token) @client
  }
`;
