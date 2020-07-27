/* eslint-disable max-classes-per-file */
import React, { FC, useEffect } from 'react';
import { View, SafeAreaView, Linking } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useToast } from 'mbp-components-rn-toast';
import { useGetFeedQuery } from '../../API/query/getFeed/getFeed';
import LoadRetry from '../UI/LoadRetry/LoadRetry';
import Header, { useHeaderStyles } from '../UI/Headers/Header/Header';
import { ScreenProps, STACK } from '../../screens/utils/interfaces';
import GlobalStyles from '../../styles/stylesheets/GlobalStyles';
import Feed from '../UI/Feed/Feed';
import Toast from '../UI/Toast/Toast';
import { pushScreen } from '../../screens/utils';
import StreamProfileScreen from '../../screens/StreamProfileScreen/StreamProfileScreen';
import ChannelProfileScreen from '../../screens/ChannelProfileScreen/ChannelProfileScreen';


export interface HomeFeedProps extends ScreenProps {}

const HomeFeed: FC<HomeFeedProps> = () => {
  const toast = useToast();
  const queryResult = useGetFeedQuery();
  const { headerHeight } = useHeaderStyles();


  /**
   * Remove splash
   */
  useEffect(() => {
    SplashScreen.hide();

    /** Register deep linking event listeners */
    const eventListener = ({ url }: { url: string }) => {
      const [, path] = url.split('://');
      const [type, identifier] = path.split('/');

      switch (type) {
        case 'stream':
          pushScreen(STACK.TAB_HOME, StreamProfileScreen, { id: identifier });
          break;

        case 'channel':
          pushScreen(STACK.TAB_HOME, ChannelProfileScreen, { id: identifier });
          break;

        default:
          toast.push({
            duration: 1000,
            component: (
              <Toast content="Unable to open link" />
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

      <SafeAreaView style={GlobalStyles.PageFill}>
        {
          queryResult.loading || queryResult.error
            ? <LoadRetry cover {...queryResult} />
            : (
                <Feed
                  data={queryResult.data.getFeed}
                  refetch={queryResult.refetch}
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
