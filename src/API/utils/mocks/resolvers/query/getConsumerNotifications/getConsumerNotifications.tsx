/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getConsumerNotifications = (_, variables) => ({
  notifications: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
