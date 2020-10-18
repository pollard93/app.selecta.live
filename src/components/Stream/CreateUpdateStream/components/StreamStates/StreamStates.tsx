import React, { FC } from 'react';
import { View } from 'react-native';
import { STREAM_SELF_FRAGMENT } from '../../../../../API/fragments/__generated__/STREAM_SELF_FRAGMENT';
import PublishStream from '../../../PublishStream/PublishStream';
import DeleteStream from '../../../DeleteStream/DeleteStream';
import CancelStream from '../../../CancelStream/CancelStream';
import Styles from './StreamStates.style';
import { formatForTimezone } from '../../../../../utils/functions';
import H4 from '../../../../UI/Typography/components/H4';
import Button from '../../../../UI/Button/Button';
import { pushScreen } from '../../../../../screens/utils';
import { useScreenProps } from '../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import StreamSelfScreen from '../../../../../screens/StreamSelfScreen/StreamSelfScreen';
import Body from '../../../../UI/Typography/components/Body';

interface StreamStatesProps {
  data: STREAM_SELF_FRAGMENT;
  onPop?: () => void;
}

const StreamStates: FC<StreamStatesProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * Handle published state
   */
  if (!props.data.published) {
    return (
      <View style={Styles.wrap}>
        <View style={Styles.inner}>
          <DeleteStream {...props} />
        </View>
        <View style={Styles.spacer} />
        <View style={Styles.inner}>
          <PublishStream {...props} />
        </View>
      </View>
    );
  }


  /**
   * Push screen self screen
   */
  const onViewStream = () => {
    pushScreen(screenProps.componentId, StreamSelfScreen, {
      id: props.data.id,
    });
  };


  /**
   * Handle cancelled or published
   */
  return !props.data.cancelled
    ? (
      <>
        <Body style={Styles.published}>Stream Published: {formatForTimezone(props.data.published, 'calendar')}</Body>
        <View style={Styles.wrap}>
          <View style={Styles.inner}>
            <CancelStream {...props} />
          </View>
          <View style={Styles.spacer} />
          <View style={Styles.inner}>
            <Button
              title="View Stream"
              onPress={onViewStream}
            />
          </View>
        </View>
      </>
    )
    : <H4>Stream Cancelled: {formatForTimezone(props.data.cancelled, 'calendar')}</H4>;
};

export default StreamStates;
