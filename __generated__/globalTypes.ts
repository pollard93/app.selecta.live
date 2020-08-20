/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ChannelOrderByInput {
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  creditMinimumStreamCost_ASC = "creditMinimumStreamCost_ASC",
  creditMinimumStreamCost_DESC = "creditMinimumStreamCost_DESC",
  creditWithdrawalMinimum_ASC = "creditWithdrawalMinimum_ASC",
  creditWithdrawalMinimum_DESC = "creditWithdrawalMinimum_DESC",
  creditWithdrawalValue_ASC = "creditWithdrawalValue_ASC",
  creditWithdrawalValue_DESC = "creditWithdrawalValue_DESC",
  credit_ASC = "credit_ASC",
  credit_DESC = "credit_DESC",
  description_ASC = "description_ASC",
  description_DESC = "description_DESC",
  facebookUrl_ASC = "facebookUrl_ASC",
  facebookUrl_DESC = "facebookUrl_DESC",
  freeStreamAllowance_ASC = "freeStreamAllowance_ASC",
  freeStreamAllowance_DESC = "freeStreamAllowance_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  instagramUrl_ASC = "instagramUrl_ASC",
  instagramUrl_DESC = "instagramUrl_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  twitterUrl_ASC = "twitterUrl_ASC",
  twitterUrl_DESC = "twitterUrl_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
  verified_ASC = "verified_ASC",
  verified_DESC = "verified_DESC",
  websiteUrl_ASC = "websiteUrl_ASC",
  websiteUrl_DESC = "websiteUrl_DESC",
}

