/* eslint-disable max-len */
import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { GET_STREAM_COMMENTS_QUERY } from '../../../API/query/getStreamComments/getStreamComments';
import { getStreamCommentsVariables, getStreamComments, getStreamComments_getStreamComments_comments } from '../../../API/query/getStreamComments/__generated__/getStreamComments';
import StreamCommentListItem from '../StreamCommentListItem/StreamCommentListItem';
import styles from './StreamComments.styles';
import { streamComments, streamCommentsVariables } from '../../../API/subscription/streamComments/__generated__/streamComments';
import CreateStreamComment from '../CreateStreamComment/CreateStreamComment';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';

class StreamCommentsFlatList extends ApolloFlatList<getStreamCommentsVariables, getStreamComments, getStreamComments_getStreamComments_comments, streamCommentsVariables, streamComments> {}

interface StreamCommentsProps {
  id: string;
}

const StreamComments: FC<StreamCommentsProps> = (props) => {
  const variables = {
    id: props.id,
    first: 10,
    after: null,
  };

  return (
    <View style={styles.wrap}>
      <StreamCommentsFlatList
        query={GET_STREAM_COMMENTS_QUERY}
        variables={variables}
        accessor='getStreamComments.comments'
        renderItem={({ item }) => (
          <StreamCommentListItem data={item} />
        )}
        FlatListProps={{
          inverted: true,
          ItemSeparatorComponent: () => <View style={styles.separator} />,
          contentContainerStyle: styles.contentContainer,
        }}
        ListFooterComponent={({ queryResult }) => {
          if (queryResult.loading || queryResult.error) {
            return (
              <LoadRetry {...queryResult} />
            );
          }

          return null;
        }}
      />

      <CreateStreamComment variables={variables} />
    </View>
  );
};

export default StreamComments;
