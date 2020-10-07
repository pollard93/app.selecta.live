/* eslint-disable max-classes-per-file */
import React, { FC, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { requestNotifications } from 'react-native-permissions';
import { useGetHomeFeedQuery } from '../../API/query/getHomeFeed/getHomeFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import Header from '../UI/Headers/Header/Header';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Feed from '../UI/Feed/Feed';
import { pushScreen } from '../../screens/utils';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';


export interface HomeFeedProps {}

const HomeFeed: FC<HomeFeedProps> = () => {
  const queryResult = useGetHomeFeedQuery();
  const screenProps = useScreenProps();


  /**
   * Remove splash
   * request notifications
   */
  useEffect(() => {
    SplashScreen.hide();
    requestNotifications(['alert', 'sound', 'badge']);
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <Header />

      <SafeAreaView style={GlobalStyles.PageFill}>
        {
          queryResult.loading || queryResult.error
            ? <LoadRetry cover {...queryResult} />
            : (
                <Feed
                  data={queryResult.data.getHomeFeed}
                  onPressStream={(id) => {
                    pushScreen(screenProps.componentId, StreamProfileScreen, { id });
                  }}
                  onPressChannel={(id) => {
                    pushScreen(screenProps.componentId, ChannelProfileScreen, { id });
                  }}
                  refetch={queryResult.refetch}
                />
            )
        }
      </SafeAreaView>
    </View>
  );
};

export default HomeFeed;
