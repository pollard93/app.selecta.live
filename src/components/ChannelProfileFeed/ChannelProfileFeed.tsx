/* eslint-disable max-classes-per-file */
import React, { FC, MutableRefObject } from 'react';
import { FlatList, FlatListProps, SafeAreaView } from 'react-native';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import Feed from '../UI/Feed/Feed';
import { useGetChannelProfileFeedQuery } from '../../API/query/getChannelProfileFeed/getChannelProfileFeed';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import FadeInView from '../UI/FadeInView/FadeInView';
import { pushScreen } from '../../screens/utils';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface ChannelProfileFeedProps {
  id: string;
  flatListProps: Partial<FlatListProps<any>>;
  innerRef?: MutableRefObject<FlatList<any>>;
}

const ChannelProfileFeed: FC<ChannelProfileFeedProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * Query
   */
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
                ref={props.innerRef}
                data={queryResult.data.getChannelProfileFeed}
                onPressStream={(id) => {
                  pushScreen(screenProps.componentId, StreamProfileScreen, { id });
                }}
                onPressChannel={(id) => {
                  pushScreen(screenProps.componentId, ChannelProfileScreen, { id });
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
