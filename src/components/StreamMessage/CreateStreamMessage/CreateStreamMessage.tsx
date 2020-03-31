import React, { useState, memo } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useToast } from 'mbp-components-rn-toast';
import { usePutStreamMessageMutation } from '../../../API/mutation/putStreamMessage/putStreamMessage';
import { getStreamMessagesVariables, getStreamMessages } from '../../../API/query/getStreamMessages/__generated__/getStreamMessages';
import { GET_STREAM_MESSAGES_QUERY } from '../../../API/query/getStreamMessages/getStreamMessages';
import Toast from '../../UI/Toast/Toast';
import { getGQLErrorMessage } from '../../../utils/functions';

interface CreateStreamMessageProps {
  variables: getStreamMessagesVariables; // Variables for query to append to cache
}

const CreateStreamMessage = (props: CreateStreamMessageProps) => {
  const toast = useToast();
  const [message, setMessage] = useState('');


  /**
   * Put stream message mutation
   * Appends new message to cache on completion
   */
  const [mutation, { loading, client }] = usePutStreamMessageMutation({
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


  const onSubmit = () => {
    mutation({
      variables: {
        id: props.variables.id,
        message,
      },
    });
  };


  return (
    <View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder='Enter message'
        returnKeyType="send"
        blurOnSubmit
        onSubmitEditing={onSubmit}
        editable={!loading}
      />

      <Button
        title="Submit"
        onPress={onSubmit}
        disabled={loading || message.length === 0}
      />
    </View>
  );
};

export default memo(CreateStreamMessage);
