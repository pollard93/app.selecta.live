import gql from 'graphql-tag';

export const GET_TAG_PROFILES_QUERY = gql`
  query getTagProfiles($where: TagWhereInput, $after: String, $first: Int) {
    getTagProfiles(where: $where, after: $after, first: $first) {
      count
      tags {
        id
        title
      }
    }
  }
`;
