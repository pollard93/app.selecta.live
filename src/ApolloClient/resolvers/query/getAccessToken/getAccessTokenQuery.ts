import gql from 'graphql-tag';

export const GET_ACCESS_TOKEN_QUERY = gql`
  query getAccessToken {
    getAccessToken @client
  }
`;
