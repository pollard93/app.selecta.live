/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getStreamSelf = (_, variables) => {
  console.log('getStreamSelf -> variables.id', variables.id);
  switch (variables.id) {
    case 'CANCELLED':
      return ({
        timeFrom: new Date().toISOString(), // now
        timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        cost: 10,
      });

    default:
      return ({
        timeFrom: new Date().toISOString(), // now
        timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        cost: 10,
        cancelled: null, // Not cancelled
      });
  }
};
