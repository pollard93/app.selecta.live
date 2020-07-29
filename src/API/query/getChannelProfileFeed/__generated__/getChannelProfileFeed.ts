/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FEED_TYPE, FEED_BK_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getChannelProfileFeed
// ====================================================

export interface getChannelProfileFeed_getChannelProfileFeed_items {
  __typename: "FeedItem";
  heading: string;
  type: FEED_TYPE;
  background: FEED_BK_TYPE;
  query: string;
  accessor: string;
  variables: any | null;
}

export interface getChannelProfileFeed_getChannelProfileFeed {
  __typename: "FeedPayload";
  items: getChannelProfileFeed_getChannelProfileFeed_items[];
}

export interface getChannelProfileFeed {
  getChannelProfileFeed: getChannelProfileFeed_getChannelProfileFeed | null;
}

export interface getChannelProfileFeedVariables {
  id: string;
}
