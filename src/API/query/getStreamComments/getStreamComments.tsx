/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';
import { QueryHookOptions, useQuery } from 'react-apollo';
import { STREAM_COMMENT_FRAGMENT } from '../../fragments/StreamComment';
import { getStreamCommentsVariables, getStreamComments } from './__generated__/getStreamComments';

export const GET_STREAM_COMMENTS_QUERY = gql`
  query getStreamComments($id: String!, $first: Int, $after: String){
    getStreamComments(id: $id, first: $first, after: $after){
      comments {
        ...STREAM_COMMENT_FRAGMENT
      }
      count
    }
  },
  ${STREAM_COMMENT_FRAGMENT}
`;

export const useGetStreamCommentsQuery = (options?: QueryHookOptions<getStreamComments, getStreamCommentsVariables>) => useQuery(GET_STREAM_COMMENTS_QUERY, options);