export enum CreditTransactionOrderByInput {
  approved_ASC = "approved_ASC",
  approved_DESC = "approved_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  credit_ASC = "credit_ASC",
  credit_DESC = "credit_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  reversed_ASC = "reversed_ASC",
  reversed_DESC = "reversed_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

export enum FEED_BK_TYPE {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export enum FEED_TYPE {
  HORIZONTAL = "HORIZONTAL",
  HORIZONTAL_SMALL = "HORIZONTAL_SMALL",
  VERTICAL = "VERTICAL",
}

export enum MutationType {
  CREATED = "CREATED",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
}

export enum NOTIFICATION_TYPE {
  CHANNEL_NOTIFICATION_TEST = "CHANNEL_NOTIFICATION_TEST",
  PASSWORD_CHANGED = "PASSWORD_CHANGED",
  REQUESTED_CHANNEL_APPROVED = "REQUESTED_CHANNEL_APPROVED",
}

export enum SOCIAL_PROVIDER {
  FACEBOOK = "FACEBOOK",
  GOOGLE = "GOOGLE",
}

export enum StreamOrderByInput {
  approved_ASC = "approved_ASC",
  approved_DESC = "approved_DESC",
  audioOnly_ASC = "audioOnly_ASC",
  audioOnly_DESC = "audioOnly_DESC",
  cancelled_ASC = "cancelled_ASC",
  cancelled_DESC = "cancelled_DESC",
  cost_ASC = "cost_ASC",
  cost_DESC = "cost_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  creditRevenue_ASC = "creditRevenue_ASC",
  creditRevenue_DESC = "creditRevenue_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  info_ASC = "info_ASC",
  info_DESC = "info_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  password_ASC = "password_ASC",
  password_DESC = "password_DESC",
  published_ASC = "published_ASC",
  published_DESC = "published_DESC",
  timeFrom_ASC = "timeFrom_ASC",
  timeFrom_DESC = "timeFrom_DESC",
  timeTo_ASC = "timeTo_ASC",
  timeTo_DESC = "timeTo_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
  viewCount_ASC = "viewCount_ASC",
  viewCount_DESC = "viewCount_DESC",
}

export interface ChannelRelatedChannelsWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  channel?: ChannelWhereInput | null;
  related?: ChannelWhereInput | null;
  score?: number | null;
  score_not?: number | null;
  score_in?: number[] | null;
  score_not_in?: number[] | null;
  score_lt?: number | null;
  score_lte?: number | null;
  score_gt?: number | null;
  score_gte?: number | null;
  AND?: ChannelRelatedChannelsWhereInput[] | null;
  OR?: ChannelRelatedChannelsWhereInput[] | null;
  NOT?: ChannelRelatedChannelsWhereInput[] | null;
}

export interface ChannelUpdateInput {
  name?: string | null;
  description?: string | null;
  profileImage?: any | null;
  coverImage?: any | null;
  tags?: string[] | null;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
}

export interface ChannelWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  websiteUrl?: string | null;
  websiteUrl_not?: string | null;
  websiteUrl_in?: string[] | null;
  websiteUrl_not_in?: string[] | null;
  websiteUrl_lt?: string | null;
  websiteUrl_lte?: string | null;
  websiteUrl_gt?: string | null;
  websiteUrl_gte?: string | null;
  websiteUrl_contains?: string | null;
  websiteUrl_not_contains?: string | null;
  websiteUrl_starts_with?: string | null;
  websiteUrl_not_starts_with?: string | null;
  websiteUrl_ends_with?: string | null;
  websiteUrl_not_ends_with?: string | null;
  twitterUrl?: string | null;
  twitterUrl_not?: string | null;
  twitterUrl_in?: string[] | null;
  twitterUrl_not_in?: string[] | null;
  twitterUrl_lt?: string | null;
  twitterUrl_lte?: string | null;
  twitterUrl_gt?: string | null;
  twitterUrl_gte?: string | null;
  twitterUrl_contains?: string | null;
  twitterUrl_not_contains?: string | null;
  twitterUrl_starts_with?: string | null;
  twitterUrl_not_starts_with?: string | null;
  twitterUrl_ends_with?: string | null;
  twitterUrl_not_ends_with?: string | null;
  facebookUrl?: string | null;
  facebookUrl_not?: string | null;
  facebookUrl_in?: string[] | null;
  facebookUrl_not_in?: string[] | null;
  facebookUrl_lt?: string | null;
  facebookUrl_lte?: string | null;
  facebookUrl_gt?: string | null;
  facebookUrl_gte?: string | null;
  facebookUrl_contains?: string | null;
  facebookUrl_not_contains?: string | null;
  facebookUrl_starts_with?: string | null;
  facebookUrl_not_starts_with?: string | null;
  facebookUrl_ends_with?: string | null;
  facebookUrl_not_ends_with?: string | null;
  instagramUrl?: string | null;
  instagramUrl_not?: string | null;
  instagramUrl_in?: string[] | null;
  instagramUrl_not_in?: string[] | null;
  instagramUrl_lt?: string | null;
  instagramUrl_lte?: string | null;
  instagramUrl_gt?: string | null;
  instagramUrl_gte?: string | null;
  instagramUrl_contains?: string | null;
  instagramUrl_not_contains?: string | null;
  instagramUrl_starts_with?: string | null;
  instagramUrl_not_starts_with?: string | null;
  instagramUrl_ends_with?: string | null;
  instagramUrl_not_ends_with?: string | null;
  coverImage?: FileWhereInput | null;
  profileImage?: FileWhereInput | null;
  verified?: boolean | null;
  verified_not?: boolean | null;
  followers_every?: UserWhereInput | null;
  followers_some?: UserWhereInput | null;
  followers_none?: UserWhereInput | null;
  admins_every?: UserWhereInput | null;
  admins_some?: UserWhereInput | null;
  admins_none?: UserWhereInput | null;
  streams_every?: StreamWhereInput | null;
  streams_some?: StreamWhereInput | null;
  streams_none?: StreamWhereInput | null;
  credit?: number | null;
  credit_not?: number | null;
  credit_in?: number[] | null;
  credit_not_in?: number[] | null;
  credit_lt?: number | null;
  credit_lte?: number | null;
  credit_gt?: number | null;
  credit_gte?: number | null;
  creditMinimumStreamCost?: number | null;
  creditMinimumStreamCost_not?: number | null;
  creditMinimumStreamCost_in?: number[] | null;
  creditMinimumStreamCost_not_in?: number[] | null;
  creditMinimumStreamCost_lt?: number | null;
  creditMinimumStreamCost_lte?: number | null;
  creditMinimumStreamCost_gt?: number | null;
  creditMinimumStreamCost_gte?: number | null;
  creditWithdrawalValue?: number | null;
  creditWithdrawalValue_not?: number | null;
  creditWithdrawalValue_in?: number[] | null;
  creditWithdrawalValue_not_in?: number[] | null;
  creditWithdrawalValue_lt?: number | null;
  creditWithdrawalValue_lte?: number | null;
  creditWithdrawalValue_gt?: number | null;
  creditWithdrawalValue_gte?: number | null;
  creditWithdrawalMinimum?: number | null;
  creditWithdrawalMinimum_not?: number | null;
  creditWithdrawalMinimum_in?: number[] | null;
  creditWithdrawalMinimum_not_in?: number[] | null;
  creditWithdrawalMinimum_lt?: number | null;
  creditWithdrawalMinimum_lte?: number | null;
  creditWithdrawalMinimum_gt?: number | null;
  creditWithdrawalMinimum_gte?: number | null;
  freeStreamAllowance?: number | null;
  freeStreamAllowance_not?: number | null;
  freeStreamAllowance_in?: number[] | null;
  freeStreamAllowance_not_in?: number[] | null;
  freeStreamAllowance_lt?: number | null;
  freeStreamAllowance_lte?: number | null;
  freeStreamAllowance_gt?: number | null;
  freeStreamAllowance_gte?: number | null;
  notifications_every?: NotificationWhereInput | null;
  notifications_some?: NotificationWhereInput | null;
  notifications_none?: NotificationWhereInput | null;
  transactions_every?: CreditTransactionWhereInput | null;
  transactions_some?: CreditTransactionWhereInput | null;
  transactions_none?: CreditTransactionWhereInput | null;
  tags_every?: TagWhereInput | null;
  tags_some?: TagWhereInput | null;
  tags_none?: TagWhereInput | null;
  relatedChannels_every?: ChannelRelatedChannelsWhereInput | null;
  relatedChannels_some?: ChannelRelatedChannelsWhereInput | null;
  relatedChannels_none?: ChannelRelatedChannelsWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: ChannelWhereInput[] | null;
  OR?: ChannelWhereInput[] | null;
  NOT?: ChannelWhereInput[] | null;
}

