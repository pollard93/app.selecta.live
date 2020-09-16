import React, { FC } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useDynamicValue } from 'react-native-dynamic';
import moment from 'moment-timezone';
import Styles, { DynamicStyles } from '../../StreamSelfListItem.style';
import Body from '../../../../UI/Typography/components/Body';
import Button from '../../../../UI/Button/Button';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import { pushScreen } from '../../../../../screens/utils';
import Toast from '../../../../UI/Toast/Toast';
import StreamSelfScreen from '../../../../../screens/StreamSelfScreen/StreamSelfScreen';
import StreamStates from '../../../CreateUpdateStream/components/StreamStates/StreamStates';
import { StreamSelfListItemProps } from '../../StreamSelfListItem';
import { useScreenProps } from '../../../../../modules/ScreenPropsProvider/ScreenPropsProvider';
import { pushToast } from '../../../../../modules/Toast';
import { formatForTimezone } from '../../../../../utils/functions';

const StreamSelfListItemControls: FC<StreamSelfListItemProps> = (props) => {
  const screenProps = useScreenProps();
  const now = new Date();
  const dynamicStyles = useDynamicValue(DynamicStyles);


  /**
   * If not published or cancelled, return stream states
   */
  if (props.data.published === null || props.data.cancelled !== null) {
    return (
      <StreamStates {...props} />
    );
  }


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
        onPress={() => pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id })}
        style={Styles.streamButton}
      />
    );
  }


  /**
   * If within half an hour of timeFrom then show go live button
   */
  if (new Date(props.data.timeFrom).getTime() - now.getTime() <= 1.8e+6) {
    return (
      <Button
        type="PRIMARY"
        title="GO LIVE"
        onPress={() => pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id })}
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
      onPress={() => pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id })}
      style={Styles.streamButton}
      disabled
    />
  );
};

export default StreamSelfListItemControls;
