/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import merge from 'lodash/merge';
import mocks from './mocks';
import typeDefs from '../../../__generated__/typeDefs';
import resolvers from '../../ApolloClient/resolvers';

export default function createClient(overwriteMocks = {}) {
  const mergedMocks = merge({ ...mocks }, overwriteMocks);

  const schema = makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  addMockFunctionsToSchema({
    schema,
    mocks: mergedMocks,
  });

  const apolloCache = new InMemoryCache((window as any).__APOLLO_STATE__);

  const graphqlClient = new ApolloClient({
    cache: apolloCache,
    link: new SchemaLink({ schema }),
    resolvers,
  });

  return graphqlClient;
}
