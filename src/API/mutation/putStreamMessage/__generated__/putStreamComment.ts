/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: putStreamComment
// ====================================================

export interface putStreamComment_putStreamComment_user_profilePicture_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface putStreamComment_putStreamComment_user_profilePicture {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: putStreamComment_putStreamComment_user_profilePicture_url | null;
}

export interface putStreamComment_putStreamComment_user {
  __typename: "UserProfile";
  id: string;
  username: string | null;
  profilePicture: putStreamComment_putStreamComment_user_profilePicture | null;
}

export interface putStreamComment_putStreamComment {
  __typename: "StreamCommentClient";
  id: string;
  user: putStreamComment_putStreamComment_user | null;
  comment: string | null;
  createdAt: any | null;
}

export interface putStreamComment {
  putStreamComment: putStreamComment_putStreamComment | null;
}

export interface putStreamCommentVariables {
  id: string;
  comment: string;
}
