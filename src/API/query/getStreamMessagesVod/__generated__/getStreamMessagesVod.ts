/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamMessagesVod
// ====================================================

export interface getStreamMessagesVod_getStreamMessagesVod_messages_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamMessagesVod_getStreamMessagesVod_messages_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamMessagesVod_getStreamMessagesVod_messages_user_profilePicture_url | null;
}

export interface getStreamMessagesVod_getStreamMessagesVod_messages_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: getStreamMessagesVod_getStreamMessagesVod_messages_user_profilePicture | null;
}

export interface getStreamMessagesVod_getStreamMessagesVod_messages {
  __typename: "StreamMessageClient";
  id: string;
  user: getStreamMessagesVod_getStreamMessagesVod_messages_user | null;
  message: string | null;
  createdAt: any | null;
}

export interface getStreamMessagesVod_getStreamMessagesVod {
  __typename: "StreamMessageClientPayload";
  messages: getStreamMessagesVod_getStreamMessagesVod_messages[];
  count: number;
}

export interface getStreamMessagesVod {
  getStreamMessagesVod: getStreamMessagesVod_getStreamMessagesVod | null;
}

export interface getStreamMessagesVodVariables {
  id: string;
  from: any;
  last: number;
  before?: string | null;
}
