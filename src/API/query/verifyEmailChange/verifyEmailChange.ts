import gql from 'graphql-tag';

export const VERIFY_EMAIL_CHANGE_QUERY = gql`
  query verifyEmailChange {
    verifyEmailChange {
      user {
        id
        email
      }
    }
  }
`;
