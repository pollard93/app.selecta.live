/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FEED_TYPE, FEED_BK_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelSelfFeed
// ====================================================

export interface getChannelSelfFeed_getChannelSelfFeed_items {
  __typename: "FeedItem";
  heading: string;
  type: FEED_TYPE;
  background: FEED_BK_TYPE;
  query: string;
  accessor: string;
  variables: any | null;
}

export interface getChannelSelfFeed_getChannelSelfFeed {
  __typename: "FeedPayload";
  items: getChannelSelfFeed_getChannelSelfFeed_items[];
}

export interface getChannelSelfFeed {
  getChannelSelfFeed: getChannelSelfFeed_getChannelSelfFeed | null;
}
