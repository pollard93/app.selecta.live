import gql from 'graphql-tag';

export const VERIFY_EMAIL_CHANGE_QUERY = gql`
  query verifyEmailChange {
    verifyEmailChange {
      token,
      user {
        id
        email
      }
    }
  }
`;
