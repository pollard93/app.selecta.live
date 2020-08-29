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
        timeFrom: new Date().toISOString(),
        timeTo: new Date(Date.now() + 7.2e+6).toISOString(),
        cost: Math.floor(Math.random() * Math.floor(100)) + 1,
        // eslint-disable-next-line max-len
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut',
      });

    case 'IS_NOT_CONSUMER_FREE':
      return ({
        id: variables.id,
        isConsumer: false,
        position: 0,
        cancelled: null,
        timeFrom: new Date().toISOString(),
        timeTo: new Date(Date.now() + 7.2e+6).toISOString(),
        cost: 0,
        // eslint-disable-next-line max-len
        info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut',
      });

    case 'AUDIO_ONLY':
      return ({
        id: variables.id,
        isConsumer: true,
        audioOnly: true,
        position: 0,
        cancelled: null,
        cost: Math.floor(Math.random() * Math.floor(100)) + 1,
      });

    case 'CANCELLED':
      return ({
        id: variables.id,
        isConsumer: true,
        audioOnly: false,
        position: 0,
        // eslint-disable-next-line max-len
        cancelledMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut',
        cost: Math.floor(Math.random() * Math.floor(100)) + 1,
      });

    default:
      return ({
        id: variables.id,
        isConsumer: true,
        audioOnly: false,
        position: 0,
        cancelled: null,
        cost: Math.floor(Math.random() * Math.floor(100)) + 1,
      });
  }
};
