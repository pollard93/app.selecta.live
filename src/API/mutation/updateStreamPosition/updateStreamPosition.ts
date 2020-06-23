import gql from 'graphql-tag';

export const UPDATE_STREAM_POSITION_MUTATION = gql`
  mutation updateStreamPosition($id: String!, $position: Float!){
    updateStreamPosition(id: $id, position: $position)
  }
`;
