/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FEED_TYPE, FEED_BK_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getFeed
// ====================================================

export interface getFeed_getFeed_items {
  __typename: "FeedItem";
  heading: string;
  type: FEED_TYPE;
  background: FEED_BK_TYPE;
  query: string;
  accessor: string;
  variables: any | null;
}

export interface getFeed_getFeed {
  __typename: "FeedPayload";
  items: getFeed_getFeed_items[];
}

export interface getFeed {
  getFeed: getFeed_getFeed | null;
}
