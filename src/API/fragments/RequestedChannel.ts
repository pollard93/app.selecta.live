import gql from 'graphql-tag';

export const REQUESTED_CHANNEL_FRAGMENT = gql`
  fragment REQUESTED_CHANNEL_FRAGMENT on RequestedChannel {
    id
    name
    description
    createdAt
    updatedAt
  }
`;
