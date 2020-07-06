/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { MutationType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: streamMessages
// ====================================================

export interface streamMessages_streamMessages_node_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface streamMessages_streamMessages_node_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: streamMessages_streamMessages_node_user_profilePicture_url | null;
}

export interface streamMessages_streamMessages_node_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: streamMessages_streamMessages_node_user_profilePicture | null;
}

export interface streamMessages_streamMessages_node {
  __typename: "StreamMessageClient";
  id: string;
  user: streamMessages_streamMessages_node_user | null;
  message: string | null;
  createdAt: any | null;
}

export interface streamMessages_streamMessages {
  __typename: "StreamMessageClientSubscriptionPayload";
  mutation: MutationType;
  updatedFields: string[] | null;
  node: streamMessages_streamMessages_node | null;
}

export interface streamMessages {
  streamMessages: streamMessages_streamMessages | null;
}

export interface streamMessagesVariables {
  id: string;
}
