/* eslint-disable prefer-spread */
export const getChannelNotifications = (_, variables) => ({
  notifications: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
