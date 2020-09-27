import React, { FC } from 'react';
import { FlatListProps, SafeAreaView } from 'react-native';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import Feed from '../UI/Feed/Feed';
import { useGetChannelSelfFeedQuery } from '../../API/query/getChannelSelfFeed/getChannelSelfFeed';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import FadeInView from '../UI/FadeInView/FadeInView';
import { pushScreen } from '../../screens/utils';
import StreamSelfScreen from '../../screens/StreamSelfScreen/StreamSelfScreen';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';

export interface ChannelSelfFeedProps {
  flatListProps: Partial<FlatListProps<any>>;
}

const ChannelSelfFeed: FC<ChannelSelfFeedProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * Query
   */
  const queryResult = useGetChannelSelfFeedQuery({
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
                data={queryResult.data.getChannelSelfFeed}
                onPressStream={(id) => {
                  pushScreen(screenProps.componentId, StreamSelfScreen, { id });
                }}
                onPressChannel={() => {
                  // Should not be presented with channels on this feed
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

export default ChannelSelfFeed;
