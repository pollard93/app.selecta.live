/* eslint-disable no-use-before-define */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import Config from 'react-native-config';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import { goHome } from '../screens/utils';
import { GET_ACCESS_TOKEN_QUERY } from './resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from './resolvers/query/getAccessToken/__generated__/getAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from './resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from './resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import resolvers from './resolvers/index';
import { version } from '../../package.json';
import { getChannelAccessToken } from './resolvers/query/getChannelAccessToken/__generated__/getChannelAccessToken';
import { GET_CHANNEL_ACCESS_TOKEN_QUERY } from './resolvers/query/getChannelAccessToken/getChannelAccessTokenQuery';
import { putChannelAccessToken, putChannelAccessTokenVariables } from './resolvers/mutation/putChannelAccessToken/__generated__/putChannelAccessToken';
import { PUT_CHANNEL_ACCESS_TOKEN_MUTATION } from './resolvers/mutation/putChannelAccessToken/putChannelAccessTokenMutation';
import Toast from '../components/UI/Toast/Toast';
import { pushToast } from '../modules/Toast';


/**
 * Safely get general access token from storage
 * Will use the apollo cache first
 */
export const getToken = async (client: ApolloClient<any>) => {
  try {
    const res = await client.query<getAccessToken>({
      query: GET_ACCESS_TOKEN_QUERY,
    });
    return res.data.getAccessToken;
  } catch (e) {
    return null;
  }
};


/**
 * Safely get channel access token from cache
 */
export const getChannelToken = async (client: ApolloClient<any>) => {
  try {
    const res = await client.query<getChannelAccessToken>({
      query: GET_CHANNEL_ACCESS_TOKEN_QUERY,
    });
    return res.data.getChannelAccessToken;
  } catch (e) {
    return null;
  }
};


/**
 * HTTP link
 */
const httpLink = createUploadLink({
  uri: Config.REACT_APP_API_URL,
  credentials: 'include',
});


/**
 * Websocket link
 */
const wsLink = new WebSocketLink({
  uri: Config.REACT_APP_API_URL_WS,
  options: {
    lazy: true,
    reconnect: true,
    reconnectionAttempts: 3,
    connectionParams: async () => ({
      authorization: `Bearer ${await getToken(AClient)}`,
      credentials: 'include',
    }),
    // connectionCallback: (err) => {
    //   console.log('err', err);
    //   if (err) {
    //     console.log('Error Connecting to Subscriptions Server', err);
    //   }
    // },
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);


/**
 * Define endpoints that require channel access token
 */
const channelTokenEndpoints = [
  'cancelStream',
  'channelNameExists',
  'deleteStream',
  'endLive',
  'getChannelSelf',
  'getChannelSelfFeed',
  'getRequestedChannels',
  'getStreamSelf',
  'getStreamSelfs',
  'getTagProfiles',
  'goLive',
  'publishStream',
  'putStream',
  'registerChannel',
  'requestChannelLoginCode',
  'unlistStream',
  'updateChannel',
  'updateStream',
  'withdrawFunds',
];


/**
 * Define endpoints that should use a channel access token if available and fallback to general access token
 */
const sharedEndpoints = [
  'canViewStream',
  'getStreamComments',
  'getStreamMessages',
  'getStreamMessagesVod',
  'getStreamUrl',
  'putStreamComment',
  'putStreamMessage',
];


/**
 * Auth middleware, sets the header if it's not already set
 * Attaches the current client-version to headers
 * Attaches the current client-type to headers
 */
const authMiddleware = setContext(async ({ operationName }, { headers }) => {
  /**
   * If access token is required
   * Get either a general or channel access token
   */
  const token = async () => {
    // If channel token required then try and get it and fail if it doesn't exist
    if (channelTokenEndpoints.includes(operationName)) {
      return getChannelToken(AClient);
    }

    // If shared endpoint, try and get channel token and fallback to general token if doesn't exist
    if (sharedEndpoints.includes(operationName)) {
      const channelToken = await getChannelToken(AClient);
      if (channelToken) return channelToken;
    }

    // Get general token
    return getToken(AClient);
  };

  /**
   * Merge package.json version as client-version into every request
   * If authorization header is given, prepend with Bearer
   * Otherwise fall back to stored/cached access token
   */
  return ({
    headers: {
      ...headers,
      'client-version': version,
      'client-type': 'MOBILE',
      authorization: headers && headers.authorization
        ? `Bearer ${headers.authorization}`
        : `Bearer ${await token()}`,
    },
  });
});


/**
 * Token afterware, detects tokens in response headers and updates local auth
 */
const tokenAfterware = new ApolloLink((operation, forward) => forward(operation).map((response) => {
  const context = operation.getContext();
  if (!context.response) return response;

  const { response: { headers } } = context;

  if (headers) {
    // If general token is returned in headers, execute PUT_ACCESS_TOKEN_MUTATION with new token
    const generalToken = headers.get('general_token');
    if (generalToken) {
      // eslint-disable-next-line no-use-before-define
      AClient
        .mutate<putAccessToken, putAccessTokenVariables>({
          mutation: PUT_ACCESS_TOKEN_MUTATION,
          variables: {
            token: generalToken,
          },
        });
    }

    // If channel token is returned in headers, execute PUT_CHANNEL_ACCESS_TOKEN_MUTATION with new token
    const channelToken = headers.get('channel_token');
    if (channelToken) {
      // eslint-disable-next-line no-use-before-define
      AClient
        .mutate<putChannelAccessToken, putChannelAccessTokenVariables>({
          mutation: PUT_CHANNEL_ACCESS_TOKEN_MUTATION,
          variables: {
            token: channelToken,
          },
        });
    }
  }

  return response;
}));


/**
 * Local typeDefs
 */
export const typeDefs = gql`
  directive @client on FIELD

  extend type Query {
    getAccessToken: String!
    getChannelAccessToken: String!
  }

  extend type Mutation {
    putAccessToken(token: String!): Boolean
    putChannelAccessToken(token: String!): Boolean
    removeAccessToken: Boolean
    removeChannelAccessToken: Boolean
  }
`;


/**
 * ApolloClient
 */
const AClient = new ApolloClient({
  link: ApolloLink.from([
    authMiddleware,
    tokenAfterware,
    onError((args) => {
      const { graphQLErrors } = args;
      if (graphQLErrors) {
        // Check for Expired General Token message, logout and show toast
        const expiredGeneral = graphQLErrors.find((e) => e.message === 'Expired General Token');
        if (expiredGeneral) {
          pushToast({
            duration: 1000,
            component: (
              <Toast content="Your session has expired! Please login again" />
            ),
            dismissible: true,
          });
          return;
        }

        // Check for Expired Channel Token message, goHome to producer tab and show toast
        const expiredChannel = graphQLErrors.find((e) => e.message === 'Expired Channel Token');
        if (expiredChannel) {
          pushToast({
            duration: 1000,
            component: (
              <Toast content="Your channel session has expired!" />
            ),
            dismissible: true,
          });

          goHome();
        }
      }
    }),
    link,
  ]),
  typeDefs,
  resolvers,
  cache: new InMemoryCache(),
});

export default AClient;
