import React, { FC, useEffect, useRef } from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
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
  const ref = useRef<FlatList>();


  /**
   * Remove splash
   * request notifications
   */
  useEffect(() => {
    SplashScreen.hide();
    requestNotifications(['alert', 'sound', 'badge']);
  }, []);


  /**
   * Scroll to top of flatlist
   */
  const onPressLogo = () => {
    ref.current.scrollToOffset({ animated: true, offset: 0 });
  };


  return (
    <View style={GlobalStyles.PageFill}>
      <Header onPressLogo={onPressLogo} />

      <SafeAreaView style={GlobalStyles.PageFill}>
        {
          queryResult.loading || queryResult.error
            ? <LoadRetry cover {...queryResult} />
            : (
                <Feed
                  ref={ref}
                  data={queryResult.data.getHomeFeed}
                  onPressStream={(id) => {
                    console.log('id', id);
                    pushScreen(screenProps.componentId, StreamProfileScreen, { id });
                  }}
                  onPressChannel={(id) => {
                    console.log('id', id);
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
