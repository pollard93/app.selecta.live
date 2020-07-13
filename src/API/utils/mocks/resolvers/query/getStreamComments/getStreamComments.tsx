/* eslint-disable prefer-spread */
export const getStreamComments = (_, variables) => ({
  comments: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
