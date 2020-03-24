/* eslint-disable import/no-extraneous-dependencies */
import { FieldNode } from 'graphql';
import { ApolloCache } from 'apollo-cache';

export type LocalResolver<Args, Response> = (
  rootValue: any,
  args: Args,
  context: {
    cache: ApolloCache<any>;
    getCacheKey: (obj: {
        __typename: string;
        id: string | number;
    }) => any;
  },
  info: {
    field: FieldNode;
  },
) => Promise<Response>;
