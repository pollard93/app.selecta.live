/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FEED_TYPE, FEED_BK_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getHomeFeed
// ====================================================

export interface getHomeFeed_getHomeFeed_items {
  __typename: "FeedItem";
  heading: string;
  type: FEED_TYPE;
  background: FEED_BK_TYPE;
  query: string;
  accessor: string;
  variables: any | null;
}

export interface getHomeFeed_getHomeFeed {
  __typename: "FeedPayload";
  items: getHomeFeed_getHomeFeed_items[];
}

export interface getHomeFeed {
  getHomeFeed: getHomeFeed_getHomeFeed | null;
}
