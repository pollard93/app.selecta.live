/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getStreamComments
// ====================================================

export interface getStreamComments_getStreamComments_comments_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  preview: string | null;
  large: string | null;
  full: string | null;
}

export interface getStreamComments_getStreamComments_comments_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: getStreamComments_getStreamComments_comments_user_profilePicture_url | null;
}

export interface getStreamComments_getStreamComments_comments_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: getStreamComments_getStreamComments_comments_user_profilePicture | null;
}

export interface getStreamComments_getStreamComments_comments {
  __typename: "StreamCommentClient";
  id: string;
  user: getStreamComments_getStreamComments_comments_user | null;
  comment: string | null;
  createdAt: any | null;
}

export interface getStreamComments_getStreamComments {
  __typename: "StreamCommentClientPayload";
  comments: getStreamComments_getStreamComments_comments[];
  count: number;
}

export interface getStreamComments {
  getStreamComments: getStreamComments_getStreamComments | null;
}

export interface getStreamCommentsVariables {
  id: string;
  first?: number | null;
  after?: string | null;
}
