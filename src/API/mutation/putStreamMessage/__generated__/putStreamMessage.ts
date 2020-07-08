/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: putStreamMessage
// ====================================================

export interface putStreamMessage_putStreamMessage_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface putStreamMessage_putStreamMessage_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: putStreamMessage_putStreamMessage_user_profilePicture_url | null;
}

export interface putStreamMessage_putStreamMessage_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: putStreamMessage_putStreamMessage_user_profilePicture | null;
}

export interface putStreamMessage_putStreamMessage {
  __typename: "StreamMessageClient";
  id: string;
  user: putStreamMessage_putStreamMessage_user | null;
  message: string | null;
  createdAt: any | null;
}

export interface putStreamMessage {
  putStreamMessage: putStreamMessage_putStreamMessage | null;
}

export interface putStreamMessageVariables {
  id: string;
  message: string;
}
