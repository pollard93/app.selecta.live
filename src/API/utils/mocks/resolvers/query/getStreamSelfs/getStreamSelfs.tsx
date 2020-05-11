/* eslint-disable prefer-spread */
export const getStreamSelfs = (_, variables) => ({
  streams: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
