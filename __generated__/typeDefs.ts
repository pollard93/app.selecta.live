
    export default `
      # source: http://localhost:4000/graphql
# timestamp: Fri Apr 24 2020 10:12:13 GMT+0100 (British Summer Time)

type AppUpdatePayload {
  appStoreUrl: String
  playStoreUrl: String
}

type AuthPayload {
  token: String!
  user: UserSelf
}

type Channel {
  id: ID!
  name: String!
  description: String!
  coverImage: File
  profileImage: File
  verified: Boolean!
  followers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  admins(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  streams(where: StreamWhereInput, orderBy: StreamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Stream!]
  credit: Float!
  notifications(where: ChannelNotificationWhereInput, orderBy: ChannelNotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ChannelNotification!]
  transactions(where: CreditTransactionWhereInput, orderBy: CreditTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CreditTransaction!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum CHANNEL_NOTIFICATION_TYPE {
  TEST
}

type ChannelAuthPayload {
  token: String!
  channel: ChannelSelf
}

type ChannelNotification {
  id: ID!
  type: CHANNEL_NOTIFICATION_TYPE
  readDate: DateTime
  createdAt: DateTime
}

enum ChannelNotificationOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  channelReceiverId_ASC
  channelReceiverId_DESC
  readDate_ASC
  readDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ChannelNotificationPreviousValues {
  id: ID!
  type: CHANNEL_NOTIFICATION_TYPE!
  channelReceiverId: String!
  readDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ChannelNotificationsPayLoad {
  notifications: [ChannelNotification!]!
  count: Int!
}

type ChannelNotificationSubscriptionPayload {
  mutation: MutationType!
  node: ChannelNotification
  updatedFields: [String!]
  previousValues: ChannelNotificationPreviousValues
}

input ChannelNotificationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: CHANNEL_NOTIFICATION_TYPE
  type_not: CHANNEL_NOTIFICATION_TYPE
  type_in: [CHANNEL_NOTIFICATION_TYPE!]
  type_not_in: [CHANNEL_NOTIFICATION_TYPE!]
  channelReceiver: ChannelWhereInput
  channelReceiverId: String
  channelReceiverId_not: String
  channelReceiverId_in: [String!]
  channelReceiverId_not_in: [String!]
  channelReceiverId_lt: String
  channelReceiverId_lte: String
  channelReceiverId_gt: String
  channelReceiverId_gte: String
  channelReceiverId_contains: String
  channelReceiverId_not_contains: String
  channelReceiverId_starts_with: String
  channelReceiverId_not_starts_with: String
  channelReceiverId_ends_with: String
  channelReceiverId_not_ends_with: String
  readDate: DateTime
  readDate_not: DateTime
  readDate_in: [DateTime!]
  readDate_not_in: [DateTime!]
  readDate_lt: DateTime
  readDate_lte: DateTime
  readDate_gt: DateTime
  readDate_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ChannelNotificationWhereInput!]
  OR: [ChannelNotificationWhereInput!]
  NOT: [ChannelNotificationWhereInput!]
}

enum ChannelOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  verified_ASC
  verified_DESC
  credit_ASC
  credit_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ChannelProfile {
  id: ID!
  name: String
  profileImage: File
  following: Boolean
  followersEdge: Int
}

type ChannelProfilesPayLoad {
  channels: [ChannelProfile!]!
  count: Int!
}

type ChannelSelf {
  id: ID!
  name: String
  description: String
  coverImage: File
  profileImage: File
  verified: Boolean
  unreadNotificationCount: Int
  followersEdge: Int
  adminsEdge: Int
  pendingCredit: Int
  credit: Int
  creditMinimumStreamCost: Int
  creditWithdrawalValue: Int
  creditWithdrawalMinimum: Int
}

type ChannelSelfsPayLoad {
  channels: [ChannelSelf!]!
  count: Int!
}

input ChannelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  coverImage: FileWhereInput
  profileImage: FileWhereInput
  verified: Boolean
  verified_not: Boolean
  followers_every: UserWhereInput
  followers_some: UserWhereInput
  followers_none: UserWhereInput
  admins_every: UserWhereInput
  admins_some: UserWhereInput
  admins_none: UserWhereInput
  streams_every: StreamWhereInput
  streams_some: StreamWhereInput
  streams_none: StreamWhereInput
  credit: Float
  credit_not: Float
  credit_in: [Float!]
  credit_not_in: [Float!]
  credit_lt: Float
  credit_lte: Float
  credit_gt: Float
  credit_gte: Float
  notifications_every: ChannelNotificationWhereInput
  notifications_some: ChannelNotificationWhereInput
  notifications_none: ChannelNotificationWhereInput
  transactions_every: CreditTransactionWhereInput
  transactions_some: CreditTransactionWhereInput
  transactions_none: CreditTransactionWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ChannelWhereInput!]
  OR: [ChannelWhereInput!]
  NOT: [ChannelWhereInput!]
}

enum CLIENT_TYPE {
  CONSUMER
  PRODUCER
}

type ConsumerNotification {
  id: ID!
  type: NOTIFICATION_TYPE!
  receiver: User!
  receiverId: String!
  sender: User!
  readDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum ConsumerNotificationOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  receiverId_ASC
  receiverId_DESC
  readDate_ASC
  readDate_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ConsumerNotificationPreviousValues {
  id: ID!
  type: NOTIFICATION_TYPE!
  receiverId: String!
  readDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ConsumerNotificationsPayLoad {
  notifications: [ConsumerNotification!]!
  count: Int!
}

type ConsumerNotificationSubscriptionPayload {
  mutation: MutationType!
  node: ConsumerNotification
  updatedFields: [String!]
  previousValues: ConsumerNotificationPreviousValues
}

input ConsumerNotificationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: NOTIFICATION_TYPE
  type_not: NOTIFICATION_TYPE
  type_in: [NOTIFICATION_TYPE!]
  type_not_in: [NOTIFICATION_TYPE!]
  receiver: UserWhereInput
  receiverId: String
  receiverId_not: String
  receiverId_in: [String!]
  receiverId_not_in: [String!]
  receiverId_lt: String
  receiverId_lte: String
  receiverId_gt: String
  receiverId_gte: String
  receiverId_contains: String
  receiverId_not_contains: String
  receiverId_starts_with: String
  receiverId_not_starts_with: String
  receiverId_ends_with: String
  receiverId_not_ends_with: String
  sender: UserWhereInput
  readDate: DateTime
  readDate_not: DateTime
  readDate_in: [DateTime!]
  readDate_not_in: [DateTime!]
  readDate_lt: DateTime
  readDate_lte: DateTime
  readDate_gt: DateTime
  readDate_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ConsumerNotificationWhereInput!]
  OR: [ConsumerNotificationWhereInput!]
  NOT: [ConsumerNotificationWhereInput!]
}

type CreditTransaction {
  id: ID!
  credit: Float!
  consumer: User!
  stream: Stream!
  channel: Channel!
  approved: DateTime
  reversed: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum CreditTransactionOrderByInput {
  id_ASC
  id_DESC
  credit_ASC
  credit_DESC
  approved_ASC
  approved_DESC
  reversed_ASC
  reversed_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

input CreditTransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  credit: Float
  credit_not: Float
  credit_in: [Float!]
  credit_not_in: [Float!]
  credit_lt: Float
  credit_lte: Float
  credit_gt: Float
  credit_gte: Float
  consumer: UserWhereInput
  stream: StreamWhereInput
  channel: ChannelWhereInput
  approved: DateTime
  approved_not: DateTime
  approved_in: [DateTime!]
  approved_not_in: [DateTime!]
  approved_lt: DateTime
  approved_lte: DateTime
  approved_gt: DateTime
  approved_gte: DateTime
  reversed: DateTime
  reversed_not: DateTime
  reversed_in: [DateTime!]
  reversed_not_in: [DateTime!]
  reversed_lt: DateTime
  reversed_lte: DateTime
  reversed_gt: DateTime
  reversed_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [CreditTransactionWhereInput!]
  OR: [CreditTransactionWhereInput!]
  NOT: [CreditTransactionWhereInput!]
}

scalar DateTime

type File {
  id: ID
  author: UserProfile
  mime: String
  url: Url
}

input FileWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  author: UserWhereInput
  mime: String
  mime_not: String
  mime_in: [String!]
  mime_not_in: [String!]
  mime_lt: String
  mime_lte: String
  mime_gt: String
  mime_gte: String
  mime_contains: String
  mime_not_contains: String
  mime_starts_with: String
  mime_not_starts_with: String
  mime_ends_with: String
  mime_not_ends_with: String
  path: String
  path_not: String
  path_in: [String!]
  path_not_in: [String!]
  path_lt: String
  path_lte: String
  path_gt: String
  path_gte: String
  path_contains: String
  path_not_contains: String
  path_starts_with: String
  path_not_starts_with: String
  path_ends_with: String
  path_not_ends_with: String
  AND: [FileWhereInput!]
  OR: [FileWhereInput!]
  NOT: [FileWhereInput!]
}

scalar Json

type Mutation {
  deleteConsumerNotification(id: String!): Boolean
  followChannel(id: String!, unfollow: Boolean): ChannelProfile
  login(email: String!, password: String!): AuthPayload
  loginWithSocial(provider: SOCIAL_PROVIDER!): AuthPayload
  payForStream(id: String!): StreamProfile!
  readConsumerNotification(id: String!, unRead: Boolean): ConsumerNotification!
  register(email: String!, password: String!): AuthPayload
  reportStream(id: String!, content: String!): Boolean
  requestPasswordReset(email: String!): Boolean
  resetPassword(password: String!): AuthPayload
  updatePassword(currentPassword: String!, newPassword: String!): Boolean
  updateSelf(name: String, profilePicture: Upload): UserSelf
  validateInAppPurchase(receipt: String!): UserSelf!
  cancelStream(id: String!): StreamSelf
  deleteChannelNotification(id: String!): Boolean
  loginChannel(id: String!, code: String!): ChannelAuthPayload
  putStream(name: String!, info: String!, timeFrom: DateTime!, timeTo: DateTime!, cost: Int!, image: Upload): StreamSelf
  readChannelNotification(id: String!, unRead: Boolean): ChannelNotification!
  registerChannel(name: String!, description: String!): RequestedChannel
  requestChannelLogin(id: String!): Boolean
  updateChannel(name: String, description: String, profileImage: Upload, coverImage: Upload): ChannelSelf
  updateStream(id: String!, name: String, info: String, timeFrom: DateTime, timeTo: DateTime, cost: Int, image: Upload): StreamSelf
  withdrawFunds: ChannelSelf
  putStreamMessage(id: String!, message: String!): StreamMessageClient
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

enum NOTIFICATION_TYPE {
  PASSWORD_CHANGED
  REQUESTED_CHANNEL_APPROVED
}

enum PLATFORM {
  IOS
  ANDROID
}

type ProductConfig {
  productId: String!
  credit: Int!
}

type Query {
  canViewStream(id: String!): Boolean!
  getChannelProfile(id: String!): ChannelProfile!
  getChannelStreams(id: String!, first: Int, after: String): StreamProfilesPayLoad!
  getConsumerNotifications(first: Int, after: String): ConsumerNotificationsPayLoad!
  getPaidForStreams(where: StreamWhereInput, first: Int, after: String, orderBy: StreamOrderByInput): StreamProfilesPayLoad!
  getProductConfig: [ProductConfig!]!
  getSelf: UserSelf
  getStreamFeed(first: Int, after: String): StreamProfilesPayLoad!
  getStreamProfile(id: String!): StreamProfile!
  getStreamUrl(id: String!): String!
  searchChannels(where: ChannelWhereInput, first: Int, after: String, orderBy: ChannelOrderByInput): ChannelProfilesPayLoad!
  searchStreams(where: StreamWhereInput, first: Int, after: String, orderBy: StreamOrderByInput): StreamProfilesPayLoad!
  validateResetToken: Boolean
  verifyUser: Boolean
  channelNameExists(name: String!): Boolean!
  getChannelNotifications(first: Int, after: String): ChannelNotificationsPayLoad!
  getChannelSelf: ChannelSelf!
  getChannelSelfs(where: ChannelWhereInput, first: Int, after: String, orderBy: ChannelOrderByInput): ChannelSelfsPayLoad!
  getRequestedChannels(first: Int, after: String): RequestedChannelsPayLoad
  getStreamSelf(id: String!): StreamSelf!
  getStreamSelfs(where: StreamWhereInput, first: Int, after: String, orderBy: StreamOrderByInput): StreamSelfsPayLoad!
  getStreamMessages(id: String!, first: Int, after: String): StreamMessageClientPayload
}

type RequestedChannel {
  id: ID!
  name: String
  description: String
  createdAt: DateTime
  updatedAt: DateTime
}

enum RequestedChannelOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RequestedChannelsPayLoad {
  channels: [RequestedChannel!]!
  count: Int!
}

input RequestedChannelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [RequestedChannelWhereInput!]
  OR: [RequestedChannelWhereInput!]
  NOT: [RequestedChannelWhereInput!]
}

enum SOCIAL_PROVIDER {
  FACEBOOK
  GOOGLE
}

type Stream {
  id: ID!
  channel: Channel!
  name: String!
  info: String!
  image: File
  timeFrom: DateTime!
  timeTo: DateTime!
  cost: Float!
  consumers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  liveConsumers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  transactions(where: CreditTransactionWhereInput, orderBy: CreditTransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CreditTransaction!]
  password: String!
  cancelled: DateTime
  creditRevenue: Int
  messages(where: StreamMessageWhereInput, orderBy: StreamMessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StreamMessage!]
  userRecords(where: StreamUserRecordWhereInput, orderBy: StreamUserRecordOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [StreamUserRecord!]
  approved: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StreamMessage {
  id: ID!
  stream: Stream!
  streamId: String!
  user: User
  message: String!
  createdAt: DateTime!
}

type StreamMessageClient {
  id: ID!
  user: UserProfile
  message: String
  createdAt: DateTime
}

type StreamMessageClientPayload {
  messages: [StreamMessageClient!]!
  count: Int!
}

type StreamMessageClientSubscriptionPayload {
  mutation: MutationType!
  node: StreamMessageClient
  updatedFields: [String!]
  previousValues: StreamMessagePreviousValues
}

enum StreamMessageOrderByInput {
  id_ASC
  id_DESC
  streamId_ASC
  streamId_DESC
  message_ASC
  message_DESC
  createdAt_ASC
  createdAt_DESC
}

type StreamMessagePreviousValues {
  id: ID!
  streamId: String!
  message: String!
  createdAt: DateTime!
}

input StreamMessageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  stream: StreamWhereInput
  streamId: String
  streamId_not: String
  streamId_in: [String!]
  streamId_not_in: [String!]
  streamId_lt: String
  streamId_lte: String
  streamId_gt: String
  streamId_gte: String
  streamId_contains: String
  streamId_not_contains: String
  streamId_starts_with: String
  streamId_not_starts_with: String
  streamId_ends_with: String
  streamId_not_ends_with: String
  user: UserWhereInput
  message: String
  message_not: String
  message_in: [String!]
  message_not_in: [String!]
  message_lt: String
  message_lte: String
  message_gt: String
  message_gte: String
  message_contains: String
  message_not_contains: String
  message_starts_with: String
  message_not_starts_with: String
  message_ends_with: String
  message_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [StreamMessageWhereInput!]
  OR: [StreamMessageWhereInput!]
  NOT: [StreamMessageWhereInput!]
}

enum StreamOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  info_ASC
  info_DESC
  timeFrom_ASC
  timeFrom_DESC
  timeTo_ASC
  timeTo_DESC
  cost_ASC
  cost_DESC
  password_ASC
  password_DESC
  cancelled_ASC
  cancelled_DESC
  creditRevenue_ASC
  creditRevenue_DESC
  approved_ASC
  approved_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type StreamProfile {
  id: ID!
  channel: ChannelProfile
  name: String
  image: File
  isConsumer: Boolean
}

type StreamProfilesPayLoad {
  streams: [StreamProfile!]!
  count: Int!
}

type StreamSelf {
  id: ID!
  name: String
  info: String
  image: File
  timeFrom: DateTime
  timeTo: DateTime
  cost: Float
  cancelled: DateTime
  password: String
  creditRevenuePending: Int
  creditRevenue: Int
  consumersEdge: Int
  liveConsumersEdge: Int
  streamKey: String
  streamUrl: String
}

type StreamSelfsPayLoad {
  streams: [StreamSelf!]!
  count: Int!
}

type StreamUserRecord {
  id: ID!
  token: String!
  stream: Stream!
  user: User!
  createdAt: DateTime!
  sessionUpdatedAt: DateTime!
}

enum StreamUserRecordOrderByInput {
  id_ASC
  id_DESC
  token_ASC
  token_DESC
  createdAt_ASC
  createdAt_DESC
  sessionUpdatedAt_ASC
  sessionUpdatedAt_DESC
}

input StreamUserRecordWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  stream: StreamWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  sessionUpdatedAt: DateTime
  sessionUpdatedAt_not: DateTime
  sessionUpdatedAt_in: [DateTime!]
  sessionUpdatedAt_not_in: [DateTime!]
  sessionUpdatedAt_lt: DateTime
  sessionUpdatedAt_lte: DateTime
  sessionUpdatedAt_gt: DateTime
  sessionUpdatedAt_gte: DateTime
  AND: [StreamUserRecordWhereInput!]
  OR: [StreamUserRecordWhereInput!]
  NOT: [StreamUserRecordWhereInput!]
}

input StreamWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  channel: ChannelWhereInput
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  info: String
  info_not: String
  info_in: [String!]
  info_not_in: [String!]
  info_lt: String
  info_lte: String
  info_gt: String
  info_gte: String
  info_contains: String
  info_not_contains: String
  info_starts_with: String
  info_not_starts_with: String
  info_ends_with: String
  info_not_ends_with: String
  image: FileWhereInput
  timeFrom: DateTime
  timeFrom_not: DateTime
  timeFrom_in: [DateTime!]
  timeFrom_not_in: [DateTime!]
  timeFrom_lt: DateTime
  timeFrom_lte: DateTime
  timeFrom_gt: DateTime
  timeFrom_gte: DateTime
  timeTo: DateTime
  timeTo_not: DateTime
  timeTo_in: [DateTime!]
  timeTo_not_in: [DateTime!]
  timeTo_lt: DateTime
  timeTo_lte: DateTime
  timeTo_gt: DateTime
  timeTo_gte: DateTime
  cost: Float
  cost_not: Float
  cost_in: [Float!]
  cost_not_in: [Float!]
  cost_lt: Float
  cost_lte: Float
  cost_gt: Float
  cost_gte: Float
  consumers_every: UserWhereInput
  consumers_some: UserWhereInput
  consumers_none: UserWhereInput
  liveConsumers_every: UserWhereInput
  liveConsumers_some: UserWhereInput
  liveConsumers_none: UserWhereInput
  transactions_every: CreditTransactionWhereInput
  transactions_some: CreditTransactionWhereInput
  transactions_none: CreditTransactionWhereInput
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  cancelled: DateTime
  cancelled_not: DateTime
  cancelled_in: [DateTime!]
  cancelled_not_in: [DateTime!]
  cancelled_lt: DateTime
  cancelled_lte: DateTime
  cancelled_gt: DateTime
  cancelled_gte: DateTime
  creditRevenue: Int
  creditRevenue_not: Int
  creditRevenue_in: [Int!]
  creditRevenue_not_in: [Int!]
  creditRevenue_lt: Int
  creditRevenue_lte: Int
  creditRevenue_gt: Int
  creditRevenue_gte: Int
  messages_every: StreamMessageWhereInput
  messages_some: StreamMessageWhereInput
  messages_none: StreamMessageWhereInput
  userRecords_every: StreamUserRecordWhereInput
  userRecords_some: StreamUserRecordWhereInput
  userRecords_none: StreamUserRecordWhereInput
  approved: DateTime
  approved_not: DateTime
  approved_in: [DateTime!]
  approved_not_in: [DateTime!]
  approved_lt: DateTime
  approved_lte: DateTime
  approved_gt: DateTime
  approved_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [StreamWhereInput!]
  OR: [StreamWhereInput!]
  NOT: [StreamWhereInput!]
}

type Subscription {
  consumerNotifications: ConsumerNotificationSubscriptionPayload
  channelNotifications: ChannelNotificationSubscriptionPayload
  streamMessages(id: String!): StreamMessageClientSubscriptionPayload
}

"""The \`Upload\` scalar type represents a file upload."""
scalar Upload

type Url {
  splash: String
  small: String
  large: String
  full: String
}

type User {
  id: ID!
  name: String
  email: String!
  facebookId: String
  googleId: String
  profilePicture: File
  password: String
  verified: Boolean
  notifications(where: ConsumerNotificationWhereInput, orderBy: ConsumerNotificationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ConsumerNotification!]
  credit: Float!
  channelsFollowing(where: ChannelWhereInput, orderBy: ChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Channel!]
  channelsAdmin(where: ChannelWhereInput, orderBy: ChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Channel!]
  requestedChannels(where: RequestedChannelWhereInput, orderBy: RequestedChannelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RequestedChannel!]
  streamsConsuming(where: StreamWhereInput, orderBy: StreamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Stream!]
  streamsLiveConsuming(where: StreamWhereInput, orderBy: StreamOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Stream!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  facebookId_ASC
  facebookId_DESC
  googleId_ASC
  googleId_DESC
  password_ASC
  password_DESC
  verified_ASC
  verified_DESC
  credit_ASC
  credit_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserProfile {
  id: ID!
  name: String
  profilePicture: File
}

type UserSelf {
  id: ID!
  name: String
  email: String
  profilePicture: File
  unreadNotificationCount: Int
  credit: Float
  channelsFollowingEdge: Int
  channelsAdminEdge: Int
  requiresUpdate: AppUpdatePayload
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  facebookId: String
  facebookId_not: String
  facebookId_in: [String!]
  facebookId_not_in: [String!]
  facebookId_lt: String
  facebookId_lte: String
  facebookId_gt: String
  facebookId_gte: String
  facebookId_contains: String
  facebookId_not_contains: String
  facebookId_starts_with: String
  facebookId_not_starts_with: String
  facebookId_ends_with: String
  facebookId_not_ends_with: String
  googleId: String
  googleId_not: String
  googleId_in: [String!]
  googleId_not_in: [String!]
  googleId_lt: String
  googleId_lte: String
  googleId_gt: String
  googleId_gte: String
  googleId_contains: String
  googleId_not_contains: String
  googleId_starts_with: String
  googleId_not_starts_with: String
  googleId_ends_with: String
  googleId_not_ends_with: String
  profilePicture: FileWhereInput
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  verified: Boolean
  verified_not: Boolean
  notifications_every: ConsumerNotificationWhereInput
  notifications_some: ConsumerNotificationWhereInput
  notifications_none: ConsumerNotificationWhereInput
  credit: Float
  credit_not: Float
  credit_in: [Float!]
  credit_not_in: [Float!]
  credit_lt: Float
  credit_lte: Float
  credit_gt: Float
  credit_gte: Float
  channelsFollowing_every: ChannelWhereInput
  channelsFollowing_some: ChannelWhereInput
  channelsFollowing_none: ChannelWhereInput
  channelsAdmin_every: ChannelWhereInput
  channelsAdmin_some: ChannelWhereInput
  channelsAdmin_none: ChannelWhereInput
  requestedChannels_every: RequestedChannelWhereInput
  requestedChannels_some: RequestedChannelWhereInput
  requestedChannels_none: RequestedChannelWhereInput
  streamsConsuming_every: StreamWhereInput
  streamsConsuming_some: StreamWhereInput
  streamsConsuming_none: StreamWhereInput
  streamsLiveConsuming_every: StreamWhereInput
  streamsLiveConsuming_some: StreamWhereInput
  streamsLiveConsuming_none: StreamWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

    `
  