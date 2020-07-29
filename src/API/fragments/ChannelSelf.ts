import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const CHANNEL_SELF_FRAGMENT = gql`
  fragment CHANNEL_SELF_FRAGMENT on ChannelSelf {
    id
    name
    description
    coverImage {
      ...FILE_FRAGMENT
    }
    profileImage {
      ...FILE_FRAGMENT
    }
    verified
    unreadNotificationCount
    followersEdge
    adminsEdge
    pendingCredit
    credit
    creditMinimumStreamCost
    creditWithdrawalValue
    creditWithdrawalMinimum
    freeStreamAllowance
    createdAt
  },
  ${FILE_FRAGMENT}
`;
