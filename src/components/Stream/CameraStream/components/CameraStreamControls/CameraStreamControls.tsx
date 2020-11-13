import React, { FC } from 'react';
import { View, SafeAreaView } from 'react-native';
import Styles from './CameraStreamControls.style';
import { GoLiveState } from '../../../../../utils/streamFunctions';
import Button from '../../../../UI/Button/Button';
import Small from '../../../../UI/Typography/components/Small';
import spacing from '../../../../../styles/definitions/spacing';
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon';
import H4 from '../../../../UI/Typography/components/H4';
import LiveConsumers from '../../../../UI/LiveConsumers/LiveConsumers';
import FadeInView from '../../../../UI/FadeInView/FadeInView';

export interface CameraStreamControlsProps {
  endLiveLoading: boolean;
  goLiveLoading: boolean;
  liveConsumers?: number;
  onCancel: () => void;
  onEndLive: () => void;
  onEndLiveCancel: () => void;
  onEndLiveConfirm: () => void;
  onGoLive: () => void;
  onGoLiveCancel: () => void;
  onGoLiveConfirm: () => void;
  setStreaming: (v: boolean) => void;
  state: GoLiveState;
  streaming: boolean;
}

const CameraStreamControls: FC<CameraStreamControlsProps> = (props) => {
  switch (props.state) {
    case 'WAITING':
      return (
        <SafeAreaView>
          <View style={Styles.controls}>
            <Button
              title='Cancel'
              onPress={props.onCancel}
              type="SECONDARY"
            />

            <View style={Styles.inner}>
              {props.streaming && <H4 style={Styles.status}>Waiting for connection..</H4>}
              <Button
                title={props.streaming ? 'Disconnect' : 'Connect'}
                onPress={() => props.setStreaming(!props.streaming)}
              />
            </View>
          </View>
        </SafeAreaView>
      );

    case 'CONNECTED':
      return (
        <SafeAreaView>
          <View style={Styles.controls}>
            <Button
              title='Cancel'
              onPress={props.onCancel}
              type="SECONDARY"
            />

            <Button
              title={props.streaming ? 'GO LIVE' : 'Connect'}
              onPress={() => {
                if (props.streaming) {
                  props.onGoLive();
                } else {
                  props.setStreaming(true);
                }
              }}
            />
          </View>
        </SafeAreaView>
      );

    case 'LIVE_CONFIRM':
      return (
        <SafeAreaView>
          <View style={Styles.controls}>
            <Button
              title='Cancel'
              onPress={props.onGoLiveCancel}
              type="SECONDARY"
              disabled={props.goLiveLoading}
            />

            <Button
              title={props.goLiveLoading ? 'GOING LIVE' : 'CONFIRM GO LIVE'}
              onPress={props.onGoLiveConfirm}
              loading={props.goLiveLoading}
            />
          </View>
        </SafeAreaView>
      );

    case 'LIVE':
      return (
        <SafeAreaView>
          <View style={Styles.controls}>
            <View style={Styles.liveWrap}>
              <View style={Styles.live}>
                <LoadingIcon size="small" />
                <Small bold forceLight style={{ paddingLeft: spacing.xsmall }}>LIVE</Small>
              </View>

              {props.liveConsumers > 0 && (
                <FadeInView>
                  <LiveConsumers
                    count={props.liveConsumers}
                    wrapStyle={Styles.liveConsumers}
                  />
                </FadeInView>
              )}
            </View>

            <Button
              title={props.streaming ? 'END STREAM' : 'Connect'}
              onPress={() => {
                if (props.streaming) {
                  props.onEndLive();
                } else {
                  props.setStreaming(true);
                }
              }}
            />
          </View>
        </SafeAreaView>
      );

    case 'END_CONFIRM':
      return (
        <SafeAreaView>
          <View style={Styles.controls}>
            <Button
              title='Cancel'
              onPress={props.onEndLiveCancel}
              type="SECONDARY"
              disabled={props.endLiveLoading}
            />

            <Button
              title={props.endLiveLoading ? 'ENDING STREAM' : 'CONFIRM END STREAM'}
              onPress={props.onEndLiveConfirm}
              loading={props.endLiveLoading}
            />
          </View>
        </SafeAreaView>
      );

    default:
      return null;
  }
};

export default CameraStreamControls;
