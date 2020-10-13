import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';
import { TAG_PROFILE_FRAGMENT } from './TagProfile';

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
    websiteUrl
    twitterUrl
    facebookUrl
    instagramUrl
    viewCount
    createdAt
    tags {
      ...TAG_PROFILE_FRAGMENT
    }
  },
  ${FILE_FRAGMENT}
  ${TAG_PROFILE_FRAGMENT}
`;
