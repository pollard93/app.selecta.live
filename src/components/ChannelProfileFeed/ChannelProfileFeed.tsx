/* eslint-disable max-classes-per-file */
import React, { FC } from 'react';
import { FlatListProps, SafeAreaView } from 'react-native';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import { ScreenProps, STACK } from '../../screens/utils/interfaces';
import Feed from '../UI/Feed/Feed';
import { useGetChannelProfileFeedQuery } from '../../API/query/getChannelProfileFeed/getChannelProfileFeed';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import FadeInView from '../UI/FadeInView/FadeInView';
import { pushScreen } from '../../screens/utils';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';

export interface ChannelProfileFeedProps extends ScreenProps {
  id: string;
  flatListProps: Partial<FlatListProps<any>>;
}

const ChannelProfileFeed: FC<ChannelProfileFeedProps> = (props) => {
  const queryResult = useGetChannelProfileFeedQuery({
    variables: {
      id: props.id,
    },
    fetchPolicy: 'network-only',
  });

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
                data={queryResult.data.getChannelProfileFeed}
                onPressStream={(id) => {
                  pushScreen(STACK.TAB_HOME, StreamProfileScreen, { id });
                }}
                onPressChannel={(id) => {
                  pushScreen(STACK.TAB_HOME, ChannelProfileScreen, { id });
                }}
                refetch={queryResult.refetch}
                flatListProps={props.flatListProps}
              />
            </FadeInView>
          )
      }
    </SafeAreaView>
  );
};

export default ChannelProfileFeed;