export interface CreditTransactionWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  credit?: number | null;
  credit_not?: number | null;
  credit_in?: number[] | null;
  credit_not_in?: number[] | null;
  credit_lt?: number | null;
  credit_lte?: number | null;
  credit_gt?: number | null;
  credit_gte?: number | null;
  consumer?: UserWhereInput | null;
  stream?: StreamWhereInput | null;
  channel?: ChannelWhereInput | null;
  approved?: any | null;
  approved_not?: any | null;
  approved_in?: any[] | null;
  approved_not_in?: any[] | null;
  approved_lt?: any | null;
  approved_lte?: any | null;
  approved_gt?: any | null;
  approved_gte?: any | null;
  reversed?: any | null;
  reversed_not?: any | null;
  reversed_in?: any[] | null;
  reversed_not_in?: any[] | null;
  reversed_lt?: any | null;
  reversed_lte?: any | null;
  reversed_gt?: any | null;
  reversed_gte?: any | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: CreditTransactionWhereInput[] | null;
  OR?: CreditTransactionWhereInput[] | null;
  NOT?: CreditTransactionWhereInput[] | null;
}

export interface FileWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  mime?: string | null;
  mime_not?: string | null;
  mime_in?: string[] | null;
  mime_not_in?: string[] | null;
  mime_lt?: string | null;
  mime_lte?: string | null;
  mime_gt?: string | null;
  mime_gte?: string | null;
  mime_contains?: string | null;
  mime_not_contains?: string | null;
  mime_starts_with?: string | null;
  mime_not_starts_with?: string | null;
  mime_ends_with?: string | null;
  mime_not_ends_with?: string | null;
  path?: string | null;
  path_not?: string | null;
  path_in?: string[] | null;
  path_not_in?: string[] | null;
  path_lt?: string | null;
  path_lte?: string | null;
  path_gt?: string | null;
  path_gte?: string | null;
  path_contains?: string | null;
  path_not_contains?: string | null;
  path_starts_with?: string | null;
  path_not_starts_with?: string | null;
  path_ends_with?: string | null;
  path_not_ends_with?: string | null;
  AND?: FileWhereInput[] | null;
  OR?: FileWhereInput[] | null;
  NOT?: FileWhereInput[] | null;
}

