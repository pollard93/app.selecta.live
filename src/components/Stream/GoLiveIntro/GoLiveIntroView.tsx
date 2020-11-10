import React, { FC, useRef } from 'react';
import { View, Image, Dimensions, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetStreamSelfQuery } from '../../../API/query/getStreamSelf/getStreamSelf';
import { useGetStreamUrlQuery } from '../../../API/query/getStreamUrl/getStreamUrl';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import GoLiveScreen from '../../../screens/GoLiveScreen/GoLiveScreen';
import { openCameraOverlay, pushScreen } from '../../../screens/utils';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import Button from '../../UI/Button/Button';
import Gradient from '../../UI/Gradient/Gradient';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import H2 from '../../UI/Typography/components/H2';
import Styles from './GoLiveIntro.style';

export interface GoLiveIntroViewProps {
  id: string;
}

const GoLiveIntroView: FC<GoLiveIntroViewProps> = (props) => {
  const safeAreaInsets = useSafeArea();
  const { headerHeight } = useHeaderStyles();
  const screenHeight = useRef(Dimensions.get('window').height - safeAreaInsets.top - headerHeight - StatusBar.currentHeight).current;


  /**
   * Get stream and url
   */
  const streamSelfQueryResult = useGetStreamSelfQuery({
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  });
  const streamUrlQueryResult = useGetStreamUrlQuery({
    variables: { id: props.id },
    fetchPolicy: 'network-only',
  });


  /**
   * Misc
   */
  const screenProps = useScreenProps();


  // /**
  //  * State TODO
  //  */
  // const [state, setState] = useState<GoLiveState>('WAITING');


  // /**
  //  * Wait until we have result back and check if live
  //  */
  // useEffect(() => {
  //   /**
  //    * If timeFromLive is set, then the stream is already live
  //    */
  //   if (streamSelfQueryResult.data?.getStreamSelf.timeFromLive) {
  //     setState('LIVE');
  //   }
  // }, [streamSelfQueryResult.data?.getStreamSelf, streamUrlQueryResult.data?.getStreamUrl]);


  /**
   * Load retry
   */
  if (streamSelfQueryResult.loading || streamSelfQueryResult.error) {
    return (
      <Gradient style={[GlobalStyles.PageFill, Styles.loadingError]}>
        <LoadRetry light {...streamSelfQueryResult} />
      </Gradient>
    );
  }
  if (streamUrlQueryResult.loading || streamUrlQueryResult.error) {
    return (
      <Gradient style={[GlobalStyles.PageFill, Styles.loadingError]}>
        <LoadRetry light {...streamUrlQueryResult} />
      </Gradient>
    );
  }


  return (
    <View style={GlobalStyles.PageFill}>
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{ minHeight: screenHeight }}
      >
        <Gradient style={[GlobalStyles.PageFill, Styles.wrap, { paddingBottom: safeAreaInsets.bottom }]}>
          <View style={Styles.heading}>
            <View style={Styles.headingImageWrap}>
              <Image
                source={require('../../../assets/images/logo-icon.png')}
                style={Styles.headingImage}
              />
            </View>

            <H2 forceLight>HOW ARE YOU STREAMING?</H2>
          </View>

          <View style={Styles.lower}>
            <Button
              title="With Software"
              onPress={() => {
                pushScreen(screenProps.componentId, GoLiveScreen, {
                  id: props.id,
                });
              }}
              type="SECONDARY"
            />

            <Button
              title="With Camera"
              onPress={() => {
                openCameraOverlay({
                  id: props.id,
                });
              }}
              type="SECONDARY"
              style={Styles.button}
            />
          </View>
        </Gradient>
      </ScrollView>
    </View>
  );
};

export default GoLiveIntroView;
