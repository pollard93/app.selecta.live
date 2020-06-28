/* eslint-disable max-classes-per-file */
import React, { FC } from 'react';
import { FlatListProps, SafeAreaView } from 'react-native';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import { ScreenProps } from '../../screens/utils/interfaces';
import Feed from '../UI/Feed/Feed';
import { useGetChannelFeedQuery } from '../../API/query/getChannelFeed/getChannelFeed';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';

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

  return (
    <SafeAreaView style={GlobalStyles.PageFill}>
      {
        queryResult.loading || queryResult.error
          ? <LoadRetry cover {...queryResult} />
          : (
            <Feed
              data={queryResult.data.getChannelFeed}
              flatListProps={props.flatListProps}
            />
          )
      }
    </SafeAreaView>
  );
};

export default ChannelFeed;
