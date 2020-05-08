/* eslint-disable max-len */
// Reference
// https://www.apollographql.com/docs/graphql-tools/mocking.html

import { cancelStream } from './resolvers/mutation/cancelStream/cancelStream';
import { getChannelNotifications } from './resolvers/query/getChannelNotifications/getChannelNotifications';
import { getChannelSelf } from './resolvers/query/getChannelSelf/getChannelSelf';
import { getChannelSelfs } from './resolvers/query/getChannelSelfs/getChannelSelfs';
import { getRequestedChannels } from './resolvers/query/getRequestedChannels/getRequestedChannels';
import { getSelf } from './resolvers/query/getSelf/getSelf';
import { getStreamSelf } from './resolvers/query/getStreamSelf/getStreamSelf';
import { getStreamSelfs } from './resolvers/query/getStreamSelfs/getStreamSelfs';
import { withdrawFunds } from './resolvers/mutation/withdrawFunds/withdrawFunds';

export default {
  Mutation: () => ({
    cancelStream,
    withdrawFunds,
  }),
  Query: () => ({
    getChannelNotifications,
    getChannelSelf,
    getChannelSelfs,
    getRequestedChannels,
    getSelf,
    getStreamSelf,
    getStreamSelfs,
  }),
  DateTime: () => new Date(0).toISOString(),
  Url: () => ({
    full: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    large: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    small: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
    splash: 'https://images.unsplash.com/photo-1584847229598-8a12ce9a2d5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=5&q=80',
  }),
};
