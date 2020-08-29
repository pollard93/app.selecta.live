import React, { memo, FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useDynamicValue } from 'react-native-dynamic';
import Styles, { DynamicStyles } from './MessageInput.styles';
import Icon, { ICON } from '../../../Icon/Icon';
import TextInput from '../TextInput/TextInput';
import color from '../../../../../styles/definitions/color';

interface MessageInputProps {
  message: string;
  setMessage: (value: string) => void;
  placeholder: string;
  onSubmit: () => void;
  disabled: boolean;
}

const MessageInput: FC<MessageInputProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);

  return (
    <View style={[Styles.wrap, dynamicStyles.wrap]}>
      <TextInput
        name="message"
        value={props.message}
        onChangeText={props.setMessage}
        placeholder={props.placeholder}
        placeholderTextColor={color.mono.pale.dark}
        returnKeyType="send"
        blurOnSubmit
        onSubmitEditing={() => props.onSubmit()}
        editable={!props.disabled}
        wrapStyle={Styles.inputWrap}
        maxLength={280}
      />

      <TouchableOpacity
        onPress={() => props.onSubmit()}
        disabled={props.disabled}
        testID="submit"
      >
        <Icon
          name={ICON.SEND}
          size="small"
          style={[Styles.send, props.disabled && Styles.sendDisabled]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(MessageInput);
