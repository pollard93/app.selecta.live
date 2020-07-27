/* eslint-disable prefer-spread */
export const getCreditTransactionProfiles = (_, variables) => ({
  transactions: () => Array.apply(null, Array(variables.first)).map(() => ({
    credit: Math.floor(Math.random() * Math.floor(100)),
  })),
  count: () => 50,
});
