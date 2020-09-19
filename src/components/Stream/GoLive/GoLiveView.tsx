import React, { FC } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Clipboard from '@react-native-community/clipboard';
import { QueryResult } from 'react-apollo';
import Styles, { DynamicStyles } from './GoLive.style';
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
import H3 from '../../UI/Typography/components/H3';
import H2 from '../../UI/Typography/components/H2';

export interface GoLiveViewProps {
  state: GoLiveState;
  streamSelfQueryResult: QueryResult<getStreamSelf, getStreamSelfVariables>;
  streamUrlQueryResult: QueryResult<getStreamUrl, getStreamUrlVariables>;
  onGoLive: () => void;
  goLiveLoading: boolean;
  onEndLive: () => void;
  endLiveLoading: boolean;
}

const GoLiveView: FC<GoLiveViewProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);


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
      dismissible: false,
    });
  };


  /**
   * Load retry
   */
  if (props.streamSelfQueryResult.loading || props.streamSelfQueryResult.error) {
    return (
      <LoadRetry {...props.streamSelfQueryResult} />
    );
  }
  if (props.streamUrlQueryResult.loading || props.streamUrlQueryResult.error) {
    return (
      <LoadRetry {...props.streamUrlQueryResult} />
    );
  }


  switch (props.state) {
    case 'WAITING':
      return (
        <>
          <H2 style={Styles.name}>{props.streamSelfQueryResult.data.getStreamSelf.name}</H2>
          <H3 style={Styles.state}>Status: Waiting for stream</H3>
          <View style={Styles.authKeys}>
            <View style={Styles.authKey}>
              <Body bold>Stream Url: </Body>
              <Body
                style={[Styles.authKeyBody, dynamicStyles.authKeyBody]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {props.streamSelfQueryResult.data.getStreamSelf.streamUrl}
              </Body>

              <TouchableOpacity onPress={() => onCopy(props.streamSelfQueryResult.data.getStreamSelf.streamUrl)}>
                <Icon name={ICON.COPY} size="small" />
              </TouchableOpacity>
            </View>

            <View style={Styles.authKey}>
              <Body bold>Stream Key: </Body>
              <TextInput
                editable={false}
                secureTextEntry={true}
                value={props.streamSelfQueryResult.data.getStreamSelf.streamKey}
                style={[Styles.authKeyBody, dynamicStyles.authKeyBody]}
              />

              <TouchableOpacity onPress={() => onCopy(props.streamSelfQueryResult.data.getStreamSelf.streamKey)}>
                <Icon name={ICON.COPY} size="small" />
              </TouchableOpacity>
            </View>
          </View>
        </>
      );

    case 'CONNECTED':
    case 'LIVE':
    case 'ENDED':
      return (
        <>
          <H2 style={Styles.name}>{props.streamSelfQueryResult.data.getStreamSelf.name}</H2>
          <H3 style={Styles.state}>Status: {props.state.charAt(0).toUpperCase() + props.state.slice(1).toLowerCase()}</H3>
          <View style={Styles.video}>
            <StreamVideo
              data={props.streamSelfQueryResult.data.getStreamSelf}
              disableFullScreen
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
            <Button
              title="END STREAM"
              onPress={() => props.onEndLive()}
              loading={props.endLiveLoading}
            />
          )}
        </>
      );

    default:
      return null;
  }
};

export default GoLiveView;
