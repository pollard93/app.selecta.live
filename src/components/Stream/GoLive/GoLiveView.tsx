import React, { FC, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, TextInput as TextInputRN, KeyboardAvoidingView, Platform, Dimensions, StatusBar, ScrollView } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';
import Clipboard from '@react-native-community/clipboard';
import { QueryResult } from 'react-apollo';
import { Navigation } from 'react-native-navigation';
import Styles from './GoLive.style';
import Body from '../../UI/Typography/components/Body';
import LoadRetry from '../../UI/LoadRetry/LoadRetry';
import { pushToast } from '../../../modules/Toast';
import Toast from '../../UI/Toast/Toast';
import Icon, { ICON } from '../../UI/Icon/Icon';
import Button from '../../UI/Button/Button';
import StreamVideo from '../StreamVideo/StreamVideo';
import { GoLiveState } from './GoLive';
import { getStreamSelf, getStreamSelfVariables } from '../../../API/query/getStreamSelf/__generated__/getStreamSelf';
import { getStreamUrl, getStreamUrlVariables } from '../../../API/query/getStreamUrl/__generated__/getStreamUrl';
import H2 from '../../UI/Typography/components/H2';
import Gradient from '../../UI/Gradient/Gradient';
import GlobalStyles from '../../../styles/stylesheets/GlobalStyles';
import { useScreenProps } from '../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import TextInput from '../../UI/Form/components/TextInput/TextInput';
import useSafeArea from '../../../modules/SafeAreaInsets/SafeAreaInsets';
import { useHeaderStyles } from '../../UI/Headers/Header/Header';
import { pushScreen } from '../../../screens/utils';
import StreamSelfScreen from '../../../screens/StreamSelfScreen/StreamSelfScreen';

export interface GoLiveViewProps {
  id: string;
  state: GoLiveState;
  streamSelfQueryResult: QueryResult<getStreamSelf, getStreamSelfVariables>;
  streamUrlQueryResult: QueryResult<getStreamUrl, getStreamUrlVariables>;
  onGoLive: () => void;
  goLiveLoading: boolean;
  onStartEndLive: () => void;
  onCancelEndLive: () => void;
  onEndLive: () => void;
  endLiveLoading: boolean;
}

