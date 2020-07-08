import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { putStreamComment, putStreamCommentVariables } from './__generated__/putStreamComment';
import { STREAM_COMMENT_FRAGMENT } from '../../fragments/StreamComment';

export const PUT_STREAM_COMMENT_MUTATION = gql`
  mutation putStreamComment($id: String!, $comment: String!){
    putStreamComment(id: $id, comment: $comment){
      ...STREAM_COMMENT_FRAGMENT
    }
  },
  ${STREAM_COMMENT_FRAGMENT}
`;

export const usePutStreamCommentMutation = (options?: MutationHookOptions<putStreamComment, putStreamCommentVariables>) => useMutation(PUT_STREAM_COMMENT_MUTATION, options);
