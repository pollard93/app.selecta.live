/* eslint-disable max-classes-per-file */
import React, { FC } from 'react';
import { View, FlatListProps } from 'react-native';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import FeedHeader from '../UI/Headers/FeedHeader/FeedHeader';
import { ScreenProps } from '../../screens/utils/interfaces';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Feed from '../UI/Feed/Feed';
import { headerHeight } from '../UI/Headers/FeedHeader/FeedHeader.style';
import { useGetChannelFeedQuery } from '../../API/query/getChannelFeed/getChannelFeed';

export interface ChannelFeedProps extends ScreenProps {
  id: string;
  flatListProps: Partial<FlatListProps<any>>;
}

const ChannelFeed: FC<ChannelFeedProps> = (props) => {
  const queryResult = useGetChannelFeedQuery({
    variables: {
      id: props.id,
    },
  });
  console.log('queryResult', queryResult);

  return queryResult.loading || queryResult.error
    ? <LoadRetry {...queryResult} />
    : (
      <Feed
        data={queryResult.data.getChannelFeed}
        flatListProps={props.flatListProps}
        // flatListContainerStyle={{ paddingTop: headerHeight }}
      />
    );
};

export default ChannelFeed;
