/* eslint-disable max-len */
// Reference
// https://www.apollographql.com/docs/graphql-tools/mocking.html

import { followChannel } from './resolvers/mutation/followChannel/followChannel';
import { getChannelStreams } from './resolvers/query/getChannelStreams/getChannelStreams';
import { getConsumerNotifications } from './resolvers/query/getConsumerNotifications/getConsumerNotifications';
import { getStreamFeed } from './resolvers/query/getStreamFeed/getStreamFeed';
import { getStreamMessages } from './resolvers/query/getStreamMessages/getStreamMessages';
import { getStreamProfile } from './resolvers/query/getStreamProfile/getStreamProfile';
import { payForStream } from './resolvers/mutation/payForStream/payForStream';
import { getStreamUrl } from './resolvers/query/getStreamUrl/getStreamUrl';
import { putStreamMessage } from './resolvers/mutation/putStreamMessage/putStreamMessage';
import { searchChannels } from './resolvers/query/searchChannels/searchChannels';
import { searchStreams } from './resolvers/query/searchStreams/searchStreams';

export default {
  Mutation: () => ({
    followChannel,
    payForStream,
    putStreamMessage,
  }),
  Query: () => ({
    getChannelStreams,
    getConsumerNotifications,
    getStreamFeed,
    getStreamMessages,
    getStreamProfile,
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
