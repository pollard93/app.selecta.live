/* eslint-disable max-len */
// Reference
// https://www.apollographql.com/docs/graphql-tools/mocking.html

import { cancelStream } from './resolvers/mutation/cancelStream/cancelStream';
import { followChannel } from './resolvers/mutation/followChannel/followChannel';
import { getChannelNotifications } from './resolvers/query/getChannelNotifications/getChannelNotifications';
import { getChannelSelf } from './resolvers/query/getChannelSelf/getChannelSelf';
import { getChannelSelfs } from './resolvers/query/getChannelSelfs/getChannelSelfs';
import { getChannelStreams } from './resolvers/query/getChannelStreams/getChannelStreams';
import { getRequestedChannels } from './resolvers/query/getRequestedChannels/getRequestedChannels';
import { getSelf } from './resolvers/query/getSelf/getSelf';
import { getStreamFeed } from './resolvers/query/getStreamFeed/getStreamFeed';
import { getStreamMessages } from './resolvers/query/getStreamMessages/getStreamMessages';
import { getStreamProfile } from './resolvers/query/getStreamProfile/getStreamProfile';
import { getStreamSelf } from './resolvers/query/getStreamSelf/getStreamSelf';
import { getStreamSelfs } from './resolvers/query/getStreamSelfs/getStreamSelfs';
import { getStreamUrl } from './resolvers/query/getStreamUrl/getStreamUrl';
import { payForStream } from './resolvers/mutation/payForStream/payForStream';
import { putStreamMessage } from './resolvers/mutation/putStreamMessage/putStreamMessage';
import { searchChannels } from './resolvers/query/searchChannels/searchChannels';
import { searchStreams } from './resolvers/query/searchStreams/searchStreams';
import { updateSelf } from './resolvers/mutation/updateSelf/updateSelf';
import { withdrawFunds } from './resolvers/mutation/withdrawFunds/withdrawFunds';

export default {
  Mutation: () => ({
    cancelStream,
    followChannel,
    payForStream,
    putStreamMessage,
    updateSelf,
    withdrawFunds,
  }),
  Query: () => ({
    getChannelNotifications,
    getChannelSelf,
    getChannelSelfs,
    getChannelStreams,
    getRequestedChannels,
    getSelf,
    getStreamFeed,
    getStreamMessages,
    getStreamProfile,
    getStreamSelf,
    getStreamSelfs,
    getStreamUrl,
    searchChannels,
    searchStreams,
  }),
  DateTime: () => new Date(0).toISOString(),
  Url: () => ({
    full: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    large: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    small: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    splash: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
  }),
};
