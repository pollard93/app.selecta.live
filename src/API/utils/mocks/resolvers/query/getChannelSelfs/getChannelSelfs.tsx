/* eslint-disable prefer-spread */
export const getChannelSelfs = (_, variables) => ({
  channels: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