export interface NotificationWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  type?: NOTIFICATION_TYPE | null;
  type_not?: NOTIFICATION_TYPE | null;
  type_in?: NOTIFICATION_TYPE[] | null;
  type_not_in?: NOTIFICATION_TYPE[] | null;
  receiver?: UserWhereInput | null;
  receiverId?: string | null;
  receiverId_not?: string | null;
  receiverId_in?: string[] | null;
  receiverId_not_in?: string[] | null;
  receiverId_lt?: string | null;
  receiverId_lte?: string | null;
  receiverId_gt?: string | null;
  receiverId_gte?: string | null;
  receiverId_contains?: string | null;
  receiverId_not_contains?: string | null;
  receiverId_starts_with?: string | null;
  receiverId_not_starts_with?: string | null;
  receiverId_ends_with?: string | null;
  receiverId_not_ends_with?: string | null;
  sender?: UserWhereInput | null;
  channelReceiver?: ChannelWhereInput | null;
  readDate?: any | null;
  readDate_not?: any | null;
  readDate_in?: any[] | null;
  readDate_not_in?: any[] | null;
  readDate_lt?: any | null;
  readDate_lte?: any | null;
  readDate_gt?: any | null;
  readDate_gte?: any | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: NotificationWhereInput[] | null;
  OR?: NotificationWhereInput[] | null;
  NOT?: NotificationWhereInput[] | null;
}

export interface RequestedChannelWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  user?: UserWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: RequestedChannelWhereInput[] | null;
  OR?: RequestedChannelWhereInput[] | null;
  NOT?: RequestedChannelWhereInput[] | null;
}

export interface StreamCommentWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  stream?: StreamWhereInput | null;
  user?: UserWhereInput | null;
  comment?: string | null;
  comment_not?: string | null;
  comment_in?: string[] | null;
  comment_not_in?: string[] | null;
  comment_lt?: string | null;
  comment_lte?: string | null;
  comment_gt?: string | null;
  comment_gte?: string | null;
  comment_contains?: string | null;
  comment_not_contains?: string | null;
  comment_starts_with?: string | null;
  comment_not_starts_with?: string | null;
  comment_ends_with?: string | null;
  comment_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  AND?: StreamCommentWhereInput[] | null;
  OR?: StreamCommentWhereInput[] | null;
  NOT?: StreamCommentWhereInput[] | null;
}

