/* eslint-disable max-classes-per-file */
import React, { FC, useEffect } from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useGetHomeFeedQuery } from '../../API/query/getHomeFeed/getHomeFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import Header from '../UI/Headers/Header/Header';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Feed from '../UI/Feed/Feed';
import Toast from '../UI/Toast/Toast';
import { pushScreen } from '../../screens/utils';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushToast } from '../../modules/Toast';


export interface HomeFeedProps {
  toastMessage?: string;
}

const HomeFeed: FC<HomeFeedProps> = (props) => {
  const queryResult = useGetHomeFeedQuery();
  const screenProps = useScreenProps();


  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();

    // If toastMessage given then show toast
    if (props.toastMessage) {
      pushToast({
        duration: 1000,
        component: (
          <Toast content={props.toastMessage} />
        ),
        dismissible: false,
      });
    }
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <Header />

      <Button title="TOAST" onPress={async () => {
        pushToast({
          duration: 1000,
          component: (
            <Toast
              type="ERROR"
              content="Unable to open link"
            />
          ),
          dismissible: false,
        });
      }} />

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
