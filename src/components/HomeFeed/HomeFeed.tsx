/* eslint-disable max-classes-per-file */
import React, { FC, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useGetFeedQuery } from '../../API/query/getFeed/getFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import FeedHeader from '../UI/Headers/FeedHeader/FeedHeader';
import { ScreenProps } from '../../screens/utils/interfaces';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Feed from '../UI/Feed/Feed';
import { headerHeight } from '../UI/Headers/FeedHeader/FeedHeader.style';

export interface HomeFeedProps extends ScreenProps {}

const HomeFeed: FC<HomeFeedProps> = () => {
  const queryResult = useGetFeedQuery();


  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <FeedHeader />

      <SafeAreaView style={GlobalStyles.PageFill}>
        {
          queryResult.loading || queryResult.error
            ? <LoadRetry cover {...queryResult} />
            : (
                <Feed
                  data={queryResult.data.getFeed}
                  flatListProps={{
                    contentContainerStyle: { paddingTop: headerHeight },
                  }}
                />
            )
        }
      </SafeAreaView>
    </View>
  );
};

export default HomeFeed;
