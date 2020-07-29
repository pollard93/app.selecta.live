/* eslint-disable import/prefer-default-export */
/* eslint-disable prefer-spread */
export const getChannelProfileFeed = (_, args) => {
  const items = [];

  /**
   * New streams
   */
  items.push({
    heading: 'New Streams',
    type: 'HORIZONTAL',
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
