import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { goLive, goLiveVariables } from './__generated__/goLive';

export const GO_LIVE_MUTATION = gql`
  mutation goLive($id: String!){
    goLive(id: $id){
      id
      timeFromLive
    }
  }
`;

export const useGoLiveMutation = (options?: MutationHookOptions<goLive, goLiveVariables>) => useMutation(GO_LIVE_MUTATION, options);
