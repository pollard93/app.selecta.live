import React, { FC } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useToast } from 'mbp-components-rn-toast';
import Styles from '../../StreamSelfListItem.style';
import Body from '../../../../UI/Typography/components/Body';
import Button from '../../../../UI/Button/Button';
import Icon, { ICON } from '../../../../UI/Icon/Icon';
import { pushScreen } from '../../../../../screens/utils';
import { STACK } from '../../../../../screens/utils/interfaces';
import Toast from '../../../../UI/Toast/Toast';
import StreamSelfScreen from '../../../../../screens/StreamSelfScreen/StreamSelfScreen';
import StreamStates from '../../../CreateUpdateStream/components/StreamStates/StreamStates';
import { StreamSelfListItemProps } from '../../StreamSelfListItem';

const StreamSelfListItemControls: FC<StreamSelfListItemProps> = (props) => {
  const toast = useToast();
  const now = new Date();


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

    toast.push({
      duration: 1000,
      component: (
        <Toast content='Copied!' />
      ),
      dismissible: false,
    });
  };


  /**
   * Return Stream Key if not finished
   */
  if (new Date(props.data.timeTo) >= now) {
    return (
      <>
        <Button
          type="PRIMARY"
          title="View Stream"
          onPress={() => pushScreen(STACK.PROFILE, StreamSelfScreen, { id: props.data.id })}
          style={Styles.streamButton}
        />

        <View style={Styles.authKeys}>
          <View style={Styles.authKey}>
            <Body bold>Stream Url: </Body>
            <Body
              style={Styles.authKeyBody}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {props.data.streamUrl}{props.data.streamUrl}
            </Body>

            <TouchableOpacity onPress={() => onCopy(props.data.streamUrl)}>
              <Icon name={ICON.COPY} size="small" />
            </TouchableOpacity>
          </View>

          <View style={Styles.authKey}>
            <Body bold>Stream Key: </Body>
            <TextInput
              editable={false}
              secureTextEntry={true}
              value={props.data.streamKey}
              style={Styles.authKeyBody}
            />

            <TouchableOpacity onPress={() => onCopy(props.data.streamKey)}>
              <Icon name={ICON.COPY} size="small" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  /**
   * Return metrics if finished
   */
  return (
    <View style={Styles.metrics}>
      <TouchableOpacity onPress={() => pushScreen(STACK.PROFILE, StreamSelfScreen, { id: props.data.id })}>
        <View style={Styles.metric}>
          <Icon name={ICON.CHAT} size="small" />
          <Body style={Styles.metricBody}>{props.data.commentsEdge} Comment{props.data.commentsEdge === 1 ? '' : 's'}</Body>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => pushScreen(STACK.PROFILE, StreamSelfScreen, { id: props.data.id })}>
        <View style={Styles.metric}>
          <Icon name={ICON.PLAY} size="small" />
          <Body style={Styles.metricBody}>View Stream</Body>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StreamSelfListItemControls;
