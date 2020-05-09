import gql from 'graphql-tag';

export const GET_CHANNEL_ACCESS_TOKEN_QUERY = gql`
  query getChannelAccessToken {
    getChannelAccessToken @client
  }
`;
