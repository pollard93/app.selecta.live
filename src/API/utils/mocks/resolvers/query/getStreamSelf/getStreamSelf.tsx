/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getStreamSelf = (_, variables) => {
  switch (variables.id) {
    case 'CANCELLED':
      return ({
        timeFrom: new Date().toISOString(), // now
        timeTo: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        // eslint-disable-next-line max-len
        cancelledMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae odio id nibh iaculis tempus id nec lectus. In laoreet placerat mi eu blandit. Duis non felis turpis. Aliquam diam odio, faucibus in dui ut, ultrices laoreet lectus. Ut tempus magna nibh, et tincidunt leo placerat non. Fusce commodo faucibus mi, non maximus metus consequat ut',
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
