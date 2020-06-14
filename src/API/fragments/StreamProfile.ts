import gql from 'graphql-tag';
import { FILE_FRAGMENT } from './File';

export const STREAM_PROFILE_FRAGMENT = gql`
  fragment STREAM_PROFILE_FRAGMENT on StreamProfile {
    id
    channel {
      name
    }
    name
    image {
      ...FILE_FRAGMENT
    }
    isConsumer
    audioOnly
    position
  },
  ${FILE_FRAGMENT}
`;
