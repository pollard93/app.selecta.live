import React, { useState, memo, FC } from 'react';
import { View } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDynamicValue } from 'react-native-dynamic';
import { usePutStreamMessageMutation } from '../../../API/mutation/putStreamMessage/putStreamMessage';
import { getStreamMessagesVariables, getStreamMessages } from '../../../API/query/getStreamMessages/__generated__/getStreamMessages';
import { GET_STREAM_MESSAGES_QUERY } from '../../../API/query/getStreamMessages/getStreamMessages';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';
import { getChannelToken } from '../../../ApolloClient';
import Styles, { DynamicStyles } from './CreateStreamMessage.styles';
import color from '../../../styles/definitions/color';
import Icon, { ICON } from '../../UI/Icon/Icon';
import TextInput from '../../UI/Form/components/TextInput/TextInput';

interface CreateStreamMessageProps {
  variables: getStreamMessagesVariables; // Variables for query to append to cache
}

const CreateStreamMessage: FC<CreateStreamMessageProps> = (props) => {
  const dynamicStyles = useDynamicValue(DynamicStyles);
  const toast = useToast();
  const [message, setMessage] = useState('');


  /**
   * Put stream message mutation
   * Appends new message to cache on completion
   */
  const [mutation, { loading, client }] = usePutStreamMessageMutation({
    variables: {
      id: props.variables.id,
      message,
    },
    onCompleted: ({ putStreamMessage }) => {
      // Reset message state
      setMessage('');

      // Prepend message to cache
      try {
        const data = client.readQuery<getStreamMessages, getStreamMessagesVariables>({
          query: GET_STREAM_MESSAGES_QUERY,
          variables: props.variables,
        });

        /**
         * If id already exists in cache then return
         * Subscription may have got there first
         */
        if (data.getStreamMessages.messages.find((m) => m.id === putStreamMessage.id)) return;

        client.writeQuery({
          query: GET_STREAM_MESSAGES_QUERY,
          variables: props.variables,
          data: {
            ...data,
            getStreamMessages: {
              ...data.getStreamMessages,
              messages: [putStreamMessage, ...data.getStreamMessages.messages],
              count: data.getStreamMessages.count + 1,
            },
          },
        });
      // eslint-disable-next-line no-empty
      } catch (e) {}
    },
    onError: (e) => {
      toast.push({
        duration: 1000,
        component: (
          <Toast content={getGQLErrorMessage(e)} />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Handle submission
   * Tries to getChannelToken from local state
   * If no token exists null will be returned and ApolloClient will replace with a general token
   */
  const onSubmit = async () => {
    mutation({
      context: {
        headers: {
          authorization: await getChannelToken(client),
        },
      },
    });
  };


  const disabled = loading || message.length === 0;


  return (
    <View style={[Styles.wrap, dynamicStyles.wrap]}>
      <TextInput
        name="message"
        light
        value={message}
        onChangeText={setMessage}
        placeholder='Type your message here...'
        placeholderTextColor={color.accent.primary}
        returnKeyType="send"
        blurOnSubmit
        onSubmitEditing={() => mutation()}
        editable={!loading}
        wrapStyle={Styles.inputWrap}
        style={dynamicStyles.input}
        maxLength={280}
      />

      <TouchableOpacity
        onPress={() => onSubmit()}
        disabled={disabled}
        testID="submit"
      >
        <Icon
          name={ICON.SEND}
          size="small"
          style={[Styles.send, disabled && Styles.sendDisabled]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(CreateStreamMessage);
