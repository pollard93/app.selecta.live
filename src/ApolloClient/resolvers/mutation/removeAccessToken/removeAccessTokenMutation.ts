import gql from 'graphql-tag';

export const REMOVE_ACCESS_TOKEN_MUTATION = gql`
  mutation removeAccessToken {
    removeAccessToken @client
  }
`;
