/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getChannelProfile = (_, variables) => {
  switch (variables.id) {
    case 'LONG_NAME':
      return ({
        name: 'Very Very Very Very Very Very Very Long Name',
      });

    default:
      return ({
        websiteUrl: () => 'https://google.com',
        twitterUrl: () => 'https://twitter.com',
        facebookUrl: () => 'https://facebook.com',
        instagramUrl: () => 'https://instagram.com',
      });
  }
};
