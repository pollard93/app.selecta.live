import React, { FC } from 'react';
import { View, SafeAreaView } from 'react-native';
import Styles from './CameraStreamControls.style';
import { GoLiveState } from '../../../../../utils/streamFunctions';
import Button from '../../../../UI/Button/Button';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import Small from '../../../../UI/Typography/components/Small';
import spacing from '../../../../../styles/definitions/spacing';
import LoadingIcon from '../../../../UI/LoadingIcon/LoadingIcon';

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
  console.log('props', props);


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

            <Button
              title={props.streaming ? 'Disconnect' : 'Connect'}
              onPress={() => props.setStreaming(!props.streaming)}
            />
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
              title='CONFIRM GO LIVE'
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
                <View style={Styles.liveConsumers}>
                  <Icon forceLight name={ICON.PROFILE} size="xsmall" style={Styles.liveConsumersIcon} />
                  <Small bold forceLight>{props.liveConsumers}</Small>
                </View>
              )}
            </View>

            <Button
              title="END STREAM"
              onPress={props.onEndLive}
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
                title='CONFIRM END LIVE'
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
