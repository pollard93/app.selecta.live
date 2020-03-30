/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getStreamMessages = (_, variables) => ({
  messages: () => Array.apply(null, Array(variables.first)).map(() => ({})),
  count: () => 50,
});