export interface StreamMessageWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  stream?: StreamWhereInput | null;
  streamId?: string | null;
  streamId_not?: string | null;
  streamId_in?: string[] | null;
  streamId_not_in?: string[] | null;
  streamId_lt?: string | null;
  streamId_lte?: string | null;
  streamId_gt?: string | null;
  streamId_gte?: string | null;
  streamId_contains?: string | null;
  streamId_not_contains?: string | null;
  streamId_starts_with?: string | null;
  streamId_not_starts_with?: string | null;
  streamId_ends_with?: string | null;
  streamId_not_ends_with?: string | null;
  user?: UserWhereInput | null;
  message?: string | null;
  message_not?: string | null;
  message_in?: string[] | null;
  message_not_in?: string[] | null;
  message_lt?: string | null;
  message_lte?: string | null;
  message_gt?: string | null;
  message_gte?: string | null;
  message_contains?: string | null;
  message_not_contains?: string | null;
  message_starts_with?: string | null;
  message_not_starts_with?: string | null;
  message_ends_with?: string | null;
  message_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  AND?: StreamMessageWhereInput[] | null;
  OR?: StreamMessageWhereInput[] | null;
  NOT?: StreamMessageWhereInput[] | null;
}

export interface StreamPositionRecordWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  extendedId?: string | null;
  extendedId_not?: string | null;
  extendedId_in?: string[] | null;
  extendedId_not_in?: string[] | null;
  extendedId_lt?: string | null;
  extendedId_lte?: string | null;
  extendedId_gt?: string | null;
  extendedId_gte?: string | null;
  extendedId_contains?: string | null;
  extendedId_not_contains?: string | null;
  extendedId_starts_with?: string | null;
  extendedId_not_starts_with?: string | null;
  extendedId_ends_with?: string | null;
  extendedId_not_ends_with?: string | null;
  stream?: StreamWhereInput | null;
  user?: UserWhereInput | null;
  position?: number | null;
  position_not?: number | null;
  position_in?: number[] | null;
  position_not_in?: number[] | null;
  position_lt?: number | null;
  position_lte?: number | null;
  position_gt?: number | null;
  position_gte?: number | null;
  AND?: StreamPositionRecordWhereInput[] | null;
  OR?: StreamPositionRecordWhereInput[] | null;
  NOT?: StreamPositionRecordWhereInput[] | null;
}

export interface StreamRelatedStreamsWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  stream?: StreamWhereInput | null;
  related?: StreamWhereInput | null;
  score?: number | null;
  score_not?: number | null;
  score_in?: number[] | null;
  score_not_in?: number[] | null;
  score_lt?: number | null;
  score_lte?: number | null;
  score_gt?: number | null;
  score_gte?: number | null;
  AND?: StreamRelatedStreamsWhereInput[] | null;
  OR?: StreamRelatedStreamsWhereInput[] | null;
  NOT?: StreamRelatedStreamsWhereInput[] | null;
}

export interface StreamUserRecordWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  token?: string | null;
  token_not?: string | null;
  token_in?: string[] | null;
  token_not_in?: string[] | null;
  token_lt?: string | null;
  token_lte?: string | null;
  token_gt?: string | null;
  token_gte?: string | null;
  token_contains?: string | null;
  token_not_contains?: string | null;
  token_starts_with?: string | null;
  token_not_starts_with?: string | null;
  token_ends_with?: string | null;
  token_not_ends_with?: string | null;
  streamId?: string | null;
  streamId_not?: string | null;
  streamId_in?: string[] | null;
  streamId_not_in?: string[] | null;
  streamId_lt?: string | null;
  streamId_lte?: string | null;
  streamId_gt?: string | null;
  streamId_gte?: string | null;
  streamId_contains?: string | null;
  streamId_not_contains?: string | null;
  streamId_starts_with?: string | null;
  streamId_not_starts_with?: string | null;
  streamId_ends_with?: string | null;
  streamId_not_ends_with?: string | null;
  stream?: StreamWhereInput | null;
  user?: UserWhereInput | null;
  type?: string | null;
  type_not?: string | null;
  type_in?: string[] | null;
  type_not_in?: string[] | null;
  type_lt?: string | null;
  type_lte?: string | null;
  type_gt?: string | null;
  type_gte?: string | null;
  type_contains?: string | null;
  type_not_contains?: string | null;
  type_starts_with?: string | null;
  type_not_starts_with?: string | null;
  type_ends_with?: string | null;
  type_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  sessionUpdatedAt?: any | null;
  sessionUpdatedAt_not?: any | null;
  sessionUpdatedAt_in?: any[] | null;
  sessionUpdatedAt_not_in?: any[] | null;
  sessionUpdatedAt_lt?: any | null;
  sessionUpdatedAt_lte?: any | null;
  sessionUpdatedAt_gt?: any | null;
  sessionUpdatedAt_gte?: any | null;
  processed?: boolean | null;
  processed_not?: boolean | null;
  AND?: StreamUserRecordWhereInput[] | null;
  OR?: StreamUserRecordWhereInput[] | null;
  NOT?: StreamUserRecordWhereInput[] | null;
}

