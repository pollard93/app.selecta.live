import gql from 'graphql-tag';

export const CREDIT_TRANSACTION_PROFILE_FRAGMENT = gql`
  fragment CREDIT_TRANSACTION_PROFILE_FRAGMENT on CreditTransactionProfile {
    id
    credit
    stream {
      id
      name
    }
    channel {
      id
      name
    }
    approved
    reversed
    createdAt
  }
`;
