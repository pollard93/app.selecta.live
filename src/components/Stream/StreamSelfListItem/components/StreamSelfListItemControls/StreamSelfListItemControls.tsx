import React, { FC } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { useDynamicValue } from 'react-native-dynamic';
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
   * Return Stream Key if not finished
   */
  if (new Date(props.data.timeTo) >= now) {
    return (
      <>
        <Button
          type="PRIMARY"
          title="View Stream"
          onPress={() => pushScreen(screenProps.componentId, StreamSelfScreen, { id: props.data.id })}
          style={Styles.streamButton}
        />

        <View style={Styles.authKeys}>
          <View style={Styles.authKey}>
            <Body bold>Stream Url: </Body>
            <Body
              style={[Styles.authKeyBody, dynamicStyles.authKeyBody]}
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
              style={[Styles.authKeyBody, dynamicStyles.authKeyBody]}
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
};

export default StreamSelfListItemControls;
