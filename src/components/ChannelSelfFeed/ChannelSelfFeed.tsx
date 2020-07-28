/* eslint-disable max-classes-per-file */
import React, { FC } from 'react';
import { FlatListProps, SafeAreaView } from 'react-native';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import { ScreenProps } from '../../screens/utils/interfaces';
import Feed from '../UI/Feed/Feed';
import { useGetChannelSelfFeedQuery } from '../../API/query/getChannelSelfFeed/getChannelSelfFeed';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import FadeInView from '../UI/FadeInView/FadeInView';

export interface ChannelSelfFeedProps extends ScreenProps {
  flatListProps: Partial<FlatListProps<any>>;
}

const ChannelSelfFeed: FC<ChannelSelfFeedProps> = (props) => {
  const queryResult = useGetChannelSelfFeedQuery({
    fetchPolicy: 'network-only',
  });
  console.log('queryResult', queryResult);

  if (queryResult.loading) {
    return null;
  }

  return (
    <SafeAreaView style={GlobalStyles.PageFill}>
      {
        queryResult.error
          ? <LoadRetry {...queryResult} />
          : (
            <FadeInView>
              <Feed
                data={queryResult.data.getChannelSelfFeed}
                refetch={queryResult.refetch}
                flatListProps={props.flatListProps}
              />
            </FadeInView>
          )
      }
    </SafeAreaView>
  );
};

export default ChannelSelfFeed;