const GoLiveView: FC<GoLiveViewProps> = (props) => {
  const screenProps = useScreenProps();
  const safeAreaInsets = useSafeArea();
  const darkMode = useDarkMode();
  const { headerHeight } = useHeaderStyles();
  const screenHeight = useRef(Dimensions.get('window').height - safeAreaInsets.top - headerHeight - StatusBar.currentHeight).current;


  /**
   * End stream states
   */
  const [endStreamValue, setEndStreamValue] = useState('');
  const [canEndStream, setCanEndStream] = useState(false);


  /**
   * Set text in clipboard and toast success
   */
  const onCopy = (text: string) => {
    Clipboard.setString(text);

    pushToast({
      duration: 1000,
      component: (
        <Toast content='Copied!' />
      ),
      dismissible: true,
    });
  };


  /**
   * On pop
   */
  const onPop = () => {
    Navigation.pop(screenProps.componentId);
  };


  /**
   * Push StreamSelfScreen
   */
  const onViewStream = () => {
    pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.id });
  };


  /**
   * Load retry
   */
  if (props.streamSelfQueryResult.loading || props.streamSelfQueryResult.error) {
    return (
      <Gradient style={[GlobalStyles.PageFill, Styles.loadingError]}>
        <LoadRetry light {...props.streamSelfQueryResult} />
      </Gradient>
    );
  }
  if (props.streamUrlQueryResult.loading || props.streamUrlQueryResult.error) {
    return (
      <Gradient style={[GlobalStyles.PageFill, Styles.loadingError]}>
        <LoadRetry light {...props.streamUrlQueryResult} />
      </Gradient>
    );
  }


  switch (props.state) {
    case 'WAITING':
      return (
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

              <H2 forceLight>WAITING FOR STREAM</H2>
            </View>

            <View style={Styles.lower}>
              <H2 forceLight>{props.streamSelfQueryResult.data.getStreamSelf.name}</H2>

              <View style={Styles.authKey}>
                <Body bold forceLight>Stream Url: </Body>

                <TouchableOpacity
                  onPress={() => onCopy(props.streamSelfQueryResult.data.getStreamSelf.streamUrl)}
                  style={Styles.authKeyCopy}
                >
                  <Body
                    style={Styles.authKeyBody}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {props.streamSelfQueryResult.data.getStreamSelf.streamUrl}
                  </Body>
                  <Icon name={ICON.COPY} size="small" style={Styles.copyIcon} />
                </TouchableOpacity>
              </View>

              <View style={Styles.authKey}>
                <Body bold forceLight>Stream Key: </Body>

                <TouchableOpacity
                  onPress={() => onCopy(props.streamSelfQueryResult.data.getStreamSelf.streamKey)}
                  style={Styles.authKeyCopy}
                >
                  <TextInputRN
                    editable={false}
                    secureTextEntry={true}
                    value={props.streamSelfQueryResult.data.getStreamSelf.streamKey}
                    style={Styles.authKeyBody}
                    pointerEvents="none"
                  />
                  <Icon name={ICON.COPY} size="small" style={Styles.copyIcon} />
                </TouchableOpacity>
              </View>

              <View style={Styles.instructions}>
                <Body bold forceLight>Copy and paste the stream url and key into your broadcasting software and start streaming.</Body>
              </View>
              <View style={Styles.instructions}>
                <Body bold forceLight>When your stream appears you will be taken to the next step.</Body>
              </View>
            </View>
          </Gradient>
        </ScrollView>
      );

    case 'CONNECTED':
    case 'LIVE':
      return (
        <ScrollView
          bounces={false}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={{ minHeight: screenHeight }}
        >
          <View style={[GlobalStyles.PageFill, Styles.wrap, { paddingBottom: safeAreaInsets.bottom }]}>
            <Gradient style={GlobalStyles.PageFill}>
              <View style={Styles.heading}>
                <View style={Styles.headingImageWrap}>
                  <Image
                    source={require('../../../assets/images/logo-icon.png')}
                    style={Styles.headingImage}
                  />
                </View>

                <H2 forceLight>{props.state === 'CONNECTED' ? 'CONNECTED' : 'YOU ARE LIVE'}</H2>
              </View>
            </Gradient>

            <View style={Styles.lower}>
              <H2>{props.streamSelfQueryResult.data.getStreamSelf.name}</H2>

              <View style={Styles.video}>
                <StreamVideo
                  data={props.streamSelfQueryResult.data.getStreamSelf}
                  disableFullScreen
                  isChannelPreview
                />
              </View>

              {props.state === 'CONNECTED' && (
                <Button
                  title="GO LIVE"
                  onPress={() => props.onGoLive()}
                  loading={props.goLiveLoading}
                />
              )}

              {props.state === 'LIVE' && (
                <View style={Styles.buttons}>
                  <Button
                    title="VIEW STREAM"
                    type="SECONDARY"
                    onPress={onViewStream}
                    disabled={props.endLiveLoading}
                    size="small"
                  />

                  <Button
                    title="END STREAM"
                    onPress={() => props.onStartEndLive()}
                    loading={props.endLiveLoading}
                    size="small"
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      );

    case 'ENDING':
      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.PageFill}
        >
          <ScrollView
            bounces={false}
            contentInsetAdjustmentBehavior="never"
            contentContainerStyle={{ minHeight: screenHeight }}
          >
            <View style={[GlobalStyles.PageFill, Styles.wrap, { paddingBottom: safeAreaInsets.bottom }]}>
              <View style={Styles.heading}>
                <View style={Styles.headingImageWrap}>
                  <Image
                    source={require('../../../assets/images/logo-icon.png')}
                    style={[Styles.headingImage, darkMode === false && Styles.headingImageDark]}
                  />
                </View>

                <H2>YOUR STREAM IS STILL LIVE</H2>
              </View>

              <View style={[Styles.lower, Styles.lowerCenter]}>
                <H2 style={Styles.itemText}>ARE YOU SURE YOU WANT TO END THE STREAM?</H2>

                <View style={Styles.item}>
                  <Button
                    title="NO - CONTINUE THE STREAM"
                    onPress={props.onCancelEndLive}
                    disabled={props.endLiveLoading}
                  />
                </View>

                <View style={Styles.item}>
                  <H2 style={Styles.itemText}>{'To end this stream, type\n“END STREAM” into the box below:'}</H2>
                </View>

                <View style={[Styles.item, Styles.itemInput]}>
                  <TextInput
                    name="End Stream"
                    label={null}
                    value={endStreamValue}
                    onChangeText={(v) => {
                      setEndStreamValue(v);
                      setCanEndStream(v === 'END STREAM');
                    }}
                    editable={!props.endLiveLoading}
                  />
                </View>

                <View style={Styles.item}>
                  <Button
                    title="END THE STREAM"
                    type="SECONDARY"
                    onPress={props.onEndLive}
                    disabled={!canEndStream || props.endLiveLoading}
                    loading={props.endLiveLoading}
                    size="small"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );

    case 'ENDED':
      return (
        <ScrollView
          bounces={false}
          contentInsetAdjustmentBehavior="never"
          contentContainerStyle={{ height: screenHeight }}
        >
          <Gradient style={[GlobalStyles.PageFill, Styles.wrap, { paddingBottom: safeAreaInsets.bottom }]}>
            <View style={Styles.heading}>
              <View style={Styles.headingImageWrap}>
                <Image
                  source={require('../../../assets/images/logo-icon.png')}
                  style={Styles.headingImage}
                />
              </View>

              <H2 forceLight>STREAM ENDED</H2>
            </View>

            <View style={Styles.lower}>
              <Button
                title="Back To Stream Management"
                type="SECONDARY"
                onPress={onPop}
              />
            </View>
          </Gradient>
        </ScrollView>
      );

    default:
      return null;
  }
};

export default GoLiveView;
