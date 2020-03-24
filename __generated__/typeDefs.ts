
    export default `
      # source: http://localhost:4000/graphql
# timestamp: Mon Mar 23 2020 18:33:11 GMT+0000 (Greenwich Mean Time)

type AuthPayload {
  token: String!
  user: UserSelf
}

scalar DateTime

type File {
  id: ID
  author: UserProfile
  mime: String
  url: Url
}

scalar Json

type Mutation {
  deleteNotification(id: String!): Boolean
  login(email: String!, password: String!): AuthPayload
  loginWithSocial(provider: SOCIAL_PROVIDER!): AuthPayload
  readNotification(id: String!, unRead: Boolean): Notification!
  register(email: String!, password: String!): AuthPayload
  requestPasswordReset(email: String!): Boolean
  resetPassword(password: String!): AuthPayload
  updateSelf(name: String, profilePicture: Upload): UserSelf
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

type Notification {
  id: ID!
  type: NOTIFICATION_TYPE
  receiver: UserProfile
  sender: UserProfile
  readDate: DateTime
  createdAt: DateTime
}

enum NOTIFICATION_TYPE {
  PASSWORD_CHANGED
}

type NotificationPreviousValues {
  id: ID!
  type: NOTIFICATION_TYPE!
  receiverId: String!
  readDate: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type NotificationsPayLoad {
  notifications: [Notification!]!
  count: Int!
}

type NotificationSubscriptionPayload {
  mutation: MutationType!
  node: Notification
  updatedFields: [String!]
  previousValues: NotificationPreviousValues
}

type Query {
  getNotifications(first: Int, after: String): NotificationsPayLoad!
  getSelf: UserSelf
  validateResetToken: Boolean
  verifyUser: Boolean
}

enum SOCIAL_PROVIDER {
  FACEBOOK
  GOOGLE
}

type Subscription {
  notifications: NotificationSubscriptionPayload
}

"""The \`Upload\` scalar type represents a file upload."""
scalar Upload

type Url {
  splash: String
  small: String
  large: String
  full: String
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
  requiresUpdate: Boolean
}

    `
  