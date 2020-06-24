/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getFeed = () => ({
  items: [
    {
      heading: 'Your Streams',
      type: 'VERTICAL',
      query: `
        query getConsumingStreamProfiles($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
          getConsumingStreamProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
            streams {
              id
            }
            count
          }
        }
      `,
      accessor: 'getConsumingStreamProfiles.streams',
      variables: {
        first: 5,
      },
    },
    {
      heading: 'Your Channels',
      type: 'HORIZONTAL_SMALL',
      query: `
        query getFollowingChannelProfiles($where: ChannelWhereInput, $first: Int, $after: String, $orderBy: ChannelOrderByInput){
          getFollowingChannelProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
            channels {
              id
            }
            count
          }
        }
      `,
      accessor: 'getFollowingChannelProfiles.channels',
      variables: {
        first: 5,
      },
    },
    {
      heading: 'New Streams',
      type: 'HORIZONTAL',
      query: `
        query getStreamProfiles($where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
          getStreamProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
            streams {
              id
            }
            count
          }
        }
      `,
      accessor: 'getStreamProfiles.streams',
      variables: {
        /**
         * TODO - add a where input which searches tags
         */
        // where: {},
        first: 5,
        orderBy: 'createdAt_DESC',
      },
    },
    {
      heading: 'New Artists',
      type: 'HORIZONTAL_SMALL',
      query: `
        query getChannelProfiles($where: ChannelWhereInput, $first: Int, $after: String, $orderBy: ChannelOrderByInput){
          getChannelProfiles(where: $where, first: $first, after: $after, orderBy: $orderBy){
            channels {
              id
            }
            count
          }
        }
      `,
      accessor: 'getChannelProfiles.channels',
      variables: {
        first: 5,
        orderBy: 'createdAt_DESC',
      },
    },
    /**
     * TODO - get user tags and send back queires for certain tags
     */
  ],
});
