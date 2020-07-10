/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getStreamProfile = (_, variables) => {
  switch (variables.id) {
    case 'IS_NOT_CONSUMER':
      return ({
        id: variables.id,
        isConsumer: false,
        position: 0,
        cancelled: null,
      });

    case 'AUDIO_ONLY':
      return ({
        id: variables.id,
        isConsumer: true,
        audioOnly: true,
        position: 0,
        cancelled: null,
      });

    default:
      return ({
        id: variables.id,
        isConsumer: true,
        audioOnly: false,
        position: 0,
        cancelled: null,
      });
  }
};
