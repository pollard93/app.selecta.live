/* eslint-disable max-len */
// Reference
// https://www.apollographql.com/docs/graphql-tools/mocking.html

import { cancelStream } from './resolvers/mutation/cancelStream/cancelStream';
import { followChannel } from './resolvers/mutation/followChannel/followChannel';
import { getChannelFeed } from './resolvers/query/getChannelFeed/getChannelFeed';
import { getChannelProfile } from './resolvers/query/getChannelProfile/getChannelProfile';
import { getChannelProfiles } from './resolvers/query/getChannelProfiles/getChannelProfiles';
import { getChannelSelf } from './resolvers/query/getChannelSelf/getChannelSelf';
import { getChannelSelfs } from './resolvers/query/getChannelSelfs/getChannelSelfs';
import { getChannelStreams } from './resolvers/query/getChannelStreams/getChannelStreams';
import { getCreditTransactionProfiles } from './resolvers/query/getCreditTransactionProfiles/getCreditTransactionProfiles';
import { getFeed } from './resolvers/query/getFeed/getFeed';
import { getNotifications } from './resolvers/query/getNotifications/getNotifications';
import { getProductConfig } from './resolvers/query/getProductConfig/getProductConfig';
import { getRequestedChannels } from './resolvers/query/getRequestedChannels/getRequestedChannels';
import { getSelf } from './resolvers/query/getSelf/getSelf';
import { getStreamComments } from './resolvers/query/getStreamComments/getStreamComments';
import { getStreamMessages } from './resolvers/query/getStreamMessages/getStreamMessages';
import { getStreamProfile } from './resolvers/query/getStreamProfile/getStreamProfile';
import { getStreamProfiles } from './resolvers/query/getStreamProfiles/getStreamProfiles';
import { getStreamSelf } from './resolvers/query/getStreamSelf/getStreamSelf';
import { getStreamSelfs } from './resolvers/query/getStreamSelfs/getStreamSelfs';
import { getStreamUrl } from './resolvers/query/getStreamUrl/getStreamUrl';
import { payForStream } from './resolvers/mutation/payForStream/payForStream';
import { putStreamComment } from './resolvers/mutation/putStreamComment/putStreamComment';
import { putStreamMessage } from './resolvers/mutation/putStreamMessage/putStreamMessage';
import { updateSelf } from './resolvers/mutation/updateSelf/updateSelf';
import { withdrawFunds } from './resolvers/mutation/withdrawFunds/withdrawFunds';

export default {
  Mutation: () => ({
    cancelStream,
    followChannel,
    payForStream,
    putStreamComment,
    putStreamMessage,
    updateSelf,
    withdrawFunds,
  }),
  Query: () => ({
    getChannelFeed,
    getChannelProfile,
    getChannelProfiles,
    getChannelSelf,
    getChannelSelfs,
    getChannelStreams,
    getCreditTransactionProfiles,
    getFeed,
    getNotifications,
    getProductConfig,
    getRequestedChannels,
    getSelf,
    getStreamComments,
    getStreamMessages,
    getStreamProfile,
    getStreamProfiles,
    getStreamSelf,
    getStreamSelfs,
    getStreamUrl,
  }),
  DateTime: () => new Date(0).toISOString(),
  Url: () => ({
    full: 'https://source.unsplash.com/1000x1000/?music',
    large: 'https://source.unsplash.com/500x500/?music',
    preview: 'https://source.unsplash.com/500x500/?music',
    small: 'https://source.unsplash.com/200x200/?music',
    splash: 'https://source.unsplash.com/5x5/?music',
  }),
};
