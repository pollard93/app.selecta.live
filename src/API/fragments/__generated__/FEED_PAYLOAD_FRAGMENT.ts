/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { FEED_TYPE, FEED_BK_TYPE } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: FEED_PAYLOAD_FRAGMENT
// ====================================================

export interface FEED_PAYLOAD_FRAGMENT_items {
  __typename: "FeedItem";
  heading: string;
  type: FEED_TYPE;
  background: FEED_BK_TYPE;
  query: string;
  accessor: string;
  variables: any | null;
}

export interface FEED_PAYLOAD_FRAGMENT {
  __typename: "FeedPayload";
  items: FEED_PAYLOAD_FRAGMENT_items[];
}
