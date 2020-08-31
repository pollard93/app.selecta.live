import gql from 'graphql-tag';
import { useLazyQuery, QueryHookOptions } from 'react-apollo';
import { verifyUser } from './__generated__/verifyUser';
import { FILE_FRAGMENT } from '../../fragments/File';

export const VERIFY_USER_QUERY = gql`
  query verifyUser {
    verifyUser {
      user {
        id
        verified
        highestAchievement {
          name
          attachmentSmall {
            ...FILE_FRAGMENT
          }
          attachmentLarge {
            ...FILE_FRAGMENT
          }
        }
      }
    }
  },
  ${FILE_FRAGMENT}
`;

export const useVerifyUserLazyQuery = (options?: QueryHookOptions<verifyUser>) => useLazyQuery(VERIFY_USER_QUERY, options);