export interface StreamWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  channel?: ChannelWhereInput | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  info?: string | null;
  info_not?: string | null;
  info_in?: string[] | null;
  info_not_in?: string[] | null;
  info_lt?: string | null;
  info_lte?: string | null;
  info_gt?: string | null;
  info_gte?: string | null;
  info_contains?: string | null;
  info_not_contains?: string | null;
  info_starts_with?: string | null;
  info_not_starts_with?: string | null;
  info_ends_with?: string | null;
  info_not_ends_with?: string | null;
  image?: FileWhereInput | null;
  timeFrom?: any | null;
  timeFrom_not?: any | null;
  timeFrom_in?: any[] | null;
  timeFrom_not_in?: any[] | null;
  timeFrom_lt?: any | null;
  timeFrom_lte?: any | null;
  timeFrom_gt?: any | null;
  timeFrom_gte?: any | null;
  timeTo?: any | null;
  timeTo_not?: any | null;
  timeTo_in?: any[] | null;
  timeTo_not_in?: any[] | null;
  timeTo_lt?: any | null;
  timeTo_lte?: any | null;
  timeTo_gt?: any | null;
  timeTo_gte?: any | null;
  cost?: number | null;
  cost_not?: number | null;
  cost_in?: number[] | null;
  cost_not_in?: number[] | null;
  cost_lt?: number | null;
  cost_lte?: number | null;
  cost_gt?: number | null;
  cost_gte?: number | null;
  consumers_every?: UserWhereInput | null;
  consumers_some?: UserWhereInput | null;
  consumers_none?: UserWhereInput | null;
  liveConsumers_every?: UserWhereInput | null;
  liveConsumers_some?: UserWhereInput | null;
  liveConsumers_none?: UserWhereInput | null;
  transactions_every?: CreditTransactionWhereInput | null;
  transactions_some?: CreditTransactionWhereInput | null;
  transactions_none?: CreditTransactionWhereInput | null;
  password?: string | null;
  password_not?: string | null;
  password_in?: string[] | null;
  password_not_in?: string[] | null;
  password_lt?: string | null;
  password_lte?: string | null;
  password_gt?: string | null;
  password_gte?: string | null;
  password_contains?: string | null;
  password_not_contains?: string | null;
  password_starts_with?: string | null;
  password_not_starts_with?: string | null;
  password_ends_with?: string | null;
  password_not_ends_with?: string | null;
  cancelled?: any | null;
  cancelled_not?: any | null;
  cancelled_in?: any[] | null;
  cancelled_not_in?: any[] | null;
  cancelled_lt?: any | null;
  cancelled_lte?: any | null;
  cancelled_gt?: any | null;
  cancelled_gte?: any | null;
  creditRevenue?: number | null;
  creditRevenue_not?: number | null;
  creditRevenue_in?: number[] | null;
  creditRevenue_not_in?: number[] | null;
  creditRevenue_lt?: number | null;
  creditRevenue_lte?: number | null;
  creditRevenue_gt?: number | null;
  creditRevenue_gte?: number | null;
  messages_every?: StreamMessageWhereInput | null;
  messages_some?: StreamMessageWhereInput | null;
  messages_none?: StreamMessageWhereInput | null;
  comments_every?: StreamCommentWhereInput | null;
  comments_some?: StreamCommentWhereInput | null;
  comments_none?: StreamCommentWhereInput | null;
  userRecords_every?: StreamUserRecordWhereInput | null;
  userRecords_some?: StreamUserRecordWhereInput | null;
  userRecords_none?: StreamUserRecordWhereInput | null;
  approved?: any | null;
  approved_not?: any | null;
  approved_in?: any[] | null;
  approved_not_in?: any[] | null;
  approved_lt?: any | null;
  approved_lte?: any | null;
  approved_gt?: any | null;
  approved_gte?: any | null;
  audioOnly?: boolean | null;
  audioOnly_not?: boolean | null;
  positionRecords_every?: StreamPositionRecordWhereInput | null;
  positionRecords_some?: StreamPositionRecordWhereInput | null;
  positionRecords_none?: StreamPositionRecordWhereInput | null;
  tags_every?: TagWhereInput | null;
  tags_some?: TagWhereInput | null;
  tags_none?: TagWhereInput | null;
  relatedStreams_every?: StreamRelatedStreamsWhereInput | null;
  relatedStreams_some?: StreamRelatedStreamsWhereInput | null;
  relatedStreams_none?: StreamRelatedStreamsWhereInput | null;
  published?: any | null;
  published_not?: any | null;
  published_in?: any[] | null;
  published_not_in?: any[] | null;
  published_lt?: any | null;
  published_lte?: any | null;
  published_gt?: any | null;
  published_gte?: any | null;
  viewCount?: number | null;
  viewCount_not?: number | null;
  viewCount_in?: number[] | null;
  viewCount_not_in?: number[] | null;
  viewCount_lt?: number | null;
  viewCount_lte?: number | null;
  viewCount_gt?: number | null;
  viewCount_gte?: number | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: StreamWhereInput[] | null;
  OR?: StreamWhereInput[] | null;
  NOT?: StreamWhereInput[] | null;
}

