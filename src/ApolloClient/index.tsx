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
import { goToLogin } from '../screens/utils';
import { GET_ACCESS_TOKEN_QUERY } from './resolvers/query/getAccessToken/getAccessTokenQuery';
import { getAccessToken } from './resolvers/query/getAccessToken/__generated__/getAccessToken';
import { PUT_ACCESS_TOKEN_MUTATION } from './resolvers/mutation/putAccessToken/putAccessTokenMutation';
import { putAccessToken, putAccessTokenVariables } from './resolvers/mutation/putAccessToken/__generated__/putAccessToken';
import resolvers from './resolvers/index';
import { version } from '../../package.json';


/**
 * Safely get token from storage
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
    // connectionCallback: err => {
    //   if(err){
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
 * Auth middleware, sets the header if it's not already set
 * Attaches the current client-version to headers
 * Attaches the current client-type to headers
 */
const authMiddleware = setContext(async (operation, { headers }) => ({
  headers: {
    ...headers,
    'client-version': version,
    'client-type': 'CONSUMER',
    authorization: headers && headers.authorization
      ? `Bearer ${headers.authorization}`
      : `Bearer ${await getToken(AClient)}`,
  },
}));


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
  }

  extend type Mutation {
    putAccessToken(token: String): Boolean
    removeAccessToken: Boolean
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
        // Check for Expired Token message, logout and show toast
        const expired = graphQLErrors.find((e) => e.message === 'Expired Token');
        if (expired) {
          goToLogin({
            toastMessage: 'Your session has expired! Please login again',
          });
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
