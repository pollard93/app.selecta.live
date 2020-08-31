/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ACHIEVEMENT_TYPE } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: verifyUser
// ====================================================

export interface verifyUser_verifyUser_user_highestAchievement_attachmentSmall_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface verifyUser_verifyUser_user_highestAchievement_attachmentSmall {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: verifyUser_verifyUser_user_highestAchievement_attachmentSmall_url | null;
}

export interface verifyUser_verifyUser_user_highestAchievement_attachmentLarge_url {
  __typename: "Url";
  splash: string | null;
  small: string | null;
  large: string | null;
  full: string | null;
}

export interface verifyUser_verifyUser_user_highestAchievement_attachmentLarge {
  __typename: "File";
  id: string | null;
  mime: string | null;
  url: verifyUser_verifyUser_user_highestAchievement_attachmentLarge_url | null;
}

export interface verifyUser_verifyUser_user_highestAchievement {
  __typename: "UserAchievementProfile";
  name: ACHIEVEMENT_TYPE | null;
  attachmentSmall: verifyUser_verifyUser_user_highestAchievement_attachmentSmall | null;
  attachmentLarge: verifyUser_verifyUser_user_highestAchievement_attachmentLarge | null;
}

export interface verifyUser_verifyUser_user {
  __typename: "UserSelf";
  id: string;
  verified: boolean | null;
  highestAchievement: verifyUser_verifyUser_user_highestAchievement | null;
}

export interface verifyUser_verifyUser {
  __typename: "AuthPayload";
  user: verifyUser_verifyUser_user | null;
}

export interface verifyUser {
  verifyUser: verifyUser_verifyUser | null;
}
