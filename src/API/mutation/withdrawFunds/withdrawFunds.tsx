import gql from 'graphql-tag';
import { MutationHookOptions, useMutation } from 'react-apollo';
import { withdrawFunds } from './__generated__/withdrawFunds';

export const WITHDRAW_FUNDS_MUTATION = gql`
  mutation withdrawFunds {
    withdrawFunds {
      id
      credit
    }
  }
`;

export const useWithdrawFundsMutation = (options?: MutationHookOptions<withdrawFunds>) => useMutation(WITHDRAW_FUNDS_MUTATION, options);
