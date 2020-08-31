/* eslint-disable max-classes-per-file */
import React, { FC, useEffect } from 'react';
import { View, SafeAreaView, Linking, Button } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useToast } from 'mbp-components-rn-toast';
import { Navigation } from 'react-native-navigation';
import { useGetHomeFeedQuery } from '../../API/query/getHomeFeed/getHomeFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import Header from '../UI/Headers/Header/Header';
import { STACK } from '../../screens/utils/interfaces';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Feed from '../UI/Feed/Feed';
import Toast from '../UI/Toast/Toast';
import { pushScreen } from '../../screens/utils';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';
import { useScreenProps } from '../../modules/ScreenPropsProvider/ScreenPropsProvider';


export interface HomeFeedProps {
  toastMessage?: string;
}

const HomeFeed: FC<HomeFeedProps> = (props) => {
  const toast = useToast();
  const queryResult = useGetHomeFeedQuery();
  const screenProps = useScreenProps();


  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();

    // If toastMessage given then show toast
    if (props.toastMessage) {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={props.toastMessage} />
        ),
        dismissible: false,
      });
    }

    /** Register deep linking event listeners */
    const eventListener = ({ url }: { url: string }) => {
      const [, path] = url.split('://');
      const [type, identifier] = path.split('/');

      switch (type) {
        case 'stream':
          pushScreen(screenProps.componentId, StreamProfileScreen, { id: identifier });
          Navigation.mergeOptions(STACK.ROOT, {
            bottomTabs: {
              currentTabIndex: 0,
            },
          });
          break;

        case 'channel':
          pushScreen(screenProps.componentId, ChannelProfileScreen, { id: identifier });
          Navigation.mergeOptions(STACK.ROOT, {
            bottomTabs: {
              currentTabIndex: 0,
            },
          });
          break;

        default:
          toast.push({
            duration: 1000,
            component: (
              <Toast
                type="ERROR"
                content="Unable to open link"
              />
            ),
            dismissible: false,
          });
          break;
      }
    };
    Linking.addEventListener('url', eventListener);

    /** Remove any event listeners */
    return () => Linking.removeListener('url', eventListener);
  }, []);


  return (
    <View style={GlobalStyles.PageFill}>
      <Header />

      <Button title="TOAST" onPress={async () => {
        try {
          const test = await Navigation.showOverlay({
            component: {
              name: 'Toast',
              passProps: {
                duration: 1000,
                component: (
                  <Toast
                    type="ERROR"
                    content="Unable to open link"
                  />
                ),
                dismissible: false,
              },
            },
          })
          console.log("test", test)
        } catch (e){
          console.log("e", e)
        }
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
