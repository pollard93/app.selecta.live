/* eslint-disable prefer-spread */
export const getRequestedChannels = (_, variables) => ({
  channels: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
