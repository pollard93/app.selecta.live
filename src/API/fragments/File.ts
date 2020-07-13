import gql from 'graphql-tag';

export const FILE_FRAGMENT = gql`
  fragment FILE_FRAGMENT on File {
    id
    mime
    url {
      splash
      small
      preview
      large
      full
    }
  }
`;
