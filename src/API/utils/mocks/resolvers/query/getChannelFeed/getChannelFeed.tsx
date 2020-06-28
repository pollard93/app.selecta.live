/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getChannelFeed = (_, args) => {
  const items = [];


  /**
   * Live now
   */
  if (args.id === 'HAS_LIVE_STREAMS') {
    items.push({
      heading: 'Live Now',
      type: 'VERTICAL',
      background: 'DARK',
      query: `
        query getChannelStreams($id: String!, $where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
          getChannelStreams(id: $id, where: $where, first: $first, after: $after, orderBy: $orderBy){
            streams {
              id
              name
              channel {
                name
              }
              image {
                id
                mime
                url {
                  splash
                  small
                  large
                  full
                }
              }
              timeFrom
              tags {
                title
              }
            }
            count
          }
        }
      `,
      accessor: 'getChannelStreams.streams',
      variables: {
        id: args.id,
        first: 2,
        orderBy: 'timeFrom_DESC',
      },
    });
  }


  /**
   * New streams
   */
  items.push({
    heading: 'New Streams',
    type: 'HORIZONTAL',
    background: 'LIGHT',
    query: `
      query getChannelStreams($id: String!, $where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
        getChannelStreams(id: $id, where: $where, first: $first, after: $after, orderBy: $orderBy){
          streams {
            id
            name
            channel {
              name
            }
            image {
              id
              mime
              url {
                splash
                small
                large
                full
              }
            }
            timeFrom
            tags {
              title
            }
          }
          count
        }
      }
    `,
    accessor: 'getChannelStreams.streams',
    variables: {
      id: args.id,
      first: 5,
      orderBy: 'timeFrom_DESC',
    },
  });


  /**
   * Recorded streams
   */
  items.push({
    heading: 'Recorded Streams',
    type: 'HORIZONTAL',
    background: 'LIGHT',
    query: `
      query getChannelStreams($id: String!, $where: StreamWhereInput, $first: Int, $after: String, $orderBy: StreamOrderByInput){
        getChannelStreams(id: $id, where: $where, first: $first, after: $after, orderBy: $orderBy){
          streams {
            id
            name
            channel {
              name
            }
            image {
              id
              mime
              url {
                splash
                small
                large
                full
              }
            }
            timeFrom
            tags {
              title
            }
          }
          count
        }
      }
    `,
    accessor: 'getChannelStreams.streams',
    variables: {
      id: args.id,
      first: 5,
      orderBy: 'timeFrom_DESC',
    },
  });


  return { items };
};
