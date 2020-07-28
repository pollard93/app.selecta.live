/* eslint-disable prefer-spread */
export const getStreamSelfs = (_, variables) => ({
  streams: () => Array.apply(null, Array(variables.first)).map(() => ({
    cost: 10,
    timeFrom: new Date(Date.now()).toISOString(), // now
    timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
  })),
  count: () => 50,
});