export interface TagWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_lt?: string | null;
  title_lte?: string | null;
  title_gt?: string | null;
  title_gte?: string | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  channels_every?: ChannelWhereInput | null;
  channels_some?: ChannelWhereInput | null;
  channels_none?: ChannelWhereInput | null;
  streams_every?: StreamWhereInput | null;
  streams_some?: StreamWhereInput | null;
  streams_none?: StreamWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  AND?: TagWhereInput[] | null;
  OR?: TagWhereInput[] | null;
  NOT?: TagWhereInput[] | null;
}

export interface UserTagsWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  uuid?: string | null;
  uuid_not?: string | null;
  uuid_in?: string[] | null;
  uuid_not_in?: string[] | null;
  uuid_lt?: string | null;
  uuid_lte?: string | null;
  uuid_gt?: string | null;
  uuid_gte?: string | null;
  uuid_contains?: string | null;
  uuid_not_contains?: string | null;
  uuid_starts_with?: string | null;
  uuid_not_starts_with?: string | null;
  uuid_ends_with?: string | null;
  uuid_not_ends_with?: string | null;
  user?: UserWhereInput | null;
  tag?: TagWhereInput | null;
  order?: number | null;
  order_not?: number | null;
  order_in?: number[] | null;
  order_not_in?: number[] | null;
  order_lt?: number | null;
  order_lte?: number | null;
  order_gt?: number | null;
  order_gte?: number | null;
  AND?: UserTagsWhereInput[] | null;
  OR?: UserTagsWhereInput[] | null;
  NOT?: UserTagsWhereInput[] | null;
}

