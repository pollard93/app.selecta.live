import React, { FC, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import Styles from '../../StreamSelfListItem.style';
import Body from '../../../../UI/Typography/components/Body';
import Button from '../../../../UI/Button/Button';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import { pushScreen } from '../../../../../screens/utils';
import StreamSelfScreen from '../../../../../screens/StreamSelfScreen/StreamSelfScreen';
import StreamStates from '../../../CreateUpdateStream/components/StreamStates/StreamStates';
import { StreamSelfListItemProps } from '../../StreamSelfListItem';
import { useScreenProps } from '../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import GoLiveScreen from '../../../../../screens/GoLiveScreens/GoLiveScreen/GoLiveScreen';
import { useStreamStart, canGoLive } from '../../../../../utils/streamFunctions';

const StreamSelfListItemControls: FC<StreamSelfListItemProps> = (props) => {
  const screenProps = useScreenProps();


  /**
   * When the stream is available to go live, force update to make the go live button available
   */
  const [, setState] = useState({});
  useStreamStart(new Date(new Date(props.data.timeFrom).getTime() - 1.8e+6).toISOString(), () => setState({}));


  /**
   * If not published or cancelled, return stream states
   */
  if (props.data.published === null || props.data.cancelled !== null) {
    return (
      <StreamStates {...props} />
    );
  }


  /**
   * Return metrics if finished
   */
  if (props.data.timeToLive) {
    return (
      <View style={Styles.metrics}>
        <TouchableOpacity onPress={() => pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id })}>
          <View style={Styles.metric}>
            <Icon name={ICON.CHAT} size="small" />
            <Body style={Styles.metricBody}>{props.data.commentsEdge} Comment{props.data.commentsEdge === 1 ? '' : 's'}</Body>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id })}>
          <View style={Styles.metric}>
            <Icon name={ICON.PLAY} size="small" />
            <Body style={Styles.metricBody}>View Stream</Body>
          </View>
        </TouchableOpacity>
      </View>
    );
  }


  /**
   * Return button end live if stream is live
   */
  if (props.data.timeFromLive) {
    return (
      <Button
        type="PRIMARY"
        title="END LIVE"
        onPress={() => pushScreen(screenProps.componentId, GoLiveScreen, { id: props.data.id })}
        style={Styles.streamButton}
      />
    );
  }


  /**
   * If within half an hour of timeFrom then show go live button
   */
  if (canGoLive(props.data)) {
    return (
      <Button
        type="PRIMARY"
        title="GO LIVE"
        onPress={() => pushScreen(screenProps.componentId, GoLiveScreen, { id: props.data.id })}
        style={Styles.streamButton}
      />
    );
  }


  /**
   * Otherwise show a disbaled button saying they can go live half an hour before
   */
  return (
    <Button
      type="PRIMARY"
      title={`Available to go live ${moment(new Date(new Date(props.data.timeFrom).getTime() - 1.8e+6)).fromNow()}`}
      onPress={() => {}}
      style={Styles.streamButton}
      disabled
    />
  );
};

export default StreamSelfListItemControls;
