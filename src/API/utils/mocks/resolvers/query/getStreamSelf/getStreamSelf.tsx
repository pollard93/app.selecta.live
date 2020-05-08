export const getStreamSelf = () => ({
  timeFrom: new Date().toISOString(), // now
  timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
  cost: 10,
  cancelled: null, // Not cancelled
});
