/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FEED_TYPE, FEED_BK_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelFeed
// ====================================================

export interface getChannelFeed_getChannelFeed_items {
  __typename: "FeedItem";
  heading: string;
  type: FEED_TYPE;
  background: FEED_BK_TYPE;
  query: string;
  accessor: string;
  variables: any | null;
}

export interface getChannelFeed_getChannelFeed {
  __typename: "FeedPayload";
  items: getChannelFeed_getChannelFeed_items[];
}

export interface getChannelFeed {
  getChannelFeed: getChannelFeed_getChannelFeed | null;
}

export interface getChannelFeedVariables {
  id: string;
}