export interface UserWhereInput {
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_lt?: string | null;
  id_lte?: string | null;
  id_gt?: string | null;
  id_gte?: string | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  username?: string | null;
  username_not?: string | null;
  username_in?: string[] | null;
  username_not_in?: string[] | null;
  username_lt?: string | null;
  username_lte?: string | null;
  username_gt?: string | null;
  username_gte?: string | null;
  username_contains?: string | null;
  username_not_contains?: string | null;
  username_starts_with?: string | null;
  username_not_starts_with?: string | null;
  username_ends_with?: string | null;
  username_not_ends_with?: string | null;
  email?: string | null;
  email_not?: string | null;
  email_in?: string[] | null;
  email_not_in?: string[] | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  email_contains?: string | null;
  email_not_contains?: string | null;
  email_starts_with?: string | null;
  email_not_starts_with?: string | null;
  email_ends_with?: string | null;
  email_not_ends_with?: string | null;
  facebookId?: string | null;
  facebookId_not?: string | null;
  facebookId_in?: string[] | null;
  facebookId_not_in?: string[] | null;
  facebookId_lt?: string | null;
  facebookId_lte?: string | null;
  facebookId_gt?: string | null;
  facebookId_gte?: string | null;
  facebookId_contains?: string | null;
  facebookId_not_contains?: string | null;
  facebookId_starts_with?: string | null;
  facebookId_not_starts_with?: string | null;
  facebookId_ends_with?: string | null;
  facebookId_not_ends_with?: string | null;
  googleId?: string | null;
  googleId_not?: string | null;
  googleId_in?: string[] | null;
  googleId_not_in?: string[] | null;
  googleId_lt?: string | null;
  googleId_lte?: string | null;
  googleId_gt?: string | null;
  googleId_gte?: string | null;
  googleId_contains?: string | null;
  googleId_not_contains?: string | null;
  googleId_starts_with?: string | null;
  googleId_not_starts_with?: string | null;
  googleId_ends_with?: string | null;
  googleId_not_ends_with?: string | null;
  profilePicture?: FileWhereInput | null;
  password?: string | null;
  password_not?: string | null;
  password_in?: string[] | null;
  password_not_in?: string[] | null;
  password_lt?: string | null;
  password_lte?: string | null;
  password_gt?: string | null;
  password_gte?: string | null;
  password_contains?: string | null;
  password_not_contains?: string | null;
  password_starts_with?: string | null;
  password_not_starts_with?: string | null;
  password_ends_with?: string | null;
  password_not_ends_with?: string | null;
  verified?: boolean | null;
  verified_not?: boolean | null;
  notifications_every?: NotificationWhereInput | null;
  notifications_some?: NotificationWhereInput | null;
  notifications_none?: NotificationWhereInput | null;
  credit?: number | null;
  credit_not?: number | null;
  credit_in?: number[] | null;
  credit_not_in?: number[] | null;
  credit_lt?: number | null;
  credit_lte?: number | null;
  credit_gt?: number | null;
  credit_gte?: number | null;
  channelsFollowing_every?: ChannelWhereInput | null;
  channelsFollowing_some?: ChannelWhereInput | null;
  channelsFollowing_none?: ChannelWhereInput | null;
  channelsAdmin_every?: ChannelWhereInput | null;
  channelsAdmin_some?: ChannelWhereInput | null;
  channelsAdmin_none?: ChannelWhereInput | null;
  requestedChannels_every?: RequestedChannelWhereInput | null;
  requestedChannels_some?: RequestedChannelWhereInput | null;
  requestedChannels_none?: RequestedChannelWhereInput | null;
  streamsConsuming_every?: StreamWhereInput | null;
  streamsConsuming_some?: StreamWhereInput | null;
  streamsConsuming_none?: StreamWhereInput | null;
  streamsLiveConsuming_every?: StreamWhereInput | null;
  streamsLiveConsuming_some?: StreamWhereInput | null;
  streamsLiveConsuming_none?: StreamWhereInput | null;
  tags_every?: UserTagsWhereInput | null;
  tags_some?: UserTagsWhereInput | null;
  tags_none?: UserTagsWhereInput | null;
  transactions_every?: CreditTransactionWhereInput | null;
  transactions_some?: CreditTransactionWhereInput | null;
  transactions_none?: CreditTransactionWhereInput | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
