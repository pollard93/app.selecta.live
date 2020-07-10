/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamMessages
// ====================================================

export interface getStreamMessages_getStreamMessages_messages_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamMessages_getStreamMessages_messages_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamMessages_getStreamMessages_messages_user_profilePicture_url | null;
}

export interface getStreamMessages_getStreamMessages_messages_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: getStreamMessages_getStreamMessages_messages_user_profilePicture | null;
}

export interface getStreamMessages_getStreamMessages_messages {
  __typename: "StreamMessageClient";
  id: string;
  user: getStreamMessages_getStreamMessages_messages_user | null;
  message: string | null;
  createdAt: any | null;
}

export interface getStreamMessages_getStreamMessages {
  __typename: "StreamMessageClientPayload";
  messages: getStreamMessages_getStreamMessages_messages[];
  count: number;
}

export interface getStreamMessages {
  getStreamMessages: getStreamMessages_getStreamMessages | null;
}

export interface getStreamMessagesVariables {
  id: string;
  first?: number | null;
  after?: string | null;
}
