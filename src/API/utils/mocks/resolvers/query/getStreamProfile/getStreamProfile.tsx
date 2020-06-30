/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getStreamProfile = (_, variables) => {
  switch (variables.id) {
    case 'IS_NOT_CONSUMER':
      return ({
        isConsumer: false,
        position: 0,
      });

    default:
      return ({
        position: 0,
      });
  }
};
