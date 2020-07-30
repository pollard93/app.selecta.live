import gql from 'graphql-tag';
import { useMutation, MutationHookOptions } from 'react-apollo';
import { publishStream, publishStreamVariables } from './__generated__/publishStream';

export const PUBLISH_STREAM_MUTATION = gql`
  mutation publishStream($id: String!){
    publishStream(id: $id){
      id
      published
    }
  }
`;

export const usePublishStreamMutation = (options?: MutationHookOptions<publishStream, publishStreamVariables>) => useMutation(PUBLISH_STREAM_MUTATION, options);
