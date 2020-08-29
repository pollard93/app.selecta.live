/* eslint-disable max-len */
import React, { FC } from 'react';
import { View } from 'react-native';
import ApolloFlatList from 'mbp-components-rn-apolloflatlist';
import { useDynamicValue } from 'react-native-dynamic';
import { GET_STREAM_COMMENTS_QUERY } from '../../../API/query/getStreamComments/getStreamComments';
import { getStreamCommentsVariables, getStreamComments, getStreamComments_getStreamComments_comments } from '../../../API/query/getStreamComments/__generated__/getStreamComments';
import StreamCommentListItem from '../StreamCommentListItem/StreamCommentListItem';
import styles, { DynamicStyles } from './StreamComments.styles';
import CreateStreamComment from '../CreateStreamComment/CreateStreamComment';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { STREAM_PROFILE_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_PROFILE_FRAGMENT';
import { STREAM_SELF_FRAGMENT } from '../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';

class StreamCommentsFlatList extends ApolloFlatList<getStreamCommentsVariables, getStreamComments, getStreamComments_getStreamComments_comments> {}

interface StreamCommentsProps {
  data: STREAM_PROFILE_FRAGMENT | STREAM_SELF_FRAGMENT;
}

const StreamComments: FC<StreamCommentsProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  const variables = {
    id: props.data.id,
    first: 10,
    after: null,
  };

  return (
    <View style={[styles.wrap, dynamicStyles.wrap]}>
      <StreamCommentsFlatList
        query={GET_STREAM_COMMENTS_QUERY}
        variables={variables}
        accessor='getStreamComments.comments'
        renderItem={({ item }) => (
          <StreamCommentListItem
            data={{
              ...item,
              comment: 'hdeuw dweu hewuifh ewuifh ewufewh feuiwfh ewiuf hewf ewiufh ewi',
            }}
            channelData={props.data.channel}
          />
        )}
        FlatListProps={{
          inverted: true,
          ItemSeparatorComponent: () => <View style={styles.separator} />,
          contentContainerStyle: styles.contentContainer,
        }}
      >
      {({ queryResult }) => {
        /**
         * Handle loading and error
         */
        if (queryResult.loading || queryResult.error) {
          return (
            <LoadRetry cover {...queryResult} />
          );
        }

        return null;
      }}
      </StreamCommentsFlatList>

      <CreateStreamComment variables={variables} />
    </View>
  );
};

export default StreamComments;
