import gql from 'graphql-tag';

export const FEED_PAYLOAD_FRAGMENT = gql`
  fragment FEED_PAYLOAD_FRAGMENT on FeedPayload {
    items {
      heading
      type
      background
      query
      accessor
      variables
    }
  }
`;
