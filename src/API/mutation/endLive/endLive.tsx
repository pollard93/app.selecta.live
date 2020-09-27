import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { endLive, endLiveVariables } from './__generated__/endLive';

export const GO_LIVE_MUTATION = gql`
  mutation endLive($id: String!){
    endLive(id: $id){
      id
      timeToLive
    }
  }
`;

export const useEndLiveMutation = (options?: MutationHookOptions<endLive, endLiveVariables>) => useMutation(GO_LIVE_MUTATION, options);
