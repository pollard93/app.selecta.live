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
import UnlistStream from '../../../UnlistStream/UnlistStream';
import GoLiveIntroScreen from '../../../../../screens/GoLiveIntroScreen/GoLiveIntroScreen';

interface StreamStatesProps {
  data: STREAM_SELF_FRAGMENT;
  onPop?: () => void;
}

const StreamStates: FC<StreamStatesProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * Unpublished
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
   * Cancelled
   */
  if (props.data.cancelled) {
    return (
      <H4>Stream Cancelled: {formatForTimezone(props.data.cancelled, 'calendar')}</H4>
    );
  }


  /**
   * Live
   */
  if (props.data.timeFromLive !== null && props.data.timeToLive === null) {
    /**
     * Push GoLiveIntroScreen
     */
    const onGoLive = () => {
      pushScreen(screenProps.componentId, GoLiveIntroScreen, { id: props.data.id });
    };


    return (
      <>
        <Body style={Styles.published}>Stream Published: {formatForTimezone(props.data.published, 'calendar')}</Body>
        <View style={Styles.wrap}>
          <View style={Styles.inner}>
            <Button
              title="END LIVE"
              onPress={onGoLive}
              type="SECONDARY"
            />
          </View>
          <View style={Styles.spacer} />
          <View style={Styles.inner}>
            <Button
              title="View"
              onPress={onViewStream}
            />
          </View>
        </View>
      </>
    );
  }


  /**
   * Published
   * Not gone live
   */
  if (props.data.timeFromLive === null) {
    return (
      <>
        <Body style={Styles.published}>Stream Published: {formatForTimezone(props.data.published, 'calendar')}</Body>
        <View style={Styles.wrap}>
          <View style={Styles.inner}>
            <CancelStream {...props} />
          </View>
          <View style={Styles.spacer} />
          <View style={Styles.inner}>
            <Button
              title="View"
              onPress={onViewStream}
            />
          </View>
        </View>
      </>
    );
  }


  /**
   * Published
   * Has finished
   */
  return (
    <>
      <Body style={Styles.published}>Stream Published: {formatForTimezone(props.data.published, 'calendar')}</Body>
      <View style={Styles.wrap}>
        <View style={Styles.inner}>
          <UnlistStream {...props} />
        </View>
        <View style={Styles.spacer} />
        <View style={Styles.inner}>
          <Button
            title="View"
            onPress={onViewStream}
          />
        </View>
      </View>
    </>
  );
};

export default StreamStates;
